angular.module('giftlist.services')

.factory('GiftListService', function($q, $state) {
  var giftList = {};

  // create a reference to the current user
  var user = Parse.User.current();
  // Create a reference to the Parse.Object 'UserGiftList'
  var UserGiftList = Parse.Object.extend('UserGiftList');

  var saveItemToParseGiftList = function(gift) {
    var userGiftListQuery = new Parse.Query(UserGiftList);
    userGiftListQuery.equalTo('parent', user); // filters for giftList belonging to that user
    userGiftListQuery.first({ // queries generally return an array, '.first' returns only the first object in the array
      success: function(userGiftList){
        // if this user does not have a giftList, create one (ie - this is their first time using the app)
        if (userGiftList === undefined) {
          createNewUserGiftList(gift);
        } else {
          userGiftList.addUnique('savedGifts', gift.id);
          userGiftList.increment('savedGiftsCount');
          userGiftList.save();
        }
      },
      error: function() {
        console.error(error);
      }
    });
  };

  // This is only used as a helper function for saveItemToParseGiftList
  var createNewUserGiftList = function(gift){
    var userGiftList = new UserGiftList();
    userGiftList.set('parent', user);
    userGiftList.set('savedGiftsCount', 0)
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

  var fetchParseGiftList = function() {
    var userGiftListQuery = new Parse.Query(UserGiftList);
    userGiftListQuery.equalTo('parent', user); // filters for giftList belonging to that user
    userGiftListQuery.first({
      success: function(userGiftList){
        if (userGiftList === undefined) {
          console.log('No items exist in this giftList!');
        } else {
          return userGiftList;
        }
      },
      error: function(error) {
        console.error(error);
      }
    }).then(function(userGiftList) {
      var userGiftListArray = userGiftList.get('savedGifts');
      var Items = Parse.Object.extend('Items');
      var itemsQuery = new Parse.Query(Items);
      itemsQuery.containedIn('objectId', userGiftListArray);
      itemsQuery.find({
        success: function(items){
          for (var i = 0; i < items.length; i++) {
            giftList[ items[i].id ] = items[i];
          };
          /* The next line '$state.go(...)' is a hack. For some reason, the user
           * had to click 'My Giftlist' again to make the list render */
          $state.go('tab.gift-ideas');
        },
        error: function(error) {
          console.error(error);
        }
      })
    })
  };

  return {
    addToGiftList: function(currentGift) {
      giftList[currentGift.id] = currentGift; // adds gift to the local giftList
      saveItemToParseGiftList(currentGift); // adds gift to the parse giftList
    },
    getGiftList: function() {
      fetchParseGiftList();
      return giftList;
    },
    getGiftListItem: function(id) {
      return giftList[id];
    }
  };

});
