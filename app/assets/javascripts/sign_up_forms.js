$(function () {
  var animations = {"password": false, "email": false, "name": false};
  var animationNames = ['password', 'name', 'email'];
  var errors = {'password': false, 'name': false, 'email': false};
  var errorCount = 0;
  var filledIn = {'password': false, 'email': false, 'name': false};


  $('input.name').on('click', function () {
    runAnimations('name');
    resetAnimation('password');
    resetAnimation('email');
  });

  $('input.email').on('click', function () {
    runAnimations('email');
    resetAnimation('password');
    resetAnimation('name');
  });

  $('input.password').on('click', function () {
    runAnimations('password');
    resetAnimation('email');
    resetAnimation('name');
  });

  $('html').click(function() {
    if (!focusedOn('email') && !focusedOn('password') && !focusedOn('name')) {
      resetAnimationsFor(animationNames);
    }
  });

  $("form").submit(function(e){
    var ary = ['name', 'email', 'password'];
    errorCount = 0;

    for(var i=0; i< ary.length; i++) {
      clearOldValidation(ary[i]);
      validateBlankField(ary[i]);
    }

    validatePasswordLength();
    validateEmail();

    for (var key in errors) {
      addRedBorder(key);
    }

    if (errorCount > 0) {
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  });

  var filledIn = function(txt) {
    $('input.' + txt).val() != '';
  };

  var addRedBorder  = function (key) {
    if (errors[key] == true) {
      $('.error.' + key).css('border-top', '3px solid red');
    } else {
      $('.error.' + key).css('border-top', '');
    }
  };

  var focusedOn = function (str) {
    return $('input.' + str).is(":focus")
  };

  var blank = function (string) {
    return ($('input.' + string).val() == '');
  };

  var validateBlankField = function (label) {
    if ($('input.' + label).val() == '') {
      $('.error.' + label).append('Oops! ' + label + ' is required.<br>');
      errors[label] = true;
      errorCount += 1;
    } else {
      errors[label] = false;
    }
  };

  var validatePasswordLength = function () {
    if($('input.password').val().length < 6) {
      $('.error.password').append('Oops! Password must contain minimum 9 characters');
      errors['password'] = true;
      errorCount += 1;
    } else {
      errors['password'] = false;

    }
  };

  var validateEmail = function () {
    if($('input.email').val().indexOf("@") !== -1) {
      errors['email'] = false;
    } else {
      $('.error.email').append('Oops! Invalid email.');
      errors['email'] = true;
      errorCount += 1;
    }
  };

  var clearOldValidation = function (label) {
    $('.error.' + label).empty();
    error[label] = false;
  };

  var runAnimations = function runAnimations (name) {
    if (animations[name] == false && !blank(name)) {
      $('label.' + name).css('animation-name', 'initialFilledInLabel');
      animations[name] = true;
      filledIn[name] = true;
    } else if (animations[name] == true && !blank(name)){
      //do nothing
    } else {
      $('label.' + name).css('animation-name', 'label');
      $('input.' + name).css('animation-name', 'input');
      animations[name] = true;
    }
  };

  var resetAnimation = function resetAnimation (name) {
    if (animations[name] == true && blank(name) && filledIn[name]) {
      $('label.' + name).css('animation-name', 'resetFilledInLabel');
      filledIn[name] = false;
      animations[name] = false;
    } else if (animations[name] == true && blank(name)) {
      $('label.' + name).css('animation-name', 'resetFilledInLabel');
      $('input.' + name).css('animation-name', 'resetInput');
      filledIn[name] = false;
      animations[name] = false;
    } else if (animations[name] == true && !blank(name) && !filledIn[name]) {
      $('label.' + name).css('animation-name', 'filledInLabel');
      $('input.' + name).css('animation-name', 'resetInput');
      filledIn[name] = true;
    }
  };

  var resetAnimationsFor = function (ary) {
    var name;

    $.each(ary, function (i) {
      name = ary[i];
      if (animations[name] == true && blank(name) ) {
        resetAnimation(name);
      };
    })
  }
});
