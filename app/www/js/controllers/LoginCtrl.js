angular.module('giftlist.controllers')

.controller('LoginCtrl', function($scope, $firebase, FirebaseService) {
  // $scope.login = FirebaseService.facebookLogin;

  Parse.FacebookUtils.logIn(null, {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
});