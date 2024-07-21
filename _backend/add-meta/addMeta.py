import glob
import json
import os
import pprint
import re
import sys

from modules.gpt4 import chat_with_gpt4

sys.path.append("_backend")
from local_settings import initialization

sys.dont_write_bytecode = True


class Navigation:
    def __init__(self):
        self.data = self.load_json("src/configs/navigation.json")
        self.menus = self.extract_menus(self.data)
        self.prefectures = self.load_json("src/configs/prefList.json")

    def load_json(self, filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)

    def extract_menus(self, json_data):
        menu_list = []
        for field in json_data:
            field_id = field["fieldId"]
            field_title = field["fieldTitle"]
            for menu in field["menus"]:
                menu_id = menu["menuId"]
                menu_title = menu["menuTitle"]
                menu_list.append({"menuId": menu_id, "menuTitle": menu_title, "fieldId": field_id, "fieldTitle": field_title})
        return menu_list


class MetaGeneratorPrefecture:
    def __init__(self):
        self.menus = Navigation().menus
        self.prefectures = Navigation().prefectures

    def get_prefecture_informations(self):
        for menu in self.menus:
            menu_id = menu["menuId"]
            field_id = menu["fieldId"]
            menu_dir = f"data/cards/{field_id}/{menu_id}/prefecture/"

            cards = self.get_cards_in_menu_dir(menu_dir)
            informations = self.join_information(cards)

    def get_cards_in_menu_dir(self, menu_dir):
        cards = glob.glob(f"{menu_dir}*/card_information.json", recursive=True)
        return cards

    def join_information(self, cards):
        result = []
        for card in cards:
            with open(card, "r", encoding="utf-8") as f:
                information = json.load(f)
                result.append(
                    {
                        "cardTitle": information["cardTitle"],
                        "categories": information["categories"],
                    }
                )
        return result

    def generate_description_with_gpt4(data):
        prompt = f"""
            次のdataの内容を踏まえて、meta descriptionタグに記載できるよう、ルールに従って説明してください。

            # ルール
            - 120文字以内で説明する
            - ランキングをコロプレス地図で視覚化しますという表現を含める
            - 年次の情報は不要
            - rankが1位から3位までの都道府県の名称と値・単位を含める


            # データ
            {data}

        """
        result = chat_with_gpt4(prompt)

        return result


class MetaGeneratorPrefectureRank:
    def __init__(self):
        self.menus = Navigation().menus


def read_series(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        dataset = json.load(f)
        series = dataset[0]["series"]
        return series


def generate_description_with_gpt4(series):
    prompt = f"""
        次のデータは、全47都道府県に関する統計値を表したものです。
        このデータの概要をmeta descriptionタグに記載できるよう、ルールに従って説明してください。

        # ルール
        - 120文字以内で説明する
        - ランキングをコロプレス地図で視覚化しますという表現を含める
        - 年次の情報は不要
        - rankが1位から3位までの都道府県の名称と値・単位を含める


        # データ
        {series}

    """
    result = chat_with_gpt4(prompt)

    return result


def add_prefecture_rank_meta(cards):
    for card in cards:
        print(card)
        add_meta_to_card(card)


def create_meta_json_path(card):
    directory, _ = os.path.split(card)

    new_filename = "meta.json"

    return os.path.join(directory, new_filename)


def add_meta_to_card(card):
    with open(card, "r", encoding="utf-8") as f:
        information = json.load(f)

        latest_time_code = information["times"][0]["timeCode"]
        dir = "/".join(card.split("/")[:-1])
        dataset = f"{dir}/dataset/{latest_time_code}.json"

        series = read_series(dataset)

        description = generate_description_with_gpt4(series)

        # pprint.pprint(description)

        meta = {"description": description}

        meta_json_path = create_meta_json_path(card)

        with open(meta_json_path, "w", encoding="utf-8") as f:
            json.dump(meta, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    # initialization()  # 初期設定

    generator = MetaGeneratorPrefecture()

    cards = generator.get_prefecture_informations()

    # pprint.pprint(cards)
    # add_prefecture_rank_meta(cards)

    # card = "data/cards/landweather/total-area/prefecture-rank/total-area/card_information.json"
    # add_meta_to_card(card)

    # navigation = Navigation()

    # menus = navigation.menus
    # pprint.pprint(navigation.menus)
