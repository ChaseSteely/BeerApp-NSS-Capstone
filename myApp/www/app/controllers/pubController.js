angular.module('BeerApp')
    .controller('PubCtrl', function ($scope, $state, $timeout, $ionicLoading, BeerFactory, AuthFactory) {
        $scope.pubs = []
        function loadPub() {
            BeerFactory.pub().then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.pubs = data
                console.log($scope.pubs)
            })
        }
        // Add beer to wishlist
        $scope.addWishlist = function (event) {
            let bID = parseInt(event.target.id)
            console.log(bID)
            BeerFactory.beerMe(bID).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)

                $scope.beerLog = {
                    "data": data,
                    "wishlist": true,
                    "dateLogged": Date.now(),
                    "uid": firebase.auth().currentUser.uid
                }

                bLog = $scope.beerLog
                BeerFactory.logBeer(bLog)

            })

        }

        //when page loads load the Events
        if (document.readyState === "complete") {
            loadPub()
        }
    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);