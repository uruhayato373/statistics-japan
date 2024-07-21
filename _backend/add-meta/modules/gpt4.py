import os
import sys

import openai
from dotenv import load_dotenv

sys.dont_write_bytecode = True

# .envファイルから環境変数を読み込む
load_dotenv()

# OpenAIのAPIキーを設定
openai.api_key = os.environ["OPEN_API_KEY"]

# 使用するGPTモデルの指定
model = "gpt-4o"


def chat_with_gpt4(prompt, temperature=0.7):
    """
    GPT-4モデルを使用してチャットの応答を生成する関数。

    Args:
        prompt (str): ユーザーからの入力プロンプト。
        temperature (float): 生成されるテキストのランダム性を制御するパラメータ。デフォルトは0.7。

    Returns:
        str: GPT-4モデルによって生成されたチャットの応答。
    """
    try:
        # OpenAI ChatCompletion APIを使用してチャットの応答を取得
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
        )

        # 応答から最初の選択肢のメッセージコンテンツを取得
        result = response.choices[0].message["content"]

    except openai.error.OpenAIError as e:
        # エラーが発生した場合はエラーメッセージを表示
        error_message = f"OpenAIError: {e}"
        result = error_message

    # 生成されたチャットの応答を返す
    return result
