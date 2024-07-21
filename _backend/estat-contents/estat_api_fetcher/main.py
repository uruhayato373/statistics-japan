import json
import math
import os
import sys
from typing import Any

sys.path.append("_backend")
from local_settings import initialization


sys.path.append("_backend/estat-contents")
from estat_api_fetcher.modules import fetch_estat_api
from estat_api_fetcher.modules import (
    ClassObjType,
    ValueType,
    EstatAreaType,
    EstatCategoryType,
    EstatTimeType,
    EstatSourceType,
    EstatResultType,
)


class EStatAPIFetcherClass:
    def __init__(self, params):
        self.api_response = fetch_estat_api(params)
        self.api_values = self._api_values()
        self.api_class_obj = self._api_class_obj()
        self.times: list[EstatTimeType] = self._format_class_obj(
            "time", self._format_time
        )
        self.areas: list[EstatAreaType] = self._format_class_obj(
            "area", self._format_area
        )
        self.categories: list[EstatCategoryType] = self._format_class_obj(
            "cat01", self._format_category
        )
        self.result:EstatResultType = {
            "categories": self.categories,
            "times": self.times,
            "areas": self.areas,
            "values": self._format_values(),
            "source": self._format_source(),
        }

    def _api_values(self) -> list[ValueType]:
        """
        APIレスポンスから統計値を取得するメソッド。

        Returns:
            list[ValueType]: APIレスポンスから取得した統計値のリスト。

        """
        return self.api_response["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"][
            "VALUE"
        ]

    def _api_class_obj(self) -> list[ClassObjType]:
        """
        e-Stat APIレスポンスから分類情報（CLASS_OBJ）を取得するメソッド。

        Returns:
            list[ClassObjType]: 分類情報（CLASS_OBJ）のリスト。
                - "CLASS_OBJ" が辞書型の場合、リストに変換して返却。
                - "CLASS_OBJ" がリストの場合、そのままリストを返却。

        """
        class_obj = self.api_response["GET_STATS_DATA"]["STATISTICAL_DATA"][
            "CLASS_INF"
        ]["CLASS_OBJ"]
        return [class_obj] if isinstance(class_obj, dict) else class_obj

    def _format_class_obj(self, id, format_func) -> list[Any]:
        """
        times,areas,categoriesをフォーマットするメソッド。

        Args:
            id : "time","area" ...etc
            format_func : フォーマットするための関数。

        Returns:
            list[Any]: フォーマットされたリスト。
        """
        data = next(
            (item["CLASS"] for item in self.api_class_obj if item["@id"] == id), []
        )
        data = [data] if isinstance(data, dict) else data
        return [format_func(item) for item in data]

    def _format_area(self, area) -> list[EstatAreaType]:
        """
        地域情報をフォーマットするメソッド。

        Args:
            area (dict): フォーマットする地域情報の辞書。
                - "@code" (str): 地域コード。
                - "@name" (str): 地域名。

        Returns:
            EstatAreaType: フォーマットされた地域情報の辞書。
                - "areaCode" (str): 地域コード。
                - "areaName" (str): 地域名。

        """
        return {"areaCode": area["@code"], "areaName": area["@name"]}

    def _format_category(self, category) -> list[EstatCategoryType]:
        """
        カテゴリ情報をフォーマットするメソッド。

        Args:
            category (dict): フォーマットするカテゴリ情報の辞書。
                - "@code" (str): カテゴリコード。
                - "@name" (str): カテゴリ名。
                - "@unit" (str): カテゴリの単位。

        Returns:
            EstatCategoryType: フォーマットされたカテゴリ情報の辞書。
                - "categoryCode" (str): カテゴリコード。
                - "categoryName" (str): カテゴリ名。カテゴリコードを除去した名前。
                - "categoryUnit" (str): カテゴリの単位。

        カテゴリ名の処理:
            - カテゴリ名からカテゴリコードを除去します。
            - カテゴリコードの後にアンダースコア "_" が続く場合、それらを含めて除去。

        例:
            >>> category = {
            ...     "@code": "00001",
            ...     "@name": "00001_人口総数",
            ...     "@unit": "人"
            ... }
            >>> formatted_category = format_category(category)
            >>> print(formatted_category)
            {
                "categoryCode": "00001",
                "categoryName": "人口総数",
                "categoryUnit": "人"
            }

        """
        return {
            "categoryCode": category["@code"],
            "categoryName": category["@name"].replace(f'{category["@code"]}_', ""),
            "categoryUnit": category["@unit"],
        }

    def _format_time(self, time) -> list[EstatTimeType]:
        """
        時間情報をフォーマットするメソッド。

        Args:
            time (dict): フォーマットする時間情報の辞書。
                - "@code" (str): 時間コード。
                - "@name" (str): 時間名。

        Returns:
            EstatTimeType: フォーマットされた時間情報の辞書。
                - "timeId" (str): 時間ID。元の時間コードと同じ。
                - "timeCode" (str): 時間コード。末尾の "100000" を除去したもの。
                - "timeName" (str): 時間名。

        時間コードの処理:
            - 時間コードの末尾に "100000" が含まれている場合、それを除去。
            - 除去後の時間コードを "timeCode" として格納。

        例:
            >>> time = {
            ...     "@code": "2021100000",
            ...     "@name": "2021年"
            ... }
            >>> formatted_time = _format_time(time)
            >>> print(formatted_time)
            {
                "timeId": "2021100000",
                "timeCode": "2021",
                "timeName": "2021年"
            }
        """
        return {
            "timeId": time["@code"],
            "timeCode": time["@code"].replace("100000", ""),
            "timeName": time["@name"],
        }

    def _format_source(self) -> EstatSourceType:
        """
        統計データの出典情報をフォーマットするメソッド。

        Returns:
            EstatSourceType: フォーマットされた出典情報の辞書。
                - "name" (str): 統計データの名前。
                - "url" (str): 統計データのURL。
                - "update" (str): 統計データの更新日。

        出典情報の取得:
            - APIレスポンスの "GET_STATS_DATA" -> "STATISTICAL_DATA" -> "TABLE_INF" から出典情報を取得。
            - "STAT_NAME" の "$" キーから統計名を取得。
            - "TITLE" の "$" キーからタイトルを取得。
            - "@id" キーからURLの一部を取得。
            - "UPDATED_DATE" キーから更新日を取得。

        出典情報のフォーマット:
            - 統計名とタイトルを組み合わせて "name" を作成。
            - URLの一部を使用して完全なURLを作成し、"url" に格納。
            - 更新日を文字列として "update" に格納。

        例:
            >>> api_response = {
            ...     "GET_STATS_DATA": {
            ...         "STATISTICAL_DATA": {
            ...             "TABLE_INF": {
            ...                 "STAT_NAME": {"$": "国勢調査"},
            ...                 "TITLE": {"$": "人口総数"},
            ...                 "@id": "0003109741",
            ...                 "UPDATED_DATE": "2022-01-01"
            ...             }
            ...         }
            ...     }
            ... }
            >>> formatted_source = _format_source(api_response)
            >>> print(formatted_source)
            {
                "name": "国勢調査「人口総数」",
                "url": "https://www.e-stat.go.jp/dbview?sid=0003109741",
                "update": "2022-01-01"
            }
        """
        table_inf = self.api_response["GET_STATS_DATA"]["STATISTICAL_DATA"]["TABLE_INF"]
        name = f'{table_inf["STAT_NAME"]["$"]}「{table_inf["TITLE"]["$"]}」'
        url = table_inf["@id"]
        update = table_inf["UPDATED_DATE"]
        return {
            "name": name,
            "url": f"https://www.e-stat.go.jp/dbview?sid={url}",
            "update": f"{update}",
        }

    def _format_values(self):
        """
        統計データの値をフォーマットするメソッド。

        Returns:
            list[EstatValueType]: フォーマットされた統計データの値のリスト。
                各要素は以下のキーを持つ辞書:
                - "timeId" (str): 時間ID。
                - "timeCode" (str): 時間コード。
                - "timeName" (str): 時間名。
                - "areaCode" (str): 地域コード。
                - "areaName" (str): 地域名。
                - "categoryCode" (str): カテゴリコード。
                - "categoryName" (str): カテゴリ名。
                - "categoryUnit" (str): カテゴリの単位。
                - "value" (float): 統計値。

        値のフォーマット:
            - APIレスポンスの "GET_STATS_DATA" -> "STATISTICAL_DATA" -> "DATA_INF" -> "VALUE" から値を取得します。
            - 各値に対して以下の処理を行います:
                - "@time" に対応する時間情報を `self.times` から検索し、マージします。
                - "@area" に対応する地域情報を `self.areas` から検索し、マージします。
                - "@cat01" に対応するカテゴリ情報を `self.categories` から検索し、マージします。
                - "$" キーから統計値を取得し、`self.parse_and_round_value` メソッドを使用してパースおよび丸めを行います。
            - "@time", "@area", "@cat01" のすべてのキーが存在する値のみをフォーマットの対象とします。

        例:
            >>> api_response = {
            ...     "GET_STATS_DATA": {
            ...         "STATISTICAL_DATA": {
            ...             "DATA_INF": {
            ...                 "VALUE": [
            ...                     {"@time": "2021", "@area": "00000", "@cat01": "0001", "$": "100000.5"},
            ...                     {"@time": "2022", "@area": "00000", "@cat01": "0001", "$": "105000.2"},
            ...                 ]
            ...             }
            ...         }
            ...     }
            ... }
            >>> times = [{"timeId": "2021", "timeCode": "2021", "timeName": "2021年"}]
            >>> areas = [{"areaCode": "00000", "areaName": "全国"}]
            >>> categories = [{"categoryCode": "0001", "categoryName": "人口総数", "categoryUnit": "人"}]
            >>> formatted_values = _format_values(api_response, times, areas, categories)
            >>> print(formatted_values)
            [
                {
                    "timeId": "2021",
                    "timeCode": "2021",
                    "timeName": "2021年",
                    "areaCode": "00000",
                    "areaName": "全国",
                    "categoryCode": "0001",
                    "categoryName": "人口総数",
                    "categoryUnit": "人",
                    "value": 100000.5
                },
                {
                    "timeId": "2022",
                    "timeCode": "2022",
                    "timeName": "2022年",
                    "areaCode": "00000",
                    "areaName": "全国",
                    "categoryCode": "0001",
                    "categoryName": "人口総数",
                    "categoryUnit": "人",
                    "value": 105000.2
                }
            ]
        """
        values = self.api_response["GET_STATS_DATA"]["STATISTICAL_DATA"]["DATA_INF"][
            "VALUE"
        ]
        return [
            {
                **next(
                    (time for time in self.times if time["timeId"] == value["@time"]),
                    {},
                ),
                **next(
                    (area for area in self.areas if area["areaCode"] == value["@area"]),
                    {},
                ),
                **next(
                    (
                        cat
                        for cat in self.categories
                        if cat["categoryCode"] == value["@cat01"]
                    ),
                    {},
                ),
                "value": self.parse_and_round_value(value["$"]),
            }
            for value in values
            if all(key in value for key in ["@time", "@area", "@cat01"])
        ]

    def parse_and_round_value(self, value):
        """
        統計値をパースおよび丸めるメソッド。

        Args:
            value (str): パースする統計値の文字列表現。
            divisor (float, optional): 統計値を割る値。デフォルトはNone。

        Returns:
            float | None: パースおよび丸めされた統計値。
                - 統計値が "-" の場合はNoneを返します。
                - divisorが指定された場合、統計値をdivisorで割った結果を返します。
                - 統計値に小数点 "." が含まれる場合は、小数点以下1桁に丸めます。
                - 統計値が整数の場合は、小数点以下を切り捨てます。

        値のパースと丸め:
            1. 統計値が "-" の場合、Noneを返します。
            2. 統計値を浮動小数点数にキャストします。
            3. divisorが指定された場合、統計値をdivisorで割ります。
            4. 統計値の文字列表現に小数点 "." が含まれる場合、小数点以下1桁に丸めます。
            5. 統計値が整数の場合、小数点以下を切り捨てます。

        例:
            >>> parse_and_round_value("100.5")
            100.5
            >>> parse_and_round_value("100.5", divisor=10)
            10.1
            >>> parse_and_round_value("100.567")
            100.6
            >>> parse_and_round_value("100")
            100
            >>> parse_and_round_value("-")
            None
        """
        if value == "-":
            return None
        if value == "X":
            return None
        value = float(value)
        return round(value, 1) if "." in str(value) else math.floor(value)


