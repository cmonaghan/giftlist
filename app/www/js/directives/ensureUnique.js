angular.module('giftlist.directives')

.directive('ensureUnique', function() {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        var usernameEntered = attrs.$$element[0].value;

        var userQuery = new Parse.Query(Parse.User);
        userQuery.equalTo('username', usernameEntered);
        userQuery.count().then(function(count) {
          console.log('resulting count for username ' + usernameEntered + ' is ' + count);
        });
      });
    }
  };
});