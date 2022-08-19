describe("controller: UserRepoController", function () {
  var $q, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$injector_, _$location_, _$rootScope_, _$route_, _$window_, _ModalService_, _RestApi_, _StorageService_, _UserRepo_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("UserRepoController", {
        $route: _$route_,
        $scope: $scope,
        $injector: _$injector_,
        $location: _$location_,
        $window: _$window_,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        UserRepo: _UserRepo_,
        UserService: _UserService_,
        WsApi: WsApi
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module('templates');
    module("mock.modalService");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userRepo");
    module("mock.userService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];

    var controllerExists = function (setting) {
      return function() {
        initializeController(setting);
        expect(controller).toBeDefined();
      };
    };

    for (var i in roles) {
      it("defined for " + roles[i], controllerExists({ role: roles[i] }));
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "assignableRoles",
      "canDelete",
      "delete",
      "updateRole"
    ];

    var scopeMethodExists = function (method) {
      return function() {
        expect($scope[method]).toBeDefined();
        expect(typeof $scope[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", scopeMethodExists(methods[i]));
    }
  });

  describe("Does the scope method", function () {
    it("assignableRoles return a list of allowed roles", function () {
      var roles;

      roles = $scope.assignableRoles();
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_MANAGER"});

      roles = $scope.assignableRoles("ROLE_ADMIN");
      expect(roles).toBeDefined();

      roles = $scope.assignableRoles();
      expect(roles).toBeDefined();

      roles = $scope.assignableRoles("ROLE_USER");
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_USER"});
      roles = $scope.assignableRoles("ROLE_ADMIN");
      expect(roles).toBeDefined();
    });

    it("canDelete return boolean if a user can be deleted", function () {
      var canDelete;

      dataUser1.role = "ROLE_ADMIN";

      canDelete = $scope.canDelete(dataUser1);
      expect(canDelete).toBe(false);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = $scope.canDelete(dataUser2);
      expect(canDelete).toBe(true);

      initializeController({role: "ROLE_MANAGER"});
      dataUser2.role = "ROLE_MANAGER";

      canDelete = $scope.canDelete(dataUser2);
      expect(canDelete).toBe(true);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = $scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);

      initializeController({role: "ROLE_USER"});

      canDelete = $scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);

      dataUser2.role = "ROLE_ADMIN";

      canDelete = $scope.canDelete(dataUser2);
      expect(canDelete).toBe(false);
    });

    it("delete delete a user", function () {
      dataUser1.delete = function () {};
      spyOn(dataUser1, "delete");

      $scope.delete(dataUser1);
      $scope.$digest();

      expect(dataUser1.delete).toHaveBeenCalled();
    });

    it("updateRole update a users role", function () {
      var originalUser2 = angular.copy(dataUser2);
      dataUser2.role = "ROLE_NEW";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.role).not.toEqual(originalUser2.role);
      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_ANNOTATOR";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_USER";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();
    });

  });

});
