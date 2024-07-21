from typing import TypedDict

class EstatAreaType(TypedDict):
    """
    e-Stat APIから取得した地域情報を表す型定義クラス

    Attributes:
        areaCode (str): 地域コード
        areaName (str): 地域名
    """
    areaCode: str
    areaName: str

class EstatSourceType(TypedDict):
    """
    e-Stat APIから取得したデータソース情報を表す型定義クラス

    Attributes:
        name (str): データソース名
        url (str): データソースのURL
        update (str): データの更新日
    """
    name: str
    url: str
    update: str

class EstatCategoryType(TypedDict):
    """
    e-Stat APIから取得したカテゴリー情報を表す型定義クラス

    Attributes:
        categoryCode (str): カテゴリーコード
        categoryName (str): カテゴリー名
        categoryUnit (str): カテゴリーの単位
    """
    categoryCode: str
    categoryName: str
    categoryUnit: str

class EstatTimeType(TypedDict):
    """
    e-Stat APIから取得した時間情報を表す型定義クラス

    Attributes:
        timeId (str): 時間のID - 例: "2010000000"
        timeCode (str): 時間のコード - 例: "2010"
        timeName (str): 時間の名称 - 例: "2010年"
    """
    timeId: str
    timeCode: str
    timeName: str

class EstatValueType(TypedDict):
    """
    e-Stat APIから取得したデータ値を表す型定義クラス

    Attributes:
        timeId (str): 時間のID
        timeCode (str): 時間のコード
        timeName (str): 時間の名称
        areaCode (str): 地域コード
        areaName (str): 地域名
        categoryCode (str): カテゴリーコード
        categoryName (str): カテゴリー名
        categoryUnit (str): カテゴリーの単位
        value (float | None): データの値（浮動小数点数または None）
    """
    timeId: str
    timeCode: str
    timeName: str
    areaCode: str
    areaName: str
    categoryCode: str
    categoryName: str
    categoryUnit: str
    value: float | None

class EstatResultType(TypedDict):
    """
    e-Stat APIから取得した結果を表す型定義クラス

    Attributes:
        categories (list[EstatCategoryType]): カテゴリー情報のリスト
        times (list[EstatTimeType]): 時間情報のリスト
        areas (list[EstatAreaType]): 地域情報のリスト
        values (list[EstatValueType]): データ値のリスト
        source (EstatSourceType): データソース情報
    """
    categories: list[EstatCategoryType]
    times: list[EstatTimeType]
    areas: list[EstatAreaType]
    values: list[EstatValueType]
    source: EstatSourceType