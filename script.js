$(document).ready(function () {
    let header_size = $('#header').height();
    let navbar_size = $('#navbar').height();
    let info_head_size = $('.info-block .info-head').height();

    let refreshBannerConSize = () => {
        if ($(window).height() <= 640) {
            $('.banner-container').css('height', 'auto');
        } else {
            $('.banner-container').css(
                'height',
                $(window).height() - (header_size + navbar_size + info_head_size)
            );
        }
    };

    refreshBannerConSize();

    let refreshSpeakerDetailSizes = () => {
        let details = $('#speak .speak-info p:nth-of-type(2)')
        let websites = $('#speak .speak-info p:nth-of-type(4)');
        details.css('height', 'auto');
        for (let i = 0; i < details.length; i += 2) {
            if (i == 6 && $(websites[7]).height() > $(websites[6]).height())
                continue;
            let h1 = $(details[i]).height(), h2 = $(details[i + 1]).height();
            let max = h1 > h2 ? h1 : h2;
            $(details[i]).css("height", max);
            $(details[i + 1]).css("height", max);
        }
    };

    refreshSpeakerDetailSizes();

    let refreshChairSizes = () => {
        let chairs = $('.chair');
        chairs.css('height', 'auto');
        for (let i = 0; i < 8; i += 2) {
            let h1 = $(chairs[i]).height(), h2 = $(chairs[i + 1]).height();
            let max = h1 > h2 ? h1 : h2;
            $(chairs[i]).css("height", max);
            $(chairs[i + 1]).css("height", max);
        }
    };

    refreshChairSizes();

    $(window).resize(function() {
        header_size = $('#header').height();
        navbar_size = $('#navbar').height();
        info_head_size = $('.info-block .info-head').height();

        refreshBannerConSize();
        refreshSpeakerDetailSizes();
        refreshChairSizes();

        if ($('#coll-context').height() != 0) {
            $('#coll-context').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
        }
    });

    $(window).scroll(() => {
        if ($('#coll-context').height() != 0) {
            $('#coll-context .card').hide(200);
            setTimeout(() => {
                $('#coll-context').css('height', '0');
                window.scrollTo(0, 0);
            }, 200);

            return;
        }

        if ($(window).scrollTop() >= header_size) {
            $('#navbar').addClass('fixed');
            $('#content-body').css('margin-top', navbar_size + 'px');
            $('nav').css('background', '#333');
            $('#logo-iiests').css({
                'background':'url("images/logo-iiests-white.png") no-repeat',
                'background-size':'auto 90%',
                'background-position':'50% 50%'
            });
            $('nav .logos span').css('color', '#ccc');
            $('nav .nav-links ul li div').css('color', '#ccc');
            $('.active').css('color', '#80ebff');
            $('#btn-top').css({
                "opacity":".75",
                "visibility":"visible",
                "transition":"all .75s ease-out"
            });
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
            $('#btn-top').css({
                "opacity":"0",
                "visibility":"hidden"
            });
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
    });


    // Count Down
    let countDownDate = new Date("Jan 12, 2021 11:00:00").getTime();
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
        () => smoothScrollTo(
            $('#scroll-btn').position().top +
            (navbar_size - $('#scroll-btn').height())
        )
    );

    $('#l_home').click(() => smoothScrollTo(0));

    $('#l_about').click(
        () => {
            console.log($('#about').position().top, navbar_size, $('#about').position().top - navbar_size);
            smoothScrollTo($('#about').position().top - navbar_size);
        }
    );

    $('#l_speak').click(
        () => smoothScrollTo($('#speak').position().top - navbar_size)
    );

    $('#l_comm').click(
        () => smoothScrollTo($('#comm').position().top - navbar_size)
    );

    $('#l_trax').click(
        () => smoothScrollTo($('#trax').position().top - navbar_size)
    );

    $('#l_guide').click(
        () => smoothScrollTo($('#guide').position().top - navbar_size)
    );

    $('#l_reg').click(
        () => smoothScrollTo($('#reg').position().top - navbar_size)
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
        if ($('#coll-context').height() === 0) {
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
