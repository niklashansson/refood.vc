import 'swiper/css';

import { Swiper } from 'swiper';
import { Manipulation, Navigation } from 'swiper/modules';

export const swiper = function () {
  const listElements = Array.from(document.querySelectorAll('[swiper="component"]'));

  if (listElements.length === 0) return;

  // Make each instance unique
  const swiperInstances = listElements.map((component, i) => {
    const instance = component.querySelector('.swiper');
    if (!instance) return;
    instance.classList.add(`is-swiper-${i + 1}`);

    const btnNext = component.querySelector('.swiper-next');
    const btnPrev = component.querySelector('.swiper-prev');

    return {
      componentEl: component,
      instance: instance,
      btnNext: btnNext,
      btnPrev: btnPrev,
    };
  });

  // Create swiper
  swiperInstances.forEach((component) => {
    newSwiper(component);
  });

  function newSwiper(component) {
    const options = component.componentEl.getAttribute('swiper-options') || 1;

    const optionVariants = [
      {
        modules: [Navigation, Manipulation],
        speed: 800,
        loop: false,
        grabCursor: true,
        spaceBetween: 24,
        centeredSlides: false,
        slidesPerView: 4,
        preventClicksPropagation: false,
        navigation: {
          nextEl: component.btnNext,
          prevEl: component.btnPrev,
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.125,
            spaceBetween: 24,
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // when window width is >= 992px
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      },
    ];

    // Creates swiper if there are elements/nodes in swiper wrapper
    if (component.instance.querySelector('.swiper-wrapper').children.length >= 1) {
      const swiper = new Swiper(component.instance, optionVariants[options - 1]);
    }
  }
};
