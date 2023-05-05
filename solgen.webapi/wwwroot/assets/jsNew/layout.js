/* ============================================================
 * Layout Script
 =========================================================== */
var $logopanel = $('.logopanel');
var $topbar = $('.topbar');
var $sidebar = $('.sidebar');
var $sidebarFooter = $('.sidebar-footer');

/****  Initiation of Main Functions  ****/
$(document).ready(function () {
  var $sidebar = $("#FixedDiv"), $window = $(window), offset = $sidebar.offset();
  
  $window.scroll(function () {
    
    if ($window.scrollTop() > (offset.top - 100)) {
      
      $sidebar.stop().animate({
        marginTop: $window.scrollTop() - offset.top + 135
       
      });
      if(($window.scrollTop() - offset.top - 70) > 0) {
        $("#FixedDiv").css("margin-top", ($window.scrollTop() - offset.top - 70));
      }
    } else {
      $sidebar.stop().animate({
        marginTop: 0
      });
      $("#FixedDiv").css("margin-top", "0px");
    }
  });

  
  //$(document).on('change', 'body', function () {
  //  debugger;
    
  //});
 
 

  handleboxedLayout();
  setTimeout(function () {
    handleboxedLayout();
  }, 100);

  if ($('body').hasClass('sidebar-hover')) sidebarHover();

  //$('[data-toggle]').on('click', function (event) {
  $('body').on('click', '[data-toggle]', function (e) {
    event.preventDefault();
    var toggleLayout = $(this).data('toggle');
    if (toggleLayout == 'sidebar-behaviour') toggleSidebar();
    if (toggleLayout == 'submenu') toggleSubmenuHover();
    if (toggleLayout == 'sidebar-collapsed') collapsedSidebar();
    if (toggleLayout == 'sidebar-hover') toggleSidebarHover();
    if (toggleLayout == 'boxed') toggleboxedLayout();
    if (toggleLayout == 'topbar') toggleTopbar();
  });

});

/****  Resize Event Functions  ****/

$(window).resize(function () {
  setTimeout(function () {
    handleboxedLayout();
  }, 100);
});


/* ==========================================================*/
/* LAYOUTS API                                                */
/* ========================================================= */

/* Create Sidebar Fixed */
function handleSidebarFixed() {
  // removeSidebarHover();
  $('#switch-sidebar').prop('checked', true);
  $('#switch-submenu').prop('checked', false);
  $.removeCookie('submenu-hover');
  if ($('body').hasClass('sidebar-top')) {
    $('body').removeClass('fixed-topbar').addClass('fixed-topbar');
    $.removeCookie('fluid-topbar');
    $('#switch-topbar').prop('checked', true);
  }
  $('body').removeClass('fixed-sidebar').addClass('fixed-sidebar');
  $('.sidebar').height('');
  handleboxedLayout();
  if (!$('body').hasClass('sidebar-collapsed')) removeSubmenuHover();
  createSideScroll();
  $.removeCookie('fluid-sidebar');
  $.cookie('fixed-sidebar', 1);
}

/* Create Sidebar Fluid / Remove Sidebar Fixed */
function handleSidebarFluid() {
  $('#switch-sidebar').prop('checked', false);
  if ($('body').hasClass('sidebar-hover')) {
    removeSidebarHover();
    $('#switch-sidebar-hover').prop('checked', false);
  }
  $('body').removeClass('fixed-sidebar');
  handleboxedLayout();
  destroySideScroll();
  $.removeCookie('fixed-sidebar');
  $.cookie('fluid-sidebar', 1);
  $.cookie('fluid-sidebar', 1);
}

/* Toggle Sidebar Fixed / Fluid */
function toggleSidebar() {
  if ($('body').hasClass('fixed-sidebar')) handleSidebarFluid();
  else handleSidebarFixed();
}

/* Create Sidebar only visible on Hover */
function createSidebarHover() {
  $('body').addClass('sidebar-hover');
  $('body').removeClass('fixed-sidebar').addClass('fixed-sidebar');
  $('.main-content').css('margin-left', '').css('margin-right', '');
  $('.topbar').css('left', '').css('right', '');
  $('body').removeClass('sidebar-top');
  removeSubmenuHover();
  removeBoxedLayout();
  removeCollapsedSidebar();
  sidebarHover();
  handleSidebarFixed();
  $('#switch-sidebar-hover').prop('checked', true);
  $('#switch-sidebar').prop('checked', true);
  $('#switch-sidebar-top').prop('checked', false);
  $('#switch-boxed').prop('checked', false);
  $.removeCookie('fluid-topbar');
  $.removeCookie('sidebar-top');
  $.cookie('sidebar-hover', 1);
}

