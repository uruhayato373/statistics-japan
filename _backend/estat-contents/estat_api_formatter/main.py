import sys

sys.path.append("_backend")
from local_settings import initialization

sys.path.append("_backend/estat-contents")
from estat_api_fetcher.main import EStatAPIFetcherClass
from estat_api_fetcher.modules import EstatValueType
from estat_api_formatter.modules import (
    CategoryType,
    ValueType,
    extract_sorted_areas,
    extract_sorted_times,
)


class EstatAPIFormatterClass:
    """
    e-Stat APIのデータをフォーマットするクラス。

    Args:
        category : カテゴリの情報。
            - categoryCode: カテゴリコード
            - categoryName: カテゴリ名
            - categoryUnit: 単位
            - divisor (Optional): 数値を割るための除数
            - digit (Optional): 小数点以下の桁数
            - processingType (Optional): 処理区分 - "ratio"は割合を計算 "link"は年次を連結
            - estatParams: e-Stat APIリクエストのパラメータ

    責務:
        - APIリクエストが複数ある場合は、processingTypeに基づき処理方法を決定する。
        - processingTypeが"ratio"の場合は、割合を計算する。
        - processingTypeが"link"の場合は、年次を連結する。
        - 前年比と増減率を計算する。
    """

    def __init__(self, category: CategoryType):
        self.category = category
        self.estat_params = category["estatParams"]
        self.processing_type = category.get("processingType", "ratio")
        self.values = self._fetch_estat_values()
        self.result = {
            "times": extract_sorted_times(self.values),
            "areas": extract_sorted_areas(self.values),
            "values": self.format_values(self.values),
        }

    def _fetch_estat_values(self) -> list[EstatValueType]:
        """
        e-Stat APIから値を取得して、valuesをセットする。

        Returns:
            list[EstatValueType]: e-Stat APIから取得した値のリスト。

        処理の流れ:
            1. `estat_params`が辞書の場合:
                - 通常のデータ取得処理を行う。
                - `EStatAPIFetcherClass`を使用して、指定されたパラメータでデータを取得する。
                - 取得した結果の中から、"values"キーに対応する値のリストを返す。

            2. `estat_params`がリストの場合:
                - 割合の計算または年次の連結処理を行う。
                - `processing_type`の値に基づいて、以下のいずれかの処理を実行する。
                    - "ratio"の場合: `_calculate_ratio_values`メソッドを呼び出して、割合の値を計算する。
                    - "link"の場合: `_calculate_link_values`メソッドを呼び出して、年次を連結した値を取得する。

        """
        ## estatParamsが辞書の場合の処理 - 通常のデータ取得
        if isinstance(self.estat_params, dict):
            response = EStatAPIFetcherClass(self.estat_params).result
            return response["values"]

        ## estatParamsがリストの場合の処理 - 割合を計算または年次を連結
        if isinstance(self.estat_params, list):
            if self.processing_type == "ratio":
                return self._calculate_ratio_values()
            elif self.processing_type == "link":
                return self._calculate_link_values()

    def _calculate_ratio_values(self):
        """
        割合の値を計算する。

        Returns:
            list[EstatValueType]: 計算された割合の値のリスト。

        """

        if len(self.estat_params) != 2:
            raise ValueError("estat_paramsリストの長さが2ではありません。")

        res0 = EStatAPIFetcherClass(self.estat_params[0]).result
        res1 = EStatAPIFetcherClass(self.estat_params[1]).result

        # res1.valuesをareaCodeとtimeCodeをキーとする辞書に変換
        res1_dict = {(v["areaCode"], v["timeCode"]): v for v in res1["values"]}

        # 割り算を実行
        values = []
        for value in res0["values"]:
            key = (value["areaCode"], value["timeCode"])
            if key in res1_dict:
                value["value"] /= res1_dict[key]["value"]
                values.append(value)

        return values

    def _calculate_link_values(self):
        """
        年次を連結した値を計算する。

        Returns:
            list[EstatValueType]: 計算された年次を連結した値のリスト。

        """
        values = []

        for params in self.estat_params:
            response = EStatAPIFetcherClass(params).result
            values.extend(response["values"])

        return values

    def format_categories(self):
        return [
            {k: v for k, v in category.items() if k != "estatParams"}
            for category in self.categories
        ]

    def format_values(self, values: list[EstatValueType]) -> list[ValueType]:
        divisor = self.category.get("divisor")
        digit = self.category.get("digit")

        for value in values:
            value.pop("timeId", None)

            if divisor:
                value["value"] /= divisor

            if value["value"] is not None:
                value["value"] = (
                    round(value["value"], digit) if digit else round(value["value"])
                )

            value.update(
                {
                    "categoryCode": self.category["categoryCode"],
                    "categoryName": self.category["categoryName"],
                    "categoryUnit": self.category["categoryUnit"],
                }
            )

            if values.index(value) > 0:
                prev_value = values[values.index(value) - 1]
                value["rate"] = self.calculate_rate(value, prev_value)
                value["trend"] = self.get_trend(value["rate"])

        return values

    def calculate_rate(self, cur, pre):
        """
        前年比を計算する。

        Args:
            cur (PopulationData): 現在の年度のデータ。
            pre (PopulationData): 前年度のデータ。

        Returns:
            Union[float, None]: 計算された前年比。計算できない場合はNone。

        計算の条件:
            - 現在の年度と前年度の値が0、"-"、Noneのいずれでもないこと。
            - 現在の年度のtimeCodeと前年度のtimeCodeの差が1であること。

        計算式:
            前年比 = (現在の年度の値 - 前年度の値) / 前年度の値 * 100

        注意:
            - 計算結果は小数点以下1桁に丸められる。
            - 計算できない場合は、Noneを返す。

        """
        if any(v in [0, "-", None] for v in [pre["value"], cur["value"]]):
            return None

        if int(cur["timeCode"]) - int(pre["timeCode"]) != 1:
            return None

        return round(float((cur["value"] - pre["value"]) / pre["value"] * 100), 1)

    def get_trend(self, rate: float | None) -> str | None:
        """
        前年からの増減を取得する。

        Args:
            rate : 前年比。

        Returns:
            "up", "down", "flat"のいずれか。rateがNoneの場合はNone。

        """
        if rate is None:
            return None
        trend = "up" if rate > 0 else "down" if rate < 0 else "flat"
        return trend


