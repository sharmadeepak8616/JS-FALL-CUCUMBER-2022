WebDriverIO Docs:
    https://webdriver.io/docs/api    

    Plugin for CUCUMBER AUTOCOMPLETE and SD-Link:
        Cucumber (Gherkin) Full Support

EXECUTION:
    To run all feature files:
        npx wdio wdio.conf.js

    To run a particular feature file:
        npx wdio wdio.conf.js --spec ./relative-path-of-feature-file

        eg:
        npx wdio wdio.conf.js --spec ./features/Facebook/login.feature 

AUTO-COMPLETION:
    1. Create file jsconfig.json
    2. Add below code:
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