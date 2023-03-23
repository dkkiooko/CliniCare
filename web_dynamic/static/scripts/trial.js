$(document).ready(function() {

  store = {}
  $('section.date-filter ul li input').change(function() {
    if (this.checked) {
      store[$(this).attr('data-id')] = $(this).attr('data-name');
    }
    else {
      delete store[$(this).attr('data-id')];
    }
    $('.date-filter h4').text(Object.values(store).join(', '));
  });

  $('#search-date').click(function() {
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('section.date-filter h4').text('jQuery is working!');
      }
    });
  });
});
