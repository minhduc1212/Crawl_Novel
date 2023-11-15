import json

new_data = []
with open ("url.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for url in data:
    elements = url.split("/")

    new_url = 'https://sangtacviet.vip/truyen/sfacg/1/520263/' + elements[-2] 
    new_data.append(new_url)

with open ("new_url.json", "w", encoding="utf-8") as f:
        json.dump(new_data, f, ensure_ascii=False)
