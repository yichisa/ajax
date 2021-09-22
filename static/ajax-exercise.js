'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  evt.preventDefault();
  
  // newFortune = request.arguments.get()

  $.get('/fortune', res => {
    $('#fortune-text').text(res);
  });

}

$('#get-fortune-button').on('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const formData = {zipcode: $('#zipcode-field').val()};

  $.get('/weather.json', formData, weatherInfo => {
    $('#weather-info').text(weatherInfo['forecast']);
  })
}

$('#weather-form').on('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // const formInputs = {
  //   melonType: $('#qty-field').val(),
  //   quantity: $('#melon-type-field').val()
  // };
    const formInputs = {
      melon_type: $('#melon-type-field').val(),
      qty: $('#qty-field').val(),
    };
    
    $.post('/order-melons.json', formInputs, resultInfo => {
      if (resultInfo['code'] === 'ERROR') {
        $('#order-status').addClass('order-error');
      } else if (resultInfo['code'] === 'OK') {
        $('#order-status').removeClass('order-error');
      }  
      $('#order-status').text(`${resultInfo['msg']}`);

    })

  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

$('#order-form').on('submit', orderMelons);
