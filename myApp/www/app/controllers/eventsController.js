angular.module('BeerApp')
    .controller('EventCtrl', function ($scope, $state, $ionicModal, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
      $scope.events = {}
      $scope.name = ""
      $scope.venue = ""
      $scope.date = ""
      $scope.photoURL = ""
      $scope.address = ""
      $scope.description = ""
        $scope.createEvent = function () {
            
            $scope.e = {
                "name": $scope.name,
                "venue": $scope.venue,
                "date": $scope.date,
                "photo": $scope.photoURL,
                "address": $scope.address,
                "description": $scope.description
            }
            e = $scope.events
            BeerFactory.postEvent(e)
            console.log(e)

        }

        //     function loadEvents() {
        //         BeerFactory.postEvent().then(data => {
        //             $timeout(function () {
        //                 console.log()
        //             }, 100)
        //             $scope.events = data
        //             console.log($scope.events)

        //         })
        //     }//END loadEvents



        //     //when page loads load the Events
        //     if (document.readyState === "complete") {
        //         loadEvents()
        //     }

        // })

        // //I have to use this to return image urls.
        // .filter('trusted', ['$sce', function ($sce) {
        //     return function (url) {
        //         return $sce.trustAsResourceUrl(url);
        //     };

    })

      //I have to use this to return the beer and brewery labels from Untappd API
      .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);