app.controller('UserRepoController', function ($controller, $location, $scope, $route, StorageService, User, UserRepo) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));
    
    $scope.user = User.get();

    $scope.userRepo = UserRepo.get();
     
 	$scope.ready = User.ready();

    $scope.ready.then(function() {
    	
		$scope.updateRole = function(uin, role) {
			UserRepo.updateRole(uin, role);
			if($scope.user.uin == uin) {
				if(role == 'ROLE_ANNOTATOR') {
					$location.path('/assignments');
				}
				else if(role == 'ROLE_USER') {
					$location.path('/myview');
				}
				else {}
			}
		};
		
		$scope.allowableRoles = function(userRole) {
			if(StorageService.get('role') == 'ROLE_ADMIN') {
				return ['ROLE_ADMIN','ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
			}
			else if(StorageService.get('role') == 'ROLE_MANAGER') {
				if(userRole == 'ROLE_ADMIN') {
					return ['ROLE_ADMIN'];
				}
				return ['ROLE_MANAGER','ROLE_ANNOTATOR','ROLE_USER'];
			}
			else {
				return [userRole];
			}
		};
		
    });

    UserRepo.listen().then(null, null, function(data) {
		if(JSON.parse(data.body).payload.HashMap.changedUserUin == $scope.user.uin) {
			User.refresh();
			$route.reload();
		}			
	});
    	
});


