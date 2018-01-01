angular.module('BeerApp')
    .controller('DashHomeCtrl', function ($scope, $state, $ionicModal, $stateParams, $ionicLoading, $timeout, BeerFactory, AuthFactory, $ionicScrollDelegate) {
        $scope.name = ""
        $scope.photo = ""
        $scope.uniqueBeers = 0

        

        function loadHome() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            $scope.photo = drinker.photoURL
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