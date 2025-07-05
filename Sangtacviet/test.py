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

oridata= data['data']

str = str(oridata)
str_s = str.split("-/-")
for s in str_s:
    match = re.search(r"\b\d{2,}\b", s)
    if match:
        ids.append(match.group(0))

for id in ids:
    url = f"https://sangtacviet.vip/truyen/fanqie/1/7413755848888945726/{id}/"
    new_urls.append(url)
with open("new_url.json", "w", encoding="utf-8") as f:
    json.dump(new_urls, f, ensure_ascii=False, indent=4)