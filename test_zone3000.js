const  webDriver = require("selenium-webdriver");
const driver = new webDriver.Builder().forBrowser('firefox').build();
const By = webDriver.By;
const until = webDriver.until;
const assert = require('assert');
const { elementLocated } = require("selenium-webdriver/lib/until");

let incorrectEmail = 'automation+666@gmail.com',
email = 'ssls.automation+666@gmail.com',
password = '123456';


async function test_login_guest() {
    await (await driver).get('https://www.sbzend.ssls.com');
    await console.log("Open Home page URL.");

    let logInButton = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('/html/body/div[1]/div/div/header/div/div/button[1]'))), 5000);
    await console.log("Search LogIn button.");
    
    await logInButton.click();
    await console.log("Click on LogIn button.");

    await driver.sleep(500);

    let emailField = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//input[@name="email"]'))), 10000);
    await console.log("Search Email field.");

    await emailField.sendKeys(incorrectEmail);
    await console.log("Fill email field. Email: " + incorrectEmail);

    let passwordField = await driver.findElement(By.xpath('//input[@name="password"]'));
    await console.log("Search password field.");

    await passwordField.sendKeys(password);
    await console.log("Fill password field. Password: " + password);

    let showPasswordButton = await driver.findElement(By.xpath('//button[@ng-click="showPassword = !showPassword"]'));
    await console.log('Search "eye" button.');

    await showPasswordButton.click();
    await console.log('Click on "eye" button.');


    let valueInInput = driver.findElement(By.xpath('//input[@name="password"]'));
    let valueInInput_pass = await valueInInput.getAttribute('value');
    await console.log('Search open password in field.');

    await assert.equal(password, valueInInput_pass, 'Enered password not equal password in field.');
    await console.log('Check password. Found password is like sent.');

    let submmitLoginButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
    await console.log('Search Login button.');

    await submmitLoginButton.click();
    await console.log('Click on Login button.');


    let noty_message = await driver.wait(
        until.elementLocated(
            By.xpath('//div[@class="noty_text"]')),
            10000
        ).then(element => {
            return driver.wait(
                until.elementIsVisible(element),
                10000)
        }).then(element => {
            return element.getText();
        });
    await console.log('Search error message about incorrect Email or password.');

    await assert.equal('Uh oh! Email or password is incorrect', noty_message, "Message not exists or It's incorrect.");
    await console.log('Check if message is present.');
}

async function test_login_user() {
    await driver.get('https://www.sbzend.ssls.com')
    await console.log("Open Home page URL.");

    let logInButton = await driver.wait(
        until.elementLocated(
            By.xpath('/html/body/div[1]/div/div/header/div/div/button[1]'),
        10000)
    ).then(element => {
        return driver.wait(
            until.elementIsVisible(element),
            10000
        );     
    });
    await console.log("Search LogIn button.");

    await logInButton.click();
    await console.log("Click on LogIn button.");

    let emailField = await driver.wait(
        until.elementLocated(
            By.xpath('//input[@name="email"]')), 
                10000
    ).then(element => {
        return driver.wait(
            until.elementIsVisible(element), 
            10000)
    });
    await console.log("Search Email field.");

    await emailField.sendKeys(email);
    await console.log("Fill email field. Email: " + email);

    let passwordField = await driver.findElement(By.xpath('//input[@name="password"]'));
    await console.log("Search password field.");

    await passwordField.sendKeys(password);
    await console.log("Fill password field. Password: " + password);

    let showPasswordButton = await driver.findElement(By.xpath('//button[@ng-click="showPassword = !showPassword"]'));
    await console.log('Search "eye" button.');

    await showPasswordButton.click();
    await console.log('Click on "eye" button.');

    let valueInInput = driver.findElement(By.xpath('//input[@name="password"]'));
    let valueInInput_pass = await valueInInput.getAttribute('value');
    await console.log('Search open password in field.');

    await assert.equal(password, valueInInput_pass, "Enered password not equal password in field.");
    await console.log('Check password. Found password is like sent.');    

    let submmitLoginButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
    await console.log('Search Login button.');

    await submmitLoginButton.click();
    await console.log('Click on Login button.');

    let loggedButton = await driver.wait(
        until.elementLocated(
            By.xpath('/html/body/div[1]/div/div/header/div/div/div[1]/button/span'),
        10000)
    ).then(element => {
        return driver.wait(
            until.elementIsVisible(element),
            10000
        );     
    }).then(element => {
        return element.getText()
    });
    await console.log('Search Log in button that should change.');
    await console.log(loggedButton);

    await assert.equal('SSLS.AUTOMATION+666@GMAIL.COM', loggedButton, 'After login button was not change.')

};

