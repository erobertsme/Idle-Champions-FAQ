$(document).ready(function() {

  // apply data to templates
  $('#navTemplate-container').loadTemplate($('#navTemplate'),json.questions);
  $('#questionTemplate-container').loadTemplate($('#questionTemplate'),json.questions);
  // Get select all nav-links
  var navLinks = $('a.nav-link');
  // Get height of search bar
  var search = $('#search-row').outerHeight();
  // Get height of ToC nav questionTemplate
  var navTitle = $('#tocTitle').outerHeight();
  // Function to scroll to hash target
  function scrollToHash(targetHash) {
    // Opens linked accordion card
    $(targetHash + '.collapse').collapse('show');
    // Toggle linked caret
    $(targetHash).prev().find('i').toggleClass('fa-caret-right fa-caret-down');
    // Waits for open animation to finish
    $(targetHash).on('shown.bs.collapse', function() {
      // Gets position of the top of the linked accordion card and compensates for sticky search bar (46px +1)
      var targetPosition = $('.card>div' + targetHash).prev().offset().top - search;
      // Scrolls to positon
      $('#content').animate({scrollTop: targetPosition},200);
    });
  };

  // Direct link to question. Toggle caret. Auto scroll.
  if (location.hash && $(location.hash).length) {
    var navHash = $(navLinks).filter('[href="' + location.hash + '"]');
    // Scrolls to linked accordion card
    scrollToHash(location.hash);
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
    $('#Q01').collapse('show');
    // Toggle firsrt accordion card caret
    $('#Q01').prev().find('i').toggleClass('fa-caret-right fa-caret-down');
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
  var cards = $('.card');
  $(cards).click(function(event) {
    $(event.target).find('i').toggleClass('fa-caret-right fa-caret-down');
    $(event.target).next().collapse('toggle');
  });

  // When navigation link is clicked it scrolls to linked question
  var navLinks = $('a.nav-link');
  $(navLinks).click(function(event) {
    // Prevent open link
    event.preventDefault();
    // Sets hash link to var
    var targetHash = event.target.hash;
    // Sets var to clicked button
    var buttonClicked = event.target;
    // Toggles active link
    $('.nav-link.active').button('toggle');
    // Collapses all other opened accordion cards
    $('.collapse').filter('.show').not(targetHash).collapse('hide');
    // Toggles caret of opened accordion cards
    $('.fa-caret-down').toggleClass('fa-caret-down fa-caret-right');
    // Sets clicked link to active
    $(buttonClicked).button('toggle');
    // Scrolls to target
    var useSwitch = false;
    scrollToHash(targetHash);
  });

  // Instantiates ClipboardJS
  new ClipboardJS('.btn');
});
