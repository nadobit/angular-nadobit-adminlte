(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.2
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$.AdminLTE.init = function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
        $.AdminLTE.options,
        AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
};

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      //Get window height and the wrapper height
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;


      //Enable sidebar toggle
      $('[nb-admin-lte]').on('click', toggleBtn, function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
          || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
            && $("body").hasClass('sidebar-collapse')
            && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
            && $('body').hasClass('sidebar-expanded-on-hover')
            && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(menu).on('click', 'li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent("li");

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _this.layout.fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
            && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
          _this._fix(sidebar);
        });
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

 /*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };

})(jQuery);

},{}],2:[function(require,module,exports){
require('./app.js');

angular.module('nadobit.adminlte', [
])

.directive('nbAdminLte', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $.AdminLTE.init();
        }
    };
})

;
},{"./app.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rYWVzZWJyb3QvUHJvamVjdHMvbGlicy9hbmd1bGFyLW5hZG9iaXQtYWRtaW5sdGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYWVzZWJyb3QvUHJvamVjdHMvbGlicy9hbmd1bGFyLW5hZG9iaXQtYWRtaW5sdGUvc3JjL2FwcC5qcyIsIi9Vc2Vycy9rYWVzZWJyb3QvUHJvamVjdHMvbGlicy9hbmd1bGFyLW5hZG9iaXQtYWRtaW5sdGUvc3JjL2Zha2VfODQ0NGM3MjguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qISBBZG1pbkxURSBhcHAuanNcbiAqID09PT09PT09PT09PT09PT1cbiAqIE1haW4gSlMgYXBwbGljYXRpb24gZmlsZSBmb3IgQWRtaW5MVEUgdjIuIFRoaXMgZmlsZVxuICogc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFsbCBwYWdlcy4gSXQgY29udHJvbHMgc29tZSBsYXlvdXRcbiAqIG9wdGlvbnMgYW5kIGltcGxlbWVudHMgZXhjbHVzaXZlIEFkbWluTFRFIHBsdWdpbnMuXG4gKlxuICogQEF1dGhvciAgQWxtc2FlZWQgU3R1ZGlvXG4gKiBAU3VwcG9ydCA8aHR0cDovL3d3dy5hbG1zYWVlZHN0dWRpby5jb20+XG4gKiBARW1haWwgICA8c3VwcG9ydEBhbG1zYWVlZHN0dWRpby5jb20+XG4gKiBAdmVyc2lvbiAyLjMuMlxuICogQGxpY2Vuc2UgTUlUIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuICovXG5cbi8vTWFrZSBzdXJlIGpRdWVyeSBoYXMgYmVlbiBsb2FkZWQgYmVmb3JlIGFwcC5qc1xuaWYgKHR5cGVvZiBqUXVlcnkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiQWRtaW5MVEUgcmVxdWlyZXMgalF1ZXJ5XCIpO1xufVxuXG4vKiBBZG1pbkxURVxuICpcbiAqIEB0eXBlIE9iamVjdFxuICogQGRlc2NyaXB0aW9uICQuQWRtaW5MVEUgaXMgdGhlIG1haW4gb2JqZWN0IGZvciB0aGUgdGVtcGxhdGUncyBhcHAuXG4gKiAgICAgICAgICAgICAgSXQncyB1c2VkIGZvciBpbXBsZW1lbnRpbmcgZnVuY3Rpb25zIGFuZCBvcHRpb25zIHJlbGF0ZWRcbiAqICAgICAgICAgICAgICB0byB0aGUgdGVtcGxhdGUuIEtlZXBpbmcgZXZlcnl0aGluZyB3cmFwcGVkIGluIGFuIG9iamVjdFxuICogICAgICAgICAgICAgIHByZXZlbnRzIGNvbmZsaWN0IHdpdGggb3RoZXIgcGx1Z2lucyBhbmQgaXMgYSBiZXR0ZXJcbiAqICAgICAgICAgICAgICB3YXkgdG8gb3JnYW5pemUgb3VyIGNvZGUuXG4gKi9cbiQuQWRtaW5MVEUgPSB7fTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIC0gQWRtaW5MVEUgT3B0aW9ucyAtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kaWZ5IHRoZXNlIG9wdGlvbnMgdG8gc3VpdCB5b3VyIGltcGxlbWVudGF0aW9uXG4gKi9cbiQuQWRtaW5MVEUub3B0aW9ucyA9IHtcbiAgLy9BZGQgc2xpbXNjcm9sbCB0byBuYXZiYXIgbWVudXNcbiAgLy9UaGlzIHJlcXVpcmVzIHlvdSB0byBsb2FkIHRoZSBzbGltc2Nyb2xsIHBsdWdpblxuICAvL2luIGV2ZXJ5IHBhZ2UgYmVmb3JlIGFwcC5qc1xuICBuYXZiYXJNZW51U2xpbXNjcm9sbDogdHJ1ZSxcbiAgbmF2YmFyTWVudVNsaW1zY3JvbGxXaWR0aDogXCIzcHhcIiwgLy9UaGUgd2lkdGggb2YgdGhlIHNjcm9sbCBiYXJcbiAgbmF2YmFyTWVudUhlaWdodDogXCIyMDBweFwiLCAvL1RoZSBoZWlnaHQgb2YgdGhlIGlubmVyIG1lbnVcbiAgLy9HZW5lcmFsIGFuaW1hdGlvbiBzcGVlZCBmb3IgSlMgYW5pbWF0ZWQgZWxlbWVudHMgc3VjaCBhcyBib3ggY29sbGFwc2UvZXhwYW5kIGFuZFxuICAvL3NpZGViYXIgdHJlZXZpZXcgc2xpZGUgdXAvZG93bi4gVGhpcyBvcHRpb25zIGFjY2VwdHMgYW4gaW50ZWdlciBhcyBtaWxsaXNlY29uZHMsXG4gIC8vJ2Zhc3QnLCAnbm9ybWFsJywgb3IgJ3Nsb3cnXG4gIGFuaW1hdGlvblNwZWVkOiA1MDAsXG4gIC8vU2lkZWJhciBwdXNoIG1lbnUgdG9nZ2xlIGJ1dHRvbiBzZWxlY3RvclxuICBzaWRlYmFyVG9nZ2xlU2VsZWN0b3I6IFwiW2RhdGEtdG9nZ2xlPSdvZmZjYW52YXMnXVwiLFxuICAvL0FjdGl2YXRlIHNpZGViYXIgcHVzaCBtZW51XG4gIHNpZGViYXJQdXNoTWVudTogdHJ1ZSxcbiAgLy9BY3RpdmF0ZSBzaWRlYmFyIHNsaW1zY3JvbGwgaWYgdGhlIGZpeGVkIGxheW91dCBpcyBzZXQgKHJlcXVpcmVzIFNsaW1TY3JvbGwgUGx1Z2luKVxuICBzaWRlYmFyU2xpbVNjcm9sbDogdHJ1ZSxcbiAgLy9FbmFibGUgc2lkZWJhciBleHBhbmQgb24gaG92ZXIgZWZmZWN0IGZvciBzaWRlYmFyIG1pbmlcbiAgLy9UaGlzIG9wdGlvbiBpcyBmb3JjZWQgdG8gdHJ1ZSBpZiBib3RoIHRoZSBmaXhlZCBsYXlvdXQgYW5kIHNpZGViYXIgbWluaVxuICAvL2FyZSB1c2VkIHRvZ2V0aGVyXG4gIHNpZGViYXJFeHBhbmRPbkhvdmVyOiBmYWxzZSxcbiAgLy9Cb3hSZWZyZXNoIFBsdWdpblxuICBlbmFibGVCb3hSZWZyZXNoOiB0cnVlLFxuICAvL0Jvb3RzdHJhcC5qcyB0b29sdGlwXG4gIGVuYWJsZUJTVG9wcGx0aXA6IHRydWUsXG4gIEJTVG9vbHRpcFNlbGVjdG9yOiBcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIsXG4gIC8vRW5hYmxlIEZhc3QgQ2xpY2suIEZhc3RjbGljay5qcyBjcmVhdGVzIGEgbW9yZVxuICAvL25hdGl2ZSB0b3VjaCBleHBlcmllbmNlIHdpdGggdG91Y2ggZGV2aWNlcy4gSWYgeW91XG4gIC8vY2hvb3NlIHRvIGVuYWJsZSB0aGUgcGx1Z2luLCBtYWtlIHN1cmUgeW91IGxvYWQgdGhlIHNjcmlwdFxuICAvL2JlZm9yZSBBZG1pbkxURSdzIGFwcC5qc1xuICBlbmFibGVGYXN0Y2xpY2s6IHRydWUsXG4gIC8vQ29udHJvbCBTaWRlYmFyIE9wdGlvbnNcbiAgZW5hYmxlQ29udHJvbFNpZGViYXI6IHRydWUsXG4gIGNvbnRyb2xTaWRlYmFyT3B0aW9uczoge1xuICAgIC8vV2hpY2ggYnV0dG9uIHNob3VsZCB0cmlnZ2VyIHRoZSBvcGVuL2Nsb3NlIGV2ZW50XG4gICAgdG9nZ2xlQnRuU2VsZWN0b3I6IFwiW2RhdGEtdG9nZ2xlPSdjb250cm9sLXNpZGViYXInXVwiLFxuICAgIC8vVGhlIHNpZGViYXIgc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogXCIuY29udHJvbC1zaWRlYmFyXCIsXG4gICAgLy9FbmFibGUgc2xpZGUgb3ZlciBjb250ZW50XG4gICAgc2xpZGU6IHRydWVcbiAgfSxcbiAgLy9Cb3ggV2lkZ2V0IFBsdWdpbi4gRW5hYmxlIHRoaXMgcGx1Z2luXG4gIC8vdG8gYWxsb3cgYm94ZXMgdG8gYmUgY29sbGFwc2VkIGFuZC9vciByZW1vdmVkXG4gIGVuYWJsZUJveFdpZGdldDogdHJ1ZSxcbiAgLy9Cb3ggV2lkZ2V0IHBsdWdpbiBvcHRpb25zXG4gIGJveFdpZGdldE9wdGlvbnM6IHtcbiAgICBib3hXaWRnZXRJY29uczoge1xuICAgICAgLy9Db2xsYXBzZSBpY29uXG4gICAgICBjb2xsYXBzZTogJ2ZhLW1pbnVzJyxcbiAgICAgIC8vT3BlbiBpY29uXG4gICAgICBvcGVuOiAnZmEtcGx1cycsXG4gICAgICAvL1JlbW92ZSBpY29uXG4gICAgICByZW1vdmU6ICdmYS10aW1lcydcbiAgICB9LFxuICAgIGJveFdpZGdldFNlbGVjdG9yczoge1xuICAgICAgLy9SZW1vdmUgYnV0dG9uIHNlbGVjdG9yXG4gICAgICByZW1vdmU6ICdbZGF0YS13aWRnZXQ9XCJyZW1vdmVcIl0nLFxuICAgICAgLy9Db2xsYXBzZSBidXR0b24gc2VsZWN0b3JcbiAgICAgIGNvbGxhcHNlOiAnW2RhdGEtd2lkZ2V0PVwiY29sbGFwc2VcIl0nXG4gICAgfVxuICB9LFxuICAvL0RpcmVjdCBDaGF0IHBsdWdpbiBvcHRpb25zXG4gIGRpcmVjdENoYXQ6IHtcbiAgICAvL0VuYWJsZSBkaXJlY3QgY2hhdCBieSBkZWZhdWx0XG4gICAgZW5hYmxlOiB0cnVlLFxuICAgIC8vVGhlIGJ1dHRvbiB0byBvcGVuIGFuZCBjbG9zZSB0aGUgY2hhdCBjb250YWN0cyBwYW5lXG4gICAgY29udGFjdFRvZ2dsZVNlbGVjdG9yOiAnW2RhdGEtd2lkZ2V0PVwiY2hhdC1wYW5lLXRvZ2dsZVwiXSdcbiAgfSxcbiAgLy9EZWZpbmUgdGhlIHNldCBvZiBjb2xvcnMgdG8gdXNlIGdsb2JhbGx5IGFyb3VuZCB0aGUgd2Vic2l0ZVxuICBjb2xvcnM6IHtcbiAgICBsaWdodEJsdWU6IFwiIzNjOGRiY1wiLFxuICAgIHJlZDogXCIjZjU2OTU0XCIsXG4gICAgZ3JlZW46IFwiIzAwYTY1YVwiLFxuICAgIGFxdWE6IFwiIzAwYzBlZlwiLFxuICAgIHllbGxvdzogXCIjZjM5YzEyXCIsXG4gICAgYmx1ZTogXCIjMDA3M2I3XCIsXG4gICAgbmF2eTogXCIjMDAxRjNGXCIsXG4gICAgdGVhbDogXCIjMzlDQ0NDXCIsXG4gICAgb2xpdmU6IFwiIzNEOTk3MFwiLFxuICAgIGxpbWU6IFwiIzAxRkY3MFwiLFxuICAgIG9yYW5nZTogXCIjRkY4NTFCXCIsXG4gICAgZnVjaHNpYTogXCIjRjAxMkJFXCIsXG4gICAgcHVycGxlOiBcIiM4RTI0QUFcIixcbiAgICBtYXJvb246IFwiI0Q4MUI2MFwiLFxuICAgIGJsYWNrOiBcIiMyMjIyMjJcIixcbiAgICBncmF5OiBcIiNkMmQ2ZGVcIlxuICB9LFxuICAvL1RoZSBzdGFuZGFyZCBzY3JlZW4gc2l6ZXMgdGhhdCBib290c3RyYXAgdXNlcy5cbiAgLy9JZiB5b3UgY2hhbmdlIHRoZXNlIGluIHRoZSB2YXJpYWJsZXMubGVzcyBmaWxlLCBjaGFuZ2VcbiAgLy90aGVtIGhlcmUgdG9vLlxuICBzY3JlZW5TaXplczoge1xuICAgIHhzOiA0ODAsXG4gICAgc206IDc2OCxcbiAgICBtZDogOTkyLFxuICAgIGxnOiAxMjAwXG4gIH1cbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLVxuICogLSBJbXBsZW1lbnRhdGlvbiAtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRoZSBuZXh0IGJsb2NrIG9mIGNvZGUgaW1wbGVtZW50cyBBZG1pbkxURSdzXG4gKiBmdW5jdGlvbnMgYW5kIHBsdWdpbnMgYXMgc3BlY2lmaWVkIGJ5IHRoZVxuICogb3B0aW9ucyBhYm92ZS5cbiAqL1xuJC5BZG1pbkxURS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvL0ZpeCBmb3IgSUUgcGFnZSB0cmFuc2l0aW9uc1xuICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImhvbGQtdHJhbnNpdGlvblwiKTtcblxuICAvL0V4dGVuZCBvcHRpb25zIGlmIGV4dGVybmFsIG9wdGlvbnMgZXhpc3RcbiAgaWYgKHR5cGVvZiBBZG1pbkxURU9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAkLmV4dGVuZCh0cnVlLFxuICAgICAgICAkLkFkbWluTFRFLm9wdGlvbnMsXG4gICAgICAgIEFkbWluTFRFT3B0aW9ucyk7XG4gIH1cblxuICAvL0Vhc3kgYWNjZXNzIHRvIG9wdGlvbnNcbiAgdmFyIG8gPSAkLkFkbWluTFRFLm9wdGlvbnM7XG5cbiAgLy9TZXQgdXAgdGhlIG9iamVjdFxuICBfaW5pdCgpO1xuXG4gIC8vQWN0aXZhdGUgdGhlIGxheW91dCBtYWtlclxuICAkLkFkbWluTFRFLmxheW91dC5hY3RpdmF0ZSgpO1xuXG4gIC8vRW5hYmxlIHNpZGViYXIgdHJlZSB2aWV3IGNvbnRyb2xzXG4gICQuQWRtaW5MVEUudHJlZSgnLnNpZGViYXInKTtcblxuICAvL0VuYWJsZSBjb250cm9sIHNpZGViYXJcbiAgaWYgKG8uZW5hYmxlQ29udHJvbFNpZGViYXIpIHtcbiAgICAkLkFkbWluTFRFLmNvbnRyb2xTaWRlYmFyLmFjdGl2YXRlKCk7XG4gIH1cblxuICAvL0FkZCBzbGltc2Nyb2xsIHRvIG5hdmJhciBkcm9wZG93blxuICBpZiAoby5uYXZiYXJNZW51U2xpbXNjcm9sbCAmJiB0eXBlb2YgJC5mbi5zbGltc2Nyb2xsICE9ICd1bmRlZmluZWQnKSB7XG4gICAgJChcIi5uYXZiYXIgLm1lbnVcIikuc2xpbXNjcm9sbCh7XG4gICAgICBoZWlnaHQ6IG8ubmF2YmFyTWVudUhlaWdodCxcbiAgICAgIGFsd2F5c1Zpc2libGU6IGZhbHNlLFxuICAgICAgc2l6ZTogby5uYXZiYXJNZW51U2xpbXNjcm9sbFdpZHRoXG4gICAgfSkuY3NzKFwid2lkdGhcIiwgXCIxMDAlXCIpO1xuICB9XG5cbiAgLy9BY3RpdmF0ZSBzaWRlYmFyIHB1c2ggbWVudVxuICBpZiAoby5zaWRlYmFyUHVzaE1lbnUpIHtcbiAgICAkLkFkbWluTFRFLnB1c2hNZW51LmFjdGl2YXRlKG8uc2lkZWJhclRvZ2dsZVNlbGVjdG9yKTtcbiAgfVxuXG4gIC8vQWN0aXZhdGUgQm9vdHN0cmFwIHRvb2x0aXBcbiAgaWYgKG8uZW5hYmxlQlNUb3BwbHRpcCkge1xuICAgICQoJ2JvZHknKS50b29sdGlwKHtcbiAgICAgIHNlbGVjdG9yOiBvLkJTVG9vbHRpcFNlbGVjdG9yXG4gICAgfSk7XG4gIH1cblxuICAvL0FjdGl2YXRlIGJveCB3aWRnZXRcbiAgaWYgKG8uZW5hYmxlQm94V2lkZ2V0KSB7XG4gICAgJC5BZG1pbkxURS5ib3hXaWRnZXQuYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8vQWN0aXZhdGUgZmFzdCBjbGlja1xuICBpZiAoby5lbmFibGVGYXN0Y2xpY2sgJiYgdHlwZW9mIEZhc3RDbGljayAhPSAndW5kZWZpbmVkJykge1xuICAgIEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG4gIH1cblxuICAvKlxuICAgKiBJTklUSUFMSVpFIEJVVFRPTiBUT0dHTEVcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICAkKCcuYnRuLWdyb3VwW2RhdGEtdG9nZ2xlPVwiYnRuLXRvZ2dsZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIHZhciBncm91cCA9ICQodGhpcyk7XG4gICAgJCh0aGlzKS5maW5kKFwiLmJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZ3JvdXAuZmluZChcIi5idG4uYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICB9KTtcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIC0gSW5pdGlhbGl6ZSB0aGUgQWRtaW5MVEUgT2JqZWN0IC1cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFsbCBBZG1pbkxURSBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIGJlbG93LlxuICovXG5mdW5jdGlvbiBfaW5pdCgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvKiBMYXlvdXRcbiAgICogPT09PT09XG4gICAqIEZpeGVzIHRoZSBsYXlvdXQgaGVpZ2h0IGluIGNhc2UgbWluLWhlaWdodCBmYWlscy5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqIEB1c2FnZSAkLkFkbWluTFRFLmxheW91dC5hY3RpdmF0ZSgpXG4gICAqICAgICAgICAkLkFkbWluTFRFLmxheW91dC5maXgoKVxuICAgKiAgICAgICAgJC5BZG1pbkxURS5sYXlvdXQuZml4U2lkZWJhcigpXG4gICAqL1xuICAkLkFkbWluTFRFLmxheW91dCA9IHtcbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIF90aGlzLmZpeCgpO1xuICAgICAgX3RoaXMuZml4U2lkZWJhcigpO1xuICAgICAgJCh3aW5kb3csIFwiLndyYXBwZXJcIikucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuZml4KCk7XG4gICAgICAgIF90aGlzLmZpeFNpZGViYXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZml4OiBmdW5jdGlvbiAoKSB7XG4gICAgICAvL0dldCB3aW5kb3cgaGVpZ2h0IGFuZCB0aGUgd3JhcHBlciBoZWlnaHRcbiAgICAgIHZhciBuZWcgPSAkKCcubWFpbi1oZWFkZXInKS5vdXRlckhlaWdodCgpICsgJCgnLm1haW4tZm9vdGVyJykub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHZhciB3aW5kb3dfaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgdmFyIHNpZGViYXJfaGVpZ2h0ID0gJChcIi5zaWRlYmFyXCIpLmhlaWdodCgpO1xuICAgICAgLy9TZXQgdGhlIG1pbi1oZWlnaHQgb2YgdGhlIGNvbnRlbnQgYW5kIHNpZGViYXIgYmFzZWQgb24gdGhlXG4gICAgICAvL3RoZSBoZWlnaHQgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgaWYgKCQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZml4ZWRcIikpIHtcbiAgICAgICAgJChcIi5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlXCIpLmNzcygnbWluLWhlaWdodCcsIHdpbmRvd19oZWlnaHQgLSAkKCcubWFpbi1mb290ZXInKS5vdXRlckhlaWdodCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwb3N0U2V0V2lkdGg7XG4gICAgICAgIGlmICh3aW5kb3dfaGVpZ2h0ID49IHNpZGViYXJfaGVpZ2h0KSB7XG4gICAgICAgICAgJChcIi5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlXCIpLmNzcygnbWluLWhlaWdodCcsIHdpbmRvd19oZWlnaHQgLSBuZWcpO1xuICAgICAgICAgIHBvc3RTZXRXaWR0aCA9IHdpbmRvd19oZWlnaHQgLSBuZWc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChcIi5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlXCIpLmNzcygnbWluLWhlaWdodCcsIHNpZGViYXJfaGVpZ2h0KTtcbiAgICAgICAgICBwb3N0U2V0V2lkdGggPSBzaWRlYmFyX2hlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRml4IGZvciB0aGUgY29udHJvbCBzaWRlYmFyIGhlaWdodFxuICAgICAgICB2YXIgY29udHJvbFNpZGViYXIgPSAkKCQuQWRtaW5MVEUub3B0aW9ucy5jb250cm9sU2lkZWJhck9wdGlvbnMuc2VsZWN0b3IpO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2xTaWRlYmFyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xTaWRlYmFyLmhlaWdodCgpID4gcG9zdFNldFdpZHRoKVxuICAgICAgICAgICAgJChcIi5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlXCIpLmNzcygnbWluLWhlaWdodCcsIGNvbnRyb2xTaWRlYmFyLmhlaWdodCgpKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSxcbiAgICBmaXhTaWRlYmFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvL01ha2Ugc3VyZSB0aGUgYm9keSB0YWcgaGFzIHRoZSAuZml4ZWQgY2xhc3NcbiAgICAgIGlmICghJChcImJvZHlcIikuaGFzQ2xhc3MoXCJmaXhlZFwiKSkge1xuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpbVNjcm9sbCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICQoXCIuc2lkZWJhclwiKS5zbGltU2Nyb2xsKHtkZXN0cm95OiB0cnVlfSkuaGVpZ2h0KFwiYXV0b1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiAkLmZuLnNsaW1TY3JvbGwgPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IoXCJFcnJvcjogdGhlIGZpeGVkIGxheW91dCByZXF1aXJlcyB0aGUgc2xpbXNjcm9sbCBwbHVnaW4hXCIpO1xuICAgICAgfVxuICAgICAgLy9FbmFibGUgc2xpbXNjcm9sbCBmb3IgZml4ZWQgbGF5b3V0XG4gICAgICBpZiAoJC5BZG1pbkxURS5vcHRpb25zLnNpZGViYXJTbGltU2Nyb2xsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGltU2Nyb2xsICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy9EZXN0cm95IGlmIGl0IGV4aXN0c1xuICAgICAgICAgICQoXCIuc2lkZWJhclwiKS5zbGltU2Nyb2xsKHtkZXN0cm95OiB0cnVlfSkuaGVpZ2h0KFwiYXV0b1wiKTtcbiAgICAgICAgICAvL0FkZCBzbGltc2Nyb2xsXG4gICAgICAgICAgJChcIi5zaWRlYmFyXCIpLnNsaW1zY3JvbGwoe1xuICAgICAgICAgICAgaGVpZ2h0OiAoJCh3aW5kb3cpLmhlaWdodCgpIC0gJChcIi5tYWluLWhlYWRlclwiKS5oZWlnaHQoKSkgKyBcInB4XCIsXG4gICAgICAgICAgICBjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIixcbiAgICAgICAgICAgIHNpemU6IFwiM3B4XCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKiBQdXNoTWVudSgpXG4gICAqID09PT09PT09PT1cbiAgICogQWRkcyB0aGUgcHVzaCBtZW51IGZ1bmN0aW9uYWxpdHkgdG8gdGhlIHNpZGViYXIuXG4gICAqXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEB1c2FnZTogJC5BZG1pbkxURS5wdXNoTWVudShcIltkYXRhLXRvZ2dsZT0nb2ZmY2FudmFzJ11cIilcbiAgICovXG4gICQuQWRtaW5MVEUucHVzaE1lbnUgPSB7XG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICh0b2dnbGVCdG4pIHtcbiAgICAgIC8vR2V0IHRoZSBzY3JlZW4gc2l6ZXNcbiAgICAgIHZhciBzY3JlZW5TaXplcyA9ICQuQWRtaW5MVEUub3B0aW9ucy5zY3JlZW5TaXplcztcblxuXG4gICAgICAvL0VuYWJsZSBzaWRlYmFyIHRvZ2dsZVxuICAgICAgJCgnW25iLWFkbWluLWx0ZV0nKS5vbignY2xpY2snLCB0b2dnbGVCdG4sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvL0VuYWJsZSBzaWRlYmFyIHB1c2ggbWVudVxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAoc2NyZWVuU2l6ZXMuc20gLSAxKSkge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpKSB7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpLnRyaWdnZXIoJ2V4cGFuZGVkLnB1c2hNZW51Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKCdzaWRlYmFyLWNvbGxhcHNlJykudHJpZ2dlcignY29sbGFwc2VkLnB1c2hNZW51Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vSGFuZGxlIHNpZGViYXIgcHVzaCBtZW51IGZvciBzbWFsbCBzY3JlZW5zXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcygnc2lkZWJhci1vcGVuJykpIHtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLW9wZW4nKS5yZW1vdmVDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpLnRyaWdnZXIoJ2NvbGxhcHNlZC5wdXNoTWVudScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcygnc2lkZWJhci1vcGVuJykudHJpZ2dlcignZXhwYW5kZWQucHVzaE1lbnUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKFwiLmNvbnRlbnQtd3JhcHBlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vRW5hYmxlIGhpZGUgbWVudSB3aGVuIGNsaWNraW5nIG9uIHRoZSBjb250ZW50LXdyYXBwZXIgb24gc21hbGwgc2NyZWVuc1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gKHNjcmVlblNpemVzLnNtIC0gMSkgJiYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIikpIHtcbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2lkZWJhci1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvL0VuYWJsZSBleHBhbmQgb24gaG92ZXIgZm9yIHNpZGViYXIgbWluaVxuICAgICAgaWYgKCQuQWRtaW5MVEUub3B0aW9ucy5zaWRlYmFyRXhwYW5kT25Ib3ZlclxuICAgICAgICAgIHx8ICgkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpeGVkJylcbiAgICAgICAgICAmJiAkKCdib2R5JykuaGFzQ2xhc3MoJ3NpZGViYXItbWluaScpKSkge1xuICAgICAgICB0aGlzLmV4cGFuZE9uSG92ZXIoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4cGFuZE9uSG92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB2YXIgc2NyZWVuV2lkdGggPSAkLkFkbWluTFRFLm9wdGlvbnMuc2NyZWVuU2l6ZXMuc20gLSAxO1xuICAgICAgLy9FeHBhbmQgc2lkZWJhciBvbiBob3ZlclxuICAgICAgJCgnLm1haW4tc2lkZWJhcicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnc2lkZWJhci1taW5pJylcbiAgICAgICAgICAgICYmICQoXCJib2R5XCIpLmhhc0NsYXNzKCdzaWRlYmFyLWNvbGxhcHNlJylcbiAgICAgICAgICAgICYmICQod2luZG93KS53aWR0aCgpID4gc2NyZWVuV2lkdGgpIHtcbiAgICAgICAgICBfdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdzaWRlYmFyLW1pbmknKVxuICAgICAgICAgICAgJiYgJCgnYm9keScpLmhhc0NsYXNzKCdzaWRlYmFyLWV4cGFuZGVkLW9uLWhvdmVyJylcbiAgICAgICAgICAgICYmICQod2luZG93KS53aWR0aCgpID4gc2NyZWVuV2lkdGgpIHtcbiAgICAgICAgICBfdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGV4cGFuZDogZnVuY3Rpb24gKCkge1xuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKS5hZGRDbGFzcygnc2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlcicpO1xuICAgIH0sXG4gICAgY29sbGFwc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3NpZGViYXItZXhwYW5kZWQtb24taG92ZXInKSkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItZXhwYW5kZWQtb24taG92ZXInKS5hZGRDbGFzcygnc2lkZWJhci1jb2xsYXBzZScpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKiBUcmVlKClcbiAgICogPT09PT09XG4gICAqIENvbnZlcnRzIHRoZSBzaWRlYmFyIGludG8gYSBtdWx0aWxldmVsXG4gICAqIHRyZWUgdmlldyBtZW51LlxuICAgKlxuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAVXNhZ2U6ICQuQWRtaW5MVEUudHJlZSgnLnNpZGViYXInKVxuICAgKi9cbiAgJC5BZG1pbkxURS50cmVlID0gZnVuY3Rpb24gKG1lbnUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBhbmltYXRpb25TcGVlZCA9ICQuQWRtaW5MVEUub3B0aW9ucy5hbmltYXRpb25TcGVlZDtcbiAgICAkKG1lbnUpLm9uKCdjbGljaycsICdsaSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vR2V0IHRoZSBjbGlja2VkIGxpbmsgYW5kIHRoZSBuZXh0IGVsZW1lbnRcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgY2hlY2tFbGVtZW50ID0gJHRoaXMubmV4dCgpO1xuXG4gICAgICAvL0NoZWNrIGlmIHRoZSBuZXh0IGVsZW1lbnQgaXMgYSBtZW51IGFuZCBpcyB2aXNpYmxlXG4gICAgICBpZiAoKGNoZWNrRWxlbWVudC5pcygnLnRyZWV2aWV3LW1lbnUnKSkgJiYgKGNoZWNrRWxlbWVudC5pcygnOnZpc2libGUnKSkgJiYgKCEkKCdib2R5JykuaGFzQ2xhc3MoJ3NpZGViYXItY29sbGFwc2UnKSkpIHtcbiAgICAgICAgLy9DbG9zZSB0aGUgbWVudVxuICAgICAgICBjaGVja0VsZW1lbnQuc2xpZGVVcChhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNoZWNrRWxlbWVudC5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XG4gICAgICAgICAgLy9GaXggdGhlIGxheW91dCBpbiBjYXNlIHRoZSBzaWRlYmFyIHN0cmV0Y2hlcyBvdmVyIHRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvd1xuICAgICAgICAgIC8vX3RoaXMubGF5b3V0LmZpeCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2hlY2tFbGVtZW50LnBhcmVudChcImxpXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfVxuICAgICAgLy9JZiB0aGUgbWVudSBpcyBub3QgdmlzaWJsZVxuICAgICAgZWxzZSBpZiAoKGNoZWNrRWxlbWVudC5pcygnLnRyZWV2aWV3LW1lbnUnKSkgJiYgKCFjaGVja0VsZW1lbnQuaXMoJzp2aXNpYmxlJykpKSB7XG4gICAgICAgIC8vR2V0IHRoZSBwYXJlbnQgbWVudVxuICAgICAgICB2YXIgcGFyZW50ID0gJHRoaXMucGFyZW50cygndWwnKS5maXJzdCgpO1xuICAgICAgICAvL0Nsb3NlIGFsbCBvcGVuIG1lbnVzIHdpdGhpbiB0aGUgcGFyZW50XG4gICAgICAgIHZhciB1bCA9IHBhcmVudC5maW5kKCd1bDp2aXNpYmxlJykuc2xpZGVVcChhbmltYXRpb25TcGVlZCk7XG4gICAgICAgIC8vUmVtb3ZlIHRoZSBtZW51LW9wZW4gY2xhc3MgZnJvbSB0aGUgcGFyZW50XG4gICAgICAgIHVsLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcbiAgICAgICAgLy9HZXQgdGhlIHBhcmVudCBsaVxuICAgICAgICB2YXIgcGFyZW50X2xpID0gJHRoaXMucGFyZW50KFwibGlcIik7XG5cbiAgICAgICAgLy9PcGVuIHRoZSB0YXJnZXQgbWVudSBhbmQgYWRkIHRoZSBtZW51LW9wZW4gY2xhc3NcbiAgICAgICAgY2hlY2tFbGVtZW50LnNsaWRlRG93bihhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vQWRkIHRoZSBjbGFzcyBhY3RpdmUgdG8gdGhlIHBhcmVudCBsaVxuICAgICAgICAgIGNoZWNrRWxlbWVudC5hZGRDbGFzcygnbWVudS1vcGVuJyk7XG4gICAgICAgICAgcGFyZW50LmZpbmQoJ2xpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBwYXJlbnRfbGkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIC8vRml4IHRoZSBsYXlvdXQgaW4gY2FzZSB0aGUgc2lkZWJhciBzdHJldGNoZXMgb3ZlciB0aGUgaGVpZ2h0IG9mIHRoZSB3aW5kb3dcbiAgICAgICAgICBfdGhpcy5sYXlvdXQuZml4KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy9pZiB0aGlzIGlzbid0IGEgbGluaywgcHJldmVudCB0aGUgcGFnZSBmcm9tIGJlaW5nIHJlZGlyZWN0ZWRcbiAgICAgIGlmIChjaGVja0VsZW1lbnQuaXMoJy50cmVldmlldy1tZW51JykpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qIENvbnRyb2xTaWRlYmFyXG4gICAqID09PT09PT09PT09PT09XG4gICAqIEFkZHMgZnVuY3Rpb25hbGl0eSB0byB0aGUgcmlnaHQgc2lkZWJhclxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICogQHVzYWdlICQuQWRtaW5MVEUuY29udHJvbFNpZGViYXIuYWN0aXZhdGUob3B0aW9ucylcbiAgICovXG4gICQuQWRtaW5MVEUuY29udHJvbFNpZGViYXIgPSB7XG4gICAgLy9pbnN0YW50aWF0ZSB0aGUgb2JqZWN0XG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vR2V0IHRoZSBvYmplY3RcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAvL1VwZGF0ZSBvcHRpb25zXG4gICAgICB2YXIgbyA9ICQuQWRtaW5MVEUub3B0aW9ucy5jb250cm9sU2lkZWJhck9wdGlvbnM7XG4gICAgICAvL0dldCB0aGUgc2lkZWJhclxuICAgICAgdmFyIHNpZGViYXIgPSAkKG8uc2VsZWN0b3IpO1xuICAgICAgLy9UaGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgdmFyIGJ0biA9ICQoby50b2dnbGVCdG5TZWxlY3Rvcik7XG5cbiAgICAgIC8vTGlzdGVuIHRvIHRoZSBjbGljayBldmVudFxuICAgICAgYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy9JZiB0aGUgc2lkZWJhciBpcyBub3Qgb3BlblxuICAgICAgICBpZiAoIXNpZGViYXIuaGFzQ2xhc3MoJ2NvbnRyb2wtc2lkZWJhci1vcGVuJylcbiAgICAgICAgICAgICYmICEkKCdib2R5JykuaGFzQ2xhc3MoJ2NvbnRyb2wtc2lkZWJhci1vcGVuJykpIHtcbiAgICAgICAgICAvL09wZW4gdGhlIHNpZGViYXJcbiAgICAgICAgICBfdGhpcy5vcGVuKHNpZGViYXIsIG8uc2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmNsb3NlKHNpZGViYXIsIG8uc2xpZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy9JZiB0aGUgYm9keSBoYXMgYSBib3hlZCBsYXlvdXQsIGZpeCB0aGUgc2lkZWJhciBiZyBwb3NpdGlvblxuICAgICAgdmFyIGJnID0gJChcIi5jb250cm9sLXNpZGViYXItYmdcIik7XG4gICAgICBfdGhpcy5fZml4KGJnKTtcblxuICAgICAgLy9JZiB0aGUgYm9keSBoYXMgYSBmaXhlZCBsYXlvdXQsIG1ha2UgdGhlIGNvbnRyb2wgc2lkZWJhciBmaXhlZFxuICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICBfdGhpcy5fZml4Rm9yRml4ZWQoc2lkZWJhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL0lmIHRoZSBjb250ZW50IGhlaWdodCBpcyBsZXNzIHRoYW4gdGhlIHNpZGViYXIncyBoZWlnaHQsIGZvcmNlIG1heCBoZWlnaHRcbiAgICAgICAgaWYgKCQoJy5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlJykuaGVpZ2h0KCkgPCBzaWRlYmFyLmhlaWdodCgpKSB7XG4gICAgICAgICAgX3RoaXMuX2ZpeEZvckNvbnRlbnQoc2lkZWJhcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vT3BlbiB0aGUgY29udHJvbCBzaWRlYmFyXG4gICAgb3BlbjogZnVuY3Rpb24gKHNpZGViYXIsIHNsaWRlKSB7XG4gICAgICAvL1NsaWRlIG92ZXIgY29udGVudFxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2NvbnRyb2wtc2lkZWJhci1vcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL1B1c2ggdGhlIGNvbnRlbnQgYnkgYWRkaW5nIHRoZSBvcGVuIGNsYXNzIHRvIHRoZSBib2R5IGluc3RlYWRcbiAgICAgICAgLy9vZiB0aGUgc2lkZWJhciBpdHNlbGZcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdjb250cm9sLXNpZGViYXItb3BlbicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9DbG9zZSB0aGUgY29udHJvbCBzaWRlYmFyXG4gICAgY2xvc2U6IGZ1bmN0aW9uIChzaWRlYmFyLCBzbGlkZSkge1xuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2NvbnRyb2wtc2lkZWJhci1vcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2NvbnRyb2wtc2lkZWJhci1vcGVuJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBfZml4OiBmdW5jdGlvbiAoc2lkZWJhcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcygnbGF5b3V0LWJveGVkJykpIHtcbiAgICAgICAgc2lkZWJhci5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHNpZGViYXIuaGVpZ2h0KCQoXCIud3JhcHBlclwiKS5oZWlnaHQoKSk7XG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLl9maXgoc2lkZWJhcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZWJhci5jc3Moe1xuICAgICAgICAgICdwb3NpdGlvbic6ICdmaXhlZCcsXG4gICAgICAgICAgJ2hlaWdodCc6ICdhdXRvJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIF9maXhGb3JGaXhlZDogZnVuY3Rpb24gKHNpZGViYXIpIHtcbiAgICAgIHNpZGViYXIuY3NzKHtcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiAnMTAwJScsXG4gICAgICAgICdvdmVyZmxvdyc6ICdhdXRvJyxcbiAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogJzUwcHgnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIF9maXhGb3JDb250ZW50OiBmdW5jdGlvbiAoc2lkZWJhcikge1xuICAgICAgJChcIi5jb250ZW50LXdyYXBwZXIsIC5yaWdodC1zaWRlXCIpLmNzcygnbWluLWhlaWdodCcsIHNpZGViYXIuaGVpZ2h0KCkpO1xuICAgIH1cbiAgfTtcblxuICAvKiBCb3hXaWRnZXRcbiAgICogPT09PT09PT09XG4gICAqIEJveFdpZGdldCBpcyBhIHBsdWdpbiB0byBoYW5kbGUgY29sbGFwc2luZyBhbmRcbiAgICogcmVtb3ZpbmcgYm94ZXMgZnJvbSB0aGUgc2NyZWVuLlxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICogQHVzYWdlICQuQWRtaW5MVEUuYm94V2lkZ2V0LmFjdGl2YXRlKClcbiAgICogICAgICAgIFNldCBhbGwgeW91ciBvcHRpb25zIGluIHRoZSBtYWluICQuQWRtaW5MVEUub3B0aW9ucyBvYmplY3RcbiAgICovXG4gICQuQWRtaW5MVEUuYm94V2lkZ2V0ID0ge1xuICAgIHNlbGVjdG9yczogJC5BZG1pbkxURS5vcHRpb25zLmJveFdpZGdldE9wdGlvbnMuYm94V2lkZ2V0U2VsZWN0b3JzLFxuICAgIGljb25zOiAkLkFkbWluTFRFLm9wdGlvbnMuYm94V2lkZ2V0T3B0aW9ucy5ib3hXaWRnZXRJY29ucyxcbiAgICBhbmltYXRpb25TcGVlZDogJC5BZG1pbkxURS5vcHRpb25zLmFuaW1hdGlvblNwZWVkLFxuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoX2JveCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmICghX2JveCkge1xuICAgICAgICBfYm94ID0gZG9jdW1lbnQ7IC8vIGFjdGl2YXRlIGFsbCBib3hlcyBwZXIgZGVmYXVsdFxuICAgICAgfVxuICAgICAgLy9MaXN0ZW4gZm9yIGNvbGxhcHNlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAkKF9ib3gpLm9uKCdjbGljaycsIF90aGlzLnNlbGVjdG9ycy5jb2xsYXBzZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfdGhpcy5jb2xsYXBzZSgkKHRoaXMpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0xpc3RlbiBmb3IgcmVtb3ZlIGV2ZW50IHRyaWdnZXJzXG4gICAgICAkKF9ib3gpLm9uKCdjbGljaycsIF90aGlzLnNlbGVjdG9ycy5yZW1vdmUsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMucmVtb3ZlKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb2xsYXBzZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAvL0ZpbmQgdGhlIGJveCBwYXJlbnRcbiAgICAgIHZhciBib3ggPSBlbGVtZW50LnBhcmVudHMoXCIuYm94XCIpLmZpcnN0KCk7XG4gICAgICAvL0ZpbmQgdGhlIGJvZHkgYW5kIHRoZSBmb290ZXJcbiAgICAgIHZhciBib3hfY29udGVudCA9IGJveC5maW5kKFwiPiAuYm94LWJvZHksID4gLmJveC1mb290ZXIsID4gZm9ybSAgPi5ib3gtYm9keSwgPiBmb3JtID4gLmJveC1mb290ZXJcIik7XG4gICAgICBpZiAoIWJveC5oYXNDbGFzcyhcImNvbGxhcHNlZC1ib3hcIikpIHtcbiAgICAgICAgLy9Db252ZXJ0IG1pbnVzIGludG8gcGx1c1xuICAgICAgICBlbGVtZW50LmNoaWxkcmVuKFwiOmZpcnN0XCIpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoX3RoaXMuaWNvbnMuY29sbGFwc2UpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoX3RoaXMuaWNvbnMub3Blbik7XG4gICAgICAgIC8vSGlkZSB0aGUgY29udGVudFxuICAgICAgICBib3hfY29udGVudC5zbGlkZVVwKF90aGlzLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYm94LmFkZENsYXNzKFwiY29sbGFwc2VkLWJveFwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL0NvbnZlcnQgcGx1cyBpbnRvIG1pbnVzXG4gICAgICAgIGVsZW1lbnQuY2hpbGRyZW4oXCI6Zmlyc3RcIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhfdGhpcy5pY29ucy5vcGVuKVxuICAgICAgICAgICAgLmFkZENsYXNzKF90aGlzLmljb25zLmNvbGxhcHNlKTtcbiAgICAgICAgLy9TaG93IHRoZSBjb250ZW50XG4gICAgICAgIGJveF9jb250ZW50LnNsaWRlRG93bihfdGhpcy5hbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGJveC5yZW1vdmVDbGFzcyhcImNvbGxhcHNlZC1ib3hcIik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgLy9GaW5kIHRoZSBib3ggcGFyZW50XG4gICAgICB2YXIgYm94ID0gZWxlbWVudC5wYXJlbnRzKFwiLmJveFwiKS5maXJzdCgpO1xuICAgICAgYm94LnNsaWRlVXAodGhpcy5hbmltYXRpb25TcGVlZCk7XG4gICAgfVxuICB9O1xufVxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqIC0gQ3VzdG9tIFBsdWdpbnMgLVxuICogLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBbGwgY3VzdG9tIHBsdWdpbnMgYXJlIGRlZmluZWQgYmVsb3cuXG4gKi9cblxuLypcbiAqIEJPWCBSRUZSRVNIIEJVVFRPTlxuICogLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGlzIGEgY3VzdG9tIHBsdWdpbiB0byB1c2Ugd2l0aCB0aGUgY29tcG9uZW50IEJPWC4gSXQgYWxsb3dzIHlvdSB0byBhZGRcbiAqIGEgcmVmcmVzaCBidXR0b24gdG8gdGhlIGJveC4gSXQgY29udmVydHMgdGhlIGJveCdzIHN0YXRlIHRvIGEgbG9hZGluZyBzdGF0ZS5cbiAqXG4gKiBAdHlwZSBwbHVnaW5cbiAqIEB1c2FnZSAkKFwiI2JveC13aWRnZXRcIikuYm94UmVmcmVzaCggb3B0aW9ucyApO1xuICovXG4oZnVuY3Rpb24gKCQpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICAkLmZuLmJveFJlZnJlc2ggPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgLy8gUmVuZGVyIG9wdGlvbnNcbiAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAvL1JlZnJlc2ggYnV0dG9uIHNlbGVjdG9yXG4gICAgICB0cmlnZ2VyOiBcIi5yZWZyZXNoLWJ0blwiLFxuICAgICAgLy9GaWxlIHNvdXJjZSB0byBiZSBsb2FkZWQgKGUuZzogYWpheC9zcmMucGhwKVxuICAgICAgc291cmNlOiBcIlwiLFxuICAgICAgLy9DYWxsYmFja3NcbiAgICAgIG9uTG9hZFN0YXJ0OiBmdW5jdGlvbiAoYm94KSB7XG4gICAgICAgIHJldHVybiBib3g7XG4gICAgICB9LCAvL1JpZ2h0IGFmdGVyIHRoZSBidXR0b24gaGFzIGJlZW4gY2xpY2tlZFxuICAgICAgb25Mb2FkRG9uZTogZnVuY3Rpb24gKGJveCkge1xuICAgICAgICByZXR1cm4gYm94O1xuICAgICAgfSAvL1doZW4gdGhlIHNvdXJjZSBoYXMgYmVlbiBsb2FkZWRcblxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgLy9UaGUgb3ZlcmxheVxuICAgIHZhciBvdmVybGF5ID0gJCgnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj48ZGl2IGNsYXNzPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluXCI+PC9kaXY+PC9kaXY+Jyk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vaWYgYSBzb3VyY2UgaXMgc3BlY2lmaWVkXG4gICAgICBpZiAoc2V0dGluZ3Muc291cmNlID09PSBcIlwiKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhcIlBsZWFzZSBzcGVjaWZ5IGEgc291cmNlIGZpcnN0IC0gYm94UmVmcmVzaCgpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vdGhlIGJveFxuICAgICAgdmFyIGJveCA9ICQodGhpcyk7XG4gICAgICAvL3RoZSBidXR0b25cbiAgICAgIHZhciByQnRuID0gYm94LmZpbmQoc2V0dGluZ3MudHJpZ2dlcikuZmlyc3QoKTtcblxuICAgICAgLy9PbiB0cmlnZ2VyIGNsaWNrXG4gICAgICByQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy9BZGQgbG9hZGluZyBvdmVybGF5XG4gICAgICAgIHN0YXJ0KGJveCk7XG5cbiAgICAgICAgLy9QZXJmb3JtIGFqYXggY2FsbFxuICAgICAgICBib3guZmluZChcIi5ib3gtYm9keVwiKS5sb2FkKHNldHRpbmdzLnNvdXJjZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRvbmUoYm94KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHN0YXJ0KGJveCkge1xuICAgICAgLy9BZGQgb3ZlcmxheSBhbmQgbG9hZGluZyBpbWdcbiAgICAgIGJveC5hcHBlbmQob3ZlcmxheSk7XG5cbiAgICAgIHNldHRpbmdzLm9uTG9hZFN0YXJ0LmNhbGwoYm94KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb25lKGJveCkge1xuICAgICAgLy9SZW1vdmUgb3ZlcmxheSBhbmQgbG9hZGluZyBpbWdcbiAgICAgIGJveC5maW5kKG92ZXJsYXkpLnJlbW92ZSgpO1xuXG4gICAgICBzZXR0aW5ncy5vbkxvYWREb25lLmNhbGwoYm94KTtcbiAgICB9XG5cbiAgfTtcblxufSkoalF1ZXJ5KTtcblxuIC8qXG4gKiBFWFBMSUNJVCBCT1ggQ09OVFJPTFNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaGlzIGlzIGEgY3VzdG9tIHBsdWdpbiB0byB1c2Ugd2l0aCB0aGUgY29tcG9uZW50IEJPWC4gSXQgYWxsb3dzIHlvdSB0byBhY3RpdmF0ZVxuICogYSBib3ggaW5zZXJ0ZWQgaW4gdGhlIERPTSBhZnRlciB0aGUgYXBwLmpzIHdhcyBsb2FkZWQsIHRvZ2dsZSBhbmQgcmVtb3ZlIGJveC5cbiAqXG4gKiBAdHlwZSBwbHVnaW5cbiAqIEB1c2FnZSAkKFwiI2JveC13aWRnZXRcIikuYWN0aXZhdGVCb3goKTtcbiAqIEB1c2FnZSAkKFwiI2JveC13aWRnZXRcIikudG9nZ2xlQm94KCk7XG4gKiBAdXNhZ2UgJChcIiNib3gtd2lkZ2V0XCIpLnJlbW92ZUJveCgpO1xuICovXG4oZnVuY3Rpb24gKCQpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgJC5mbi5hY3RpdmF0ZUJveCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLkFkbWluTFRFLmJveFdpZGdldC5hY3RpdmF0ZSh0aGlzKTtcbiAgfTtcblxuICAkLmZuLnRvZ2dsZUJveCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGJ1dHRvbiA9ICQoJC5BZG1pbkxURS5ib3hXaWRnZXQuc2VsZWN0b3JzLmNvbGxhcHNlLCB0aGlzKTtcbiAgICAkLkFkbWluTFRFLmJveFdpZGdldC5jb2xsYXBzZShidXR0b24pO1xuICB9O1xuXG4gICQuZm4ucmVtb3ZlQm94ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgYnV0dG9uID0gJCgkLkFkbWluTFRFLmJveFdpZGdldC5zZWxlY3RvcnMucmVtb3ZlLCB0aGlzKTtcbiAgICAkLkFkbWluTFRFLmJveFdpZGdldC5yZW1vdmUoYnV0dG9uKTtcbiAgfTtcblxufSkoalF1ZXJ5KTtcbiIsInJlcXVpcmUoJy4vYXBwLmpzJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCduYWRvYml0LmFkbWlubHRlJywgW1xuXSlcblxuLmRpcmVjdGl2ZSgnbmJBZG1pbkx0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRycykge1xuICAgICAgICAgICAgJC5BZG1pbkxURS5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufSlcblxuOyJdfQ==
