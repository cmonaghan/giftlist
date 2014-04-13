angular.module('giftlist.controllers')

// A simple controller that fetches a list of data from a service
.controller('GiftIndexCtrl', function($scope, WishListService) {
  // var promise = WishListService;
  // promise.then(function(result){
  //   console.log('WishListService promise successful. result is:', result);
  //   $scope.wishList = result.getWishList();
  //   console.log("WISHLIST : ", $scope.wishList);
  // }, function(err){
  //   console.log('promise failed with error:', err);
  // });
  $scope.wishList = WishListService.getWishList();
  console.log("WISHLIST : ", $scope.wishList);
});
