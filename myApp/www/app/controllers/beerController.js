angular
    .module("BeerApp")
    .controller("BeerCtrl", function (BeerFactory, $timeout, $scope, $cordovaCamera, $cordovaFile) {
        $scope.beers = []
        $scope.query = ""
        let b64Img = ""
        /**
         * Use factory to get all breweries from Firebase
         */
        // BeerFactory.getMarkers().then(data => {
        //     $scope.breweries = data
        // })
        $scope.finder = (event, query) => {
            if (event.key === "Enter") {
                BeerFactory.searchUntappd(query).then(data => {
                    $timeout(function () {
                        console.log()
                    }, 100)
                    $scope.beers = data
                    console.log($scope.beers)
                })
            }
        }
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log(navigator.camera);
        }
    })

    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);