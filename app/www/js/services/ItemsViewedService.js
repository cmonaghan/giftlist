angular.module('giftlist.services')

.factory('ItemsViewedService', function() {
  var itemsViewed = {};
  // create a reference to the current user
  var user = Parse.User.current();
  // Create a reference to the Parse.Object 'GiftItemsViewed'
  var GiftItemsViewed = Parse.Object.extend('GiftItemsViewed');

  var saveItemToGiftItemsViewed = function(item) {
    var giftItemsViewedQuery = new Parse.Query(GiftItemsViewed);
    giftItemsViewedQuery.equalTo('parent', user); // filters for giftList belonging to that user
    giftItemsViewedQuery.first({ // queries generally return an array, '.first' returns only the first object in the array
      success: function(giftItemsViewed){
        // if this user does not have a giftItemsViewed object, create one (ie - this is their first time using the app)
        if (giftItemsViewed === undefined) {
          createNewGiftItemsViewed(item);
        } else {
          giftItemsViewed.addUnique('itemsViewed', item.id);
          giftItemsViewed.save();
        }
      },
      error: function() {
        console.error(error);
      }
    });
  };

  var createNewGiftItemsViewed = function(gift){
    var giftItemsViewed = new GiftItemsViewed();
    giftItemsViewed.set('parent',user);
    giftItemsViewed.save({
      success: function() {
        // now that a giftItemsViewed has been created for this user, we can save this gift to their giftItemsViewed object
        saveItemToGiftItemsViewed(gift);
      },
      error: function(error) {
        console.error(error);
      }
    });
  };

  // var fetchGiftItemsViewed = function() {
  //   var giftItemsViewedQuery = new Parse.Query(GiftItemsViewed);
  //   giftItemsViewedQuery.equalTo('parent', user); // filters for giftList belonging to that user
  //   giftItemsViewedQuery.first({
  //     success: function(giftItemsViewed){
  //       if (giftItemsViewed === undefined) {
  //         console.log('No items exist in this giftList!');
  //       } else {
  //         return giftItemsViewed;
  //       }
  //     },
  //     error: function(error) {
  //       console.error(error);
  //     }
  //   }).then(function(giftItemsViewed) {
  //     var giftItemsViewedArray = giftItemsViewed.get('itemsViewed');
  //     var GiftItem = Parse.Object.extend('GiftItem');
  //     var giftItemQuery = new Parse.Query(GiftItem);
  //     giftItemQuery.containedIn('objectId', giftItemsViewedArray);
  //     giftItemQuery.find({
  //       success: function(giftItems){
  //         for (var i = 0; i < giftItems.length; i++) {
  //           itemsViewed[ giftItems[i].id ] = giftItems[i];
  //         };
  //         console.log(itemsViewed)
  //       },
  //       error: function(error) {
  //         console.error(error);
  //       }
  //     })
  //   })
  // };

  return {
    saveItemToGiftItemsViewed: function(item) {
      itemsViewed[item.id] = item; // adds gift to the local itemsViewed
      saveItemToGiftItemsViewed(item); // adds gift to the parse itemsViewed
    },
    // fetchGiftItemsViewed: function() {
    //   fetchGiftItemsViewed();
    //   return itemsViewed;
    // }
  };

});
