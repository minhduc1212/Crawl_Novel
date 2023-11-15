import json
data_list = []
with open("chivi_new.txt", 'r', encoding='utf-8') as file:
    for line in file:
        data = line.strip()     
        #save data to json
        data = {
            'comic_name': data,
        }
        data_list.append(data)
with open('chivi.json', 'a', encoding='utf-8') as f:
    json.dump(data_list, f, ensure_ascii=False, indent=4)
    f.write('\n')