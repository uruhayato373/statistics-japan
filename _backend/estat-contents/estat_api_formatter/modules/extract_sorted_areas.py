import sys

sys.path.append("_backend/estat-contents")
from estat_api_fetcher.modules import EstatValueType
from estat_api_formatter.modules import ValueType


def extract_sorted_areas(values: list[EstatValueType] | list[ValueType]):
    """
    重複を削除し、ソートされた地域情報を抽出する。

    Args:
        values (list[dict]): 抽出元の値のリスト。

    Returns:
        list[dict]: 重複を削除し、ソートされた地域情報のリスト。

    """
    seen = set()
    result = []
    for value in values:
        if value["areaCode"] not in seen:
            seen.add(value["areaCode"])
            result.append(
                {"areaCode": value["areaCode"], "areaName": value["areaName"]}
            )

    return result
