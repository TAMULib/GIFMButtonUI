module.exports = function(config){
    config.set({

        preprocessors: {
            "app/**/*.js": "coverage",
            '**/*.html': ['ng-html2js']
        },

        reporters: ["progress", "coverage", "coveralls"],

        basePath : './',

        files : [

            'dist/appConfig.js',
            'dist/app.bundle.js',

            'tests/mocks/**/*.js',
            'tests/unit/**/*.js'

        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers: ["ChromeHeadless"],

        plugins : [
            'karma-chrome-launcher',
            "karma-coverage",
            "karma-coveralls",
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        }

    });
};
