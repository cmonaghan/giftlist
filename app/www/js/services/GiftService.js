angular.module('giftlist.services')

.factory('GiftService', function($q) {
  var deferred = $q.defer();

  var GiftItem = Parse.Object.extend('GiftItem');
  var giftItemQuery = new Parse.Query('GiftItem');
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
      console.log("Error fetching giftItems from Parse: " + error.code + " " + error.message);
    }
  });

  return deferred.promise;
});
