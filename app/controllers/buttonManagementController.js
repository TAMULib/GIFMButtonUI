app.controller('ButtonManagementController', function ($controller, $scope, PersistedButtonRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.buttons = PersistedButtonRepo.getAll();

    $scope.activeButton = {};

    PersistedButtonRepo.ready().then(function() {
        $scope.viewButton = function(button) {
            $scope.activeButton = button;
            $scope.openModal("#buttonViewModal");
        };
    });
});