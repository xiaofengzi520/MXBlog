(function() {
  var cover;

  cover = function() {
    var win_height;
    win_height = $(window).height();
    console.log(win_height);
    if (win_height < 450) {
      $('#wallet').height(450);
    } else {
      $('#wallet').height(win_height - 170);
    }
  };

  $(function() {
    cover();
    $(window).resize(function() {
      cover();
    });
  });

}).call(this);

//# sourceMappingURL=about.js.map
