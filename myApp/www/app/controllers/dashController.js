angular.module('BeerApp')
    .controller('DashCtrl', function ($scope, $state, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
        $scope.name = ""
        $scope.photo = ""
        $scope.count = 0
        $scope.beers = []
        
        function loadDash() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            $scope.photo = drinker.photoURL
            BeerFactory.getMarkers().then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.count = data.length
                console.log($scope.count)
            })

        }//END loadDash
        function getBeerLog() {
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.beers = data
                console.log($scope.beers)
            })
        }
        if (document.readyState === "complete") {
            loadDash()
            getBeerLog()
        }

        // function untapAuth() {

        // }
    });