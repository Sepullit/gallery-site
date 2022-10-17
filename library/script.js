window.addEventListener("DOMContentLoaded", function () {
 // s e a r c h - m o b i l e

 // открытие
 document.querySelector('.header__btn-search-mobile').addEventListener('click', () => {
   document.querySelector('.search-mobile').classList.add('search-mobile-open');
   document.querySelector('.header__btn-search-mobile').classList.add('header__btn-search-mobile-disable');
 })

 // закрытие
 document.querySelector('.search-mobile__btn-close').addEventListener('click', () => {
   document.querySelector('.search-mobile').classList.remove('search-mobile-open');
   document.querySelector('.header__btn-search-mobile').classList.remove('header__btn-search-mobile-disable');
 })


//  T i m e  

function date_time() {
  var d = new Date();
  var month_num = d.getMonth()
  var day = d.getDate();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  
  month=new Array("января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря");
  
  if (day <= 9) day = "0" + day;
  if (hours <= 9) hours = "0" + hours;
  if (minutes <= 9) minutes = "0" + minutes;
  if (seconds <= 9) seconds = "0" + seconds;
  
  return day+" "+month[month_num]+","+hours+":"+minutes;
  }
  setInterval(function () {
    document.getElementById('clock').innerHTML = date_time();
}, 1000);

  date_time();

  // H e a d e r - d r o p d o w n

  const params = {
    btnClassName: "header__tab-btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });

  // H e r o - s w i p e r

  const swiper = new Swiper('.hero__swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

  });


  // G a l l e r y - g r o p d o w n

  const element = document.querySelector('#galleryFilter');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });

  let ariaLabel = element.getAttribute('aria-label');
  element.closest('.choices').setAttribute('aria-label', ariaLabel);

  // G a l l e r y - s w i p e r

  const gallerySwiper = new Swiper('.gallery__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 1,

    grid: {
      rows: 1,
      fill: 'row'
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      paginationBulletMessage: 'Переход к слайду {{index}}'
    },
    keyboard: true,
    breakpoints: {
      // when window width is >= 420px
      421: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },
      // when window width is >= 970px
      971: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      // when window width is >= 1280px
      1281: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    }
  });


  // C a t a l o g - a c c o r d i o n

  $(".accordion").accordion({
    icons: false,
    heightStyle: "content",
    collapsible: true,
    active: 0,
  });

  // C a t a l o g - t a b s

  document.querySelectorAll('.accordion__artist-btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;
      const mainElementWidth = document.documentElement.clientWidth;
      if(mainElementWidth <= 680){
        setScrollitoView()
      }
      document.querySelectorAll('.accordion__artist-btn').forEach(function (btn) {
        btn.classList.remove('accordion__artist-btn--active')
      });
      e.currentTarget.classList.add('accordion__artist-btn--active');

      document.querySelectorAll('.artist__item').forEach(function (tabsBtn) {
        tabsBtn.classList.remove('artist__item--active')
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('artist__item--active');
    });
  });

  
  // C a t a l o g - m o b i l e - scroll

  function setScrollitoView(top) {
    const selectedItem = document.querySelector('.artist')
    selectedItem.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }

  // E v e n t s - s l i d e r

  const eventsSwiper = new Swiper('.events__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: 'row'
    },
    // Navigation arrows
    navigation: {
      nextEl: '.events__button-next',
      prevEl: '.events__button-prev',
    },
    pagination: {
      el: '.events__slider-pagination',
      clickable: true,
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      paginationBulletMessage: 'Переход к слайду {{index}}'
    },
    breakpoints: {
      // when window width is >= 680px
      681: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },
      // when window width is >= 970px
      971: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27
      },
      // when window width is >= 1280px
      1281: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }

  });

  //P r o j e c t s    t o o l t i p s
  
  tippy('.projects__tooltip-btn', {
    theme: 'custom',
    trigger: 'click',
  });

  //P r o j e c t s - s l i d e r

  const projectsSwiper = new Swiper('.projects__slider', {
    // Optional parameters
    //кол-во слайдов для показа
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: 'row'
    },
    navigation: {
      nextEl: '.projects__slider-btn-next',
      prevEl: '.projects__slider-btn-prev',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    breakpoints: {
      // when window width is >= 680px
      681: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      // when window width is >= 970px
      971: {
        slidesPerView: 2,
        spaceBetween: 50,

      },
      // when window width is >= 1280px
      1281: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    }


  });

  //M a s k
  
  var selector = document.getElementById("tel");

  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  // V a l i d a t i o n

  const validation = new JustValidate('#form', {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      fontSize: '12px',
      color: '#D11616',
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше Имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Введите 2 и более символа',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Максимальное количество символов 15',
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ ]{1,28}[a-zA-Zа-яА-ЯёЁ]$/,
        errorMessage: 'Недопустимый формат',
      },
    ])
    .addField('#tel', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш телефон'
      },
      {
        validator: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Недопустимый формат',
      },
    ]);

