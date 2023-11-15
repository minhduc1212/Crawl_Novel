from unidecode import unidecode
import time
import json

# tính thời gian thựuc hiện code
start_time = time.time()
file="yousuu_new.txt"
search_term = 'tri bac du'

def remove_accents(text):
    return unidecode(text)

def search_words(word_list, search_term):
    matching_words = []
    for word in word_list:
        if remove_accents(search_term.lower()) in remove_accents(word.lower()):
            matching_words.append(word)
    return matching_words

data_list = []

with open(file, 'r', encoding='utf-8') as file:
    for line in file:
            data = line.strip()     
            data_list.append(data)

matching_results = search_words(data_list, search_term)

print("Kết quả tìm kiếm:")
for word in matching_results:
    print(word)

# tính thời gian thực hiện code
end_time = time.time()
print("Thời gian thực hiện: ", end_time - start_time)