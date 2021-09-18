# used Tutor from this website to scrape data from dynamic websites:
# https://www.notion.so/Recommand-Algorithms-da42b30bef4c4cd5a09db9e912cbce16
import os
<<<<<<< HEAD
import json
import pandas as pd
=======
import pandas as pd
import json
>>>>>>> c3081a9421fedf6c30620c37c543cec4874d132c
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from collections import defaultdict


def menu_scraping():
    # Instantiate an Options object and tell the browser to run in a headless mode
    opts = Options()
    opts.add_argument(" --headless")

    # Set the path to the Google Chrome browser
    chrome_driver = os.getcwd() + "\\chromedriver.exe"

    # Set the path to the Chrome webdriver
    driver = webdriver.Chrome(options=opts, executable_path=chrome_driver)

    # Load the dining menu pages on Rice website
    urls = ['https://dining.rice.edu/baker-college-kitchen/full-week-menu',
            'https://dining.rice.edu/north-servery/full-week-menu',
            'https://dining.rice.edu/seibel-servery/full-week-menu',
            'https://dining.rice.edu/south-servery/full-week-menu',
            'https://dining.rice.edu/west-servery/full-week-menu']

    menu = defaultdict(lambda: defaultdict(lambda: defaultdict()))
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    serveries = ['Baker Kitchen', 'North Servery', 'Seibel Servery', 'South Servery', 'West Servery']

    for index in range(5):
        driver.get(urls[index])

        # Put the source into a variable and create a BS object from it
        soup_file = driver.page_source
        soup = BeautifulSoup(soup_file, 'lxml')

        # Extract menu info in the form of seperated days
        all_days = soup.find_all('div', {'class': 'item'})
        day_menu_raw = []
        for day in all_days:
            day_menu_raw.append(day.get_text())

        # Extract menu info in the form of seperated dishes
        menu_raw = soup.find_all('div', {'class': 'mitem'})
        discrete_menu = []
        for dish in menu_raw:
            discrete_menu.append(dish.get_text())

        lunch_days_meals = day_menu_raw[0:7]
        dinner_days_meals = day_menu_raw[8:15]

        j = 0
        for i in range(7):
            lunch_day_meal = lunch_days_meals[i]
            menu[days[i]][serveries[index]]['lunch'] = []
            # assume that the dishes for lunch in different serveries in a day are all different
            while discrete_menu[j] in lunch_day_meal:
                menu[days[i]][serveries[index]]['lunch'].append(discrete_menu[j])
                j += 1

        for i in range(7):
            dinner_day_meal = dinner_days_meals[i]
            menu[days[i]][serveries[index]]['dinner'] = []
            # assume that the dishes for dinner in different serveries in a day are all different
            while j < len(discrete_menu) and discrete_menu[j] in dinner_day_meal:
                menu[days[i]][serveries[index]]['dinner'].append(discrete_menu[j])
                j += 1
    return menu

menu = menu_scraping()

def data_frame(menu):
    d = {'foodName': [], 'date': [], 'isLunch': [], 'place': []}
    data_set = pd.DataFrame(data=d)

    for key1 in menu.keys():
        for key2 in menu[key1].keys():
            for key3 in menu[key1][key2].keys():
                for item in menu[key1][key2][key3]:
                    df2 = pd.DataFrame([[item, key1, key3, key2]], columns=['foodName', 'date', 'isLunch', 'place'])
                    data_set=pd.concat([data_set, df2], ignore_index=True)
    result = data_set.to_json(orient="split")
    print(result)

data_frame(menu)
