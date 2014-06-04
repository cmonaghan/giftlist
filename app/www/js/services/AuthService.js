angular.module('giftlist.services')

.factory('AuthService', function ($state, $window) {
  var login = function(user) {
    console.log(user);
    console.log('login was triggered.');
    Parse.User.logIn(user.username, user.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log('successfully logged in');
        $window.location.href = "#/tab/browse";
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.error(error);
      }
    });
  };

  var logout = function() {
    console.log('logging out');
    Parse.User.logOut();
  };

  var signup = function(newUser) {
    console.log(newUser);

    var user = new Parse.User();
    user.set("username", newUser.username);
    user.set("password", newUser.password);
    user.set("email", newUser.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        console.log('success!');
        $window.location.href = "#/login";
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.error("Error: " + error.code + " " + error.message);
      }
    });
  };

  return {
    login: login,
    logout: logout,
    signup: signup
  };
});