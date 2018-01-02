angular.module('BeerApp')
    .controller('DashHomeCtrl', function ($scope, $state, $ionicModal, $stateParams, $ionicLoading, $timeout, BeerFactory, AuthFactory, $ionicScrollDelegate) {
        $scope.name = ""
        $scope.photo = ""
        $scope.uniqueBeers = 0
        $scope.localBeers = 0
        let uCount = []
        let localCount = []
   
        //get beer count
        function uniqueBeerCount(drinker) {
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(b => b.wishlist === false)
                for (i = 0; i < result.length; i++) {
                    if (uCount.indexOf(result[i].data.beer.bid) === -1) {
                        uCount.push(result[i].data.beer.bid);
                    }
                }
                $scope.uniqueBeers = uCount.length
                console.log(uCount)
            })
        }

        function localBeerCount(drinker) {
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(b => b.wishlist === false)
                for (i = 0; i < result.length; i++) {
                    if (localCount.indexOf(result[i].data.beer.bid) === -1) {
                        localCount.push(result[i]);
                    }
                }
                console.log(localCount)
                local = localCount.filter(b => b.data.beer.brewery.location.brewery_city === "Nashville" || b.data.beer.brewery.location.brewery_city === "Murfreesboro" || b.data.beer.brewery.location.brewery_city === "Franklin" || b.data.beer.brewery.location.brewery_city === "HENDERSONVILLE" || b.data.beer.brewery.location.brewery_city === "Nolensville" || b.data.beer.brewery.location.brewery_city === "Gallatin" || b.data.beer.brewery.location.brewery_city === "Nashville")
                $scope.localBeers = local.length
                console.log(local)
            })
        }


        function loadHome() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            $scope.photo = drinker.photoURL
            uniqueBeerCount(drinker)
            localBeerCount(drinker)
        }


        //when page loads load the dash
        if (document.readyState === "complete") {
            loadHome()
        }
    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);