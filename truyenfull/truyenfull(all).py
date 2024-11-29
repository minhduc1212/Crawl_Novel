import os
import requests
from bs4 import BeautifulSoup
import concurrent.futures

# URL của trang web
url = "https://truyenfull.vn/linh-vu-thien-ha/chuong-{}/"

# Số lần lặp để crawl dữ liệu cho các trang tiếp theo
num_of_pages = 1000

# Vòng lặp để crawl dữ liệu cho các trang tiếp theo
content = ""
def download(url, num_of_pages, content):
    for i in range(1, num_of_pages+1):
        # Tạo đường dẫn của trang tiếp theo
        next_url = url.format(i)
        
        # Gửi yêu cầu GET đến đường dẫn của trang tiếp theo
        response = requests.get(next_url)
        
        # Kiểm tra mã trạng thái của phản hồi
        if response.status_code == 200:
            # Nếu thành công, sử dụng thư viện BeautifulSoup để phân tích cú pháp HTML
            soup = BeautifulSoup(response.content, 'html.parser')

            chapter_title = soup.find('a', {'class': 'chapter-title'}).get_text()

            chapter_div = soup.find('div', {'class': 'chapter-c', 'id': 'chapter-c', 'itemprop': 'articleBody'})

            chapter_content = chapter_div.get_text(separator='\n')

            content += chapter_title + "\n" + chapter_content + "\n" + "\n"
            # Xử lý dữ liệu ở đây
            print(f"Crawled data from page {i}")
            with open("output.txt", 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            # Nếu không thành công, hiển thị thông báo lỗi
            print(f"Failed to crawl data from page {i}")
    
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    # Map các công việc download vào từng luồng
    executor.map(download(url, num_of_pages, content), range(1, num_of_pages+1))
