import os
import sys

from dotenv import load_dotenv

# __pychace__を作成しない
sys.dont_write_bytecode = True

# .envファイルから環境変数を読み込む
load_dotenv()


def initialization():
    # ディレクトリを取得
    current_dir = os.getcwd()

    # 職場環境の場合はPROXY設定を追加
    if "m004195" in current_dir:
        os.environ["http_proxy"] = os.environ["PROXY"]
        os.environ["https_proxy"] = os.environ["PROXY"]

    return
