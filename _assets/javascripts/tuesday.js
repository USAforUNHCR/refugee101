'use-strict'



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