exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost/weaver-ui-seed/',
	specs: [
		'index-spec.js',
		'auth-spec.js',
		'users-spec.js',
		'theme-spec.js'
	],
	rootElement : 'body',
	multiCapabilities: [{
		browserName: 'chrome',
		shardTestFiles: true,
    	maxInstances: 1
	},
	{
		browserName: 'firefox',
		shardTestFiles: true,
    	maxInstances: 1
	}],
	params: {
		admin: {
			username: '',
			password: '',
			uin: ''
		},
		user: {
			username: '',
			password: '',
			uin: ''
		}
	}
};
