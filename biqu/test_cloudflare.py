import cloudscraper

scraper = cloudscraper.create_scraper(disableCloudflareV1=True)
url=('https://nowsecure.nl')
r=scraper.get(url)
print(r.status_code)
