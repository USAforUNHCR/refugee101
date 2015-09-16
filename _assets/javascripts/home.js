'user-strict'

$(document).ready(function(){
  
  slider = $('.bxslider').bxSlider({
    adaptiveHeight: true,
    pager: false,
    controls: false,
  });

  nextListener(slider);
  prevListener(slider);

  
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
