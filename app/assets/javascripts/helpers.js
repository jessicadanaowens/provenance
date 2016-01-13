function scrollToAnchor () {
  $(".anchorLink").click(function(e){
    e.preventDefault();

    var id     = $(this).attr("href");
    var offset = $(id).offset();

    $("html, body").animate({
      scrollTop: offset.top
    }, 300);
  });
}