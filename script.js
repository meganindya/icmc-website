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

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerHTML = makeDoubleDigit(days);
        document.getElementById('hours').innerHTML = makeDoubleDigit(hours);
        document.getElementById('mins').innerHTML = makeDoubleDigit(mins);

        if (distance < 0)
            clearInterval(x);
    };

    var makeDoubleDigit = num => {
        return (num.toString().length > 1 ? num : "0" + num);
    }

    setCountdown();
    var x = setInterval(function() {
        setCountdown();
    }, 60000);

    $('#scroll-btn').click(() => {
        var top = $('#info').position().top - 128;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });
});
