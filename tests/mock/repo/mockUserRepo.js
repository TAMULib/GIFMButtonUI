var dataUserRepo1 = [
  dataUser1,
  dataUser2,
  dataUser3
];

var dataUserRepo2 = [
  dataUser3,
  dataUser2,
  dataUser1
];

var dataUserRepo3 = [
  dataUser1,
  dataUser3,
  dataUser2
];

angular.module("mock.userRepo", []).service("UserRepo", function ($q) {
  var repo = mockRepo("UserRepo", $q, mockUser, dataUserRepo1);

  repo.scaffold = {
    anonymous: false,
    email: "",
    exp: "",
    firstName: "",
    lastName: "",
    netId: "",
    role: "",
    uin: ""
  };

  repo.getAllByRole = function (roles) {
    var found;
    for (var i in repo.list) {
      if (roles.indexOf(repo.list[i].role) !== -1) {
        found = repo.mockCopy(repo.list[i]);
        break;
      }
    }

    return found;
  };

  repo.getAssignableUsers = function (roles) {
    var payload = repo.fetch();
    return payloadPromise($q.defer(), payload);
  };

  return repo;
});
