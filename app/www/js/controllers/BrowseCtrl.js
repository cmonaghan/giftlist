angular.module('giftlist.controllers')

.controller('BrowseCtrl', function($scope, NewItemsService, GiftListService) {
  // "NewItemsService" returns data from Parse
  var currIndex = 0;

  var newItemsServicePromise = NewItemsService;
  newItemsServicePromise.then(function(result){
    $scope.gifts = result.all();
    $scope.gift = $scope.gifts[currIndex];
  }, function(err){
    console.log('newItemsServicePromise failed with error:', err);
  });

  $scope.addToGiftList = function(gift) {
    $scope.nextItem();
    GiftListService.addToGiftList(gift);
  };

  $scope.removeGift = function(swipeDir) {
    // pop gift from the potential gift list
    // depending on the direction of the swipe
    // the gift is either tossed away (swipe left) or
    // stored in giftlist (swipe right)

    // var gift = $scope.gifts.shift();
    // console.log(gift);
    if (swipeDir === "right") {
      $scope.giftList.push(gift);
    }
    console.log($scope.gifts);
  };

  $scope.nextItem = function () {
    currIndex++;
    $scope.gift = $scope.gifts[currIndex];
  };

  $scope.skipItem = function() {
    $scope.nextItem();
  };
});