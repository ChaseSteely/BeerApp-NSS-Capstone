angular.module('BeerApp')
    .controller('DashBeerCtrl', function ($scope, $state, $timeout, $ionicScrollDelegate, BeerFactory, AuthFactory) {
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

        //when page loads load the Beers
        if (document.readyState === "complete") {
            getBeers()
        }
    })
