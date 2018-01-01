angular.module('BeerApp')
    .controller('DashCtrl', function ($scope, $state, $stateParams, $ionicLoading, $timeout, BeerFactory, AuthFactory, $ionicScrollDelegate) {
        $scope.name = ""
        $scope.photo = ""
        $scope.count = 0
        $scope.eCount = 0
        $scope.bCount = 0
        $scope.wCount = 0
        $scope.beers = []

        //get beer count
        function beerCount(drinker) {
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(b => b.wishlist === false)
                $scope.count = result.length
            })
        }
        //get brewery count
        function breweryCount(drinker) {
            BeerFactory.getLoggedBreweries(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.bCount = data.length
            })
        }
        //get wishlist count
        function wishCount(drinker) {
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(w => w.wishlist === true)
                $scope.wCount = result.length
            })
        }

        //get event count
        function eventCount(drinker) {
            BeerFactory.getUserEvents(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.eCount = data.length
            })
        }//END eventCount

        function loadDash() {
            drinker = AuthFactory.getUser()
            beerCount(drinker)
            breweryCount(drinker)
            eventCount(drinker)
            wishCount(drinker)
            $state.go('tab.dash.home')
        }//END loadDash

        //when page loads load the dash
        if (document.readyState === "complete") {
            loadDash()
        }
    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);