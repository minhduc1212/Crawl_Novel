import requests
from bs4 import BeautifulSoup

url = 'https://truyenhdx.com/truyen/thau-huong-cao-thu-dich-edit/#dsc'

# Set the page number to 2
page_number = 2

# Set the necessary POST parameters
data = {
    'action': 'madara_load_more',
    'page': str(page_number),
    'template': 'madara-core/content/content-archive',
}

# Send the POST request
r = requests.post(url, data=data)

# Print the response status code
print(r.status_code)

# Parse the response content using BeautifulSoup
soup = BeautifulSoup(r.content, 'html.parser')
with open('q1.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

# Extract the desired information from the parsed HTML
# (e.g., retrieve specific elements or data from the page)

# Further processing of the extracted information