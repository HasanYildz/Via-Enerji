'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */

   const slidePrev = function () {

    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }

    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }

  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }

/**
 * HERO SECTION - FADE-IN ON SCROLL
 */

const heroContent = document.querySelector('.hero-content');

if (heroContent) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroContent.classList.add('animate');
      } else {
        heroContent.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.2 // %20 görünürlükte tetiklenir
  });

  observer.observe(heroContent);
}
const options = {
  root: null, // Kök element (yani viewport)
  rootMargin: '0px', // Giriş ve çıkış marjları
  threshold: 0.5 // %50 görünürlük
};

// Service cards'ı alalım
const serviceCards = document.querySelectorAll('.service-card');

// Intersection Observer callback fonksiyonu
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Section görünür olduysa animasyonu başlat
      entry.target.classList.add('show');
    } else {
      // Section görünürlükten çıktığında animasyonu sıfırla
      entry.target.classList.remove('show');
    }
  });
};

// Observer'ı başlatıyoruz
const observer = new IntersectionObserver(observerCallback, options);

// Her bir service card için observer'ı başlat
serviceCards.forEach(card => {
  observer.observe(card);
});

const sliderContainer = document.querySelector('[data-slider-container]');
const sliderItems = document.querySelectorAll('.slider-item');
let currentIndex = 0;
const totalItems = sliderItems.length;
const slideInterval = 4000; // 3 saniye

function showSlide(index) {
  sliderContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex++;

  // Son slayda geldiysek, sağa kaydırarak başa dönüyoruz
  if (currentIndex >= totalItems) {
    currentIndex = 0;

    // Geçiş sıfırlanmasını sağlamak için geçici olarak transition'ı kaldırıyoruz
    sliderContainer.style.transition = 'none';
    sliderContainer.style.transform = `translateX(-${(totalItems - 1) * 100}%)`;

    // Bir kısa süre bekledikten sonra geçişi tekrar başlatıyoruz
    setTimeout(() => {
      sliderContainer.style.transition = 'transform 0.8s ease-in-out'; // Geçişi tekrar açıyoruz
      showSlide(currentIndex); // İlk slaytı göster
    }, 50); // Bekleme süresi
  } else {
    showSlide(currentIndex);
  }
}

// Slider hareketini başlat
setInterval(nextSlide, slideInterval);

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-left');

  function handleScroll() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('show');
      } else {
        el.classList.remove('show'); // İsteğe bağlı: yukarı çıkınca tekrar gizle
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Sayfa yüklendiğinde de kontrol et
});

document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;

    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add('visible'); // Kartı görünür yap
      } else {
        card.classList.remove('visible'); // Kartı gizle
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Sayfa yüklendiğinde kartları kontrol et
});
