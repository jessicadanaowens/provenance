$(function () {
  var newSignUp = new SignUp();
  newSignUp.checkIfFieldsAreFilledIn();

  $("form#sign-up").submit(function(e){
    newSignUp.initialSignUp(e);
  });

  $("form#welcome-page-sign-up").submit(function(e){
    newSignUp.initialSignUp(e);
  });

  $('input.email').on('click keydown foucs', function () {
    newSignUp.runAnimations('email');
    newSignUp.resetAnimation('password');
  });

  $('input.password').on('click keydown focus', function () {
    newSignUp.runAnimations('password');
    newSignUp.resetAnimation('email');
  });
});

var SignUp = function () {
  this.animations = {"password": false, "email": false};
  this.animationNames = ['password', 'email'];
  this.errors = {'password': false, 'email': false};
  this.filledin = {'password': false, 'email': false};
  this.errorCount = 0;
  this.user = {'password': '', 'email': ''};
};

SignUp.prototype.initialSignUp = function initialSignUp (e) {
  e.preventDefault();
  this.errorCount = 0;

  var ary = ['email', 'password'];

  for(var i=0; i< ary.length; i++) {
    this.clearOldValidation(ary[i]);
    this.validateBlankField(ary[i]);
  }

  this.validatePasswordLength();
  this.validateEmail();

  for (var key in this.errors) {
    this.addRedBorder(key);
  }

  if (this.errorCount > 0) {
    return false;
  } else {
    $.ajax({
      type: 'POST',
      url: '/users',
      data: { user: this.user}
    }).done(function( data ) {
      if(data.message == 'success') {
        window.location.href = "http://localhost:3000/dashboard";
      } else if (data.email) {
        $('.error.email').append(data.email);
        $('.error.email').css('border-top', '3px solid red');
      }
    });

    return true;
  }
};

SignUp.prototype.checkIfFieldsAreFilledIn = function checkIfFieldsAreFilledIn () {
  if ($('input.email').val() != "") {
    $('label.email').css({'font-size': '12px', 'text-transform': 'uppercase', 'color': 'grey', 'bottom': '60px'});
    this.animations['email'] = true;
    this.filledin['email'] = true;
  };
};

SignUp.prototype.addRedBorder  = function addRedBorder (key) {
  if (this.errors[key] == true) {
    $('.error.' + key).css('border-top', '3px solid red');
  } else {
    $('.error.' + key).css('border-top', '');
  }
};

SignUp.prototype.focusedOn = function focusedOn (str) {
  return $('input.' + str).is(":focus")
};

SignUp.prototype.blank = function blank (string) {
  return ($('input.' + string).val() == '');
};

SignUp.prototype.captureFieldValue = function captureFieldValue(label) {
  this.user[label] = $('input.' + label).val();
};

SignUp.prototype.validateBlankField = function validateBlankField(label) {
  this.captureFieldValue(label);
  if (this.user[label]  == '') {
    $('.error.' + label).append('Oops! ' + label + ' is required.<br>');
    this.errors[label] = true;
    this.errorCount += 1;
  } else {
    this.errors[label] = false;
  }
};

SignUp.prototype.validatePasswordLength = function validatepasswordLength() {
  if($('input.password').val().length < 6) {
    $('.error.password').empty();
    $('.error.password').append('Oops! Password must contain minimum 9 characters');
    this.errors['password'] = true;
    this.errorCount += 1;
  } else {
    this.errors['password'] = false;

  }
};

SignUp.prototype.validateEmail = function validateEmail () {
  if($('input.email').val().indexOf("@") !== -1) {
    this.errors['email'] = false;
  } else {
    $('.error.email').empty();
    $('.error.email').append('Oops! Invalid email.');
    this.errors['email'] = true;
    this.errorCount += 1;
  }
};

SignUp.prototype.clearOldValidation = function clearOldValidation(label) {
  $('.error.' + label).empty();
  this.errors[label] = false;
};

SignUp.prototype.runAnimations = function runAnimations (name) {
  if (this.animations[name] == false && !this.blank(name)) {
    $('label.' + name).css('animation-name', 'initialFilledInLabel');
    this.animations[name] = true;
    this.filledin[name] = true;
  } else if (this.animations[name] == true && !this.blank(name)){
    //do nothing
  } else {
    $('label.' + name).css('animation-name', 'label');
    $('input.' + name).css('animation-name', 'input');
    this.animations[name] = true;
  }
};

SignUp.prototype.resetAnimation = function resetAnimation (name) {
  if (this.animations[name] == true && this.blank(name) && this.filledin[name]) {
    $('label.' + name).css('animation-name', 'resetFilledInLabel');
    this.filledin[name] = false;
    this.animations[name] = false;
  } else if (this.animations[name] == true && this.blank(name)) {
    $('label.' + name).css('animation-name', 'resetFilledInLabel');
    $('input.' + name).css('animation-name', 'resetInput');
    this.filledin[name] = false;
    this.animations[name] = false;
  } else if (this.animations[name] == true && !this.blank(name) && !this.filledin[name]) {
    $('label.' + name).css('animation-name', 'filledInLabel');
    $('input.' + name).css('animation-name', 'resetInput');
    this.filledin[name] = true;
  }
};

SignUp.prototype.resetAnimationsFor = function resetAnimationsFor (ary) {
  var name;

  $.each(ary, function (i) {
    name = ary[i];
    if (this.animations[name] == true && this.blank(name) ) {
      this.resetAnimation(name);
    };
  })
};

