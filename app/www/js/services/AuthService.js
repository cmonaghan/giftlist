angular.module('giftlist.services')

.factory('AuthService', function ($state) {
  var facebookLogin = function () {
    console.log('logging in');
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!");
        } else {
          console.log("User logged in through Facebook!");
        }
        $state.go('tab.browse'); // navigate to the browse tab upon successful login
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  };

  var logout = function() {
    console.log('logging out');
    Parse.User.logOut();
  };

  return {
    facebookLogin: facebookLogin,
    logout: logout
  };
});