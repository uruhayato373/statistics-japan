import sys
import os
import json

sys.dont_write_bytecode = True

from settings_loader import SettingsLoader  # noqa: E402

sys.path.append("_backend")
from local_settings import initialization  # noqa: E402

sys.path.append("_backend/estat-contents")
from estat_api_formatter.modules import CategoryType  # noqa: E402
from document_processer.main import PrefectureDocumentProcessorClass  # noqa: E402


class PrefectureDocument:
    """
    クラス:
        PrefectureDocument: 都道府県別データの処理と保存を行うクラス

    主な機能:
        - 設定ファイルからデータを読み込む
        - データを時間別、地域別にフィルタリングする
        - 処理したデータをJSON形式で保存する
    """

    def __init__(self, path: str):
        self.settings = SettingsLoader().read_settings(path)
        self.categories: list[CategoryType] = self.settings["categories"]
        self.documentId: str = self.settings["documentId"]
        self.document = {
            "documentTitle": self.settings["documentTitle"],
            "documentId": self.settings["documentId"],
            **PrefectureDocumentProcessorClass(self.categories).result,
        }
        self.dir = self._create_directory()

    def _create_directory(self) -> tuple:
        dir = f"src/data/documents/{self.settings['fieldId']}/{self.settings['menuId']}/prefecture/{self.documentId}"
        os.makedirs(dir, exist_ok=True)
        return dir

    def _area_filtered_document(self):
        """
        地域別にフィルタリングされたドキュメントのリストを生成する

        Returns:
            list: 地域別にフィルタリングされたドキュメントのリスト

        フィルタリング処理:
        - ドキュメント内の各地域に対してループ
        - 各地域に対応する値のみを抽出
        """
        return [
            {
                **self.document,
                "area": area,
                "values": [
                    value
                    for value in self.document["values"]
                    if value["areaCode"] == area["areaCode"]
                ],
            }
            for area in self.document["areas"]
        ]

    def save_area_filtered(self) -> None:
        for document in self._area_filtered_document():
            filename = f"{document['area']['areaCode']}.json"
            with open(f"{self.dir}/{filename}", "w") as f:
                json.dump(document, f, indent=2, ensure_ascii=False)

    def save(self) -> None:
        self.save_area_filtered()


if __name__ == "__main__":
    initialization()  # 初期設定

    cards = SettingsLoader().get_prefecture_cards("traffic-accident")

    for card in cards:
        print(f"{card}の処理中...")
        PrefectureDocument(card).save()
        print(f"{card}の処理完了")
