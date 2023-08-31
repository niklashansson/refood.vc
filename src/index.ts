import { old } from '$utils/old';
import { swiper } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  old();
  swiper();
});

/* 
<script defer src="https://cdn.jsdelivr.net/gh/niklashansson/refood.vc@bd9803aa8f86b4e29fb90205121adc436e3447fc2/dist/index.js"></script> */
