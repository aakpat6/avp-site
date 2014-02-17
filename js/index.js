$(function () {
  'use strict';

  $('[rel=tooltip]').tooltip({placement: 'bottom'});

  $('.navbar').affix({
    offset: {
      top: $('.masthead').outerHeight(),
    }
  });

  $('.link-nav').click(function(e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(link).offset().top
    }, 500, function() {
      window.location.hash = link;
    });
    return false;
  });

  var bgIndex = 0;

  var setBackground = function () {
    var curElem = $('.masthead-bg img').eq(bgIndex);
    bgIndex = (bgIndex + 1) % ($('.masthead-bg img').length);
    var newElem = $('.masthead-bg img').eq(bgIndex);
    curElem.fadeOut(1000, function() {
      newElem.fadeIn(1000, function() {
        setTimeout(setBackground, 3000);
      });
    });
  };
  setBackground();
});
