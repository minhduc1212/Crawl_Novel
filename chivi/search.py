from unidecode import unidecode
import time

# tính thời gian thực hiện code
start_time = time.time()
file = "chivi.txt"
search_term = 'tri bac du'

def remove_accents(text):
    return unidecode(text)

def kmp_search(pattern, text):
    m = len(pattern)
    n = len(text)

    # Tạo mảng lps để lưu trữ thông tin về các độ dài tiền tố và hậu tố dài nhất của pattern
    lps = [0] * m
    compute_lps_array(pattern, m, lps)

    i = 0  # Vị trí hiện tại trong text
    j = 0  # Vị trí hiện tại trong pattern
    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1
            if j == m:
                return True  # Tìm thấy pattern trong text
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return False  # Không tìm thấy pattern trong text

def compute_lps_array(pattern, m, lps):
    length = 0
    i = 1
    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

data_list = []

with open(file, 'r', encoding='utf-8') as f:
    for line in f:
        data = line.strip()
        data_list.append(data)

matching_results = []
for word in data_list:
    if kmp_search(remove_accents(search_term.lower()), remove_accents(word.lower())):
        matching_results.append(word)

print("Kết quả tìm kiếm:")
for word in matching_results:
    print(word)

# tính thời gian thực hiện code
end_time = time.time()
print("Thời gian thực hiện: ", end_time - start_time)