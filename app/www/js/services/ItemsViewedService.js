angular.module('giftlist.services')

.factory('ItemsViewedService', function() {
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

  // createNewItemsViewed is just a helper for saveToItemsViewed
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

  return {
    saveToItemsViewed: function(item) {
      saveToItemsViewed(item); // adds item to the parse itemsViewed table
    }
  };

});
