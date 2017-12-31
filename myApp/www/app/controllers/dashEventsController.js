angular.module('BeerApp')
    .controller('DashEventsCtrl', function ($scope, $state, $timeout, $ionicLoading, BeerFactory, AuthFactory) {
        $scope.events = []
        //get wishlist by current User on tab click
        function getEventList() {
            drinker = AuthFactory.getUser().uid
            BeerFactory.getUserEvents(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.events = data
                console.log($scope.events)
            })
        }

        $scope.deleteEvent = function (id) {
            console.log("deleting", id)
            BeerFactory.byeByeEvent(id)
            let eventEl = document.getElementById(id)
            eventEl.parentNode.removeChild(eventEl)
            $state.reload($state.current.name);
        }

         // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Cheers");
        //     }
        //     else $ionicLoading.show({ template: "Cheers", noBackdrop: true, duration: 2000 });
        // }

        //when page loads load the Events
        if (document.readyState === "complete") {
            getEventList()
        }
    })
