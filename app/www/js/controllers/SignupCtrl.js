angular.module('giftlist.controllers')

.controller('SignupCtrl', function($scope, AuthService) {
  $scope.signup = AuthService.signup;
});