// M a p

  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.760382812669974, 37.61402491528322],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "360px", right: "15px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "270px", right: "15px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');


    var myPlacemark = new ymaps.Placemark([55.760382812669974, 37.61402491528322], {
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: './img/icons/point.svg',
      // Размеры метки.
      iconImageSize: [20, 20],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-10, -8]
    });
    //Размещение геобъекта на карте
    myMap.geoObjects.add(myPlacemark);
  };

   // M O D A L 

   class Modal {
    constructor(options) {
      let defaultOptions = {
        isOpen: () => { },
        isClose: () => { },
      }
      this.options = Object.assign(defaultOptions, options);
      this.modal = document.querySelector('.modal');
      this.speed = false;
      this.isOpen = false;
      this.modalContainer = false;
      this.previousActiveElement = false;
      this.fixBlocks = document.querySelectorAll('.fix-block');
      this.focusElements = [
        'a[href]',
        'input',
        'button',
        'select',
        'textarea',
        '[tabindex]'
      ];
      this.events();
    }

    events() {
      if (this.modal) {
        document.addEventListener('click', function (e) {
          const clickedElement = e.target.closest('[data-role="show-modal"]');
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let speed = clickedElement.dataset.speed;
            this.speed = speed ? parseInt(speed) : 300;
            this.modalContainer = document.querySelector(`[data-target="${target}"]`);
            this.open();
            return;
          }

          if (e.target.closest('.modal-close')) {
            this.close();
            return;
          }
        }.bind(this));

        window.addEventListener('keydown', function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }

        }.bind(this));

        this.modal.addEventListener('click', function (e) {
          if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
            this.close();
          }
        }.bind(this));
      }
    }

    open() {
      this.previousActiveElement = document.activeElement;

      this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
      this.modal.classList.add('is-open');
      this.disableScroll();
      this.modalContainer.classList.add('modal-open');

      setTimeout(() => {
        this.options.isOpen(this);
        this.isOpen = true;
        this.focusTrap();
      }, this.speed);
    }

    close() {
      if (this.modalContainer) {
        this.modal.classList.remove('is-open');
        this.modalContainer.classList.remove('modal-open');

        this.enableScroll();
        this.options.isClose(this);
        this.isOpen = false;
        this.focusTrap();
      }
    }

    focusCatch(e) {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }

      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }

    focusTrap() {
      const focusable = this.modalContainer.querySelectorAll(this.focusElements);
      if (this.isOpen) {
        focusable[0].focus();
      } else {
        this.previousActiveElement.focus();
      }
    }

    disableScroll() {
      let pagePosition = window.scrollY;
      this.lockPadding();
      document.body.classList.add('disable-scroll');
      document.body.dataset.position = pagePosition;
      document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
      let pagePosition = parseInt(document.body.dataset.position, 10);
      this.unlockPadding();
      document.body.style.top = 'auto';
      document.body.classList.remove('disable-scroll');
      window.scroll({ top: pagePosition, left: 0 });
      document.body.removeAttribute('data-position');
    }

    lockPadding() {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
      this.fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
    }
  }

  // modal-window
  const modal = new Modal({});
})


