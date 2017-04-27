$(function() {
  var $overlay = $('.modal-overlay'),
      $modalCall = $('.modal-call');


  $('.order-call').on('click', function(e) {
    e.preventDefault();
    $overlay.removeClass('hide');
    $modalCall.removeClass('hide');
    $modalCall.find('input:first').focus();
  });

  $(".modal-btn-close").on('click', function(e) {
    e.preventDefault();
    $(this).closest('.modal').addClass('hide');
    $overlay.addClass('hide');
  })
});
