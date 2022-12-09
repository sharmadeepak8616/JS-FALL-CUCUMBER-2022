1. Create a new repo in github
2. Clone the new repo in local
3. Go in to the new repo in local
4. Create new branch
5. Checkout on the new-branch
6. Create node project
    Command: npm init –y
7. Install WebDriver-IO cli
    Command: npm install @wdio/cli
8. Set up wdio config file
    Command: npx wdio config
Above command will ask few questions, ans them as below
    ? Where is your automation backend located? On my local machine
    ? Which framework do you want to use? cucumber
    ? Do you want to use a compiler? No!
    ? Where are your feature files located? ./features/**/*.feature
    ? Where are your step definitions located? ./features/step-definitions/steps.js
    ? Do you want WebdriverIO to autogenerate some test files? No
    ? Which reporter do you want to use? allure
    ? Do you want to add a plugin to your test setup?
    ? Do you want to add a service to your test setup? chromedriver
    ? What is the base url? <https://www.facebook.com>
    ? Do you want me to run `npm install` Yes

9. Install chai
    Command: npm install chai
10. Install moment
    Command: npm install moment
11. In project folder: Create folder (name: features)
12. In features folder: Create folder (name: Facebook)
13. In Facebook folder: Create feature file (name: login.feature)

14. In project folder: Create folder (name: step-definitions)
15. In step-definitions folder: Create folder (name: Facebook)
16. In Facebook folder: Create js file (name: loginSD.js)

17. In package.json Update chromedriver version based on installed chrome. ("chromedriver": "^107.0.3",)
18. If you change package.json, perform -> npm install in project folder

19. Change step-definitions path in wdio.conf.js file (require: ['./step-definitions/**/*.js'],)

20. Add "Cucumber (Gherkin) Full Support" extension in VS-code

21 In project folder: Create file jsconfig.json
22. Add below code:
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/cucumber-framework"
        ]
    },
    "exclude": [
        "node_modules"
    ]
}
