angular.module('BeerApp')
    .controller('DashCtrl', function ($scope, $state, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
        $scope.name = ""
        $scope.photo = ""
        $scope.count = 0
        $scope.beers = []
        $scope.breweries = []
        $scope.wishes = []
        
        function loadDash() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            $scope.photo = drinker.photoURL
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.count = data.length
                console.log($scope.count)
            })
        }//END loadDash

        //get beers logged by current User on tab click
         $scope.getBeerLog = function () {
            $scope.wishes = []
            $scope.breweries = []
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.count = data.length
                $scope.beers = data
                console.log($scope.beers)
            })
        }

         $scope.getWishList = function () {
            $scope.beers = []
            $scope.breweries = []
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.wishes = data
                console.log($scope.wishes)
            })
        }

         $scope.getBreweryLog = function () {
            $scope.wishes = []
            $scope.beers = []
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBreweries(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.breweries = data
                console.log($scope.breweries)
            })
        }

        //when page loads load the dash
        if (document.readyState === "complete") {
            loadDash()
        }

        // function untapAuth() {

        // }
    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);