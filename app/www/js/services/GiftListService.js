angular.module('giftlist.services')

.factory('GiftListService', function($q) {
  var giftList = {};

  var saveItemToParseGiftList = function(gift) {
    // create a reference to the current user
    var user = Parse.User.current();
    // Create a reference to the Parse.Object 'UserGiftList'
    var UserGiftList = Parse.Object.extend('UserGiftList');
    var userGiftListQuery = new Parse.Query(UserGiftList);
    userGiftListQuery.equalTo('parent', user); // filters for giftList belonging to that user
    userGiftListQuery.first({ // queries generally return an array, '.first' returns only the first object in the array
      success: function(userGiftList){
        // if this user does not have a giftList, create one (ie - this is their first time using the app)
        if (userGiftList === undefined) {
          createNewUserGiftList(gift);
        } else {
          userGiftList.addUnique('savedGifts', gift.id);
          userGiftList.save();
        }
      },
      error: function() {
        console.error(error);
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
        // now that a userGiftList has been created for this user, we can save this gift to their userGiftList object
        saveItemToParseGiftList(gift);
      },
      error: function(error) {
        console.error(error);
      }
    });
  };

  return {
    addToGiftList: function(currentGift) {
      giftList[currentGift.id] = currentGift; // adds gift to the local giftList
      saveItemToParseGiftList(currentGift); // adds gift to the parse giftList
    },
    getGiftList: function() {
      return giftList;
    },
    getGiftListItem: function(id) {
      return giftList[id];
    }
  };

});
