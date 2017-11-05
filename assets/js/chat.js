var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

var user_input;

function insertMessage() {

  //{ return 'Babba di boopy.'; }
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  user_input = msg;

  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var first_messages = [
  'Hi there, I\'m Alex and you?',
  'Nice to meet you',
  'I can see that you need help updating your iPhone 6s. Is this true?',
]

/* Different messages */
var message_iteration = 0;
var message = "";

function fakeMessage() {
  message_iteration++
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><span>  &#32; &#186; &#186; &#186;</span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    if( message_iteration <= 3 ) {
      $('<div class="message new">' + first_messages[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }
    if( message_iteration == 4) {
      if( user_input.includes('yes') | user_input.includes('yup') | user_input.includes('correct')) {
        message = "Have you tried turning it on and off?";
      }
    else {
      if( user_input.includes('iphone') && user_input.includes('update')){
        message = "I'm not too sure about this issue, but have you tried turning it on and off?";
      }
    }
      if(user_input.includes('android') ) {
        message = "Get an iPhone";
      }
    $('<div class="message new">' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}
