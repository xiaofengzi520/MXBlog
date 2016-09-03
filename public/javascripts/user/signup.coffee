
cover=()->
  win_width=$(window).width()
  win_height=$(window).height()
  $('.bg').height(win_height).width(win_width)
  return


$(()->
  cover()
  $(window).resize(()->
    cover()
    return
  )
  return
)