async function test_my_profile() {
    await driver.findElement(By.xpath('/html/body/div[1]/div/div/header/div/div/div[1]/button')).click();
    await console.log("Search triangle near User@email button.");
    await console.log("Click on button.");

    let profileBtn = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[text()=" Profile"]'))));
    await console.log("Search Profile from drop menu.");
    await profileBtn.click()
    await console.log("Click on Profile.");

    let nameProfileInfo = await driver.wait(
        until.elementLocated(
            By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span')), 
                10000
    ).then(element => {
        return driver.wait(
            until.elementIsVisible(element), 
            10000)
    }).then(element => {
        return element.getText()
    });
    await console.log("Search Name field.");

    await assert.equal('Tom Ford', nameProfileInfo, "Name is not correct.");
    await console.log("Check expected text with that is Name field on page.");

    let emailProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/span')
        ).getText();
    await console.log("Search Email field.");

    await assert.equal('ssls.automation+666@gmail.com', emailProfileInfo, 'Email is not correct.');
    await console.log("Check expected text with that is Email field on page.");

    let passwordProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[3]/div[2]/span')
        ).getText();
    await console.log("Search Password field.");

    await assert.notEqual('0', passwordProfileInfo.length, "Password field is empty.");
    await console.log("Check that Password filed on page is not empty.");

    let phneProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/span')
        ).getText();
    await console.log("Search Phone field.");

    await assert.equal('+380 12312312', phneProfileInfo, 'Phone number is not correct.');
    await console.log("Check expected text with that is Phone field on page.");

    let addressProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/span')
        ).getText();
    await console.log("Search Address field.");

    await assert.equal('Diagon alley 21, Misto, Uryupinsk 612120, Ukraine', addressProfileInfo, 'Address is not correct.');
    await console.log("Check expected text with that is Address field on page.");

    let supportPinProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[6]/div[2]/span')
        ).getText();
    await console.log("Search Support pin field.");

    await assert.equal('oi3l', supportPinProfileInfo, 'Support pin is not correct or not exists.');
    await console.log("Check expected text with that is Support pin field on page.");

    let newsletterProfileInfo = await driver.findElement(
        By.xpath('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[7]/div[2]/button/span[2]/..')
        ).getAttribute('class');
    await console.log("Search Newsletter toggle.");

    await assert.notEqual('toggle-btn on', newsletterProfileInfo, 'Newsletter toggle is on, but should be off.')
    await console.log("Check that Newsletter toggle is off.");

};

(async function main() {
    await console.log("Authorization test is running. Not registered user.");
    await test_login_guest();
    await driver.sleep(1500);
    await console.log("Authorization test is done. Not registered user.");
    await console.log("_________________________________________________");
    await console.log("Authorization test is running with correct login and password.");
    await test_login_user();
    await driver.sleep(1500);
    await console.log("Authorization test with correct login and password is done.");
    await console.log("_________________________________________________");
    await console.log("Test my profile page is running.");
    await test_my_profile();
    await driver.sleep(1500);
    await console.log("Test my profile page is done.");
    driver.quit();
    await console.log("Browser is closed.");
})();