/* Remove Sidebar on Hover */
function removeSidebarHover() {
  $('#switch-sidebar-hover').prop('checked', false);
  $('body').removeClass('sidebar-hover');
  if (!$('body').hasClass('boxed')) $('.sidebar, .sidebar-footer').attr('style', '');
  $('.logopanel2').remove();
  $.removeCookie('sidebar-hover');
}

/* Toggle Sidebar on Top */
function toggleSidebarHover() {
  if ($('body').hasClass('sidebar-hover')) removeSidebarHover();
  else createSidebarHover();
}

/* Create Sidebar Submenu visible on Hover */
function createSubmenuHover() {
  removeSidebarHover();
  handleSidebarFluid();
  $('#switch-submenu-hover').prop('checked', true);
  $('body').addClass('submenu-hover');
  $('.nav-sidebar .children').css('display', '');
  $.cookie('submenu-hover', 1);
  $('#switch-sidebar').prop('checked', false);
}

/* Remove Submenu on Hover */
function removeSubmenuHover() {
  $('#switch-submenu-hover').prop('checked', false);
  $('body').removeClass('submenu-hover');
  $('.nav-sidebar .nav-parent.active .children').css('display', 'block');
  $.removeCookie('submenu-hover');
}

/* Toggle Submenu on Hover */
function toggleSubmenuHover() {
  if ($('body').hasClass('submenu-hover')) removeSubmenuHover();
  else createSubmenuHover();
}

/* Create Topbar Fixed */
function handleTopbarFixed() {
  $('#switch-topbar').prop('checked', true);
  $('body').removeClass('fixed-topbar').addClass('fixed-topbar');
  $.removeCookie('fluid-topbar');
}

/* Create Topbar Fluid / Remove Topbar Fixed */
function handleTopbarFluid() {
  $('#switch-topbar').prop('checked', false);
  $('body').removeClass('fixed-topbar');
  if ($('body').hasClass('sidebar-top') && $('body').hasClass('fixed-sidebar')) {
    $('body').removeClass('fixed-sidebar');
    $('#switch-sidebar').prop('checked', false);
  }
  $.cookie('fluid-topbar', 1);
}

/* Toggle Topbar Fixed / Fluid */
function toggleTopbar() {
  if ($('body').hasClass('fixed-topbar')) handleTopbarFluid();
  else handleTopbarFixed();
}

/* Adjust margin of content for boxed layout */
function handleboxedLayout() {
  if ($('body').hasClass('builder-admin')) return;
  $logopanel.css('left', '').css('right', '');
  $topbar.css('width', '');
  $sidebar.css('margin-left', '').css('margin-right', '');
  $sidebarFooter.css('left', '').css('right', '');
  if ($('body').hasClass('boxed')) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    $('.page-content').height('');
    pageContentHeight = $('.page-content').height();
    var container = 1200;
    var margin = (windowWidth - 1200) / 2;
    if (!$('body').hasClass('sidebar-top') && windowWidth > 1220) {
      if (!$('body').hasClass('fixed-sidebar')) {
        if (pageContentHeight < $(document).height()) {
          setTimeout(function () {
            $('.page-content').height($(document).height());
          }, 100);
        }
      }
      else {
        if (pageContentHeight < windowHeight) {
          $('.page-content').height(windowHeight);
        }
      }
      $logopanel.css('left', margin);
      if ($('body').hasClass('sidebar-collapsed')) {
        $topbar.css('width', 1200);
      }
      else {
        topbarWidth = (1200 - $sidebarWidth);
        $sidebarFooter.css('left', margin);
        if ($('body').hasClass('fixed-sidebar')) {
          $sidebar.css('margin-left', margin);
          $('.topbar').css('width', topbarWidth);
        }
        if ($('body').hasClass('sidebar-light')) {
          $topbar.css('width', 960);
        }
        else {
          $topbar.css('width', topbarWidth);
        }

      }

      $.backstretch(["../assets/global/images/gallery/bg1.jpg", "../assets/global/images/gallery/bg2.jpg", "../assets/global/images/gallery/bg3.jpg", "../assets/global/images/gallery/bg4.jpg"],
        { duration: 4000, fade: 600 });


    }
    else {
      $('.backstretch').remove();
    }

  }
}

