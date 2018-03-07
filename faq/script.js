$(document).ready(function() {

  // apply data to templates
  $('#navTemplate-container').loadTemplate($('#navTemplate'),json.questions);
  $('#questionTemplate-container').loadTemplate($('#questionTemplate'),json.questions);
  // Get select all nav-links
  var navLinks = $('a.nav-link');
  // Get height of search bar
  var search = $('#search-row').outerHeight();
  // Get height of ToC nav questionTemplate
  var navTitle = $('#tocTitle').outerHeight(true);
  // Get all cards
  var cards = $('.card');

  // Direct link to question. Toggle caret. Auto scroll.
  if (location.hash && $(location.hash).length) {
    var navHash = $(navLinks).filter('[href="' + location.hash + '"]');
    // Opens linked accordion card
    $(location.hash).find('.collapse').collapse('show');
    // Toggle linked caret
    $(location.hash).find('.card-header > span').toggleClass('icon-angle-right icon-angle-down');
    // Gets position of the top of the linked accordion card and compensates for sticky search bar (46px -1)
    var targetPosition = $(location.hash).offset().top - search -5;
    // Scrolls to positon
    $('#content').animate({scrollTop: targetPosition},200);
    // Toggles linked nav-link to active
    $(navHash).toggleClass('active');
    // Gets position of the top of the linked nav-link
    var linkedNavPosition = $(navHash).offset().top - navTitle;
    // Scrolls navigation to the top of the linked nav-link
    $('nav').animate({scrollTop: linkedNavPosition},200);
  }
  // If no direct link
  else {
    // Activate first nav-link
    $('.nav-link[href="#Q01"]').addClass('active');
    // Open first accordion card
    $('#Q01').find('.collapse').collapse('show');
    // Toggle firsrt accordion card caret
    $('#Q01').find('.card-header > span').toggleClass('icon-angle-right icon-angle-down');
  };

  // Search
  $('#search').on("keypress click input", function(event) {
    // Prevent enter keypress
    if (event.keyCode === 13) {
      event.preventDefault();
    }
    // Hides non-matching elements
    var val = $(this).val();
    if(val.length) {
      $('.card').hide().filter(function() {
        return $('.card-body', this).text().toLowerCase().indexOf(val.toLowerCase()) > -1;
      }).show();
    }
    else {
      $('.card').show();
    }
  });

  // Toggles card and caret on click
  var cardHeaders = $('.card .card-header');
  $(cardHeaders).click(function(event) {
    var card = $(event.target).not('div > button, button > span').parents('.card').first();
    $(card).children('.collapse').collapse('toggle');
    $(card).find('.card-header > span').toggleClass('icon-angle-right icon-angle-down');
  });



  // When navigation link is clicked it scrolls to linked question
  $(navLinks).click(function(event) {
    // Prevent open link
    event.preventDefault();
    // Sets var to clicked button
    var link = event.target.hash;
    // Toggles active link
    $('.nav-link.active').button('toggle');
    // Sets clicked link to active
    $(event.target).button('toggle');
    // Collapses all other opened accordion cards
    $('.collapse').filter('.show').collapse('hide');
    // Toggles caret of all opened accordion cards
    $(cards).not(link).find('span.icon-angle-down').toggleClass('icon-angle-right icon-angle-down');
    // Opens linked card
    $(link + ' .card-header').trigger('click');
    // Scrolls to linked card
    //
  });

  // Instantiates ClipboardJS
  new ClipboardJS('.btn');
});
