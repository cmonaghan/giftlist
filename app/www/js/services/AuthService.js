angular.module('giftlist.services')

.factory('AuthService', function ($state) {
  var login = function() {
    console.log('login was triggered.');
  };

  var logout = function() {
    console.log('logging out');
    Parse.User.logOut();
  };

  return {
    login: login,
    logout: logout
  };
});