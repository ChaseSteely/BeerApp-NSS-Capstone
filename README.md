# BeerCentriCity - NSS Front-End Capstone

A hybrid mobile single-page application that explores the Nashville Craft Beer scene. The App prompts users to login utilizing Firebase Authentication. Each user has a unique Dashboard that tracks beers, breweries, wishlists, & events. Google Maps API is called to populate Map Markers. Searches make Untappd API calls  through AngularJS. Data is filtered, sorted, and all CRUD operations can be used on the Firebase data. Built with AngularJS and the Ionic Framework.

https://beercentricnashville.com/

### Features

1. Firebase oAuth Registration and login. 
  > https://github.com/ChaseSteely/NashBeer/tree/master/myApp/www/app/auth
2. Unique User Dashboard. 
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashBreweryController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashBeerController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashEventsController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashHomeController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashMapController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/dashWishController.js
3. Nashville Map, Pub, and Events.
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/nashController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/pubController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/eventsController.js
4. Beer and Brewery Search
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/beerController.js
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/controllers/breweryController.js
5. API calls through Object.create
> https://github.com/ChaseSteely/NashBeer/blob/master/myApp/www/app/factories/beerFactory.js
6. All Navigation through Tabs done in app.config.js using $stateProvider.
```angular.module('BeerApp', ['ionic', 'ui.router', 'ngCordova'])

  .constant("Firebase_Config", {
    apiKey: "YOUR KEY HERE",
    authDomain: "FIREBASE PROJECT DOMAIN",
    databaseURL: "FIREBASE DATABASE",
    projectId: "ID HERE",
    storageBucket: "FIREBASE STORAGE",
    messagingSenderId: "ID",
    storageBucket: "FIREBASE STORAGE"
  })
  .constant("Untappd", {
    clientID: "API KEY",
    clientSecret: "API KEY"
  })

  .run(function ($ionicPlatform, Firebase_Config, $rootScope) {
    firebase.initializeApp(Firebase_Config)
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      var user = firebase.auth().currentUser;
      if (toState.authRequired && (!user)) {
        // User isn't authenticated
        $state.transitionTo('login');
        event.preventDefault();
      }
    });

  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: './app/auth/register.html',
        controller: 'AuthCtrl'
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: './app/partials/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        authRequired: true,
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: './app/partials/newDash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.dash.home', {
        url: '/dash/home',
        authRequired: true,
        views: {
          'dash-page': {
            templateUrl: './app/partials/dashHome.html',
            controller: "DashHomeCtrl"
          }
        }
      })
      .state('tab.dash.beers', {
        url: '/mybeers',
        authRequired: true,
        views: {
          'dash-page': {
            templateUrl: './app/partials/dashBeers.html',
            controller: "DashBeerCtrl"
          }
        }
      })
      .state('tab.dash.wishlist', {
        url: '/wishlist',
        authRequired: true,
        views: {
          'dash-page': {
            templateUrl: './app/partials/dashWish.html',
            controller: "DashWishCtrl"
          }
        }
      })

   . . . ETC . . .
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
```


### Dependencies
    "@ionic/pro": "1.0.16",
    "cordova-android": "^6.3.0",
    "cordova-ios": "4.5.4",
    "cordova-plugin-camera": "^3.0.0",
    "firebase": ^4.7.0

## Built With

* [Ionic v1](https://ionicframework.com/docs/v1/) - Mobile Framework.
* [AngularJs](https://angularjs.org/) - JavaScript Framework.
* [Firebase](https://firebase.google.com/) - Database and Storage.

