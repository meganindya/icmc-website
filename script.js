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

        var reached = $(window).scrollTop() - 64 + ($(window).height() >> 1);
        var tops = [];
        var elems = [ $('#about'), $('#speak'), $('#comm'), $('#foot') ];
        var links = [ $('#l_about'), $('#l_speak'), $('#l_comm'), $('#foot') ];
        
        $('#l_home').removeClass('active');
        for (var i = 0; i < elems.length; i++) {
            tops[i] = elems[i].position().top;
            links[i].removeClass('active');
        }

        var index = -1;
        for (var i = 0; i < tops.length - 1; i++) {
            if (reached < tops[0])
                break;
            if (reached >= tops[i] && reached < tops[i + 1]) {
                index = i;
                break;
            }
        }

        if (index == -1)
            $('#l_home').addClass('active');
        else
            links[index].addClass('active');
    });

    var countDownDate = new Date("Mar 15, 2021 11:00:00").getTime();
    var setCountdown = function () {
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
    var x = setInterval(function () {
        setCountdown();
    }, 60000);

    $('#scroll-btn').click(() => {
        var top = $('#info').position().top - 96;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    $('#l_home').click(() => {
        var top = 0;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    $('#l_about').click(() => {
        var top = $('#about').position().top - 64;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    $('#l_speak').click(() => {
        var top = $('#speak').position().top - 64;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    $('#l_comm').click(() => {
        var top = $('#comm').position().top - 64;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    });

    var chairs = $('.chair');
    for (var i = 0; i < chairs.length - 2; i += 2) {
        if ((i + 1) >= chairs.length)
            break;
        
        var h1 = $(chairs[i]).height(), h2 = $(chairs[i + 1]).height();
        var max = h1 > h2 ? h1 : h2;

        $(chairs[i]).css("height", max);
        $(chairs[i + 1]).css("height", max);
    }
});
