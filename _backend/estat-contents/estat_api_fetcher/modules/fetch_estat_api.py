import json
import os
import urllib.parse
import urllib.request
import sys
from dotenv import load_dotenv


sys.path.append("_backend/estat-contents")
from estat_api_fetcher.modules import EstatParamsType, EStatResponseType

load_dotenv()

## アプリケーションIDとエンドポイントを環境変数から取得
ESTAT_API_APPID = os.environ["ESTAT_API_APPID"]
ESTAT_API_ENDPOINT = os.environ["ESTAT_API_ENDPOINT"]


def fetch_estat_api(params: EstatParamsType) -> EStatResponseType:
    """
    e-Stat APIからデータを取得する関数。

    Args:
        params (EstatParamsType): e-Stat APIのリクエストパラメータを含む辞書。
            - "appId" (str): e-Stat APIアプリケーションID。
            - "cdCat01" (str または list): 統計表の分類コード。複数の場合はリストで指定。
            - その他のパラメータ...

    Returns:
        EStatResponseType: e-Stat APIからのレスポンスをパースしたデータ。

    注意:
        - "appId"パラメータは環境変数"ESTAT_APP_ID"から自動的に取得する。
        - レスポンスはJSON形式で返され、UTF-8でデコードされます。
    """

    ## リクエストパラメータにアプリケーションIDを追加。
    params = {**params, "appId": ESTAT_API_APPID}

    ## "cdCat01"パラメータが複数の場合、カンマ区切りの文字列に変換。
    if isinstance(params["cdCat01"], list):
        params["cdCat01"] = ",".join(map(str, params["cdCat01"]))

    url = ESTAT_API_ENDPOINT
    url += urllib.parse.urlencode(params)

    with urllib.request.urlopen(url) as api_response:
        return json.loads(api_response.read().decode("utf-8"))
