angular.module('BeerApp')
    .controller('MapCtrl', function ($scope, $state, $ionicLoading, BeerFactory) {
        $scope.markers = []
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
                        markerSpot = new google.maps.LatLng(markerEl.lat, markerEl.lng);
                        // Add the markerto the map
                        let marker = new google.maps.Marker({
                            animation: google.maps.Animation.DROP,
                            position: markerSpot,
                            map: map
                        });
                        windowContent =
                        "<h4>" + markerEl.name + "</h4>" +
                        '<a href="markerEl.website">' + markerEl.website + "</a>";
                        
                        
                    }
                            marker.addListener('click',  function() {
                                let infoWindow = new google.maps.InfoWindow
                                content: windowContent
                            })
                    
                    
                    
    
                  
                });
            }// END of place Markers
            $scope.map = map;
            placeMarkers();
            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById("map"), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });

        }//END intialize

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
              return;
            }
        
            $scope.loading = $ionicLoading.show({
              content: 'Getting current location...',
              showBackdrop: false
            });
        
            navigator.geolocation.getCurrentPosition(function (pos) {
              console.log('Got pos', pos);
              $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $scope.loading.hide();
            }, function (error) {
              alert('Unable to get location: ' + error.message);
            });
          };
        if (document.readyState === "complete") {
            initialize();
        } else {
            google.maps.event.addDomListener(window, 'load', initialize);
        }

    });