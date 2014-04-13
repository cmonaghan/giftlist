angular.module('giftlist.services')

.factory('WishListService', function($q) {
  var wishList = {};

  var saveItemToParseGiftList = function(gift) {
    // create a reference to the current user
    var user = Parse.User.current();
    // Create a reference to the Parse.Object 'UserGiftList'
    var UserGiftList = Parse.Object.extend('UserGiftList');
    var userGiftListQuery = new Parse.Query(UserGiftList);
    userGiftListQuery.equalTo('parent',user);
    userGiftListQuery.first({
      success: function(userGiftList){
        if (userGiftList === undefined) {
          createNewUserGiftList(gift);
        } else {
          userGiftList.addUnique('savedGifts', gift.id);
          userGiftList.save();
        }
      },
      error: function() {
        console.error('Error in userGiftListQuery.');
      }
    });
  };

  var createNewUserGiftList = function(gift){
    var user = Parse.User.current();
    var UserGiftList = Parse.Object.extend('UserGiftList');
    var userGiftList = new UserGiftList();
    userGiftList.set('parent',user);
    userGiftList.save({
      success: function() {
        saveItemToParseGiftList(gift);
      },
      error: function(error) {
        console.error(error);
      }
    });
  };

  return {
    addToWishList: function(currentGift) {
      wishList[currentGift.id] = currentGift;
      saveItemToParseGiftList(currentGift);
    },
    getWishList: function() {
      return wishList;
    },
    getWishListItem: function(id) {
      return wishList[id];
    }
  };

});
