$(document).ready(function () {




  // ------------------------------------------------------- //
  // Custom Scrollbar
  // ------------------------------------------------------ //

  if ($(window).outerWidth() > 992) {
    $("nav.side-navbar").mCustomScrollbar({
      scrollInertia: 200
    });
  }

  // Main Template Color
  var brandPrimary = '#33b35a';

  // ------------------------------------------------------- //
  // Side Navbar Functionality
  // ------------------------------------------------------ //

  $(document).on("click", "#toggle-btn", function (e) {
    e.preventDefault();
    if ($(window).outerWidth() > 1194)
    {
      $('nav.side-navbar').toggleClass('shrink');
      $('.header').toggleClass('small-logo');
      $('.page').toggleClass('active');
    } else {
      $('nav.side-navbar').toggleClass('show-sm');
      $('.page').toggleClass('active-sm');
    }
  });
  $(document).on("click", ".breadcrumb-item a", function (e) {
    if ($(this).attr("href") !== "/lease") {
      $('a[href="/lease"]').removeClass('selected');
    }
  });



  $(document).on("click", ".nav-item a.my-click", function (e) {
   
    $(".nav-item a").removeClass("selected");
    $(this).addClass("selected");
   
    if ($(this).parents("ul").prev("a").attr("id") !== "falseDropdown")
    {
      $("[id*= falseDropdown]").attr("aria-expanded", "false");
      $("[id*= falseDropdown]").addClass("collapsed");
      $("[id*= falseDropdown]").next("ul").removeClass("show");
      //$("#falseDropdown").attr("aria-expanded", "false");
      //$("#falseDropdown").addClass("collapsed");
      //$("#falseDropdown").next("ul").removeClass("show");
    }

    if ($(this).attr("href") !== "/lease") {

      $('a[href="/lease"]').removeClass('selected');
    }

   
    
  });
  $(document).on("click", ".my-click", function (e) {


    if ($(window).outerWidth() <= 1024) {

      $(".side-navbar").removeClass('show-sm');
    }
  });
  $(document).on("click", ".my-click", function (e) {

    if ($('.page').toggleClass('active-sm')) {


      $('.page').removeClass('active-sm');
    }
  });


  // ------------------------------------------------------- //
  // Tooltips init
  // ------------------------------------------------------ //    

  $('[data-toggle="tooltip"]').tooltip();

  // ------------------------------------------------------- //
  // Universal Form Validation
  // ------------------------------------------------------ //

  $('.form-validate').each(function () {
    $(this).validate({
      errorElement: "div",
      errorClass: 'is-invalid',
      validClass: 'is-valid',
      ignore: ':hidden:not(.summernote),.note-editable.card-block',
      errorPlacement: function (error, element) {
        // Add the `invalid-feedback` class to the error element
        error.addClass("invalid-feedback");
        if (element.prop("type") === "checkbox") {
          error.insertAfter(element.siblings("label"));
        }
        else {
          error.insertAfter(element);
        }
      }
    });
  });
  // ------------------------------------------------------- //
  // Material Inputs
  // ------------------------------------------------------ //

  var materialInputs = $('input.input-material');

  // activate labels for prefilled values
  materialInputs.filter(function () {
    return $(this).val() !== "";
  }).siblings('.label-material').addClass('active');

  // move label on focus
  materialInputs.on('focus', function () {
    $(this).siblings('.label-material').addClass('active');
  });

  // remove/keep label on blur
  materialInputs.on('blur', function () {
    $(this).siblings('.label-material').removeClass('active');

    if ($(this).val() !== '') {
      $(this).siblings('.label-material').addClass('active');
    } else {
      $(this).siblings('.label-material').removeClass('active');
    }
  });

  // ------------------------------------------------------- //
  // Jquery Progress Circle
  // ------------------------------------------------------ //
  var progress_circle = $("#progress-circle").gmpc({
    color: brandPrimary,
    line_width: 5,
    percent: 80
  });
  progress_circle.gmpc('animate', 80, 3000);

  // ------------------------------------------------------- //
  // External links to new window
  // ------------------------------------------------------ //

  $('.external').on('click', function (e) {

    e.preventDefault();
    window.open($(this).attr("href"));
  });

  // ------------------------------------------------------ //
  // For demo purposes, can be deleted
  // ------------------------------------------------------ //

  var stylesheet = $('link#theme-stylesheet');
  $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
  var alternateColour = $('link#new-stylesheet');

  if ($.cookie("theme_csspath")) {
    alternateColour.attr("href", $.cookie("theme_csspath"));
  }

  $("#colour").change(function () {

    if ($(this).val() !== '') {

      var theme_csspath = 'css/style.' + $(this).val() + '.css';

      alternateColour.attr("href", theme_csspath);

      $.cookie("theme_csspath", theme_csspath, {
        expires: 365,
        path: document.URL.substr(0, document.URL.lastIndexOf('/'))
      });

    }

    return false;
  });




});




includeHTML();
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}














