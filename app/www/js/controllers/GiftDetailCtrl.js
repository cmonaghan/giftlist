angular.module('giftlist.controllers')

.controller('GiftDetailCtrl', function($scope, $stateParams, GiftListService) {
  $scope.gift = GiftListService.getGiftListItem($stateParams.giftId);
});