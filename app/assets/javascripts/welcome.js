$(function () {
  $(document).scroll(function(){
    var scrollPos = $(this).scrollTop();
    $('.first h1').css({
      'opacity' : 1-(scrollPos/250)
    });

    var secondPos = scrollPos - 390;
    var thirdPos = scrollPos - 980;
    var forthPos = scrollPos - 1580;

    var secondOpacity = -.00002 * Math.pow(secondPos, 2) + 1;
    var thirdOpacity = -.00002 * Math.pow(thirdPos, 2) + 1;
    var forthOpacity = -.00002 * Math.pow(forthPos, 2) + 1;

    $('.second').css({
      'opacity' : secondOpacity
    });

    $('.third').css({
      'opacity' : thirdOpacity
    });

    $('.forth').css({
      'opacity' : forthOpacity
    });

  });
});

