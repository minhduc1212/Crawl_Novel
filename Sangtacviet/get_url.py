import json
import re

ids = []
new_urls = []
with open("url.json", "r", encoding="utf-8") as f:
    data = json.load(f)
with open("url.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
with open("url.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    urls= data['data']

    urls = str(urls)
    urls = urls.replace("-", "")

    pattern = r"/(.*?)/"
    matches = re.findall(pattern, urls)
    if matches:
        for match in matches:
            if match != '':
                ids.append(match)
    else:
        print("Không tìm thấy đoạn văn bản phù hợp.")
for id in ids:
    url = f"https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/{id}/"
    new_urls.append(url)
with open("new_url.json", "w", encoding="utf-8") as f:
    json.dump(new_urls, f, ensure_ascii=False, indent=4)