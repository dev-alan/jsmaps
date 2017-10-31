require('./jsmaps/jsmaps-libs.js');
require('./jsmaps/jsmaps-panzoom.js');
require('./jsmaps/jsmaps.min.js');

const body = document.querySelector('body');
const mobileTrigger = document.querySelector('#mobile-menu-trigger');

mobileTrigger.addEventListener('click', e => {
  e.preventDefault;
  body.getAttribute('data-menu-open') === 'true' ? body.setAttribute('data-menu-open', 'false') : body.setAttribute('data-menu-open', 'true');
});

$(function() {
  let pathName = '';
  $('#map-australia').JSMaps({
    mapFolder: 'js/',
    map: 'australia'
  });

  $('#page-content .tile-carousel').each(function(i, el){
    $(el).owlCarousel({
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        767: {
          items: 3
        },
        991: {
          items: 4
        },
        1199: {
          items: 5
        }
      },
      loop: true,
      dots: false,
      nav: true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
    });
  });
});