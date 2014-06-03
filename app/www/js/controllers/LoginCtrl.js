angular.module('giftlist.controllers')

.controller('LoginCtrl', function($scope, AuthService) {
  $scope.login = AuthService.login;
});