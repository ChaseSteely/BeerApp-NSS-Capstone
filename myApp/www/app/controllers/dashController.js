angular.module('BeerApp')
    .controller('DashCtrl', function ($scope, $state, $ionicModal, $ionicLoading, $timeout, BeerFactory, AuthFactory) {
        $scope.name = ""
        $scope.photo = ""
        $scope.count = 0
        $scope.eCount = 0
        $scope.bCount = 0
        $scope.wCount = 0

         //Ionic code needed to show and close Modal
         $ionicModal.fromTemplateUrl('./app/partials/mapModal.html', {
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
        };
        $scope.hideModal = function () {
            $scope.modal.hide();
        };

        function loadDash() {
            drinker = AuthFactory.getUser()
            $scope.name = drinker.displayName
            $scope.photo = drinker.photoURL
            //get beer count
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(b => b.wishlist === false)
                $scope.count = result.length
                console.log("beer count", $scope.count)
            })
            //get brewery count
            BeerFactory.getLoggedBreweries(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.bCount = data.length
                console.log("brewery count", $scope.bCount)
            })
            //get wishlist count
            BeerFactory.getLoggedBeers(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                result = data.filter(w => w.wishlist === true)
                $scope.wCount = result.length
                console.log("wishlist count", $scope.wCount)
            })
            //get event count
            BeerFactory.getUserEvents(drinker.uid).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)
                $scope.eCount = data.length
                console.log("event count", $scope.eCount)
            })
        }//END loadDash

        

        $scope.showVisited = function () {
            $scope.openModal()
            let mapOptions = {
                center: new google.maps.LatLng(39.8097343, -98.5556199),
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let dashMap = new google.maps.Map(document.getElementById("mapDash"), mapOptions)

            function placeMarkers() {
                //Get all of the markers from factory
                drinker = AuthFactory.getUser().uid
                BeerFactory.getLoggedBreweries(drinker).then(data => {
                    $timeout(function () {
                        console.log()
                    }, 100)
                    console.log("Markers: ", data);
                    $scope.markers = data;
                    for (let i = 0; i < data.length; i++) {
                        markerEl = data[i];
                        markerSpot = new google.maps.LatLng(markerEl.brewery.brewery.location.brewery_lat, markerEl.brewery.brewery.location.brewery_lng);
                        // Add the markerto the map
                        let mk = new google.maps.Marker({
                            animation: google.maps.Animation.DROP,
                            position: markerSpot,
                            map: dashMap
                        });

                        windowContent =
                            "<h4>" + markerEl.brewery.brewery.brewery_name + "</h4>" +
                            '<a href="' + markerEl.brewery.brewery.contact.url + '"target="_blank">' + markerEl.brewery.brewery.contact.url + "</a>";


                        mk.addListener('click', function () {
                            dashMap.setZoom(15);
                            infowindow.open(dashMap, mk);
                        });
                        let infowindow = new google.maps.InfoWindow({
                            content: windowContent
                        });
                        google.maps.event.addListener(infowindow, 'closeclick', function () {
                            dashMap.setZoom(3);
                            dashMap.setCenter({ lat: 39.8097343, lng: -98.5556199 })
                        });

                    }//END for Loop

                })//END of then
            }// END of place Markers
            $scope.map = dashMap;
            placeMarkers();
            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById("mapDash"), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });
        }//END showVisited

        //when page loads load the dash
        if (document.readyState === "complete") {
            loadDash()
        }
    })

    //I have to use this to return the beer and brewery labels from Untappd API
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);