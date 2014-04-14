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
    var itemsViewedArray;

    if (itemsViewed === undefined) {
      itemsViewedArray = [];
    } else {
      itemsViewedArray = itemsViewed.get('itemsViewed');
    }

    var Items = Parse.Object.extend('Items');
    var itemsQuery = new Parse.Query(Items);
    itemsQuery.notContainedIn('objectId', itemsViewedArray);
    itemsQuery.find({
      success: function(items) {
        deferred.resolve({
          all: function() {
            return items;
          },
          get: function(giftId) {
            // Simple index lookup
            return items[giftId];
          }
        });
      },
      error: function(error) {
        deferred.reject("Error fetching items from Parse: " + error.code + " " + error.message);
      }
    });
  });

  return deferred.promise;
});
