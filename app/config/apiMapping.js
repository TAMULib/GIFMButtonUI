// CONVENTION: must match model name, case sensitive
var apiMapping = {
	PersistedButton: {
		channel: '/channel/buttons',
		all: {
			'endpoint': '/private/queue',
			'controller': 'button-management',
			'method': 'all'
		},
        create: {
            'endpoint': '/private/queue',
            'controller': 'button-management',
            'method': 'create'
		},
        update: {
            'endpoint': '/private/queue',
            'controller': 'button-management',
            'method': 'update'
		},
        remove: {
            'endpoint': '/private/queue',
            'controller': 'button-management',
            'method': 'remove'
		},
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