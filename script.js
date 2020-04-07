$(document).ready(function () {
    let header_size = $('#header').height();
    let navbar_size = $('#navbar').height();

    let chairs = $('.chair');
    for (let i = 0; i < 6; i += 2) {
        let h1 = $(chairs[i]).height(), h2 = $(chairs[i + 1]).height();
        let max = h1 > h2 ? h1 : h2;

        $(chairs[i]).css("height", max);
        $(chairs[i + 1]).css("height", max);
    }

    $(window).resize(function() {
        header_size = $('#header').height();
        navbar_size = $('#navbar').height();

        if ($('#collbar').height() != 0) {
            $('#collbar').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
            $('#coll-context').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
        }
    });

    $(window).scroll(() => {
        if ($('#collbar').height() != 0) {
            $('#coll-context .card').hide(200);
            setTimeout(() => {
                $('#coll-context').css('height', '0');
                $('#collbar').css('height', '0');
                window.scrollTo(0, 0);
            }, 200);

            return;
        }

        if ($(window).scrollTop() >= header_size) {
            $('#navbar').addClass('fixed');
            $('#content-body').css('margin-top', '64px');
            $('nav').css('background', '#333');
            $('#logo-iiests').css({
                'background':'url("images/logo-iiests-white.png") no-repeat',
                'background-size':'auto 90%',
                'background-position':'50% 50%'
            });
            $('nav .logos span').css('color', '#ccc');
            $('nav .nav-links ul li div').css('color', '#ccc');
            $('.active').css('color', '#80ebff');
        } else {
            $('#navbar').removeClass('fixed');
            $('#content-body').css('margin-top', '0');
            $('nav').css('background', 'white');
            $('#logo-iiests').css({
                'background':'url("images/logo-iiests.png") no-repeat',
                'background-size':'auto 90%',
                'background-position':'50% 50%'
            });
            $('nav .logos span').css('color', '#333');
            $('nav .nav-links ul li div').css('color', '#666');
            $('.active').css('color', '#333');
        }

        let reached =
            $(window).scrollTop() - navbar_size + ($(window).height() >> 1);
        let sec_tops = [];
        let sec_elems = [
            $('#about'), $('#speak'), $('#comm'), $('#trax'),
            $('#guide'), $('#reg'), $('#foot')
        ];
        let sec_links = [
            $('#l_about'), $('#l_speak'), $('#l_comm'), $('#l_trax'),
            $('#l_guide'), $('#l_reg'), $('#foot')
        ];
        
        $('#l_home').removeClass('active');
        for (let i = 0; i < sec_elems.length; i++) {
            sec_tops[i] = sec_elems[i].position().top;
            sec_links[i].removeClass('active');
        }

        let index = -1;
        for (let i = 0; i < sec_tops.length - 1; i++) {
            if (reached < sec_tops[0])
                break;
            if (reached >= sec_tops[i] && reached < sec_tops[i + 1]) {
                index = i;
                break;
            }
        }

        if (index == -1)
            $('#l_home').addClass('active');
        else
            sec_links[index].addClass('active');
        
        if ($(window).scrollTop() >= header_size)
            $('#btn-top').css({
                "opacity":".75",
                "visibility":"visible",
                "transition":"all .75s ease-out"
            });
        else
            $('#btn-top').css({
                "opacity":"0",
                "visibility":"hidden"
        });
    });


    // Count Down
    let countDownDate = new Date("Mar 15, 2021 11:00:00").getTime();
    let setCountdown = function () {
        let now = new Date().getTime();
        let dif = countDownDate - now;

        let days = Math.floor(dif / (1000 * 60 * 60 * 24));
        let hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerHTML = makeDoubleDigit(days);
        document.getElementById('hours').innerHTML = makeDoubleDigit(hours);
        document.getElementById('mins').innerHTML = makeDoubleDigit(mins);

        if (dif < 0)
            clearInterval(countdown);
    };

    let makeDoubleDigit = num => {
        return (num.toString().length > 1 ? num : "0" + num);
    }

    setCountdown();
    let countdown = setInterval(() => {
        setCountdown();
    }, 60000);


    // Click Events
    $('#scroll-btn').click(
        () => smoothScrollTo($('#info').position().top - 96)
    );

    $('#l_home').click(() => smoothScrollTo(0));

    $('#l_about').click(
        () => smoothScrollTo($('#about').position().top - 64)
    );

    $('#l_speak').click(
        () => smoothScrollTo($('#speak').position().top - 64)
    );

    $('#l_comm').click(
        () => smoothScrollTo($('#comm').position().top - 64)
    );

    $('#l_trax').click(
        () => smoothScrollTo($('#trax').position().top - 64)
    );

    $('#l_guide').click(
        () => smoothScrollTo($('#guide').position().top - 64)
    );

    $('#l_reg').click(
        () => smoothScrollTo($('#reg').position().top - 64)
    );

    $('#btn-top').click(() => smoothScrollTo(0));

    let smoothScrollTo = top => {
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    };

    $('#coll-context .card').hide();
    var collmenu = -1;
    var c_links = [ $('#venue'), $('#pconf'), $('#spons'), $('#contc') ];
    var cards = [ $('#c_ven'), $('#c_prv'), $('#c_spn'), $('#c_con') ];
    var toggleCollapseBar = i => {
        $('.header-links ul li div').css('color', '#666');
        if ($('#collbar').height() === 0) {
            $('#collbar').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
            $('#coll-context').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
            setTimeout(() => {
                cards[i].show(200);
            }, 250);
            collmenu = i;

            c_links[i].css('color', '#333');
        } else {
            if (collmenu == i) {
                $('#coll-context .card').hide(200);
                setTimeout(() => {
                    $('#coll-context').css('height', '0');
                    $('#collbar').css('height', '0');
                }, 200);
                collmenu = -1;
            } else {
                cards[i].show(200);
                cards[collmenu].hide(200);
                collmenu = i;
                c_links[i].css('color', '#333');
            }
        }
    };

    for (var i = 0; i < c_links.length; i++)
        $(c_links[i]).hover(
            function() {
                $(this).css('color', '#333');
            },
            function() {
                $(this).css('color', '#666');
            }
        );

    $('#venue').click(() => toggleCollapseBar(0));
    $('#pconf').click(() => toggleCollapseBar(1));
    $('#spons').click(() => toggleCollapseBar(2));
    $('#contc').click(() => toggleCollapseBar(3));
});
