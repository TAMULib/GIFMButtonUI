app.controller('RecordTesterController', function ($controller, $scope, $q, WsApi) {
  $scope.requestInfo = {catalogName:'evans',recordId:''};
  $scope.buttons = {};
  $scope.showSkipped = false;
  $scope.loadingButtons = false;
  $scope.loadingError = false;

  $scope.analyze = function() {
    $scope.loadingError = false;
    $scope.loadingButtons = true;
    getButtons($scope.requestInfo.catalogName, $scope.requestInfo.recordId).then(function(buttons) {
      $scope.buttons = buttons;
    }).catch(function (e) {
      $scope.loadingError = true;
    }).finally(function() {
      $scope.loadingButtons = false;
    });
  };

  let getButtons = function(catalogName, recordId) {
    let apiRequest = {
      endpoint: '/private/queue',
      controller: 'catalog-access',
      method: 'get-buttons',
      query: {catalogName:$scope.requestInfo.catalogName,bibId:$scope.requestInfo.recordId,verbose:true}
    };

    return WsApi.fetch(apiRequest).then(function (res) {
      let payload = angular.fromJson(res.body).payload;
      let keys = Object.keys(payload);
      let buttonsObject = {};
      angular.forEach(keys, function (key) {
          angular.extend(buttonsObject, payload[key]);
      });
      return buttonsObject;
    });
  };
});
