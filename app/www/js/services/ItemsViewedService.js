angular.module('giftlist.services')

.factory('ItemsViewedService', function() {
  var itemsViewed = {};
  // create a reference to the current user
  var user = Parse.User.current();
  // Create a reference to the Parse.Object 'ItemsViewed'
  var ItemsViewed = Parse.Object.extend('ItemsViewed');

  var saveToItemsViewed = function(item) {
    var itemsViewedQuery = new Parse.Query(ItemsViewed);
    itemsViewedQuery.equalTo('parent', user); // filters for itemsViewed belonging to that user
    itemsViewedQuery.first({ // queries generally return an array, '.first' returns only the first object in the array
      success: function(itemsViewed){
        // if this user does not have a itemsViewed object, create one (ie - this is their first time using the app)
        if (itemsViewed === undefined) {
          createNewItemsViewed(item);
        } else {
          itemsViewed.addUnique('itemsViewed', item.id);
          itemsViewed.save();
        }
      },
      error: function() {
        console.error(error);
      }
    });
  };

  var createNewItemsViewed = function(item){
    var itemsViewed = new ItemsViewed();
    itemsViewed.set('parent',user);
    itemsViewed.save({
      success: function() {
        // now that a itemsViewed has been created for this user, we can save this item to their itemsViewed object
        saveToItemsViewed(item);
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
    saveToItemsViewed: function(item) {
      itemsViewed[item.id] = item; // adds item to the local itemsViewed
      saveToItemsViewed(item); // adds item to the parse itemsViewed
    },
    // fetchGiftItemsViewed: function() {
    //   fetchGiftItemsViewed();
    //   return itemsViewed;
    // }
  };

});
