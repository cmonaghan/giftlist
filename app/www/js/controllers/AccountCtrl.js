angular.module('giftlist.controllers')

.controller('AccountCtrl', function($scope, AuthService) {
  $scope.logout = AuthService.logout;
});
