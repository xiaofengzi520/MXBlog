cover = ()->
  win_height = $(window).height()
  if win_height < 450
    $('.bg').height(450)
  else
    $('.bg').height(win_height)
  return


$(()->
  $('#mynav').hide()
  cover()
  $(window).resize(()->
    cover()
    return
  )
  return
)
window.onscroll = ()->
  t = document.documentElement.scrollTop || document.body.scrollTop
  #console.log t
  win_height=$(window).height()
  #console.log win_height
  if t > win_height-1
    $('#mynav').show()
  else
    $('#mynav').hide()

