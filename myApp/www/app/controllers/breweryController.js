angular
.module("BeerApp")
.controller("BreweryCtrl", function (BeerFactory,$timeout, $scope) {
    $scope.breweries = []
    /**
     * Use factory to get all breweries from Firebase
     */ 
    // BeerFactory.getMarkers().then(data => {
    //     $scope.breweries = data
    // })
    $scope.$on('$viewContentLoaded', function(event) {
        if (!BeerFactory.cache) {
            console.info("No cached data")
            BeerFactory.getMarkers().then(data => {
                $timeout(function () {
                   console.log()
                }, 1)
                $scope.breweries = data
            })
        } else {
            console.info("Using cached data")
            $scope.breweries = BeerFactory.cache
        }
    })

})