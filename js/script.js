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

    var name = document.getElementById("name-input").value || document.getElementById("ph-name-input").value;
    var phone = document.getElementById("phone-input").value || document.getElementById("ph-phone-input").value;
    var email = document.getElementById("email-input").value || document.getElementById("ph-email-input").value;

    var Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (name.length < 1) {
	    alert ("Name can not be empty");
	    return;
    }

    var mobilere = /[0-9]{10}/;
    if (!mobilere.test(phone)) {
	    alert ("Please enter valid mobile number");
	    return;
    }

    if (email == "") {
	    alert ("Please enter your email id");
	    return;
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test(email)) {
	    alert ("Please enter valid email address");
	    return;
    }

    var URL = "https://80xsv3x8u4.execute-api.us-east-1.amazonaws.com/dev-001/contact-us";

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

     success: function (response) {
       // clear form and show a success message
       if (response.status == "success") {
	 alert("Thanks for showing interest. We will get back to you shortly.");
         document.getElementById("contact").reset();
         location.reload();
       }
       else {
         alert("Your data could not be saved. Please try again!");
       }
     },

     error: function () {
       // show an error message
       alert("Your data could not be saved. Please try again!");
     }});
}
