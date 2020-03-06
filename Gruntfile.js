module.exports = function (grunt) {

	// Configurable paths
	var build = {
			app: 'app',
			templates: 'src/main/resources/templates'
	};


	grunt.initConfig({

			// Project settings
			build: build,

			symlink: {
					options: {
							overwrite: true,
							force: true
					},
					explicit: {
							src: 'node_modules',
							dest: 'app/node_modules'
					}
			},

			jshint: {
					options: {
							jshintrc: '.jshintrc',
							reporter: require('jshint-stylish')
					},
					all: [
							'Gruntfile.js',
							'<%= build.app %>/**/*.js',
							'node_modules/@wvr/core/**/*',
							'node_modules/@wvr/core/components/**/*',
							'node_modules/@wvr/core/resources/**/*',
							'!node_modules/**/*',
							'!<%= build.app %>/node_modules/**/*',
							'!<%= build.app %>/components/**/*',
							'!<%= build.app %>/resources/**/*'
					]
			},

			concat: {
					options: {
							separator: ';',
							sourceMap: false
					},
					vendor: {
							src: [
									'node_modules/jquery/dist/jquery.min.js',
									'node_modules/bootstrap/dist/js/bootstrap.min.js',

									'node_modules/sockjs-client/dist/sockjs.min.js',
									'node_modules/stompjs/lib/stomp.min.js',

									'node_modules/angular/angular.min.js',

									'node_modules/angular-route/angular-route.min.js',
									'node_modules/angular-loader/angular-loader.min.js',
									'node_modules/angular-sanitize/angular-sanitize.min.js',
									'node_modules/angular-messages/angular-messages.min.js',
									'node_modules/angular-mocks/angular-mocks.js',

									'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
									'node_modules/ng-file-upload/dist/ng-file-upload.min.js',

									'node_modules/ng-table/bundles/ng-table.min.js',

									'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
							],
							dest: '<%= build.app %>/resources/scripts/vendor_concat.js'
					},
					core: {
							src: [
									'node_modules/@wvr/core/app/config/coreConfig.js',

									'node_modules/@wvr/core/app/components/version/version.js',
									'node_modules/@wvr/core/app/components/version/version-directive.js',
									'node_modules/@wvr/core/app/components/version/interpolate-filter.js',

									'<%= build.app %>/config/appConfig.js',
									'<%= build.app %>/config/apiMapping.js',

									'<%= build.app %>/components/version/version.js',
									'<%= build.app %>/components/version/version-directive.js',
									'<%= build.app %>/components/version/interpolate-filter.js',

									'node_modules/@wvr/core/app/core.js',
									'node_modules/@wvr/core/app/setup.js',
									'node_modules/@wvr/core/app/config/coreRuntime.js',
									'node_modules/@wvr/core/app/config/coreAngularConfig.js',
									'node_modules/@wvr/core/app/config/logging.js',

									'node_modules/@wvr/core/app/constants/apiResponseActions.js',
									'node_modules/@wvr/core/app/constants/httpMethodVerbs.js',

									'node_modules/@wvr/core/app/directives/headerDirective.js',
									'node_modules/@wvr/core/app/directives/footerDirective.js',
									'node_modules/@wvr/core/app/directives/userDirective.js',
									'node_modules/@wvr/core/app/directives/modalDirective.js',
									'node_modules/@wvr/core/app/directives/alertDirective.js',
									'node_modules/@wvr/core/app/directives/accordionDirective.js',
									'node_modules/@wvr/core/app/directives/tabsDirective.js',
									'node_modules/@wvr/core/app/directives/tooltipDirective.js',
									'node_modules/@wvr/core/app/directives/validationMessageDirective.js',
									'node_modules/@wvr/core/app/directives/validatedInputDirective.js',
									'node_modules/@wvr/core/app/directives/validatedSelectDirective.js',
									'node_modules/@wvr/core/app/directives/validatedTextAreaDirective.js',

									'node_modules/@wvr/core/app/services/accessControlService.js',
									'node_modules/@wvr/core/app/services/wsService.js',
									'node_modules/@wvr/core/app/services/wsApi.js',
									'node_modules/@wvr/core/app/services/restApi.js',
									'node_modules/@wvr/core/app/services/authService.js',
									'node_modules/@wvr/core/app/services/storageService.js',
									'node_modules/@wvr/core/app/services/utilityService.js',
									'node_modules/@wvr/core/app/services/alertService.js',
									'node_modules/@wvr/core/app/services/validationStore.js',
									'node_modules/@wvr/core/app/services/userService.js',
									'node_modules/@wvr/core/app/services/modalService.js',
									'node_modules/@wvr/core/app/services/modelCache.js',
									'node_modules/@wvr/core/app/services/modelUpdateService.js',

									'node_modules/@wvr/core/app/repo/abstractRepo.js',

									'node_modules/@wvr/core/app/model/abstractModel.js',
									'node_modules/@wvr/core/app/model/assumedControl.js',
									'node_modules/@wvr/core/app/model/user.js',

									'node_modules/@wvr/core/app/controllers/abstractController.js',
									'node_modules/@wvr/core/app/controllers/coreAdminController.js',
									'node_modules/@wvr/core/app/controllers/authenticationController.js',
									'node_modules/@wvr/core/app/controllers/loginController.js',
									'node_modules/@wvr/core/app/controllers/registrationController.js',
									'node_modules/@wvr/core/app/controllers/userController.js',
									'node_modules/@wvr/core/app/controllers/errorPageController.js',
							],
							dest: '<%= build.app %>/resources/scripts/core_concat.js'
					},
					app: {
							src: [
									'<%= build.app %>/**/*.js',
									'!<%= build.app %>/config/appConfig.js',
									'!<%= build.app %>/config/apiMapping.js',
									'!<%= build.app %>/resources/**/*',
									'!<%= build.app %>/components/**/*'
							],
							dest: '<%= build.app %>/resources/scripts/app_concat.js'
					},
					bundle: {
							src: [
									'<%= build.app %>/resources/scripts/vendor_concat.js',
									'<%= build.app %>/resources/scripts/core_concat.js',
									'<%= build.app %>/resources/scripts/app_concat.js'
							],
							dest: '<%= build.app %>/resources/scripts/bundle.js'
					}
			},

			uglify: {
					options: {
							mangle: false
					},
					bundle: {
							src: '<%= build.app %>/resources/scripts/bundle.js',
							dest: '<%= build.app %>/resources/scripts/bundle.js'
					}
			},

			usemin: {
					html: '<%= build.templates %>/index.html',
					options: {
							assetsDirs: ['<%= build.app %>/resources/scripts']
					}
			},

			clean: {
					development: [
							'<%= build.app %>/node_modules'
					],
					production: {
							folder: [
									'<%= build.app %>/node_modules'
							]
					}
			},

			sass: {
					options: {
							sourceMap: false,
							implementation: require('node-sass')
					},
					dist: {
							files: [{
									expand: true,
									cwd: 'app/resources/styles/sass',
									src: ['*.scss'],
									dest: 'app/resources/styles',
									ext: '.css'
							}]
					}
			},

			watch: {
					css: {
							files: '**/*.scss',
							tasks: ['sass']
					}
			}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-symlink');

	grunt.registerTask('default', ['sass', 'symlink']);

	grunt.registerTask('watch', ['watch']);

	grunt.registerTask('deploy', ['jshint', 'concat', 'uglify', 'usemin', 'sass', 'symlink']);

};