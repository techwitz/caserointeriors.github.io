$(function(){
    'use strict';
    $('.portfolio-item').tilt({
        perspective: 3000,
        speed: 500,
    })

    const imageElements = $('[data-image]');
    for(let element of imageElements) {
        $(element).css("background-image",`url(${$(element).data('image')})`);
    }

    $(document).scroll(function() {
         $('.navbar').toggleClass('navbar-scrolled', $(this).scrollTop() > $('.navbar').height());
    });

    $('.navbar .nav-link').on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 1000);
        e.preventDefault();
        $('.navbar-collapse').toggleClass('show');
    });

    $('.portfolio-filters .nav-link').on('click', function() {
        $('.portfolio-filters .nav-link').removeClass('active');
        $(this).addClass('active');
    })
 });

function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://4uei3fukdg.execute-api.us-east-1.amazonaws.com/dev/casero-contact-form";

    var Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test($("#name-input").val())) {
	    alert ("Name can not be less than 2 char");
	    return;
    }

    var mobilere = /[0-9]{10}/;
    if (!mobilere.test($("#phone-input").val())) {
	    alert ("Please enter valid mobile number");
	    return;
    }

    if ($("#email-input").val()=="") {
	    alert ("Please enter your email id");
	    return;
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test($("#email-input").val())) {
	    alert ("Please enter valid email address");
	    return;
    }

    var name = $("#name-input").val();
    var phone = $("#phone-input").val();
    var email = $("#email-input").val();

    var data = {
      "name" : name,
      "phone" : phone,
      "email" : email
    };

    $.ajax({
     type: "POST",
     url : URL,
     dataType: "json",
     crossDomain: true,
     contentType: "application/json; charset=utf-8",
     data: JSON.stringify(data),

     success: function () {
       // clear form and show a success message
       alert("Thanks for showing interest. We will get back to you shortly.");
       document.getElementById("contact").reset();
       location.reload();
     },

     error: function () {
       // show an error message
       alert("Your data could not be saved. Please try again!");
     }});
}
