export interface ResultType {
  STATUS: number
  ERROR_MSG: string
  DATE: string
}

export interface NarrowingCondType {
  CODE_CAT01_SELECT: string
}

export interface ParameterType {
  LANG: string
  STATS_DATA_ID: string
  NARROWING_COND: NarrowingCondType
  DATA_FORMAT: string
  START_POSITION: number
  METAGET_FLG: string
}

export interface ResultInfType {
  TOTAL_NUMBER: number
  FROM_NUMBER: number
  TO_NUMBER: number
}

export interface StatNameType {
  code: string
  text: string
}

export interface GovOrgType {
  code: string
  text: string
}

export interface MainCategoryType {
  code: string
  text: string
}

export interface SubCategoryType {
  code: string
  text: string
}

export interface StatisticsNameSpecType {
  TABULATION_CATEGORY: string
  TABULATION_SUB_CATEGORY1: string
}

export interface TitleSpecType {
  TABLE_NAME: string
}

export interface TableInfType {
  id: string
  STAT_NAME: StatNameType
  GOV_ORG: GovOrgType
  STATISTICS_NAME: string
  TITLE: string | Record<string, unknown>
  CYCLE: string
  SURVEY_DATE: number
  OPEN_DATE: string
  SMALL_AREA: number
  MAIN_CATEGORY: MainCategoryType
  SUB_CATEGORY: SubCategoryType
  OVERALL_TOTAL_NUMBER: number
  UPDATED_DATE: string
  STATISTICS_NAME_SPEC: StatisticsNameSpecType
  TITLE_SPEC: TitleSpecType
}

export interface ClassType {
  code: string
  name: string
  level: string
  unit: string
}

export interface ClassObjType {
  id: string
  name: string
  CLASS: ClassType | ClassType[]
}

export interface ClassInfType {
  CLASS_OBJ: ClassObjType[]
}

export interface NoteType {
  char: string
  text: string
}

export interface ValueType {
  tab: string
  cat01: string
  area: string
  time: string
  unit: string
  text: string
}

export interface DataInfType {
  NOTE: NoteType[]
  VALUE: ValueType[]
}

export interface StatisticalDataType {
  RESULT_INF: ResultInfType
  TABLE_INF: TableInfType
  CLASS_INF: ClassInfType
  DATA_INF: DataInfType
}

export interface GetStatsDataType {
  RESULT: ResultType
  PARAMETER: ParameterType
  STATISTICAL_DATA: StatisticalDataType
}

export interface EStatResponseType {
  GET_STATS_DATA: GetStatsDataType
}
