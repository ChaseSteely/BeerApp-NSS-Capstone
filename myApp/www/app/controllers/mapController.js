angular.module('BeerApp')
    .controller('MapCtrl', function ($scope, $state,  $timeout, $ionicLoading, BeerFactory, AuthFactory) {
        // $scope.markers = []
        function initialize() {
            let mapOptions = {
                center: new google.maps.LatLng(36.161049, -86.777223),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById("map"), mapOptions)

            function placeMarkers() {
                //Get all of the markers from factory
                BeerFactory.getMarkers().then(data => {
                    console.log("Markers: ", data);
                    $scope.markers = data;
                    for (let i = 0; i < data.length; i++) {
                        markerEl = data[i];
                        markerSpot = new google.maps.LatLng(markerEl.brewery.location.brewery_lat, markerEl.brewery.location.brewery_lng);
                        // Add the markerto the map
                        let marker = new google.maps.Marker({
                            animation: google.maps.Animation.DROP,
                            position: markerSpot,
                            map: map
                        });

                        windowContent =
                            "<h4>" + markerEl.brewery.brewery_name + "</h4>" +
                            '<a href="' + markerEl.brewery.contact.url + '"target="_blank">' + markerEl.brewery.contact.url + "</a>";


                        marker.addListener('click', function () {
                            map.setZoom(15);
                            infowindow.open(map, marker);
                        });
                        let infowindow = new google.maps.InfoWindow({
                            content: windowContent
                        });
                        google.maps.event.addListener(infowindow, 'closeclick', function () {
                            map.setZoom(12);
                            map.setCenter({ lat: 36.161049, lng: -86.777223 })
                        });

                    }//END for Loop

                });//END of then
            }// END of place Markers
            $scope.map = map;
            placeMarkers();
            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById("map"), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });

        }//END intialize

        $scope.showVisited = function () {
            let mapOptions = {
                center: new google.maps.LatLng(39.8097343, -98.5556199),
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById("map"), mapOptions)

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
                        markerSpot = new google.maps.LatLng(markerEl.data.brewery.location.brewery_lat, markerEl.data.brewery.location.brewery_lng);
                        // Add the markerto the map
                        let marker = new google.maps.Marker({
                            animation: google.maps.Animation.DROP,
                            position: markerSpot,
                            map: map
                        });

                        windowContent =
                            "<h4>" + markerEl.data.brewery.brewery_name + "</h4>" +
                            '<a href="' + markerEl.data.brewery.contact.url + '"target="_blank">' + markerEl.data.brewery.contact.url + "</a>";


                        marker.addListener('click', function () {
                            map.setZoom(15);
                            infowindow.open(map, marker);
                        });
                        let infowindow = new google.maps.InfoWindow({
                            content: windowContent
                        });
                        google.maps.event.addListener(infowindow, 'closeclick', function () {
                            map.setZoom(3);
                            map.setCenter({ lat: 39.8097343, lng: -98.5556199 })
                        });

                    }//END for Loop

                })//END of then
            }// END of place Markers
            $scope.map = map;
            placeMarkers();
            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById("map"), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });
        }//END showVisited

        if (document.readyState === "complete") {
            initialize();
        } else {
            google.maps.event.addDomListener(window, 'load', initialize);
        }

    });