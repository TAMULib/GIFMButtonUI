// CONVENTION: must match model name, case sensitive
var apiMapping = {
	Theme: {
		all: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'all'
		},
		listen: {
			'endpoint': '/channel',
			'controller': 'theme'
		},
		create: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'add-theme'
		},
		remove: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'remove-theme'
		},
		activate: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'activate-theme'
		},
		update: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'update'
		},
		updateThemeProperty: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'update-property'
		}
	},
	User: {
		lazy: true,
		instantiate: {
			'endpoint': '/private/queue', 
			'controller': 'user', 
			'method': 'credentials'
		},
		all: {
			'endpoint': '/private/queue',
			'controller': 'user'
		},
		listen: {
			'endpoint': '/channel',
			'controller': 'user'
		},
		update: {
			'endpoint': '/private/queue',
			'controller': 'user',
			'method': 'update'
		}
	}
};