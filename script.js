$(document).ready(function() {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 40) {
            $('#navbar').addClass('navbar-fixed');
            $('#content-body').css("margin-top", "64px");
        }
        
        if ($(window).scrollTop() < 40) {
            $('#navbar').removeClass('navbar-fixed');
            $('#content-body').css("margin-top", "0");
        }
    });
});
