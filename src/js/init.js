$(function() {
  var $overlay = $('.modal-overlay'),
      $modalCall = $('.modal-call'),
      $nav = $('.menu-nav'),
      $aside = $('.side-nav');


  $('.order-call').on('click', function(e) {
    e.preventDefault();
    $overlay.removeClass('hide');
    $modalCall.removeClass('hide');
    $modalCall.find('input:first').focus();
  });

  $('.modal-btn-close').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.modal').addClass('hide');
    $overlay.addClass('hide');
  });

  $overlay.on('click', function(e) {
    e.preventDefault();
    $('.modal').addClass('hide');
    $(this).addClass('hide');
  });

  $('.menu-btn').on('click', function(e) {
    e.preventDefault();
    $nav.toggleClass('show');
    e.stopPropagation();
  });

  $(document).on('click', function(e) {
    $nav.removeClass('show');
    $aside.removeClass('show');
  });

  $('.aside-btn').on('click', function(e) {
    e.preventDefault();
    $aside.toggleClass('show');
    e.stopPropagation();
  });

  $('.steps-list').children('li').map(function(index, item) {
    var $text = $(item).find('.steps-item-text'),
        childHeight = $text.height(),
        height = Math.max(childHeight, 90);
    $(item).height(height);
  });
});
