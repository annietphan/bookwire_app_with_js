$(document).ready(function() {
  let showChar = 20
  let ellipsesText = "..."
  var moreText = "more"
  var lessText = "less"

  $('.review-more').each(function() {
    let content = $(this).html()

    if(content.length > showChar) {

      let c = content.substr(0, showChar)
      let h = content.substr(showChar-1, content.length - showChar)

      let html = c + '<span class="moreellipses">' + ellipsesText + '$nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moreText + '</a></span>'

      $(this).html(html)
    }
  })

  $(".morelink").click(function(){
    if($(this).hasClass("less")) {
      $(this).removeClass("less")
      $(this).html(moreText)
    } else {
      $(this).addClass("less")
      $(this).html(lessText)
    }
    $(this).parent().prev().toggle()
    $(this).prev().toggle()
    return false
  })
})
