angular.module('BeerApp')
    .controller('EventCtrl', function ($scope, $state, $ionicModal, $ionicLoading, $timeout, BeerFactory, $cordovaToast, AuthFactory, $ionicScrollDelegate) {
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

         //Ionic scroll delegate.
         $scope.scrollMainToTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

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
                    "uid": firebase.auth().currentUser.uid,
                    writable: true,
                    enumerable: true
                }
                eLog = $scope.eventLog
                console.log(eLog)
                BeerFactory.logEvent(eLog)

            })
        }

        $scope.showToast = function(message) {
            if (window.plugins && window.plugins.toast) {
                window.plugins.toast.showLongCenter("Event Saved");
            }
            else $ionicLoading.show({ template: "Event Saved", noBackdrop: true, duration: 2000 });
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