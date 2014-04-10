angular.module('giftlist.controllers')

.controller('BrowseCtrl', function($scope, GiftService, WishListService) {
  // "GiftService" returns data from Parse
  var promise = GiftService;
  promise.then(function(result){
    console.log('promise successful. result is:', result);
    $scope.gifts = result.all();
    $scope.gift = $scope.gifts[0];
  }, function(err){
    console.log('promise failed with error:', err);
  });

  // $scope.gifts = GiftService.all();

  // console.log($scope.gifts);

  // $scope.gift = $scope.gifts[0];
  // $scope.gift = $scope.gifts[GiftService.productIndex];

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