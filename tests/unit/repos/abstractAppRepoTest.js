describe("service: abstractAppRepo", function () {
  var $q, $rootScope, $scope, WsApi, repo, mockedRepo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector) {
      $scope = $rootScope.$new();
      mockedRepo = new mockRepo("AbstractAppRepo", $q);
      repo = $injector.get("AbstractAppRepo")();

      // @fixme find a way to get something like `angular.extend(new mockRepo("AbstractAppRepo", $q), $injector.get("AbstractAppRepo")())` or `repo = AbstractAppRepo` to work.
      repo.getAll = mockedRepo.getAll;
      repo.listen = mockedRepo.listen;
      repo.ready = mockedRepo.ready;
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

    initializeVariables();
    initializeRepo();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });
});
