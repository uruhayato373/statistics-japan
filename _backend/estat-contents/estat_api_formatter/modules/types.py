from typing import List, Literal, Optional, TypedDict

from estat_api_fetcher.modules.types_original import EstatParamsType


class CategoryType(TypedDict):
    """
    カテゴリの型定義

    属性:
        categoryCode (str): カテゴリコード
        categoryName (str): カテゴリ名
        categoryUnit (str): 単位
        divisor (Optional[int]): 数値を割るための除数
        digit (Optional[int]): 小数点以下の桁数
        processingType (Optional[Literal["ratio", "link"]]): 処理区分
            - "ratio": 割合を計算
            - "link": 年次を連結
        estatParams (EstatParamsType | List[EstatParamsType]): e-Stat APIリクエストのパラメータ
    """
    categoryCode: str
    categoryName: str
    categoryUnit: str
    divisor: Optional[int]
    digit: Optional[int]
    processingType: Optional[Literal["ratio", "link"]]
    estatParams: EstatParamsType | List[EstatParamsType]


class ValueType(TypedDict):
    """
    値の型定義

    属性:
        timeCode (str): 時間コード
        timeName (str): 時間名
        areaCode (str): 地域コード
        areaName (str): 地域名
        categoryCode (str): カテゴリコード
        categoryName (str): カテゴリ名
        categoryUnit (str): 単位
        value (float): 値
        rate (Optional[float]): 前年比
        trend (Optional[Literal["up", "down", "flat"]]): 傾向
            - "up": 増加
            - "down": 減少
            - "flat": 変化なし
    """
    timeCode: str
    timeName: str
    areaCode: str
    areaName: str
    categoryCode: str
    categoryName: str
    categoryUnit: str
    value: float
    rate: Optional[float]
    trend: Optional[Literal["up", "down", "flat"]]


class AreaType(TypedDict):
    """
    地域の型定義

    属性:
        areaCode (str): 地域コード
        areaName (str): 地域名
    """
    areaCode: str
    areaName: str


class TimeType(TypedDict):
    """
    時間の型定義

    属性:
        timeCode (str): 時間コード
        timeName (str): 時間名
    """
    timeCode: str
    timeName: str
