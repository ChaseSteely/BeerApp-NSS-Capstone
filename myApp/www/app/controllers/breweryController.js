angular
    .module("BeerApp")
    .controller("BreweryCtrl", function (BeerFactory, $timeout, $scope) {
        $scope.breweries = []
        /**
         * Use factory to get all breweries from Firebase
         */
        // BeerFactory.getMarkers().then(data => {
        //     $scope.breweries = data
        // })
        $scope.$on('$viewContentLoaded', function (event) {

            BeerFactory.getMarkers().then(data => {
                $timeout(function () {
                    console.log()
                }, 1)
                $scope.breweries = data
            })
        })

    })