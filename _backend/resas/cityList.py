import json
import os
import pprint
import requests

from dotenv import load_dotenv

# 環境変数からAPIキーを取得
load_dotenv()

resas_api_key = os.environ["RESAS_API_KEY"]

# APIエンドポイントURLとヘッダー
url = "https://opendata.resas-portal.go.jp/api/v1/cities"
headers = {"X-API-KEY": resas_api_key}


def get_citylist(prefCode=None, dataframe=False):
    # クエリ文字列をパラメータとして追加
    params = {}
    if prefCode is not None:
        params["prefCode"] = prefCode

    # GETリクエストを送信
    response = requests.get(url, params=params, headers=headers)

    return response.json()["result"]

def get_init_cities():
    city_list = get_citylist()
    pref_list = list({city["prefCode"]: city for city in city_list}.values())

    result = []
    for pref in pref_list:
        init_city = next((city for city in city_list if city["prefCode"] == pref["prefCode"]), None)

        result.append(init_city)

    return result




if __name__ == "__main__":
    # get_citylist関数を使用して市区町村一覧を取得
    city_list = get_citylist()

    with open("city_list.json", "w") as file:
        json.dump(city_list, file, indent=4, ensure_ascii=False)

    init_cities = get_init_cities()

    with open("init_cities.json", "w") as file:
        json.dump(init_cities, file, indent=4, ensure_ascii=False)