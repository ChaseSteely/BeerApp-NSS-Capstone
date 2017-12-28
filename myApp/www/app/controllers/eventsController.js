angular.module('BeerApp')
    .controller('EventCtrl', function ($scope, $state, $ionicModal, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
        $scope.eventLog = {}
        $scope.events = []
        //Just in case I need to add event.
        //   $scope.events = {}
        //   $scope.name = ""
        //   $scope.venue = ""
        //   $scope.date = ""
        //   $scope.photoURL = ""
        //   $scope.address = ""
        //   $scope.description = ""
        //     $scope.createEvent = function () {

        //         $scope.e = {
        //             "name": $scope.name,
        //             "venue": $scope.venue,
        //             "date": $scope.date,
        //             "photo": $scope.photoURL,
        //             "address": $scope.address,
        //             "description": $scope.description
        //         }
        //         e = $scope.events
        //         BeerFactory.postEvent(e)
        //         console.log(e)

        //     }

        function loadEvents() {
            BeerFactory.getEvents().then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.events = data
                console.log($scope.events)
            })
        }//END loadEvents

        $scope.saveEvent = function (event) {
            let eID = event.target.id
            console.log(eID)
            BeerFactory.getEvents().then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
               newData = data.filter(e => e.id === eID)
                console.log(newData)
                $scope.eventLog = {
                    "data": newData,
                    "uid": firebase.auth().currentUser.uid
                }
                eLog = $scope.eventLog
                console.log(eLog)
                BeerFactory.logEvent(eLog)

            })
        }

        //when page loads load the Events
        if (document.readyState === "complete") {
            loadEvents()
        }

    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);