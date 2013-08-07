function AvpSite() {}

AvpSite.setTooltips = function() {
  $('[rel=tooltip]').tooltip({placement: 'bottom'});
};

AvpSite.init = function() {
  AvpSite.setTooltips();
};

$(function() {
  AvpSite.init();
});
