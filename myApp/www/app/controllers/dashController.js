angular.module('BeerApp')
    .controller('DashCtrl', function ($scope, $state, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
        $scope.name = ""
        $scope.photo = ""
        $scope.count = 0
        $scope.breweries = []
        function loadDash() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            console.log(drinker.photoURL)
            $scope.photo = drinker.photoURL
            BeerFactory.getMarkers().then(data => {
                $timeout(function () {
                   console.log()
                }, 1)
                $scope.count = data.length
                console.log($scope.count)
            })
        }
        if (document.readyState === "complete") {
            loadDash();
        } 
    });