function AvpSite() {}

AvpSite.init = function() {
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
      scrollTop: $(link).offset().top - 35
    }, 500);
  });
};

$(function() {
  AvpSite.init();
});
