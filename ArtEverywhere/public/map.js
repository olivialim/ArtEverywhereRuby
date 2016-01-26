function initialize() {
  var mapOptions = {
    center: { lat: 41.8369, lng: -87.6847},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var marker = new google.maps.Marker({
    position: { lat: 41.8369, lng: -87.6847},
    map: map,
  });
}

google.maps.event.addDomListener(window, 'load', initialize);