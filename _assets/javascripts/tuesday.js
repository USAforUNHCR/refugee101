'use-strict'

var gw = new Groundwork({
    'api_url': 'https://api.thegroundwork.com',
    'oauth_client_id': 'pub-un.forcedtoflee-int-dGXTeBirHmvyimD4mk5NOXyG5lpUfn7FF3TZCmFFgRV2yPx4Ttu_Pw6JIp89t83lKIh3pA0KpuqBbA3ZmNnopQ'
  });

$(document).ready(function(){

  submitListener();

})

function sendData(data){
  data.tags.send_email = 0;
  gw.supporters.create(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  });
};

function submitListener(){
  var form = $('.tuesday-form');
  form.submit(function(event){
    event.preventDefault();
    var data = getData(form[0]);
    sendData(data);
    $('.thanks-text').css('display','block');
    $('.form-submit').css('display','none');
  })
}

function getData(form){
  var data = {};
  data.tags = {};
  data.source = 'giving-tuesday';
  for (var i = 0; i < form.elements.length; i++){
    var element = form.elements[i];
    if(element.name === 'email'){
      data.email = element.value;
    }
    else if(element.name && element.value != ""){
      data.tags[element.name] = element.value;
    }
  }
  return data;
}