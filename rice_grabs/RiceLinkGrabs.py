# used Tutor from this website to scrape data from dynamic websites:
# https://www.notion.so/Recommand-Algorithms-da42b30bef4c4cd5a09db9e912cbce16
import os
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from collections import defaultdict


def menu_scraping():
    '''
    This Function scrapes all dining information from dining.rice.edu and constructs
    a readable general menu.
    :return: menu, a nested dictionary of dishes
    :return: menu_dishes, a list of string representing names for all the dishes in one week
    '''
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
    menu_dishes = []
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
            menu_dishes.append(dish.get_text())

        # Separate the days-based menu data into lunch data and dinner data
        lunch_days_meals = day_menu_raw[0:7]
        dinner_days_meals = day_menu_raw[8:15]

        # Construct the general menu
        j = 0
        for i in range(7):
            # menu for lunch
            lunch_day_meal = lunch_days_meals[i]
            menu[days[i]]['lunch'][serveries[index]] = []
            # assume that the dishes for lunch in different serveries in a day are all different
            while discrete_menu[j] in lunch_day_meal:
                menu[days[i]]['lunch'][serveries[index]].append(discrete_menu[j])
                j += 1

        for i in range(7):
            # menu for dinner
            dinner_day_meal = dinner_days_meals[i]
            menu[days[i]]['dinner'][serveries[index]] = []
            # assume that the dishes for dinner in different serveries in a day are all different
            while j < len(discrete_menu) and discrete_menu[j] in dinner_day_meal:
                menu[days[i]]['dinner'][serveries[index]].append(discrete_menu[j])
                j += 1
    return (menu, menu_dishes)


def general_menu_json(menu):
    '''
    Convert the Python dictionary into a json file.
    :param menu: the inputted nested Python dictionary.
    :return: a json file of the inputted dictionary.
    '''
    menu_json = json.dumps(menu, indent=1)
    with open('menu_json', 'w') as json_file:
        json_file.write(menu_json)
    json_file.close()


def food_sort(menu_dishes, ingredients, flavors, allergies, soups):
    '''
    Sort through all the dishes with set attributions. Assign those attributions to all dishes.
    :param menu_dishes: a list of strings containing all the dishes
    :return: dishes_raw, a dictionary containing dishes with their correspondent attributes.
    '''

    # iterate over menu_dishes to classify them
    dishes_raw = defaultdict()
    num_dishes = len(menu_dishes)
    for i in range(num_dishes):
        dish1 = menu_dishes[i]
        dish1_attr = {'Ingredient': [], 'Flavor': [], 'Allergies': [], 'Soup': False}
        # iterate over ingredients
        for attr1 in ingredients:
            for ingre in ingredients[attr1]:
                if ingre in dish1:
                    dish1_attr['Ingredient'].append(ingre)
        # iterate over flavors
        for attr2 in flavors:
            if attr2 in dish1:
                dish1_attr['Flavor'].append(attr2)
        # iterate over allergies
        for ingre2 in allergies:
            if ingre2 in dish1:
                dish1_attr['Allergies'].append(ingre2)
        # iterate over soups
        for attr3 in soups:
            if attr3 in dish1:
                dish1_attr['Soup'] = True
        dishes_raw[dish1] = dish1_attr
    return dishes_raw


