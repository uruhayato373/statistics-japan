import json
import xml.etree.ElementTree as ET
from datetime import datetime


def get_data(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def generate_urls(base_url, navigation, preflist):
    url_list = [base_url]
    for field in navigation:
        field_id = field["fieldId"]
        for menu in field["menus"]:
            menu_id = menu["menuId"]
            for card in menu["cards"]:
                card_id = card["cardId"]
                url_list.append(f"{base_url}/{field_id}/{menu_id}/prefecture-rank/{card_id}")
                for pref in preflist:
                    pref_code = pref["prefCode"]
                    url_list.append(f"{base_url}/{field_id}/{menu_id}/prefecture/{pref_code}")
    return url_list


def create_sitemap(url_list):
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    for url in url_list:
        url_element = ET.SubElement(urlset, "url")
        ET.SubElement(url_element, "loc").text = url
        ET.SubElement(url_element, "lastmod").text = datetime.now().strftime("%Y-%m-%d")
    return ET.ElementTree(element=urlset)


if __name__ == "__main__":
    base_url = "https://statistics-japan.com"
    navigation = get_data("src/configs/navigation.json")
    preflist = get_data("src/configs/prefList.json")
    url_list = generate_urls(base_url, navigation, preflist)
    sitemap = create_sitemap(url_list)
    sitemap.write("public/sitemap.xml", encoding="utf-8", xml_declaration=True)
