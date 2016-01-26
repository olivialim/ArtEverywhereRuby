// LIGHTBOX
// display the lightbox
function lightbox(insertContent, ajaxContentUrl){

  // jQuery wrapper (optional, for compatibility only)
  (function($) {
  
    // add lightbox/shadow <div/>'s if not previously added
    if($('#lightbox').size() == 0){
      var theLightbox = $('<div id="lightbox"/>');
      var theShadow = $('<div id="lightbox-shadow"/>');
      $(theShadow).click(function(e){
        closeLightbox();
      });
      $('body').append(theShadow);
      $('body').append(theLightbox);
    }
    
    // remove any previously added content
    $('#lightbox').empty();
    
    // insert HTML content
    if(insertContent != null){
      $('#lightbox').append(insertContent);
    }
    
    // insert AJAX content
    if(ajaxContentUrl != null){
      // temporarily add a "Loading..." message in the lightbox
      $('#lightbox').append('<p class="loading">Loading...</p>');
      
      // request AJAX content
      $.ajax({
        type: 'GET',
        url: ajaxContentUrl,
        success:function(data){
          // remove "Loading..." message and append AJAX content
          $('#lightbox').empty();
          $('#lightbox').append(data);
        },
        error:function(){
          alert('AJAX Failure!');
        }
      });
    }
    
    // move the lightbox to the current window top + 100px
    $('#lightbox').css('top', $(window).scrollTop() + 100 + 'px');
    
    // display the lightbox
    $('#lightbox').show();
    $('#lightbox-shadow').show();
  
  })(jQuery); // end jQuery wrapper
  
}

// close the lightbox
function closeLightbox(){
  
  // jQuery wrapper (optional, for compatibility only)
  (function($) {
    
    // hide lightbox/shadow <div/>'s
    $('#lightbox').hide();
    $('#lightbox-shadow').hide();
    
    // remove contents of lightbox in case a video or other content is actively playing
    $('#lightbox').empty();
  
  })(jQuery); // end jQuery wrapper
  
}

// NAVBAR
(function(window) {

  'use strict';

  /**
   * Extend Object helper function.
   */
  function extend(a, b) {
    for(var key in b) { 
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * Each helper function.
   */
  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }

  /**
   * Menu Constructor.
   */
  function Menu(options) {
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  /**
   * Menu Options.
   */
  Menu.prototype.options = {
    wrapper: '#o-wrapper',          // The content wrapper
    type: 'slide-left',             // The menu type
    menuOpenerClass: '.c-button',   // The menu opener class names (i.e. the buttons)
    maskId: '#c-mask'               // The ID of the mask
  };

  /**
   * Initialise Menu.
   */
  Menu.prototype._init = function() {
    this.body = document.body;
    this.wrapper = document.querySelector(this.options.wrapper);
    this.mask = document.querySelector(this.options.maskId);
    this.menu = document.querySelector('#c-menu--' + this.options.type);
    this.closeBtn = this.menu.querySelector('.c-menu__close');
    this.menuOpeners = document.querySelectorAll(this.options.menuOpenerClass);
    this._initEvents();
  };

  /**
   * Initialise Menu Events.
   */
  Menu.prototype._initEvents = function() {
    // Event for clicks on the close button inside the menu.
    this.closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));

    // Event for clicks on the mask.
    this.mask.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));
  };

  /**
   * Open Menu.
   */
  Menu.prototype.open = function() {
    this.body.classList.add('has-active-menu');
    this.wrapper.classList.add('has-' + this.options.type);
    this.menu.classList.add('is-active');
    this.mask.classList.add('is-active');
    this.disableMenuOpeners();
  };

  /**
   * Close Menu.
   */
  Menu.prototype.close = function() {
    this.body.classList.remove('has-active-menu');
    this.wrapper.classList.remove('has-' + this.options.type);
    this.menu.classList.remove('is-active');
    this.mask.classList.remove('is-active');
    this.enableMenuOpeners();
  };

  /**
   * Disable Menu Openers.
   */
  Menu.prototype.disableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = true;
    });
  };

  /**
   * Enable Menu Openers.
   */
  Menu.prototype.enableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = false;
    });
  };

  /**
   * Add to global namespace.
   */
  window.Menu = Menu;

})(window);

$(document).ready(function(){
  $("#logo").fadeOut(10);

  $("#logo").fadeIn(2000);
});



