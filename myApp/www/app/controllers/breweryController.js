angular
    .module("BeerApp")
    .controller("BreweryCtrl", function (BeerFactory, $timeout, $ionicLoading, $scope, Firebase_Config, $ionicModal) {

        $scope.breweries = []
        $scope.infos = []
        $scope.brewLog = {}
        $scope.query = ""
        /**
         * Use factory to get all breweries from Firebase
         */
        $ionicModal.fromTemplateUrl('../../partials/breweryInfoModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function (event) {
            debugger
            $scope.modal.hide();
            let bID = parseInt(event.target.id)
            console.log(bID)
            BeerFactory.visitBrewery(bID).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)

                $scope.brewLog = {
                    "data": data,
                    "visited": true,
                    "dateLogged": Date.now(),
                    "uid": firebase.auth().currentUser.uid,
                }

                bLog = $scope.brewLog
                BeerFactory.logBrewery(bLog)
                // create a toast with settings:
            })
        };

        //  Use factory to get all breweries from Firebase
        $scope.finder = (event, query) => {
            if (event.key === "Enter") {
                BeerFactory.searchBrewery(query).then(data => {
                    $timeout(function () {
                        console.log()
                    }, 100)
                    $scope.breweries = data
                    console.log($scope.breweries)
                })
            }

        }
        $scope.showInfo = function (event) {
            $scope.openModal()
            let bID = parseInt(event.target.id)
            console.log(bID)
            BeerFactory.visitBrewery(bID).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)

                $scope.infos = data
                console.log($scope.infos)
            })

        }



        // $scope.checkIn = function (event) {
        //     $scope.modal.hide();
        //     let bID = parseInt(event.target.id)
        //     console.log(bID)
        //     BeerFactory.visitBrewery(bID).then(data => {
        //         $timeout(function () {
        //             console.log()
        //         }, 100)

        //         $scope.brewLog = {
        //             "data": data,
        //             "visited": true,
        //             "dateLogged": Date.now(),
        //             "uid": firebase.auth().currentUser.uid,
        //         }

        //         bLog = $scope.brewLog
        //         BeerFactory.logBrewery(bLog)
        //         // create a toast with settings:
        //     })

        // }

        // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Thanks for Visiting!");
        //     }
        //     else $ionicLoading.show({ template: "Thanks for Visiting!", noBackdrop: true, duration: 2000 });
        // }

    })


    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);