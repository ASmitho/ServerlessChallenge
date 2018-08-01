from  bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By 
import time
from selenium.webdriver.common.keys import Keys

def intialize_driver():
    start_url = "http://localhost:3000/"
    driver = webdriver.Chrome()
    driver.get(start_url)
    return driver

def dashboard(driver):
	time.sleep(3)
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'squat')))
	WebDriverWait(driver, 1)
	squat = driver.find_element_by_id("squat")
	squat.send_keys("300")
	benchPress = driver.find_element_by_id("benchPress")
	benchPress.send_keys("300")
	deadlift = driver.find_element_by_id("deadlift")
	deadlift.send_keys("300")
	barbellRow = driver.find_element_by_id("barbellRow")
	barbellRow.send_keys("300")
	overheadPress = driver.find_element_by_id("overheadPress")
	overheadPress.send_keys("300")
	driver.find_element_by_id('submit').click()
	WebDriverWait(driver, 15)
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()
	time.sleep(3)
	logout(driver)

def deleteUser(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'settings')))
	driver.find_element_by_id('settings').click()
	password = driver.find_element_by_id("password")
	password.send_keys("password")
	confirmpass = driver.find_element_by_id("confirmPass")
	confirmpass.send_keys("password")
	driver.find_element_by_id('deletebutton').click()
	WebDriverWait(driver, 15)
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()

def settings(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'settings')))
	driver.find_element_by_id('settings').click()
	fullname = driver.find_element_by_id("fullname")
	fullname.clear()
	fullname.send_keys("Macho Man Randy Savage")
	password = driver.find_element_by_id("password")
	password.send_keys("password")
	confirmpass = driver.find_element_by_id("confirmPass")
	confirmpass.send_keys("password")
	age = driver.find_element_by_id("age")
	age.clear()
	age.send_keys(35)
	weight = driver.find_element_by_id("weight")
	weight.clear()
	weight.send_keys(200)
	height = driver.find_element_by_id("height")
	height.clear()
	height.send_keys("74")
	driver.find_element_by_id('updatebutton').click()
	WebDriverWait(driver, 15)
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()
	deleteUser(driver)

def login(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'login')))
	driver.find_element_by_id('login').click()
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'user_id')))
	username = driver.find_element_by_id("user_id")
	username.send_keys("NewUser")
	password = driver.find_element_by_id("password")
	password.send_keys("password")
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'loginsubmit')))
	driver.find_element_by_id('loginsubmit').click()
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()
	settings(driver)

def logout(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'logout')))
	driver.find_element_by_id('logout').click()
	login(driver)

def welcome(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'squat')))
	WebDriverWait(driver, 1)
	squat = driver.find_element_by_id("squat")
	squat.send_keys("200")
	benchPress = driver.find_element_by_id("benchPress")
	benchPress.send_keys("200")
	deadlift = driver.find_element_by_id("deadlift")
	deadlift.send_keys("200")
	barbellRow = driver.find_element_by_id("barbellRow")
	barbellRow.send_keys("200")
	overheadPress = driver.find_element_by_id("overheadPress")
	overheadPress.send_keys("200")
	driver.find_element_by_id('submit').click()
	WebDriverWait(driver, 15)
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()
	dashboard(driver)
	

def signup(driver):
	WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.ID, 'signup')))
	driver.find_element_by_id('signup').click()
	WebDriverWait(driver, 1)
	username = driver.find_element_by_id("user_id")
	username.send_keys("NewUser")
	fullname = driver.find_element_by_id("fullname")
	fullname.send_keys("Macho Man Randy Savage")
	password = driver.find_element_by_id("password")
	password.send_keys("password")
	confirmpass = driver.find_element_by_id("confirmPass")
	confirmpass.send_keys("password")
	age = driver.find_element_by_id("age")
	age.send_keys(20)
	weight = driver.find_element_by_id("weight")
	weight.send_keys(190)
	height = driver.find_element_by_id("height")
	height.send_keys("73")
	driver.find_element_by_id('submit').click()
	WebDriverWait(driver, 15)
	time.sleep(3)
	alert = driver.switch_to.alert
	alert.accept()
	welcome(driver)




driver = intialize_driver()
signup(driver)


