angular
    .module("BeerApp")
    .controller("BeerCtrl", function (BeerFactory, $timeout, $scope) {
        $scope.beers = []
        $scope.query = ""
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
                    }, 1)
                    $scope.beers = data
                    console.log($scope.beers)
                })
            }
        }
    })