angular.module('BeerApp')

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        let myLatLng = {lat: 36.182124, lng: -86.786044};
        let mapOptions = {
          center: new google.maps.LatLng(36.161049, -86.777223),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map($element[0], mapOptions)
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(36.182124, -86.786044),
          animation: google.maps.Animation.DROP,
          title:"Bearded Iris",
          map:map
        });
        marker.addListener('click', showInfo);
        
        function showInfo(){
          var infowindow = new google.maps.InfoWindow({
            content:this.title,
            position: myLatLng,
          });
          infowindow.open(map);
      };

        $scope.onCreate({map: map});
  

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
