angular.module('giftlist.controllers')

.controller('GiftDetailCtrl', function($scope, $stateParams, WishListService) {
  // "Gifts" is a service returning mock data (services.js)
  var wishListServicePromise = WishListService;
  wishListServicePromise.then(function(result){
    console.log('wishListServicePromise successful. result is:', result);
    $scope.gift = result.getWishListItem($stateParams.giftId);
  }, function(err){
    console.log('wishListServicePromise failed with error:', err);
  });
});