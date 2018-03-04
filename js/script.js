$(document).ready(function () {
  // jQuery Templates
  // load json
  $.ajax({
    type: 'GET',
    url: 'js/test.json',
    dataType: 'json',
    success: function(data) {
      console.log('Success! Loaded questions from file');
      console.log(data)
      // apply data to templates
      $('#navTemplate-container').loadTemplate($('#navTemplate'),data.questions);
    },
    error: function() {
      console.log('Error loading questions from file!')
    }
  });

  // Function to scroll to hash target
  function scrollToHash(targetHash) {
    console.log('scrollToHash Fired!: ' + targetHash);
    // Opens linked accordion card
    $(targetHash + '.collapse').collapse('show');
    // Toggle linked caret
    $('a[data-target="' + targetHash + '"]').find('.fa-caret-right').toggleClass('fa-caret-right fa-caret-down');
    // Gets position of the top of the linked accordion card and compensates for sticky search bar (46px)
    var targetPosition = $('.card').has('div' + targetHash).offset().top - 46;
    // Scrolls to positon
    $('body').animate({scrollTop: targetPosition},300,'swing');
  };
});

$(window).on("load",function () {
  console.log('loaded');
  // Direct link to question. Toggle caret. Auto scroll.
  if (location.hash && $('.card a[data-target="' + location.hash + '"]').length) {
    // Scrolls to linked accordion card
    scrollToHash(location.hash);
    // Toggles linked nav-link to active
    $('.nav-link[href="' + location.hash + '"]').toggleClass('active');
    // Gets position of the top of the linked nav-link
    var navPosition = $('.nav-link[href="' + location.hash + '"]').offset.top;
    // Scrolls navigation to the top of the linked nav-link
    $('#table-of-contents').animate({scrollTop: navPosition},300,'swing');
  }
  // If no direct link
  else {
    // Activate first nav-link
    $('.nav-link[href="#Q01"]').addClass('active');
    // Open first accordion card
    $('#Q01').collapse('show');
    // Toggle firsrt accordion card caret
    $('a[data-target="#Q01"]').find('i').toggleClass('fa-caret-right fa-caret-down');
  };

  // Search
  $('#search').on("keypress click input", function (event) {
    // Prevent enter keypress
    if (event.keyCode === 13) {
      event.preventDefault();
    }
    // Hides non-matching elements
    var val = $(this).val();
    if(val.length) {
      $('.card').hide().filter(function () {
        return $('.card-body', this).text().toLowerCase().indexOf(val.toLowerCase()) > -1;
      }).show();
    }
    else {
      $('.card').show();
    }
  });

  // Toggles caret on click
  $('.card-header').click(function(event) {
    $(event.target).find('i').toggleClass('fa-caret-right fa-caret-down');
  });

  // When navigation link is clicked it scrolls to linked question
  $('a.nav-link').click(function(event) {
    // Prevent open link
    event.preventDefault();
    // Sets hash link to var
    var targetHash = event.target.hash;
    console.log('-----------------');
    console.log('after var: ' + targetHash);
    // Toggles active link
    $('.nav-link.active').button('toggle');
    // Gets all opened accordion cards
    var otherOpenCollapse = $('.accordion').children('.card').filter('.show').not(targetHash);
    // Collapses all other opened accordion cards
    otherOpenCollapse.collapse('hide');
    // Wait for collapse finish then Scrolls to link
    $(otherOpenCollapse).on('hidden.bs.collapse', function(e) {
      console.log(otherOpenCollapse.length);
      console.log('after collapse: ' + targetHash);
      scrollToHash(targetHash);
    });
    // Toggles caret of opened accordion cards
    $('.fa-caret-down').toggleClass('fa-caret-down fa-caret-right');
    // Sets clicked link to active
    $(event.target).button('toggle');
  });


  // Instantiates ClipboardJS
  new ClipboardJS('.btn');
});
