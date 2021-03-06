app.controller('ButtonManagementController', function ($controller, $scope, PersistedButtonRepo) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.buttons = PersistedButtonRepo.getAll();

    $scope.activeButton = {};

    $scope.newButton = {};

    $scope.fieldDetails = {
                            "name": {"gloss":"The internal name for this button."},
                            "linkText": {"gloss":"Link Text","description":"The text for the button."},
                            "sid": {"gloss": "SID Suffix","description": "Must not be empty."},
                            "templateParameterKeys":{"gloss":"Template Parameter Keys","description":"A semi-colon separated list of keys that will be used in the Link Template field below. These keys will be used to pull values from the item and/or holding to generate the unique, item specific button URL for a given item.","type":"list"},
                            "linkTemplate": {"gloss":"Link Template","description":"The template for the button's URL. Use bracket notation - {key} - to place Template Parameter Keys in the URL template."},
                            "cssClasses": {"gloss":"CSS Classes","description":"CSS class name(s), separated by spaces, that will be added to the html of the button. Optional."},
                            "locationCodes": {"gloss":"Location Codes", "description":"A semi-colon separated list of location codes that qualify for the button. If left empty, all values qualify for the button. A single '!' means holdings without any location codes qualify for the button.","type":"list"},
                            "itemTypeCodes": {"gloss":"Item Type Codes", "description": "A semi-colon separated list of type codes that qualify for the button. If left empty, all values qualify for the button. A single '!' means holdings without any type codes qualify for the button.","type":"list"},
                            "itemStatusCodes": {"gloss":"Item Status Codes", "description": "A semi-colon separated list of status codes that qualify for the button. If left empty, all values qualify for the button. A single '!' means holdings without any status codes qualify for the button.","type":"list"},
                            "itemTypeCodes": {"gloss":"Item Type Codes", "description": "A semi-colon separated list of type codes that qualify for the button. If left empty, all values qualify for the button.  A single '!' means holdings without any type codes qualify for the button.","type":"list"},
                            "recordType": {"gloss":"Record Type","description":"The record type code that must be present in the marc leader to qualify for the button. If left empty, all values qualify for the button. A single '!' means holdings without a record type qualify for the button."},
                            "catalogName": {"gloss": "Catalog Name","description":"Which catalog is this button for?"}
                        };

    PersistedButtonRepo.ready().then(function() {
        $scope.viewButton = function(button) {
            buttonAction("buttonViewModal", button);
        };

        $scope.addButton = function() {
            buttonAction("buttonAddModal");
        };

        $scope.editButton = function(button) {
            buttonAction("buttonEditModal", button);
        };

        var buttonAction = function(modalName, button) {
            if (button) {
                $scope.activeButton = button;
            }
            $scope.openModal("#"+modalName);
        };

        $scope.updateButton = function(button) {
            PersistedButtonRepo.update(button).then(function() {
                $scope.closeModal();
            });
        };

        $scope.createButton = function(button) {
            PersistedButtonRepo.create(processButtonValues(button)).then(function() {
                $scope.closeModal();
            });
        };

        var processButtonValues = function(button) {
            angular.forEach($scope.fieldDetails, function (details, key) {
                if (details.type && details.type == 'list' && button[key]) {
                    var values = button[key];
                    button[key] = values.split(";");
                }
            });
            return button;
        };

        $scope.confirmDeleteButton = function(button) {
            $scope.activeButton = button;
            $scope.openModal("#buttonDeleteModal");
        };

        $scope.deleteButton = function(button) {
            PersistedButtonRepo.delete(button).then(function() {
                $scope.closeModal();
            });
        };

        $scope.toggleButton = function(button) {
            button.active = !button.active;
            $scope.updateButton(button);
        };

        $scope.getToggleButtonText = function(button) {
            return (button.active) ? "Deactivate":"Activate";
        };

        $scope.cloneExistingButton = function(sourceButton,destinationButtonName) {
            angular.forEach($scope.fieldDetails, function(fieldDetail,k) {
                if (sourceButton[k] != null && sourceButton[k] != "") {
                    if (fieldDetail.type !== undefined && fieldDetail.type == 'list') {
                        $scope[destinationButtonName][k] = sourceButton[k].join(";");
                    } else {
                        $scope[destinationButtonName][k] = sourceButton[k];
                    }
                }
            });
            $scope[destinationButtonName].name += " Clone";
        };

        $scope.resetFormModel = function(modelName) {
            $scope[modelName] = {};
        };
    });
});