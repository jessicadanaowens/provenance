$(function(){$(document).scroll(function(){var t=$(this).scrollTop();$(".first h1").css({opacity:1-t/250}),$("button.static").css({opacity:1-t/250});var o=t-390+"deg",s=t-790,c=t-1300,e=-2e-5*Math.pow(o,2)+1;-2e-5*Math.pow(s,2)+1,-2e-5*Math.pow(c,2)+1;$(".second").css("-webkit-transform","rotate(0deg)"),$(".second h2").css({opacity:e}),t>800&&$(".third").css("-webkit-transform","rotate(0deg)"),t>1300&&$(".forth").css("-webkit-transform","rotate(0deg)")})});