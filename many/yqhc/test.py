# Sử dụng thư viện urllib.parse để thao tác với URL
from urllib.parse import urljoin

# URL ban đầu
original_url = "http://www.yqhc.org/book/74689/35616675.html"

# Thêm "_2" vào URL
new_url = urljoin(original_url, "_2.html")

print(new_url)