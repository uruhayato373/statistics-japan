import sys

sys.path.append("_backend/estat-contents")
from estat_api_fetcher.modules import EstatValueType
from estat_api_formatter.modules import ValueType


def extract_sorted_times(values: list[EstatValueType] | list[ValueType]):
    """
    重複を削除し、timeCodeの降順にソートされた時間情報を抽出する。

    Args:
        values (list[dict]): 抽出元の値のリスト。

    Returns:
        list[dict]: 重複を削除し、timeCodeの降順にソートされた時間情報のリスト。
    """
    seen = set()
    result = []
    for value in values:
        if value["timeCode"] is not None and value["timeCode"] not in seen:
            seen.add(value["timeCode"])
            result.append(
                {"timeCode": value["timeCode"], "timeName": value["timeName"]}
            )

    return sorted(result, key=lambda x: x["timeCode"], reverse=True)
