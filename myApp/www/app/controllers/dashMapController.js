angular.module('BeerApp')
    .controller('DashMapCtrl', function ($scope, $state, $ionicLoading, $timeout, BeerFactory, AuthFactory) {

        function showVisited() {
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

        //when page loads load the map
        if (document.readyState === "complete") {
            showVisited();
        } else {
            google.maps.event.addDomListener(window, 'load', initialize);
        }
    })
