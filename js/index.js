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

  $('.masthead').each(function(){
    var bgobj = $(this); // assigning the object

    $(window).scroll(function() {
      var yPos = -($(this).scrollTop() / bgobj.data('speed')) - bgobj.height() - 80;
      var coords = '130px '+ yPos + 'px';
      bgobj.css('backgroundPosition', coords);
    });
  });

  var yPos = -($(window).scrollTop() / $('.masthead').data('speed')) - $('.masthead').height() - 80;
  var coords = '130px '+ yPos + 'px';
  $('.masthead').css('backgroundPosition', coords);
};

$(function() {
  AvpSite.init();
});
