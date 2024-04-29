from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the Edge webdriver
driver = webdriver.Edge()

# Maximize the browser window
driver.maximize_window()

# URL of the webpage to visit
url = "http://localhost:3000"

# Navigate to the webpage
driver.get(url)

try:
    # Wait for the "My Account" button to be clickable
    my_account_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'My Account')]"))
    )
    my_account_button.click()
    time.sleep(5)

    # Wait for the "Sign Up" option to be clickable
    sign_up_option = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//li[contains(text(), 'Sign Up')]"))
    )
    sign_up_option.click()
    time.sleep(5)

    # Wait for the registration form elements to be present
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "firstName")))
    time.sleep(5)

    # Fill out the registration form
    driver.find_element(By.ID, "firstName").send_keys("John")
    time.sleep(5)
    driver.find_element(By.ID, "lastName").send_keys("Doe")
    time.sleep(5)
    driver.find_element(By.ID, "email-r").send_keys("john@example.com")
    time.sleep(5)
    driver.find_element(By.ID, "password-r").send_keys("John1+")
    time.sleep(5)
    driver.find_element(By.ID, "confirmPassword").send_keys("John1+")
    time.sleep(5)

    # Submit the registration form
    driver.find_element(By.XPATH, "//button[contains(text(), 'Registration')]").click()
    time.sleep(10)

    # Fill out the login form with the registered credentials
    driver.find_element(By.ID, "email-l").send_keys("john@example.com")
    driver.find_element(By.ID, "password-l").send_keys("John1+")
    time.sleep(10)

    # Submit the login form
    driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]").click()
    time.sleep(10)


    # Click on the button containing "John Doe" text to open the account dropdown
    john_doe_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'John Doe')]"))
    )
    john_doe_button.click()
    time.sleep(5)

    # Click on the "Account" option within the dropdown menu
    account_option = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//li[contains(text(), 'Account')]"))
    )
    account_option.click()
    time.sleep(5)

except Exception as e:
    print("An error occurred:", e)

finally:
    # Close the browser window
    driver.quit()
