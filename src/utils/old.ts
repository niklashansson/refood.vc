import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export const old = function () {
  document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    // Elements for GSAP animations
    const cardGroups = document.querySelectorAll('[card-animation="cardGroup"]');
    const cards = document.querySelectorAll('[card-animation="card"]');
    const headlineAnim1 = document.querySelectorAll('[headline-1]');
    const paragraphAnim1 = document.querySelectorAll('[paragraph-1]');

    // Elements for Dynamic Nav
    const sections = document.querySelectorAll('[dynamic-nav]');
    const hamburgerLines = document.querySelectorAll('.menu-icon-line');
    const navLogo = document.querySelector('[dynamic-nav="logo"]');
    const navbar = document.querySelector('.navbar_component');
    const navbarMenu = document.querySelector('.navbar_menu');
    const navbarMenuBtn = document.querySelector('.navbar_menu-button');

    /// ANIMATIONS WITH GSAP ///

    cards.forEach((card) => {
      const linkIcon = card.querySelector('.text-font-icons');

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.2,
          ease: 'ease',
        });
        gsap.fromTo(
          linkIcon,
          {
            marginLeft: 0,
            ease: 'ease',
          },
          {
            marginLeft: 8,
            ease: 'ease',
          }
        );
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: 'ease',
        });
        gsap.to(linkIcon, {
          marginLeft: 0,
          ease: 'ease',
        });
      });
    });

    window.addEventListener('DOMContentLoaded', (e) => {
      const typeSplit = new SplitType('[text-split]', {
        types: 'words, chars',
        tagName: 'span',
      });

      function createScrollTrigger(triggerEl, timeline) {
        ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top bottom',
          onLeaveBack: () => {
            // timeline.progress(0);
            timeline.pause();
          },
        });
        ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 60%',
          onEnter: () => {
            timeline.play();
          },
        });
      }

      cardGroups.forEach(function (i) {
        const test = [...i.childNodes];
        const tl = gsap.timeline({ paused: true });
        tl.from(test, {
          opacity: 0,
          y: 20,
          duration: 0.25,
          stagger: 0.15,
        });
        createScrollTrigger(test, tl);
      });

      headlineAnim1.forEach(function (i) {
        const test = i.querySelectorAll('.word');
        const tl = gsap.timeline({ paused: true });
        tl.from(i.querySelectorAll('.word'), {
          yPercent: 20,
          opacity: 0,
          duration: 0.2,
          ease: 'ease',
          stagger: {
            amount: 0.25,
          },
        });
        createScrollTrigger(test, tl);
      });

      paragraphAnim1.forEach(function (i) {
        const tl = gsap.timeline({ paused: true });
        tl.from(i, {
          yPercent: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'easeInOut',
        });
        createScrollTrigger(i, tl);
      });
    });

    // DYNAMIC NAV FUNCTIONS //

    window.addEventListener('scroll', function () {
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.pageYOffset >= sectionTop - 40) {
          currentSection = section.getAttribute('dynamic-nav');
        }
      });

      if (currentSection === 'dark-section') {
        hamburgerLines.forEach((line) => {
          line.style.backgroundColor = 'white';
          navLogo.src =
            'https://uploads-ssl.webflow.com/643c2882bfd19528797a0d52/643c2b44e4f9dfb235e325a9_63f36f286b5db1ec59adb46f_GULLSPANG_Re_food_logo_V1_peas_RGB%20(1)-p-500.webp';
        });

        if (window.pageYOffset > 100) {
          navbar?.classList.remove('is-blurred-light');
          navbar?.classList.add('is-blurred-dark');
        }
      } else if (currentSection === 'light-section') {
        hamburgerLines.forEach((line) => {
          line.style.backgroundColor = '#254137';
          navLogo.src =
            'https://uploads-ssl.webflow.com/643c2882bfd19528797a0d52/643c5134fbba3257a34416b1_63f370a2c736fa1eae541abd_GULLSPANG_Re_food_logo_V1_kale_RGB.webp';
        });
        if (window.pageYOffset > 100) {
          navbar?.classList.remove('is-blurred-dark');
          navbar?.classList.add('is-blurred-light');
        }
      }

      if (window.pageYOffset < 100) {
        navbar?.classList.remove('is-blurred-dark');
        navbar?.classList.remove('is-blurred-light');
      }
    });

    navbarMenuBtn?.addEventListener('click', () => {
      if (navbar?.classList.contains('is-blurred-light') && navbarMenu.style.display !== 'block') {
        hamburgerLines.forEach((line) => {
          line.style.backgroundColor = 'white';
          navLogo.src =
            'https://uploads-ssl.webflow.com/643c2882bfd19528797a0d52/643c2b44e4f9dfb235e325a9_63f36f286b5db1ec59adb46f_GULLSPANG_Re_food_logo_V1_peas_RGB%20(1)-p-500.webp';
        });
      } else if (
        navbar?.classList.contains('is-blurred-light') &&
        navbarMenu.style.display == 'block'
      ) {
        hamburgerLines.forEach((line) => {
          line.style.backgroundColor = '#254137';
          navLogo.src =
            'https://uploads-ssl.webflow.com/643c2882bfd19528797a0d52/643c5134fbba3257a34416b1_63f370a2c736fa1eae541abd_GULLSPANG_Re_food_logo_V1_kale_RGB.webp';
        });
      }
    });

    const companiesListWrapper = document.querySelector(
      '[team-member-js="companies-list-wrapper"]'
    );
    const storiesListWrapper = document.querySelector('[team-member-js="stories-list-wrapper"]');
    const companiesComponent = document.querySelector('[team-member-js="companies-component"]');
    const storiesComponent = document.querySelector('[team-member-js="stories-component"]');

    companiesListWrapper?.firstElementChild?.classList.contains('w-dyn-empty')
      ? (companiesComponent.style.display = 'none')
      : null;

    storiesListWrapper?.firstElementChild?.classList.contains('w-dyn-empty')
      ? (storiesComponent.style.display = 'none')
      : null;
  });
};
