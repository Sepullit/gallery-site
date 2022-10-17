var burgerMenu = document.getElementById('burger-menu');
var overlay = document.getElementById('menu');

burgerMenu.addEventListener('click', function() {
  this.classList.toggle("active");
  overlay.classList.toggle("header__nav-open");
  document.body.classList.toggle('hidden')
});

overlay.addEventListener('click', function(e) {
  if (e.target.matches('a')) {
    overlay.classList.remove('header__nav-open');
    burgerMenu.classList.remove('active');
    document.body.classList.remove('hidden')
  }  
});

 //прокрутка при клике
 const menuLinks = document.querySelectorAll(".header__nav-link[data-goto]");

 if (menuLinks.length > 0) {
   menuLinks.forEach((menuLink) => {
     menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
     const menuLink = e.target;

     if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
       const gotoBlock = document.querySelector(menuLink.dataset.goto);
       const gotoBlockValue =
         gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;

       window.scrollTo({
         top: gotoBlockValue,
         behavior: "smooth",
       });
       e.preventDefault();
     }
   }
 }
 