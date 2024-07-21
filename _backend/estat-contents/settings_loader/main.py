import glob
import json
import os
import re
import sys
from typing import List

sys.path.append("_backend")
from local_settings import initialization


def extract_strings(path):
    """pathの文字列を整形する（MacとWindowsの違い）"""
    path = path.replace("\\", "/")
    parts = path.split("/")
    parts = [part for part in parts if part]
    return parts


class SettingsLoader:
    def __init__(self):
        self.cards = glob.glob(
            "_backend/estat-contents/settings/**/*.json", recursive=True
        )

    def read_settings(self, path: str) -> dict:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
            text = re.sub(r"/\*[\s\S]*?\*/|//.*", "", text)  # コメントを削除
            configs = json.loads(text)

        path_parts = extract_strings(path)
        configs["fieldId"] = path_parts[3]
        configs["menuId"] = path_parts[4]

        return configs

    def filter_cards(self, card_type: str) -> List[str]:
        pattern = re.compile(rf"[/\\](?:{re.escape(card_type)})[/\\]", re.IGNORECASE)
        return [path for path in self.cards if pattern.search(path)]

    def get_prefecture_cards(self, menu_id: str = None) -> List[str]:
        cards = self.filter_cards("prefecture")
        if menu_id is not None:
            cards = [card for card in cards if extract_strings(card)[-3] == menu_id]
        return cards

    def get_japan_cards(self, menu_id: str = None) -> List[str]:
        cards = self.filter_cards("japan")
        if menu_id is not None:
            cards = [card for card in cards if extract_strings(card)[-3] == menu_id]
        return cards

    def get_city_cards(self, menu_id: str = None) -> List[str]:
        cards = self.filter_cards("city")
        if menu_id is not None:
            cards = [card for card in cards if extract_strings(card)[-3] == menu_id]
        return cards

    def get_prefecture_rank_cards(self, menu_id: str = None) -> List[str]:
        cards = self.filter_cards("prefecture-rank")
        if menu_id is not None:
            cards = [card for card in cards if extract_strings(card)[-3] == menu_id]
        return cards


import pprint  # noqa: E402

if __name__ == "__main__":
    initialization()  # 初期設定

    cards = SettingsLoader().get_japan_cards("total-population")
    pprint.pprint(cards)

    # card = "_backend/estat-contents/settings/safetyenvironment/traffic-accident/prefecture/traffic-accident-composed.json"

    # settings = SettingsLoader().read_settings(card)
    # pprint.pprint(settings)
