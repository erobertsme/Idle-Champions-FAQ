$(document).ready(function() {

  // Handlebars helper for converting markdown to html using showdown
  Handlebars.registerHelper('markdown', function(data){
    var convert = new showdown.Converter();
    var converted = convert.makeHtml(data);
    return converted;
  });
  // Handlebars helper for getting a list of all categories

  // Handlebars helper for grouping questions into categories

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
  // Get search input
  var searchInput = $('#search');


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
    $('.nav-link').first().addClass('active');
    // Open first accordion card
    $('.collapse').first().collapse('show');
    // Toggle firsrt accordion card caret
    $('.card-header > span').first().toggleClass('icon-angle-right icon-angle-down');
  };

  // Search
  function hideCards(val){
    // If something in search bar
    if(val.length) {
      $('.card').hide().filter(function() {
        var matches = $('.card-body', this).text().toLowerCase().indexOf(val.toLowerCase()) > -1;
        var matches = matches + $('.card-header', this).text().toLowerCase().indexOf(val.toLowerCase()) > -1;
        return matches;
      }).show();
    }
    // If nothing in search bar
    else {
      $('.card').show();
    }
  }
  $(searchInput).on("keypress input focus", function(event) {
    // Prevent enter keypress
    if (event.keyCode === 13) {
      event.preventDefault();
    }
    // Hides non-matching cards (I did not write this. I only modified something I found on stackoverflow)
    var val = $(this).val();
    hideCards(val);
  });

  // Toggles card and caret on click
  var cardHeaders = $('.card .card-header');
  $(cardHeaders).click(function(event) {
    var card = $(event.target).not('div > button, button > span').parents('.card').first();
    $(card).children('.collapse').collapse('toggle');
    $(card).find('.card-header > span').toggleClass('icon-angle-right icon-angle-down');
  });



  // When navigation link is clicked it scrolls to linked question -- Thanks KenavR
  $(navLinks).click(function(event) {
    // Prevent open link
    event.preventDefault();
    // Claer search Bar
    hideCards('');
    // Sets var to clicked button
    var link = event.target.hash;
    var $linkTarget = $(event.target.hash);
    // Toggles active link
    $(".nav-link.active").button("toggle");
    // Sets clicked link to active
    $(event.target).button("toggle");
    // Collapses all other opened accordion cards

    // -----------------------------------------------

    // Get all cards that need to be collapsed
    var $cardsToHide = $(cards)
      .not(link)
      .children(".collapse.show");
    var cardsToHideCount = $cardsToHide.length;
    var completed = 0;

    function scroll($card) {
      var position = $card.position().top + search + 60;
      $("body").animate({ scrollTop: position }, 200);
    }

    function areAllCardsCollapsed(completed, count) {
      return completed >= count;
    }

    function handleCardHidden(event) {
      // Count how many are finished collapsing
      completed++;
      if (areAllCardsCollapsed(completed, cardsToHideCount)) {
        scroll($(link));
      }

      $(event.target).off("hidden.bs.collapse");
    }

    function toggleCaret($cardParent) {
      $cardParent
        .find("span.icon-angle-down")
        .toggleClass("icon-angle-right icon-angle-down");
    }

    function processCard(_, card) {
      var $card = $(card);
      // Attach an event listener for the end (hidden) event of collapse
      $card.on("hidden.bs.collapse", handleCardHidden);
      $card.collapse("hide");
      toggleCaret($card.parent())
    }

    // Iterate through the cards
    $.each($cardsToHide, processCard);

    // -----------------------------------------------

    if (!$linkTarget.children('.collapse').hasClass('show')) {
      $linkTarget.children('.card-header').trigger('click');
    }
  });

  // Dark Mode
  function darkMode() {
    $('#mode span').toggleClass('icon-lightbulb-dark icon-lightbulb');
    $('.card a').toggleClass('text-black');
    $('table, #header a').toggleClass('text-light');
    $('a.nav-link').toggleClass('bg-dark text-light');
    $('nav, #tocTitle, .card, #content, #search-row, #spacer, .card-header button.btn').toggleClass('bg-dark text-light');
    $('.card-body').toggleClass('bg-secondary');
    $('.card-header').toggleClass('bg-black')
  }
  if (Cookies.get('darkMode') === 'on') {darkMode()}
  $('#mode').click(function(event) {
    if (!Cookies.get('darkMode')) {
      Cookies.set('darkMode', 'on');
    }
    else if (Cookies.get('darkMode') === 'off') {
      Cookies.set('darkMode', 'on');
    }
    else {
      Cookies.set('darkMode', 'off');
    }
    darkMode();
  });

  // Instantiates ClipboardJS
  new ClipboardJS('.btn');
});
