import sys

sys.path.append("_backend")
from local_settings import initialization

sys.path.append("_backend/estat-contents")
from estat_api_formatter.main import EstatAPIFormatterClass
from estat_api_formatter.modules import (
    CategoryType,
    extract_sorted_areas,
    extract_sorted_times,
)
from document_processer.modules import assign_value_ranks

import pprint


class DocumentProcessorClass:
    def __init__(self, categories: list[CategoryType]):
        self.categories = categories
        self.values = self._process_values()
        self.result = {
            "values": self.values,
            "categories": self._format_categories(self.categories),
            "times": extract_sorted_times(self.values),
            "areas": extract_sorted_areas(self.values),
        }

    def _process_values(self):
        values = []
        for category in self.categories:
            response = EstatAPIFormatterClass(category).result
            values.extend(response["values"])

        return values

    def _format_categories(self, categories):
        return [
            {
                "categoryCode": category["categoryCode"],
                "categoryName": category["categoryName"],
                "categoryUnit": category["categoryUnit"],
                "digit": category.get("digit"),
            }
            for category in categories
        ]


class JapanDocumentProcessorClass(DocumentProcessorClass):
    def __init__(self, categories: list[CategoryType]):
        super().__init__(categories)
        self.values = self._process_japan_values()
        self.result = {
            "values": self.values,
            "categories": self._format_categories(self.categories),
            "times": extract_sorted_times(self.values),
            "areas": extract_sorted_areas(self.values),
        }

    def _process_japan_values(self):
        values = []
        for category in self.categories:
            response = EstatAPIFormatterClass(category).result

            # 全国の値のみを抽出
            filtered_values = [
                v for v in response["values"] if v["areaCode"] == "00000"
            ]
            values.extend(filtered_values)

        return values


class PrefectureDocumentProcessorClass(DocumentProcessorClass):
    def __init__(self, categories: list[CategoryType]):
        super().__init__(categories)
        self.values = self._process_prefecture_values()
        self.result = {
            "values": self.values,
            "categories": self._format_categories(self.categories),
            "times": extract_sorted_times(self.values),
            "areas": extract_sorted_areas(self.values),
        }

    def _process_prefecture_values(self):
        values = []
        for category in self.categories:
            response = EstatAPIFormatterClass(category).result

            for time in response["times"]:
                time_values = self._filter_values(response["values"], time["timeCode"])
                ranked_values = assign_value_ranks(time_values)
                values.extend(ranked_values)  # ランキングを付与

        return values

    def _filter_values(self, values, time_code):
        return [
            v for v in values if v["timeCode"] == time_code and v["areaCode"] != "00000"
        ]


class CityDocumentProcessorClass(DocumentProcessorClass):
    def __init__(self, categories: list[CategoryType]):
        super().__init__(categories)
        self.values = self._process_city_values()
        self.result = {
            "values": self.values,
            "categories": self._format_categories(self.categories),
            "times": extract_sorted_times(self.values),
            "areas": extract_sorted_areas(self.values),
        }

    def _process_city_values(self):
        values = []
        for category in self.categories:
            response = EstatAPIFormatterClass(category).result

            for time in response["times"]:
                time_values = self._filter_values(response["values"], time["timeCode"])
                ranked_values = assign_value_ranks(time_values)
                values.extend(ranked_values)

        return values

    def _filter_values(self, values, time_code):
        return [v for v in values if v["timeCode"] == time_code]


# -------------------------------------------------------------
#  テストデータ
# -------------------------------------------------------------


# 総人口 - 都道府県
total_population_prefecture = [
    {
        "categoryCode": "total",
        "categoryName": "総人口",
        "categoryUnit": "万人",  # 単位を万人に変更
        "divisor": 10000,  # 10,000で割る
        "estatParams": {"statsDataId": "0000010101", "cdCat01": "A1101"},
    },
    {
        "categoryCode": "man",
        "categoryName": "男性",
        "categoryUnit": "万人",  # 単位を万人に変更
        "divisor": 10000,  # 10,000で割る
        "estatParams": {"statsDataId": "0000010101", "cdCat01": "A110101"},
    },
    {
        "categoryCode": "woman",
        "categoryName": "女性",
        "categoryUnit": "万人",  # 単位を万人に変更
        "divisor": 10000,  # 10,000で割る
        "estatParams": {"statsDataId": "0000010101", "cdCat01": "A110102"},
    },
]

# 総人口 - 市町村
total_population_city = [
    {
        "categoryCode": "total",
        "categoryName": "総人口",
        "categoryUnit": "人",
        "estatParams": {"statsDataId": "0000020201", "cdCat01": "A1101"},
    },
    {
        "categoryCode": "man",
        "categoryName": "男性",
        "categoryUnit": "人",
        "estatParams": {"statsDataId": "0000020201", "cdCat01": "A110101"},
    },
    {
        "categoryCode": "woman",
        "categoryName": "女性",
        "categoryUnit": "人",
        "estatParams": {"statsDataId": "0000020201", "cdCat01": "A110102"},
    },
]


# 人口密度
total_population_per_area = [
    {
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
]

# 事業所数
office = [
    {
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
]


# -------------------------------------------------------------
#  テスト
# -------------------------------------------------------------

import json  # noqa: E402
import os  # noqa: E402


def save_data(data, file_path):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def save_json(documentId: str, result: dict):
    ## 現在のディレクトリを取得
    file_path = __file__
    directory = os.path.dirname(file_path)

    ## 保存先のディレクトリを作成
    save_dir = f"{directory}/result/{documentId}"
    os.makedirs(save_dir, exist_ok=True)

    print(f"{documentId}の結果を保存中...")

    # resultをファイルに保存
    keys = ["values", "categories", "times", "areas"]
    for key in keys:
        file_path = os.path.join(save_dir, f"{key}.json")
        save_data(result[key], file_path)

    print(f"{documentId}の結果を保存しました。")


if __name__ == "__main__":
    initialization()  # 初期設定

    # 総人口 - 全国
    result = JapanDocumentProcessorClass(total_population_prefecture).result
    save_json("total-population-japan", result)

    # 総人口 - 都道府県
    result = PrefectureDocumentProcessorClass(total_population_prefecture).result
    save_json("total-population-prefecture", result)

    # 総人口 - 市町村
    result = CityDocumentProcessorClass(total_population_city).result
    save_json("total-population-city", result)

    # categories = total_population()
    # response = DocumentProcessorClass(categories).response
    # save_result("total-population", response)

    # categories = total_population_per_area()
    # response = DocumentProcessorClass(categories).response
    # save_result("total-population-per-area", response)

    # categories = office()
    # response = DocumentProcessorClass(categories).response
    # save_result("office", response)
