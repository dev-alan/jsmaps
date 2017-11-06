
$(function () {
  const body = document.querySelector('body');
  const mobileTrigger = document.querySelector('#mobile-menu-trigger');

  let page = {
    init() {
      this.loadMobileMenu();
      this.loadCarousel();
      this.loadBackgroundImages();
    },
    loadBackgroundImages() {
      Array.prototype.slice.call(document.querySelectorAll('[data-background]')).forEach((el) => {
        el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')';
      });
    },
    loadCarousel() {
      $('#page-content .tile-carousel').each(function (i, el) {
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
          navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
        });
      });
    },
    loadMobileMenu() {
      mobileTrigger.addEventListener('click', e => {
        e.preventDefault;
        body.getAttribute('data-menu-open') === 'true' ? body.setAttribute('data-menu-open', 'false') : body.setAttribute('data-menu-open', 'true');
      });
    },
  }
  page.init();
});
