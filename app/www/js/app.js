angular.module('giftlist.controllers', []);
angular.module('giftlist.services', []);
angular.module('giftlist.directives', []);

angular.module('giftlist', ['ionic', 'firebase', 'giftlist.services', 'giftlist.controllers', 'giftlist.directives', 'ngAnimate'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the gift ideas tab has its own child nav-view and history
    .state('tab.gift-ideas', {
      url: '/gift-ideas',
      views: {
        'gift-ideas-tab': {
          templateUrl: 'templates/gift-ideas-index.html',
          controller: 'GiftIndexCtrl'
        }
      }
    })

    .state('tab.gift-detail', {
      url: '/gift/:giftId',
      views: {
        'gift-ideas-tab': {
          templateUrl: 'templates/gift-detail.html',
          controller: 'GiftDetailCtrl'
        }
      }
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'search-tab': {
          templateUrl: 'templates/search.html',
          controller: "SearchCtrl"
        }
      }
    })

    .state('tab.browse', {
      url: '/browse',
      views: {
        'browse-tab': {
          templateUrl: 'templates/browse.html',
          controller: "BrowseCtrl"
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'account-tab': {
          templateUrl: 'templates/account.html',
          controller: "AccountCtrl"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');


})

.run(function () {
  window.index = 0;
});

