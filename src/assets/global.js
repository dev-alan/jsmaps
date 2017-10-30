require('./jsmaps/jsmaps-libs.js');
require('./jsmaps/jsmaps-panzoom.js');
require('./jsmaps/jsmaps.min.js');

$(function() {
  $('#map-australia').JSMaps({
    mapFolder: 'js/',
    map: 'australia'
  });
});