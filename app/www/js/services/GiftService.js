angular.module('giftlist.services')

.factory('GiftService', function($http, $q) {
  var giftItems;

  var GiftItem = Parse.Object.extend('GiftItem');
  var giftItemQuery = new Parse.Query('GiftItem');
  giftItemQuery.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " items from Parse.");
      console.log(results);
      giftItems = results;
    },
    error: function(error) {
      console.log("Error fetching giftItems from Parse: " + error.code + " " + error.message);
    }
  });

  return {
    all: function() {
      return giftItems;
    },
    get: function(giftId) {
      // Simple index lookup
      return giftItems[giftId];
    },
    wishlist: []
  };
});
