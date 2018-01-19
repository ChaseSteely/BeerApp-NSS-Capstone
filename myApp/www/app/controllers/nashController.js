angular.module('BeerApp')
    .controller('NashCtrl', function ($scope, $state, $timeout, $ionicLoading, BeerFactory, $ionicModal, AuthFactory) {

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
                    $scope.markers = data;
                    for (let i = 0; i < data.length; i++) {
                        markerEl = data[i];
                        markerSpot = new google.maps.LatLng(markerEl.brewery.location.brewery_lat, markerEl.brewery.location.brewery_lng);
                        // Add the marker to the map
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

        if (document.readyState === "complete") {
            initialize();
        } else {
            google.maps.event.addDomListener(window, 'load', initialize);
        }

    });