def dish_identifier(dishes_raw, menu_dishes, ingredients):
    '''
    check for repetitive dishes and assign Food ID to different dishes.
    :param dishes_raw: a dictionary of dishes and their attributes
    :param menu_dishes: a list of strings representing the dish names
    :param ingredients: a dictionary of strings
    :return: id_dishes, a dictionary of dishes with assigned FoodID as keys.
    :return: id_lists, a dictionary with dishes as keys and assigned ID as values
    '''
    # initial settings
    id_dishes = defaultdict(lambda: (defaultdict()))
    id_lists = {}
    id_count = 1
    has_id = {}
    for dish in menu_dishes:
        has_id[dish] = False
    # iterate over dishes_raw to find repetitive dishes
    for i in range(len(menu_dishes)):
        dish1 = menu_dishes[i]
        if has_id[dish1] == False:
            id_dishes[id_count]['dish'] = dish1
            id_dishes[id_count] = dishes_raw[dish1]
            id_lists[dish1] = id_count
            has_id[dish1] = True
            j = i + 1
            while j < len(menu_dishes):
                dish2 = menu_dishes[j]
                if has_id[dish2] == False:
                    if dishes_raw[dish1]['Soup'] != dishes_raw[dish2]['Soup']:
                        j += 1
                        continue
                    elif dishes_raw[dish1]['Allergies'] != dishes_raw[dish2]['Allergies']:
                        j += 1
                        continue
                    elif dishes_raw[dish1]['Flavor'] != dishes_raw[dish2]['Flavor']:
                        j += 1
                        continue
                    elif dishes_raw[dish1]['Flavor'] == [] and dishes_raw[dish2]['Flavor'] == []:
                        j += 1
                        continue
                    else:
                        if len(dishes_raw[dish1]['Ingredient']) != len(dishes_raw[dish2]['Ingredient']):
                            j += 1
                            continue
                        elif dishes_raw[dish1]['Ingredient'] != [] and dishes_raw[dish2]['Ingredient'] != []:
                            for item1 in dishes_raw[dish1]['Ingredient']:
                                for item2 in dishes_raw[dish2]['Ingredient']:
                                    if item1 in ingredients['meat'] and item1 == item2:
                                        id_dishes[id_count]['dish'] = dish2
                                        id_dishes[id_count] = dishes_raw[dish2]
                                        id_lists[dish2] = id_count
                                        has_id[dish2] == True
                                    elif item1 in ingredients['staple'] and item1 == item2:
                                        id_dishes[id_count]['dish'] = dish2
                                        id_dishes[id_count] = dishes_raw[dish2]
                                        id_lists[dish2] = id_count
                                        has_id[dish2] == True
                                    elif item1 in ingredients['seafood'] and item2 in ingredients['seafood']:
                                        if item1 == item2:
                                            id_dishes[id_count]['dish'] = dish2
                                            id_dishes[id_count] = dishes_raw[dish2]
                                            id_lists[dish2] = id_count
                                            has_id[dish2] == True
                                        elif item1 != 'Shrimp' and item2 != 'Shrimp':
                                            id_dishes[id_count]['dish'] = dish2
                                            id_dishes[id_count] = dishes_raw[dish2]
                                            id_lists[dish2] = id_count
                                            has_id[dish2] == True

                j += 1
            id_count += 1
    return (id_dishes, id_lists)


def menu_identifier(menu, id_lists):
    id_menu = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: [])))
    for key1 in menu.keys():
        for key2 in menu[key1].keys():
            for key3 in menu[key1][key2].keys():
                for item in menu[key1][key2][key3]:
                    id_menu[key1][key2][key3].append(id_lists[item])
    return id_menu


def identity_json(id_dishes, id_menu):
    id_dish_file = json.dumps(id_dishes, indent=1)
    with open("id_data.json", 'w') as json_file:
        json_file.write(id_dish_file)
    json_file.close()
    id_menu_file = json.dumps(id_menu, indent=1)
    with open("id_data.json", 'a') as json_file:
        json_file.write(id_menu_file)
    json_file.close()


def menu_update():
    pass


(menu, menu_dishes) = menu_scraping()
# set attributes for food sort
ingredients = {'vegetable': ['Mushroom', 'Broccoli', 'Corn', 'Tofu', 'Spinach', 'Potato', 'Tomato', 'Red Pepper',
                             'Onion', 'Green Beans', 'Cauliflower', 'Carrot', 'Eggplant', 'Vegetable'],
               'meat': ['Beef', 'Chicken', 'Pork', 'Sausage'],
               'seafood': ['Fillet', 'Cod', 'Fish', 'Shrimp', 'Tilapia'],
               'staple': ['Rice', 'Pasta', 'Spaghetti', 'Pizza']}
flavors = ['Spicy', 'Spiced', 'Garlic', 'Ginger', 'Vinaigrette', 'Sweet', 'Sour', 'BBQ', 'Aioli',
           'Smoked', 'Curry', 'Cream', 'Cheese', 'Thai', 'Italian', 'Korean']
allergies = ['Shrimp', 'Peanut']
soups = ['Chowder', 'Soup']

dishes_raw = food_sort(menu_dishes, ingredients, flavors, allergies, soups)
(id_dishes, id_lists) = dish_identifier(dishes_raw, menu_dishes, ingredients)
id_menu = menu_identifier(menu, id_lists)
identity_json(id_dishes, id_menu)
