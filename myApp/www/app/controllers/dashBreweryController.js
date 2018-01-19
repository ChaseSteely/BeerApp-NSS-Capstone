angular.module('BeerApp')
    .controller('DashBreweryCtrl', function ($scope, $state, $timeout, $ionicLoading, $ionicScrollDelegate, BeerFactory, AuthFactory) {
        $scope.breweries = []

        $scope.scrollMainToTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

        //get wishlist by current User on tab click
        function getBreweryLog() {
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBreweries(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.breweries = data
                console.log($scope.breweries)
            })
        }//END getBreweryLog()

        //when page loads load the Events
        if (document.readyState === "complete") {
            getBreweryLog()
        }
    })
