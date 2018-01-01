angular.module('BeerApp')
    .controller('DashBeerCtrl', function ($scope, $state, $timeout, $ionicLoading, $ionicScrollDelegate, BeerFactory, AuthFactory) {
        $scope.beers = []

        $scope.scrollMainToTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

        //get beers logged by current User on tab click
        function getBeers() {
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.beers = data
                console.log($scope.beers)
            })
        }//END getBeers()

         // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Cheers");
        //     }
        //     else $ionicLoading.show({ template: "Cheers", noBackdrop: true, duration: 2000 });
        // }

        //when page loads load the Events
        if (document.readyState === "complete") {
            getBeers()
        }
    })
