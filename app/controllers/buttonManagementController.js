app.controller('ButtonManagementController', function ($controller, $scope, PersistedButtonRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.buttons = PersistedButtonRepo.getAll();

    $scope.activeButton = {};

    PersistedButtonRepo.ready().then(function() {
        $scope.viewButton = function(button) {
            buttonAction(button,"buttonViewModal");
        };

        $scope.editButton = function(button) {
            buttonAction(button,"buttonEditModal");
        };

        var buttonAction = function(button, modalName) {
            $scope.activeButton = button;
            $scope.openModal("#"+modalName);
        };

        $scope.updateButton = function(button) {
            PersistedButtonRepo.update(button).then(function() {
                $scope.closeModal();
            });
        };

    });
});