import time
import json
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import os


def get_dynamic_soup(url: str) -> BeautifulSoup:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        page.wait_for_selector("h2.mainValue")
        time.sleep(2)
        soup = BeautifulSoup(page.content(), "html.parser")
        browser.close()
        return soup


def main():
    url = "https://aare.guru/#bern"
    soup = get_dynamic_soup(url)
    water_temp = soup.find_all('h2', class_='mainValue')[0].text
    air_temp = soup.find_all('h2', class_='airTemp celsius')[0].text
    quote = soup.find_all('h1', class_='chingAareText aareText')[0].text

    print(water_temp)
    print(air_temp)
    print(quote)

    fname = 'static/data.json'
    entry = {
                'timestamp': time.time(),
                "watertemp": water_temp,
                "airtemp": air_temp,
                "quote": quote
                }
    a = []
    if not os.path.isfile(fname):
        a.append(entry)
        with open(fname, mode='w') as f:
            f.write(json.dumps(a, indent=2))
    else:
        with open(fname) as feedsjson:
            feeds = json.load(feedsjson)

        feeds.append(entry)
        with open(fname, mode='w') as f:
            f.write(json.dumps(feeds, indent=2))

#     with open("src/data.csv", "a", newline="") as f:
#         current_time = time.time()
#
#         csv_writer = csv.writer(f)
#         csv_writer.writerow([current_time, water_temp, air_temp, quote])


if __name__ == '__main__':
    main()
