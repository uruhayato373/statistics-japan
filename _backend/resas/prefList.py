import json
import os
import requests
from dotenv import load_dotenv

load_dotenv(verbose=True)
resas_api_key = os.environ["RESAS_API_KEY"]
proxy = os.environ.get("PROXY")

def get_preflist():
    # APIエンドポイントURLとヘッダー
    url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    headers = {"X-API-KEY": resas_api_key}

    # HTTP GETリクエストをAPIに送信し、レスポンスを取得する
    response = requests.get(url, headers=headers, proxies={"http": proxy, "https": proxy})

    return response.json()["result"]


def save_preflist():
    ## 現在のディレクトリを取得
    file_path = __file__
    directory = os.path.dirname(file_path)

    ## 保存先のディレクトリを作成
    save_dir = f"{directory}/result"
    os.makedirs(save_dir, exist_ok=True)

    # jsonに保存
    pref_list = get_preflist()
    with open(f"{save_dir}/pref_list.json", "w") as file:
        json.dump(pref_list, file, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    save_preflist()

    pref_list = get_preflist()