# -------------------------------------------------------------
#  テストデータ
# -------------------------------------------------------------


# 総人口 - 都道府県
total_population_prefecture = {
    "categoryCode": "total",
    "categoryName": "総人口",
    "categoryUnit": "万人",  # 単位を万人に変更
    "divisor": 10000,  # 10,000で割る
    "estatParams": {"statsDataId": "0000010101", "cdCat01": "A1101"},
}

# 総人口 - 市区町村
total_population_city = {
    "categoryCode": "total",
    "categoryName": "総人口",
    "categoryUnit": "人",  # 単位を万人に変更
    "estatParams": {"statsDataId": "0000020201", "cdCat01": "A1101"},
}

# 人口密度
total_population_per_area = {
    "categoryCode": "total",
    "categoryName": "人口密度",
    "categoryUnit": "人/ha",
    "digit": 1,  # 小数1位
    "processingType": "ratio",  # 割合を計算
    "estatParams": [
        {
            "statsDataId": "0000010101",
            "cdCat01": "A1101",  # 総人口
        },
        {
            "statsDataId": "0000010102",
            "cdCat01": "B1101",  # 総面積
        },
    ],
}

# 事業所数
office = {
    "categoryCode": "office",
    "categoryName": "事業所数",
    "categoryUnit": "所",
    "processingType": "link",  # 年次を連結
    "estatParams": [
        {
            "statsDataId": "0000010103",
            "cdCat01": "C2101",  # 企業統計調査結果
        },
        {
            "statsDataId": "0000010103",
            "cdCat01": "C2107",  # 経済センサス基礎調査結果
        },
    ],
}


# -------------------------------------------------------------
#  テスト
# -------------------------------------------------------------

import json  # noqa: E402
import os  # noqa: E402


def save_data(data, file_path):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def save_json(documentId: str, category: CategoryType):
    ## 現在のディレクトリを取得
    file_path = __file__
    directory = os.path.dirname(file_path)

    ## 保存先のディレクトリを作成
    save_dir = f"{directory}/result/{documentId}"
    os.makedirs(save_dir, exist_ok=True)

    ## EstatAPIFormatterClassのインスタンスを生成
    formatter = EstatAPIFormatterClass(category)

    # resultをファイルに保存
    result = formatter.result
    keys = ["values", "times", "areas"]
    for key in keys:
        file_path = os.path.join(save_dir, f"{key}.json")
        save_data(result[key], file_path)


if __name__ == "__main__":
    initialization()  # 初期設定

    # 総人口 - 都道府県
    save_json("total-population_prefecture", total_population_prefecture)

    # 総人口 - 市区町村
    save_json("total_population_city", total_population_city)

    # 人口密度
    save_json("total_population_per_area", total_population_per_area)

    # 事業所数
    save_json("office", office)
