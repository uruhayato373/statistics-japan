import json
import sys

sys.path.append("_backend/estat-contents")
from estat_api_formatter.modules import ValueType

PREF_LIST_PATH = "_backend/resas/result/pref_list.json"
CITY_LIST_PATH = "_backend/resas/result/city_list.json"

import pprint


def filter_prefecture_values(values: ValueType):
    with open(PREF_LIST_PATH) as f:
        pref_list = json.load(f)

    with open(CITY_LIST_PATH) as f:
        city_list = json.load(f)

    result = []

    for pref in pref_list:
        cities = [city for city in city_list if city["prefCode"] == pref["prefCode"]]

        filterd_values = [
            value
            for value in values
            if value["areaCode"] in [city["cityCode"] for city in cities]
        ]

        result.append({
            "prefCode": pref["prefCode"],
            "prefName": pref["prefName"],
            "values": filterd_values,

        })

        pprint.pprint(cities)

    return pref_list
