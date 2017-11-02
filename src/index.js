require('typeface-nunito-sans');
require('typeface-lato');
require('font-awesome/less/font-awesome.less');
require('bootstrap/scss/bootstrap.scss');
require('./assets/eve/eve.js');
require('webpack-raphael');
require('owl.carousel');
require('owl.carousel/dist/assets/owl.carousel.css');
require('./assets/index.less');
require('./assets/global.js');
require('./assets/img/logo-main.png');

require('./assets/jsmaps/jsmaps-libs.js');
require('./assets/jsmaps/jsmaps-panzoom.js');
require('./assets/jsmaps/jsmaps.min.js');

$(function(){
  $('#map-australia').JSMaps({
    mapFolder: 'js/',
    map: 'australia'
  });
});