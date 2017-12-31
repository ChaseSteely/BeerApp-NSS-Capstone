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
            $state.reload($state.current.name);
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
