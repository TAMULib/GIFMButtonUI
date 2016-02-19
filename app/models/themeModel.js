app.service("ThemeModel", function($q,AbstractModel, WsApi) {

	var self;

	var Theme = function(futureData) {
		self = this;
		angular.extend(self, AbstractModel);	
		self.unwrap(self, futureData);		
	};

	Theme.data = null;

	Theme.promise = null;
	
	Theme.set = function(data) {
		self.unwrap(self, data);
	};

	Theme.receive = function(theme, response) {
		if(JSON.parse(response.body).payload.String) {
			console.log(JSON.parse(response.body).payload.String);
		}
		else {
			var newTheme = true;
			for(var key in Theme.data.list) {
				if(Theme.data.list[key].id == theme.id) {
					Theme.data.list[key] = JSON.parse(response.body).payload.CoreTheme;
					newTheme = false;
					break;
				}
			}
			if(newTheme && Theme.data.list != null) {
				Theme.data.list.push(JSON.parse(response.body).payload.CoreTheme);
			}
		}
	};

	Theme.get = function() {
		
		var newThemePromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: "all",
		});

		Theme.promise = newThemePromise;
		Theme.data = new Theme(newThemePromise);

		WsApi.listen({
				endpoint: '/channel', 
				controller: 'theme/'
		}).then(null, null, function(response) {
			Theme.receive(JSON.parse(response.body).payload.CoreTheme, response);
		});
		
		return Theme.data;
	};

	Theme.ready = function() {
		return Theme.promise;
	};

	Theme.refresh = function() {
		Theme.promise = null;
		Theme.get();
	};

	Theme.updateThemeProperty = function(themeId,propertyId,value) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'theme', 
					method: 'update-property',
					data: {
						"themeId":themeId,
						"propertyId":propertyId,
						"value":value,
					}
			}).then(function() {
				resolve("Theme Property Updated");
			},function() {
				reject("Failed to update Theme Property");
			});
		});
	};

	Theme.addTheme = function(newTheme) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'theme', 
					method: 'add-theme',
					data: {"newTheme":newTheme}
			}).then(function() {
				resolve("Theme Added");
			},function() {
				reject("Failed to add new Theme");
			});
		});
	};

	Theme.activateTheme = function(themeId) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'theme', 
					method: 'activate-theme',
					data: {"themeId":themeId}
			}).then(function() {
				resolve("Theme Activated");
			},function() {
				reject("Failed to activate Theme");
			});
		});
	};
	return Theme;
	
});