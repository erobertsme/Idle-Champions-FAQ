$(document).ready(function() {

  // Handlebars template for nav
  var navSource = $('#navTemplate').html();
  var navTemplate = Handlebars.compile(navSource);
  var compiledNav = navTemplate(data);
  $('#table-of-contents').html(compiledNav);
  // Handlebars template for content
  var questionSource = $('#questionTemplate').html();
  var questionTemplate = Handlebars.compile(questionSource);
  var compiledQuestions = questionTemplate(data);
  $('#questionTemplate-container').html(compiledQuestions);
  // Get select all nav-links
  var navLinks = $('a.nav-link');
  // Get all cards
  var cards = $('.card');
  // Get height of search bar
  var search = $('#search-row').outerHeight();
  // Get height of nav title
  var navTitle = $('#tocTitle').outerHeight(true);


  // Direct link to question. Toggle caret. Auto scroll.
  if (location.hash && $(location.hash).length) {
    var linkedNav = $(navLinks).filter('[href="' + location.hash + '"]');
    // Opens linked accordion card
    $(location.hash).find('.collapse').collapse('show');
    // Toggle linked caret
    $(location.hash).find('.card-header > span').toggleClass('icon-angle-right icon-angle-down');
    // Gets position of the top of the linked accordion card and compensates for sticky search bar (46px -1)
    var linkedCard = $(location.hash).offset().top - search - 5;
    // Scrolls to positon
    $('body').animate({scrollTop: linkedCard},200);
    // Toggles linked nav-link to active
    $(linkedNav).toggleClass('active');
    // Gets position of the top of the linked nav-link
    var linkedNavPosition = $(linkedNav).offset().top - navTitle;
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
  $('#search').on("keypress input", function(event) {
    // Prevent enter keypress
    if (event.keyCode === 13) {
      event.preventDefault();
    }
    // Hides non-matching cards (I did not write this. I only modified something I found on stackoverflow)
    var val = $(this).val();
    // If something in search bar
    if(val.length) {
      $('.card').hide().filter(function() {
        return $('.card-body', this).text().toLowerCase().indexOf(val.toLowerCase()) > -1;
      }).show();
    }
    // If nothing in search bar
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
    // Sets var to link target
    var linkTarget = $(event.target.hash);
    // Sets var to all cards that are not the linked card
    var otherCards = $(cards).not(linkTarget);
    // Toggles active link
    $('.nav-link.active').button('toggle');
    // Sets clicked link to active
    $(event.target).button('toggle');
    // Collapses all other opened accordion cards
    $(otherCards).children('.collapse.show').collapse('hide');
    // Toggles caret of all opened accordion cards
    $(otherCards).find('span.icon-angle-down').toggleClass('icon-angle-right icon-angle-down');
    // Opens linked card if not already open
    if (!$(linkTarget).children('.collapse').hasClass('show')) {
      $(linkTarget).children('.card-header').trigger('click');
    }
    // Scrolls to linked card
    //
  });

  // Instantiates ClipboardJS
  new ClipboardJS('.btn');
});
