import { old } from '$utils/old';
import { swiper } from '$utils/swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  old();
  swiper();
});
