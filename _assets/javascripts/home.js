'user-strict'

$(document).ready(function() {

  slider = $('.bxslider').bxSlider({
    adaptiveHeight: true,
    pager: false,
    controls: false,
  });

  nextListener(slider);
  prevListener(slider);
  modalListener();
  formListener();
  launchModal();

});

function nextListener(slider) {
  $('.next-slide').click(function(event) {
    event.preventDefault();
    console.log(slider);
    slider.goToNextSlide();
  });
}

function prevListener(slider) {
  $('.prev-slide').click(function(event) {
    event.preventDefault();
    slider.goToPrevSlide();
  });
}

var gw = new Groundwork ({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un-test.vice--HoIQWQkqB5ZD1LHL95dwF5PhmRVoBAG79su2sQIZcCCqXn0OKm0X9n4h7cVNaG1ZjVyweMJr0_g5U512d2iXPQ'
  });

function sendData(data) {
  data.tags || (data.tags = {});
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};

function modalListener() {
  $('#signup-submit').click(function(event) {
    event.preventDefault();
    var form = $('.modal-signup');
    var data = splitNames(form.find('#name').val());
    data.email = form.find('#email').val();
    data.source = "vice modal";
    sendData(data);
    $('#modal').modal('hide');
  })
  
}

function splitNames(name){
  var nameArr = name.split(" ");
  var givenName = nameArr[0];
  var familyName = "";
  for (var i = 1; i< nameArr.length; i++) {
    familyName = familyName + " " + nameArr[i];
  }
  return {
    familyName: familyName,
    givenName: givenName
  };
}

function launchModal() {
  $('#modal').modal('show');
}

function formListener() {
  $('#petition').submit(function(event) {
    event.preventDefault()
    var form = $('#petition');
    var data = splitNames(form.find('[name="NAME"]').val());
    data.email = form.find('[name="EMAIL"]').val();
    data.postalCode = form.find('[name="ZIP"]').val();
    data.source = "vice signup";
    sendData(data);
    form.find('input').val('');
    form.find('[type="submit"]').prop('value','Thanks!');
    form.find('[type="submit"]').prop('disabled', true);
  });
}