# -------------------------------------------------------------
#  テスト
# -------------------------------------------------------------


def save_data(data, file_path):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def save_json(documentId: str, params):
    ## 現在のディレクトリを取得
    file_path = __file__
    directory = os.path.dirname(file_path)

    ## 保存先のディレクトリを作成
    save_dir = f"{directory}/result/{documentId}"
    os.makedirs(save_dir, exist_ok=True)

    ## EStatAPIFetcherClassのインスタンスを生成
    fetcher = EStatAPIFetcherClass(params)

    ## resultをファイルに保存
    result = fetcher.result
    keys = ["values", "categories", "times", "areas", "source"]
    for key in keys:
        file_path = os.path.join(save_dir, f"{key}.json")
        save_data(result[key], file_path)

    ## api_responseをファイルに保存
    api_response = fetcher.api_response
    file_path = os.path.join(save_dir, "api_response.json")
    save_data(api_response, file_path)


if __name__ == "__main__":
    # 初期設定
    initialization()

    ## 総人口 - 都道府県
    total_population_prefecture = {"statsDataId": "0000010101", "cdCat01": "A1101"}
    save_json("total_population_prefecture", total_population_prefecture)

    ## 総人口 - 市区町村
    total_population_city = {"statsDataId": "0000020201", "cdCat01": "A1102"}
    save_json("total_population_city", total_population_city)
