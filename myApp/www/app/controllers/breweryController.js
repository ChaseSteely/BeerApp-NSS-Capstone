//Brewery Controller
//Author: Chase Steely
//Purpose: To search for breweries in Untappd API and show details of brewery selected and allows for user to log a brewery they visit.

angular
    .module("BeerApp")
    .controller("BreweryCtrl", function (BeerFactory, $timeout, $ionicLoading, $scope, Firebase_Config, $ionicModal, $ionicScrollDelegate) {
        $scope.breweries = []
        $scope.infos = []
        $scope.brewLog = {}
        $scope.query = ""
        $scope.count = ""

        //Ionic scroll delegate.
        $scope.scrollMainToTop = function () {
            $ionicScrollDelegate.scrollTop(true);
        };

        //Ionic code needed to show and close Modal
        $ionicModal.fromTemplateUrl('./app/partials/breweryInfoModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        };

        //Log Brewery if that is the one you are visiting
        $scope.closeModal = function (event) {
            $scope.modal.hide();
            let bID = parseInt(event.target.id)
            BeerFactory.visitBrewery(bID).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.brewLog = {
                 "brewery": data,
                 "dateLogged": Date.now(),
                 "uid": firebase.auth().currentUser.uid,
                 "visited": true
                }
                bLog = $scope.brewLog
                BeerFactory.logBrewery(bLog)
            })
        };
        $scope.hideModal = function () {
            $scope.modal.hide();
        };

        // Use query from search bar to make a call to Untappd API
        $scope.finder = (event, query) => {
            if (event.key === "Enter") {
                BeerFactory.searchBrewery(query).then(data => {
                    $timeout(function () {
                        console.log()
                    }, 100)
                    if (data.brewery.count === 0 ){
                        $scope.count = "No Results"

                    }else {
                        $scope.count = ""
                    }
                    $scope.breweries = data
                    console.log($scope.breweries)
                })
            }

        }
        //Shows modal of the Brewery selected from search
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

        // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Thanks for Visiting!");
        //     }
        //     else $ionicLoading.show({ template: "Thanks for Visiting!", noBackdrop: true, duration: 2000 });
        // }

    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);