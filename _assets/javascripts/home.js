'user-strict'

$(document).ready(function(){
  
  slider = $('.bxslider').bxSlider({
    adaptiveHeight: true,
    pager: false,
    controls: false,
  });

  nextListener(slider);
  prevListener(slider);
  submitEventListener();

  
})

function nextListener(slider){
  $('.next-slide').click(function(event){
    event.preventDefault();
    console.log(slider);
    slider.goToNextSlide();
  });
}

function prevListener(slider){
  $('.prev-slide').click(function(event){
    event.preventDefault();
    slider.goToPrevSlide();
  });
}

function submitEventListener(){
  $form = $("#petition");

  $form.submit(function(event){
    console.log(event);
    event.preventDefault();
    $('.submit-button').val('Please Wait...').prop('disabled',true);

    $.ajax({
      type: 'POST',
      url: '//nyc.us11.list-manage.com/subscribe/post-json?u=7aa897cfc40f7cfbb83ffadd4&amp;id=c8e53459bc&c=?',
      data: $form.serialize(),
      timeout: 5000,
      cache: false,
      dataType: 'jsonp',
      contentType: "application/json; charset=utf-8",
      error: function(err) {console.log("Error.")},
      success: function(data){
        if (data.result != "success") {
          $('.submit-button').val('Please Wait...').prop('disabled',true);
          $('#conf-message').html('').slideUp(700);
          $('#conf-message').html("Something went wrong, please try to submit your details again.").slideDown(700, function(){
            $('.submit-button').val('Raise Your Hand!').prop('disabled',false);
          });
        }
        else {
          $('#petition').slideUp(700, function(){
            $('#conf-message').html("Thanks! We sent you an email. Please confirm your email address to raise your hand for refugees.").slideDown(700);
          });
          
        }
      }
    });
  });
}