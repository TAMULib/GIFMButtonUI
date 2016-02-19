app.controller('ThemeController', function ($controller, $scope, $window, ThemeModel) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.themes = ThemeModel.get();

	$scope.refreshable = false;

	$scope.updateThemeProperty = function(theme,propertyId,value) {
		ThemeModel.updateThemeProperty(theme.id,propertyId,value).then(function() {
			if (theme.active == true) {
				$scope.refreshable = true;
			}
		});
	};

	$scope.addTheme = function(newTheme) {
		ThemeModel.addTheme(newTheme);
	};

	$scope.activateTheme = function(themeId) {
		ThemeModel.activateTheme(themeId).then(function() {
			$scope.refreshPage();
		});
	};

	$scope.refreshPage = function() {
		$window.location.reload();
	};
});
