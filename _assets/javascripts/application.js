//= require vendor/jquery-2.1.1
//= require vendor/jquery.validate.js
//= require vendor/scrollup/jquery.scrollUp
//= require vendor/drupal_legacy.js
//= require vendor/angular.min.js
//= require events.js
//= require contact.js
//= require vendor/jquery.jcarousel-core.js
//= require vendor/jquery.jcarousel-autoscroll.js
//= require vendor/jquery.form.min.js

!function () {

function carousel(container, selector, delay) {
	delay = delay || 5000;
	var $container = $(container),
	    items = $container.find(selector),
	    prevItem,
	    currentItem,
	    nextItem,
	    idx = -1,
	    nextIdx = function (i) {
		    return (i + 1) % items.length;
	    },
	    activateNextItem = function () {
		    currentItem && currentItem.removeClass('active');
		    prevItem && prevItem.removeClass('prev');
		    idx = nextIdx(idx);

		    prevItem = currentItem && currentItem.addClass('prev');

		    currentItem = nextItem ? nextItem.removeClass('next') :
			    $(items[idx]);
		    currentItem.addClass('active');

		    setTimeout(function () {
			    nextItem = $(items[nextIdx(idx)]).addClass('next');
		    }, 1000);
	    },
	    handlerIn = function () {
		    interval = clearInterval(interval);
	    },
	    handlerOut = function () {
		    interval = setInterval(activateNextItem, delay);
	    },
	    interval;
	if (!items.length) { return; }
	activateNextItem();
	handlerOut();
	$container.hover(handlerIn, handlerOut);
}


$('document').ready(function() {
  $("#core-values .double-field-first").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").parents(".field-item").find(".double-field-second").slideUp();
    } else {
      $(this).addClass("active").parents(".field-item").find(".double-field-second").slideDown();
    }
  });

  $.scrollUp();

  // enable careers vertiavl carousel
  Drupal.behaviors.tikalScrollItems.attach();

  // if ($('.jcarousel').length > 0) {
  //   var carousel = $('.jcarousel');
  //   var slides = carousel.find('li');
  //   var numberOfSlides = slides.length;
  //   var num = 0;
  //   window.setInterval(function () {
  //       // increase by num 1, reset to 0 at 4
  //       num = (num + 1) % (numberOfSlides);
  //       var leftPosition = -(slides.first().width() * num) + "px";

  //       carousel.find('ul').attr('style', 'left: '+leftPosition);
  //   }, 4000); // repeat forever, polling every 3 seconds
  // }


  // if($('.cycle-slideshow').length > 0){
  //     $('.cycle-slideshow').jcarousel();
  //   }

	carousel('.offering-carousel', '.offering');

});


}.call(this);
