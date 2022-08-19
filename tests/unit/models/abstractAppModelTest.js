describe("model: AbstractAppModel", function () {
  var $q, $rootScope, $scope, MockedUser, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_AbstractAppModel_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _AbstractAppModel_());
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.wsApi");
    module("templates");

    installPromiseMatchers();
    initializeVariables();
    initializeModel();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });
});
