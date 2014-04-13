angular.module('giftlist.controllers')

.controller('BrowseCtrl', function($scope, GiftService, WishListService) {
  // "GiftService" returns data from Parse
  var currIndex = 0;

  var giftServicePromise = GiftService;
  giftServicePromise.then(function(result){
    console.log('giftServicePromise successful. result is:', result);
    $scope.gifts = result.all();
    $scope.gift = $scope.gifts[currIndex];
  }, function(err){
    console.log('giftServicePromise failed with error:', err);
  });

  // var wishListServicePromise = WishListService;
  // wishListServicePromise.then(function(result){
  //   console.log('wishListServicePromise successful. result is:', result);
  // });

  $scope.addToWishList = function(gift) {
    $scope.nextItem();
    WishListService.addToWishList(gift);
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

  $scope.nextItem = function () {
    currIndex++;
    $scope.gift = $scope.gifts[currIndex];
  };

  $scope.skipItem = function() {
    $scope.nextItem();
  };
});