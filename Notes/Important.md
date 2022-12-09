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

    To run scenarios using tagName:
        npx wdio wdio.conf.js --cucumberOpts.tagExpression '@tag1'

        eg:
        npx wdio wdio.conf.js --cucumberOpts.tagExpression '@imp'
        npx wdio wdio.conf.js --cucumberOpts.tagExpression '@login-2 or @imp'
        npx wdio wdio.conf.js --cucumberOpts.tagExpression '@login-2 and @imp'
        npx wdio wdio.conf.js --cucumberOpts.tagExpression 'not @login'

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

CROSS BROWSER TESTING:
    To install selenium-standalone service:
        npm install @wdio/selenium-standalone-service --save-dev

    To add firefox-profile-services:
        npm install @wdio/firefox-profile-service --save-dev
    
    To use selenium-standalone as services:
        in wdio.conf.js:
            service: ['selenium-standalone'],

    To run testcases in cross-browser testing:
        in wdio.conf.js:
            capabilities: [{
                maxInstances: 5,
                browserName: 'chrome',
                acceptInsecureCerts: true
            },
            {
                maxInstances: 5,
                browserName: 'firefox',
                acceptInsecureCerts: true
            }],
