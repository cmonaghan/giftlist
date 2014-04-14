angular.module('giftlist.services')

.factory('NewItemsService', function($q) {
  var deferred = $q.defer();

  // create a reference to the current user
  var user = Parse.User.current();
  // Create a reference to the Parse.Object 'ItemsViewed'
  var ItemsViewed = Parse.Object.extend('ItemsViewed');
  var itemsViewedQuery = new Parse.Query(ItemsViewed);
  itemsViewedQuery.equalTo('parent', user);
  itemsViewedQuery.first({
    success: function(itemsViewed) {
      if (itemsViewed === undefined) {
        console.log('No items have been viewed!');
      } else {
        return itemsViewed;
      }
    },
    error: function(error) {
      console.error(error);
    }
  }).then(function(itemsViewed) {
    var itemsViewedArray = itemsViewed.get('itemsViewed');
    var GiftItem = Parse.Object.extend('GiftItem');
    var giftItemQuery = new Parse.Query(GiftItem);
    giftItemQuery.notContainedIn('objectId', itemsViewedArray);
    giftItemQuery.find({
      success: function(giftItems) {
        deferred.resolve({
          all: function() {
            return giftItems;
          },
          get: function(giftId) {
            // Simple index lookup
            return giftItems[giftId];
          },
          wishlist: []
        });
      },
      error: function(error) {
        deferred.reject("Error fetching giftItems from Parse: " + error.code + " " + error.message);
      }
    });
  });

  return deferred.promise;
});
