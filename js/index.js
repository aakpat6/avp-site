function AvpSite() {}

AvpSite.init = function() {
  $('[rel=tooltip]').tooltip({placement: 'bottom'});

  $('.navbar').affix({
    offset: {
      top: $('.masthead').outerHeight(),
    }
  });

  // $('.nav-wrapper').height($('.navbar').height());
};

$(function() {
  AvpSite.init();
});
