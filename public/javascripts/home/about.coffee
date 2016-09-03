cover = ()->
  win_height = $(window).height()
  console.log win_height
  if win_height < 450
    $('#wallet').height(450)
  else
    $('#wallet').height(win_height-170)
  return

$(()->
  cover()
  $(window).resize(()->
    cover()
    return
  )
  return
)


