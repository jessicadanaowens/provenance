$(function () {
  $(document).scroll(function(){
    var scrollPos = $(this).scrollTop();
    $('.first h1').css({
      'opacity' : 1-(scrollPos/250)
    });

    $('button.static').css({
      'opacity' : 1-(scrollPos/250)
    });

    var secondPos = scrollPos - 390;
    var thirdPos = scrollPos - 790;
    var forthPos = scrollPos - 1300;

    var secondOpacity = -.00002 * Math.pow(secondPos, 2) + 1;
    var thirdOpacity = -.00002 * Math.pow(thirdPos, 2) + 1;
    var forthOpacity = -.00002 * Math.pow(forthPos, 2) + 1;

    $('.second h2').css({
      'opacity' : secondOpacity
    });

    $('.second').css({
      'border' : secondOpacity
    });

    $('.third h2').css({
      'opacity' : thirdOpacity
    });

    $('.forth h2').css({
      'opacity' : forthOpacity
    });

  });
});

