from typing import Optional, TypedDict, Union


class ResultType(TypedDict):
    """
    結果情報を表す型定義

    Attributes:
        STATUS (int): ステータスコード
        ERROR_MSG (str): エラーメッセージ
        DATE (str): 日時
    """

    STATUS: int
    ERROR_MSG: str
    DATE: str


class NarrowingCondType(TypedDict):
    """
    絞り込み条件を表す型定義

    Attributes:
        CODE_CAT01_SELECT (str): 絞り込み条件のコード
    """

    CODE_CAT01_SELECT: str


class ParameterType(TypedDict):
    """
    パラメータ情報を表す型定義

    Attributes:
        LANG (str): 言語
        STATS_DATA_ID (str): 統計データID
        NARROWING_COND (NarrowingCondType): 絞り込み条件
        DATA_FORMAT (str): データ形式
        START_POSITION (int): 開始位置
        METAGET_FLG (str): メタデータ取得フラグ
    """

    LANG: str
    STATS_DATA_ID: str
    NARROWING_COND: NarrowingCondType
    DATA_FORMAT: str
    START_POSITION: int
    METAGET_FLG: str


class ResultInfType(TypedDict):
    """
    結果情報を表す型定義

    Attributes:
        TOTAL_NUMBER (int): 全体の件数
        FROM_NUMBER (int): 開始番号
        TO_NUMBER (int): 終了番号
    """

    TOTAL_NUMBER: int
    FROM_NUMBER: int
    TO_NUMBER: int


class StatNameType(TypedDict):
    """
    統計名情報を表す型定義

    Attributes:
        code (str): 統計名コード
        text (str): 統計名
    """

    code: str
    text: str


class GovOrgType(TypedDict):
    """
    政府組織情報を表す型定義

    Attributes:
        code (str): 政府組織コード
        text (str): 政府組織名
    """

    code: str
    text: str


class MainCategoryType(TypedDict):
    """
    主要カテゴリ情報を表す型定義

    Attributes:
        code (str): 主要カテゴリコード
        text (str): 主要カテゴリ名
    """

    code: str
    text: str


class SubCategoryType(TypedDict):
    """
    サブカテゴリ情報を表す型定義

    Attributes:
        code (str): サブカテゴリコード
        text (str): サブカテゴリ名
    """

    code: str
    text: str


class StatisticsNameSpecType(TypedDict):
    """
    統計名詳細情報を表す型定義

    Attributes:
        TABULATION_CATEGORY (str): 集計カテゴリ
        TABULATION_SUB_CATEGORY1 (str): 集計サブカテゴリ1
    """

    TABULATION_CATEGORY: str
    TABULATION_SUB_CATEGORY1: str


class TitleSpecType(TypedDict):
    """
    タイトル詳細情報を表す型定義

    Attributes:
        TABLE_NAME (str): 表の名称
    """

    TABLE_NAME: str


class TableInfType(TypedDict):
    """
    表情報を表す型定義

    Attributes:
        id (str): 表ID
        STAT_NAME (StatNameType): 統計名情報
        GOV_ORG (GovOrgType): 政府組織情報
        STATISTICS_NAME (str): 統計名
        TITLE (Union[str, dict]): タイトル
        CYCLE (str): 周期
        SURVEY_DATE (int): 調査日
        OPEN_DATE (str): 公開日
        SMALL_AREA (int): 小地域フラグ
        MAIN_CATEGORY (MainCategoryType): 主要カテゴリ情報
        SUB_CATEGORY (SubCategoryType): サブカテゴリ情報
        OVERALL_TOTAL_NUMBER (int): 全体の件数
        UPDATED_DATE (str): 更新日
        STATISTICS_NAME_SPEC (StatisticsNameSpecType): 統計名詳細情報
        TITLE_SPEC (TitleSpecType): タイトル詳細情報
    """

    id: str
    STAT_NAME: StatNameType
    GOV_ORG: GovOrgType
    STATISTICS_NAME: str
    TITLE: Union[str, dict]
    CYCLE: str
    SURVEY_DATE: int
    OPEN_DATE: str
    SMALL_AREA: int
    MAIN_CATEGORY: MainCategoryType
    SUB_CATEGORY: SubCategoryType
    OVERALL_TOTAL_NUMBER: int
    UPDATED_DATE: str
    STATISTICS_NAME_SPEC: StatisticsNameSpecType
    TITLE_SPEC: TitleSpecType


class ClassType(TypedDict):
    """
    分類情報を表す型定義

    Attributes:
        code (str): 分類コード
        name (str): 分類名
        level (str): 分類レベル
        unit (str): 単位
    """

    code: str
    name: str
    level: str
    unit: str


class ClassObjType(TypedDict):
    """
    分類オブジェクト情報を表す型定義

    Attributes:
        id (str): 分類オブジェクトID
        name (str): 分類オブジェクト名
        CLASS (Union[ClassType, List[ClassType]]): 分類情報
    """

    id: str
    name: str
    CLASS: Union[ClassType, list[ClassType]]


class ClassInfType(TypedDict):
    """
    分類情報を表す型定義

    Attributes:
        CLASS_OBJ (List[ClassObjType]): 分類オブジェクトのリスト
    """

    CLASS_OBJ: list[ClassObjType]


class NoteType(TypedDict):
    """
    注釈情報を表す型定義

    Attributes:
        char (str): 注釈文字
        text (str): 注釈テキスト
    """

    char: str
    text: str


class ValueType(TypedDict):
    """
    値情報を表す型定義

    Attributes:
        tab (str): タブ
        cat01 (str): カテゴリ01
        area (str): 地域
        time (str): 時間
        unit (str): 単位
        text (str): 値のテキスト表現
    """

    tab: str
    cat01: str
    area: str
    time: str
    unit: str
    text: str


class DataInfType(TypedDict):
    """
    データ情報を表す型定義

    Attributes:
        NOTE (List[NoteType]): 注釈情報のリスト
        VALUE (List[ValueType]): 値情報のリスト
    """

    NOTE: list[NoteType]
    VALUE: list[ValueType]


class StatisticalDataType(TypedDict):
    """
    統計データを表す型定義

    Attributes:
        RESULT_INF (ResultInfType): 結果情報
        TABLE_INF (TableInfType): 表情報
        CLASS_INF (ClassInfType): 分類情報
        DATA_INF (DataInfType): データ情報
    """

    RESULT_INF: ResultInfType
    TABLE_INF: TableInfType
    CLASS_INF: ClassInfType
    DATA_INF: DataInfType


class GetStatsDataType(TypedDict):
    """
    統計データ取得結果を表す型定義

    Attributes:
        RESULT (ResultType): 結果情報
        PARAMETER (ParameterType): パラメータ情報
        STATISTICAL_DATA (StatisticalDataType): 統計データ
    """

    RESULT: ResultType
    PARAMETER: ParameterType
    STATISTICAL_DATA: StatisticalDataType


class EStatResponseType(TypedDict):
    """
    e-Stat APIレスポンスを表す型定義

    Attributes:
        GET_STATS_DATA (GetStatsDataType): 統計データ取得結果
    """

    GET_STATS_DATA: GetStatsDataType


class EstatParamsType(TypedDict):
    """
    e-Stat APIのリクエストパラメータを表す型定義クラス

    Attributes:
        appid (str): e-Stat APIのアプリケーションID
        statsDataId (str): 統計データID
        cdCat01 (str): 分類事項コード（カテゴリーコード）
        cdArea (Optional[str]): 地域コード
    """

    appid: str
    statsDataId: str
    cdCat01: str
    cdArea: Optional[str]
