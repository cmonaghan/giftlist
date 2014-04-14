angular.module('giftlist.controllers')

// A simple controller that fetches a list of data from a service
.controller('GiftIndexCtrl', function($scope, GiftListService) {
  $scope.giftList = GiftListService.getGiftList();
});
