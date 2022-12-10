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

ALLURE REPORT:

    Install allure command line in machine (need to do it once per machine):
        1. Open terminal
        2. Execute below command:
            npm install -g allure-commandline --save-dev

    in wdio.conf.js:
        reporters: ['spec',['allure', 
                        {
                            outputDir: './report/allure-results',
                            disableWebdriverStepsReporting: true,
                            useCucumberStepReporter: true,
                            disableWebdriverScreenshotsReporting: false,
                        }
                    ]
                ],

    To generate Allure report:
        allure generate --clean <allure-results-path>
        eg: allure generate --clean ./reports/allure-results/

    To open allure report:
        allure open

    To Attach screenshot on failure in report:
        in wdio.conf.js:
            in reporters array, make sure to add property
                disableWebdriverScreenshotsReporting: false

            in afterStep function (under Hooks):
                afterStep: async function (step, scenario, { error, duration, passed }, context) {
                    if(error) {
                        await browser.takeScreenshot();
                    }
                },

BROWSER STACK:
    WebDriver-IO Docs:
        <https://webdriver.io/docs/browserstack-service>

    Browser Stack Docs:
    For Capabilities:
        Refer "Quick Integration Guide" or "Get Started" after login

    To Add Browser Stack Service in framework:
        npm install @wdio/browserstack-service --save-dev
    
        in wdio.conf.js:
            exports.config
                // ...
                user: 'usernameFromBrowserStack',
                key: 'accessKeyFromBrowserStack,
                ...
                ...
                ...
                services: [
                    ['browserstack', {
                        preferScenarioName: true
                    }]
                ],
                ...
                ...
                capabilities: [{
                    maxInstances: 5,
                    browserName: 'chrome',
                    'bstack:options' : {
                        "os" : "Windows",
                        "osVersion" : "8",
                    },
                    acceptInsecureCerts: true
                },
                {
                    maxInstances: 5,
                    browserName: 'firefox',
                    'bstack:options' : {
                        "os" : "Windows",
                        "osVersion" : "11",
                    },
                    acceptInsecureCerts: true
                },
                {
                    maxInstances: 5,
                    browserName: 'edge',
                    'bstack:options': {
                        os: 'Windows',
                        osVersion: '11'
                    },
                    acceptInsecureCerts: true
                }],
                ...
                ...
                ...
            ],
