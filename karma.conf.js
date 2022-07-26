module.exports = function(config){
    config.set({

        preprocessors: {
            "app/**/*.js": "coverage",
            '**/*.html': ['ng-html2js']
        },

        reporters: ["progress", "coverage", "coveralls"],

        basePath : './',

        files : [
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