/* Create Boxed Layout */
function createBoxedLayout() {

  removeSidebarHover();
  $('body').addClass('boxed');
  handleboxedLayout();
  $('#switch-boxed').prop('checked', true);
  $.cookie('boxed-layout', 1);
}

/* Remove boxed layout */
function removeBoxedLayout() {
  if ($('body').hasClass('boxed')) {
    $('body').removeClass('boxed');
    $logopanel.css('left', '').css('right', '');
    $topbar.css('width', '');
    $sidebar.css('margin-left', '').css('margin-right', '');
    $sidebarFooter.css('left', '').css('right', '');
    $.removeCookie('boxed-layout');
    $('#switch-boxed').prop('checked', false);
    $.backstretch("destroy");
  }
}

function toggleboxedLayout() {
  if ($('body').hasClass('boxed')) removeBoxedLayout();
  else createBoxedLayout();
}

/* Toggle Sidebar Collapsed */
function collapsedSidebar() {
  if ($body.css('position') != 'relative') {
    if (!$body.hasClass('sidebar-collapsed')) createCollapsedSidebar();
    else removeCollapsedSidebar();
  } else {
    if ($body.hasClass('sidebar-show')) $body.removeClass('sidebar-show');
    else $body.addClass('sidebar-show');
  }
  handleboxedLayout();
}

function createCollapsedSidebar() {
  $body.addClass('sidebar-collapsed');
  $('.sidebar').css('width', '').resizable().resizable('destroy');
  $('.nav-sidebar ul').attr('style', '');
  $(this).addClass('menu-collapsed');
  destroySideScroll();
  $('#switch-sidebar').prop('checked');
  $.cookie('sidebar-collapsed', 1);
}

function removeCollapsedSidebar() {
  $body.removeClass('sidebar-collapsed');
  if (!$body.hasClass('submenu-hover')) $('.nav-sidebar li.active ul').css({
    display: 'block'
  });
  $(this).removeClass('menu-collapsed');
  if ($body.hasClass('sidebar-light') && !$body.hasClass('sidebar-fixed')) {
    $('.sidebar').height('');
  } 
  createSideScroll();
  $.removeCookie('sidebar-collapsed');   
}

$('body').on('click', '.panel-title', function () {
  if ($(this).parent().parent().hasClass('active')) {
    $(this).parent().parent().removeClass('active')
  } else {
    $(this).parent().parent().addClass('active')
  }
});
$('body').on('click', '.action_icon', function () {
  $(".action-list-box").animate({
    width: "0px",
  }, 100);
  //debugger;
  var spnid=$(this).attr("attribute-id");
             //$(".action-list-box").animate({
  $(".spn" + spnid).animate({
                 width: "210px",
  }, 200);
  $(".sixelement" + spnid).animate({
    width: "310px",
  }, 200);
  $(".sixelement" + spnid).animate({
    width: "310px",
  }, 200);
  $(".sevenelement" + spnid).animate({
    width: "350px",
  }, 200);
});
$('body').on('click', '.close-action', function () {

         
             $(".action-list-box").animate({
                 width: "0px",
             }, 100);
         });
$('#accordion')
  .on('show.bs.collapse', function (e) {
    $(e.target).prev('.panel-heading').parent('.panel').addClass('active');
  })
  .on('hide.bs.collapse', function (e) {
    $(e.target).prev('.panel-heading').parent('.panel').removeClass('active');
  });
//$(document).ready(function () {
//  $('.owl-carousel').owlCarousel({
//    loop: true,
//    margin: 10,
//    responsiveClass: true,
//    responsive: {
//      0: {
//        items: 1,
//        nav: true
//      },
//      600: {
//        items: 3,
//        nav: false
//      },
//      1000: {
//        items: 6,
//        nav: true,
//        loop: false
//      }
//    }
//  });
//});

/* ========================================================= */


$('body').on('click', ':not(#notifications)', function () {
  $('#notifications').removeClass('show');
})
