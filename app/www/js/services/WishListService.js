angular.module('giftlist.services')

.factory('WishListService', function($q) {

  var wishList = {};

  // create a reference to the current user
  var user = Parse.User.current();

  // Simple syntax to create a new subclass of Parse.Object.
  var UserGiftList = Parse.Object.extend('UserGiftList');
  // Create a new instance of that class.
  // var userGiftList = new UserGiftList();

  var userGiftListQuery = new Parse.Query(UserGiftList);
  userGiftListQuery.equalTo('parent',user);
  userGiftListQuery.find({
    success: function(userGiftList){
      console.log('userGiftList',userGiftList);
      var userGiftListId = userGiftList.id;
      alert('success!');
    },
    error: function() {
      alert('error!');
    }
  });


  // var query = new Parse.Query(UserGiftList);
  // query.get("fDzrCfMjYu", {
  //   success: function(object) {
  //     // The object was retrieved successfully.
  //     object.addUnique('savedGifts', 'twladsg');
  //     object.save();
  //   },
  //   error: function(object, error) {
  //     // The object was not retrieved successfully.
  //     // error is a Parse.Error with an error code and description.
  //     alert('Error fetching object!');
  //   }
  // });


  // userGiftList.save(null, {
  //   success: function(userGiftList) {
  //     userGiftList.set('parent', user);
  //     userGiftList.addUnique('savedGifts', '456abc');
  //     userGiftList.save();
  //     // Execute any logic that should take place after the object is saved.
  //     alert('New object created with objectId: ' + userGiftList.id);
  //   },
  //   error: function(userGiftList, error) {
  //     // Execute any logic that should take place if the save fails.
  //     // error is a Parse.Error with an error code and description.
  //     alert('Failed to create new object, with error code: ' + error.description);
  //   }
  // });


  return {
    addToWishList: function(currentGift) {
      wishList[currentGift.id] = currentGift;
    },
    getWishList: function() {
      return wishList;
    },
    getWishListItem: function(id) {
      return wishList[id];
    }
  };

  // var deferred = $q.defer();

  // var UserGiftList = Parse.Object.extend('UserGiftList');
  // var userGiftListQuery = new Parse.Query('UserGiftList');
  // userGiftListQuery.find({
  //   success: function(userGiftList) {
  //     console.log('Successfully retrieved ' + userGiftList.length + ' items from Parse.');
  //     console.log('userGiftList', userGiftList);
  //     deferred.resolve({
  //       addToWishList: function(currentGift) {
  //         wishList[currentGift.id] = currentGift;
  //       },
  //       getWishList: function() {
  //         return wishList;
  //       },
  //       getWishListItem: function(id) {
  //         return wishList[id];
  //       }
  //     });
  //   },
  //   error: function(error) {
  //     deferred.reject('Error fetching userGiftList from Parse: ' + error.code + ' ' + error.message);
  //   }
  // });

  // return deferred.promise;
});
