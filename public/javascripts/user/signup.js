(function() {
  var cover;

  cover = function() {
    var win_height, win_width;
    win_width = $(window).width();
    win_height = $(window).height();
    $('.bg').height(win_height).width(win_width);
  };

  $(function() {
    cover();
    $(window).resize(function() {
      cover();
    });
  });

}).call(this);

//# sourceMappingURL=signup.js.map
