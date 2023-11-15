def create_list_from_txt(file_path):
    data_list = []

    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            try:
                data = line.strip()     
                data_list.append(data)

            except Exception as e:
                print(e)
                print("Error at line: ", line)
                continue
    return data_list

# Sử dụng ví dụ
file_path = 'chivi.txt'  # Đường dẫn đến file văn bản
data_list = create_list_from_txt(file_path)

# nếu có 2 data giống nhau thì xóa đi 1
data_list = list(set(data_list))

new_data_list = []

for item in data_list:
    # Kiểm tra xem phần tử đã tồn tại trong danh sách mới chưa
    if item not in new_data_list:
        new_data_list.append(item)
        print("Đã Thêm: ", str(item))
    else:
        print("Đã Xóa: ", str(item))
        continue
with open('chivi_new.txt', 'w', encoding="utf-8") as f:
    for item in new_data_list:
        f.write(item)
        f.write('\n')

