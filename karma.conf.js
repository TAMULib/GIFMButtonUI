module.exports = function(config){
    config.set({

        preprocessors: {
            "app/!(node_modules)/**/*.js": "coverage"
        },
          reporters: ["progress", "coverage"],

        basePath : './',

        files : [

            'app/config/appConfig_sample.js',
            'app/config/apiMapping.js',

            'app/node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',

            'node_modules/sockjs-client/dist/sockjs.min.js',
            'node_modules/stompjs/lib/stomp.min.js',

            'app/node_modules/angular/angular.js',

            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-loader/angular-loader.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-messages/angular-messages.min.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'app/node_modules/ng-table/bundles/ng-table.min.js',

            'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
            'node_modules/ng-file-upload/dist/ng-file-upload.min.js',

            'node_modules/ng-table/bundles/ng-table.min.js',

            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',

            'app/node_modules/@wvr/core/app/config/coreConfig.js',

            'app/node_modules/@wvr/core/app/components/**/*.js',

            'app/node_modules/@wvr/core/app/core.js',

            'app/node_modules/@wvr/core/app/**/*.js',


            'app/components/**/*.js',

            'tests/testSetup.js',

            'app/app.js',

            'app/config/runTime.js',

            'app/controllers/**/*.js',

            'app/model/**/*.js',

            'tests/mocks/**/*.js',

            'tests/unit/**/*.js'

        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers: ["Chrome", "ChromeHeadless", "ChromeHeadlessNoSandbox", "Firefox"],

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox"]
            }
        },

        plugins : [
            'karma-chrome-launcher',
            "karma-coverage",
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        }

    });
};