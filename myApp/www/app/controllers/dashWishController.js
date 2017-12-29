angular.module('BeerApp')
    .controller('DashWishCtrl', function ($scope, $state, $timeout, $ionicLoading, BeerFactory, AuthFactory) {
        $scope.wishes = []
        //get wishlist by current User on tab click
        function getWishList() {
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.wishes = data
                console.log($scope.wishes)
            })
        }//END getWishList()

        $scope.deleteWish = function (id) {
            console.log("deleting", id)
            BeerFactory.wishGranted("false", id, "wishlist")
            let wishEl = document.getElementById(id)
            wishEl.parentNode.removeChild(wishEl)
            drinker = AuthFactory.getUser().uid
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(b => b.wishlist === false)
                $scope.count = result.length
                console.log("beer count", $scope.count)
            })//END refresh beer count
             //get wishlist count
             BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(w => w.wishlist === true)
                $scope.wCount = result.length
                console.log("wishlist count", $scope.wCount)
            })//END refresh wish count
        }//END deleteWish()

         // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Cheers");
        //     }
        //     else $ionicLoading.show({ template: "Cheers", noBackdrop: true, duration: 2000 });
        // }

        //when page loads load the Events
        if (document.readyState === "complete") {
            getWishList()
        }
    })
