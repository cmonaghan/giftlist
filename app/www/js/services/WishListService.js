angular.module('giftlist.services')

.factory('WishListService', function($q) {

  var wishList = {};

  return {
    addToWishList: function(currentGift) {
      wishList[currentGift.id] = currentGift;
    },
    getWishList: function() {
      return wishList;
    },
    getWishListItem: function(id) {
      return wishList[id];
    }
  };

  // var deferred = $q.defer();

  // var UserGiftList = Parse.Object.extend('UserGiftList');
  // var userGiftListQuery = new Parse.Query('UserGiftList');
  // userGiftListQuery.find({
  //   success: function(userGiftList) {
  //     console.log('Successfully retrieved ' + userGiftList.length + ' items from Parse.');
  //     console.log('userGiftList', userGiftList);
  //     deferred.resolve({
  //       addToWishList: function(currentGift) {
  //         wishList[currentGift.id] = currentGift;
  //       },
  //       getWishList: function() {
  //         return wishList;
  //       },
  //       getWishListItem: function(id) {
  //         return wishList[id];
  //       }
  //     });
  //   },
  //   error: function(error) {
  //     deferred.reject('Error fetching userGiftList from Parse: ' + error.code + ' ' + error.message);
  //   }
  // });

  // return deferred.promise;
});
