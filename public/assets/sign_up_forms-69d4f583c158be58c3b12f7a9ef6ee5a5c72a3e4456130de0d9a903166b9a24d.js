$(function(){var i=new SignUp;i.checkIfFieldsAreFilledIn(),$("form#sign-up").submit(function(n){i.initialSignUp(n)}),$("form#welcome-page-sign-up").submit(function(n){i.initialSignUp(n)}),$("input.email").on("click keydown foucs",function(){i.runAnimations("email"),i.resetAnimation("password")}),$("input.password").on("click keydown focus",function(){i.runAnimations("password"),i.resetAnimation("email")})});var SignUp=function(){this.animations={password:!1,email:!1},this.animationNames=["password","email"],this.errors={password:!1,email:!1},this.filledin={password:!1,email:!1},this.errorCount=0,this.user={password:"",email:""}};SignUp.prototype.initialSignUp=function(i){i.preventDefault(),this.errorCount=0;for(var n=["email","password"],t=0;t<n.length;t++)this.clearOldValidation(n[t]),this.validateBlankField(n[t]);this.validatePasswordLength(),this.validateEmail();for(var e in this.errors)this.addRedBorder(e);return this.errorCount>0?!1:($.ajax({type:"POST",url:"/users",data:{user:this.user}}).done(function(i){"success"==i.message?window.location.href="http://localhost:3000/dashboard":i.email&&($(".error.email").append(i.email),$(".error.email").css("border-top","3px solid red"))}),!0)},SignUp.prototype.checkIfFieldsAreFilledIn=function(){""!=$("input.email").val()&&($("label.email").css({"font-size":"12px","text-transform":"uppercase",color:"grey",bottom:"60px"}),this.animations.email=!0,this.filledin.email=!0)},SignUp.prototype.addRedBorder=function(i){1==this.errors[i]?$(".error."+i).css("border-top","3px solid red"):$(".error."+i).css("border-top","")},SignUp.prototype.focusedOn=function(i){return $("input."+i).is(":focus")},SignUp.prototype.blank=function(i){return""==$("input."+i).val()},SignUp.prototype.captureFieldValue=function(i){this.user[i]=$("input."+i).val()},SignUp.prototype.validateBlankField=function(i){this.captureFieldValue(i),""==this.user[i]?($(".error."+i).append("Oops! "+i+" is required.<br>"),this.errors[i]=!0,this.errorCount+=1):this.errors[i]=!1},SignUp.prototype.validatePasswordLength=function(){$("input.password").val().length<6?($(".error.password").empty(),$(".error.password").append("Oops! Password must contain minimum 9 characters"),this.errors.password=!0,this.errorCount+=1):this.errors.password=!1},SignUp.prototype.validateEmail=function(){-1!==$("input.email").val().indexOf("@")?this.errors.email=!1:($(".error.email").empty(),$(".error.email").append("Oops! Invalid email."),this.errors.email=!0,this.errorCount+=1)},SignUp.prototype.clearOldValidation=function(i){$(".error."+i).empty(),this.errors[i]=!1},SignUp.prototype.runAnimations=function(i){0!=this.animations[i]||this.blank(i)?(1!=this.animations[i]||this.blank(i))&&($("label."+i).css("animation-name","label"),$("input."+i).css("animation-name","input"),this.animations[i]=!0):($("label."+i).css("animation-name","initialFilledInLabel"),this.animations[i]=!0,this.filledin[i]=!0)},SignUp.prototype.resetAnimation=function(i){1==this.animations[i]&&this.blank(i)&&this.filledin[i]?($("label."+i).css("animation-name","resetFilledInLabel"),this.filledin[i]=!1,this.animations[i]=!1):1==this.animations[i]&&this.blank(i)?($("label."+i).css("animation-name","resetFilledInLabel"),$("input."+i).css("animation-name","resetInput"),this.filledin[i]=!1,this.animations[i]=!1):1!=this.animations[i]||this.blank(i)||this.filledin[i]||($("label."+i).css("animation-name","filledInLabel"),$("input."+i).css("animation-name","resetInput"),this.filledin[i]=!0)},SignUp.prototype.resetAnimationsFor=function(i){var n;$.each(i,function(t){n=i[t],1==this.animations[n]&&this.blank(n)&&this.resetAnimation(n)})};