$(document).ready(function () {
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

    var countDownDate = new Date("Mar 15, 2021 11:00:00").getTime();
    var setCountdown = function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        if (distance < 0)
            clearInterval(x);

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerHTML = days;
        document.getElementById('hours').innerHTML = hours;
        document.getElementById('mins').innerHTML = mins;
    };

    setCountdown();
    var x = setInterval(function() {
        setCountdown();
    }, 5000);
});
