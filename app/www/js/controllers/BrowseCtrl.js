angular.module('giftlist.controllers')

.controller('BrowseCtrl', function($scope, GiftService, WishListService) {
  // "Gifts" is a service returning mock data
  $scope.gifts = GiftService.all();
  $scope.gift = $scope.gifts[GiftService.productIndex];
  console.log($scope.gifts);

  $scope.nextItem = function () {
    GiftService.productIndex++;
    $scope.gift = $scope.gifts[GiftService.productIndex];
  };

  $scope.addToWishList = function(gift) {
    $scope.nextItem();
    WishListService.addToWishList(gift);
  };

  $scope.skipItem = function() {
    $scope.nextItem();
  };

  $scope.removeGift = function(swipeDir) {
    // pop gift from the potential gift list
    // depending on the direction of the swipe
    // the gift is either tossed away (swipe left) or
    // stored in giftlist (swipe right)

    // var gift = $scope.gifts.shift();
    // console.log(gift);
    if (swipeDir === "right") {
      $scope.wishList.push(gift);
    }
    console.log($scope.gifts);
  };
});