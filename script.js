$(document).ready(function () {
    // required for adjusting zoom on small screens
    let zoom_ratio;
    if ($(window).width() < 540)
        zoom_ratio = $(window).width() / $('body').width();
    else
        zoom_ratio = 1.0;
    document.body.style.zoom = zoom_ratio;


    let header_size = $('#header').height();
    let navbar_size = $('#navbar').height();
    let info_head_size = $('.info-block .info-head').height();

    // adjusts the size of banner container
    let refreshBannerConSize = () => {
        let orientation = $(window)[0].orientation;
        if ($(window).height() <= 654 || (orientation % 180) === 0) {
            $('.banner-container').css('height', 'auto');
        } else {
            $('.banner-container').css(
                'height',
                $(window).height() - (header_size + navbar_size + info_head_size)
            );
        }
    };

    refreshBannerConSize();

    // adjusts line height of speakers' details
    let refreshSpeakerDetailSizes = () => {
        let details = $('#speak .speak-info p:nth-of-type(2)');

        if ($(window).width() < 992) {
            details.css('height', $(details[i]).height());
            return;
        }

        details.css('height', 'auto');
        let websites = $('#speak .speak-info p:nth-of-type(4)');
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

    // adjusts height of committee chair blocks per row
    let refreshChairSizes = () => {
        let chairs = $('.chair');
        chairs.css('height', 'auto');

        if ($(window).width() < 992)
            return;

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

        // if collapse bar open, adjust height
        if ($('#coll-context').height() != 0) {
            $('#coll-context').css(
                'height', $(window).height() - (header_size + navbar_size)
            );
        }

        // set navbar links display type
        if ($(window).width() > 991) {
            $('nav .nav-links').css('display', 'block');
            $('#hamburger').css('display', 'none');
        } else {
            $('nav .nav-links').css('display', 'none');
            $('#hamburger').css('display', 'block');
        }
    });


    $(window).scroll(() => {
        // collapse collapse bar if open
        if ($('#coll-context').height() != 0) {
            $('#coll-context .card').hide(200);
            setTimeout(() => {
                $('#coll-context').css('height', '0');
                window.scrollTo(0, 0);
            }, 200);

            return;
        }


        // adjust navbar related styles based on scroll position
        if ($(window).scrollTop() >= header_size) {
            $('#btn-top').css({
                "opacity":".75",
                "visibility":"visible",
                "transition":"all .75s ease-out"
            });
            $('#navbar').addClass('fixed');
            $('#content-body').css('margin-top', navbar_size + 'px');
            $('nav').css('background', '#333');
            $('#logo-iiests').css({
                'background':'url("images/logo-iiests-white.png") no-repeat',
                'background-size':'auto 90%',
                'background-position':'50% 50%'
            });
            $('#hamburger').css({
                'background':'url("res/hamburger-white.png")',
                'background-size':'cover'
            });
            $('nav .logos span').css('color', '#ccc');
            $('nav .nav-links ul li div').css('color', '#ccc');
            $('.active').css('color', '#80ebff');
        } else {
            $('#btn-top').css({
                "opacity":"0",
                "visibility":"hidden"
            });
            $('#navbar').removeClass('fixed');
            $('#content-body').css('margin-top', '0');
            $('nav').css('background', 'white');
            $('#logo-iiests').css({
                'background':'url("images/logo-iiests.png") no-repeat',
                'background-size':'auto 90%',
                'background-position':'50% 50%'
            });
            $('#hamburger').css({
                'background':'url("res/hamburger.png")',
                'background-size':'cover'
            });
            $('nav .logos span').css('color', '#333');
            if ($(window).width() > 991) {
                $('nav .nav-links ul li div').css('color', '#666');
                $('.active').css('color', '#333');
            } else {
                $('nav .nav-links ul li div').css('color', '#ccc');
                $('.active').css('color', '#80ebff');
            }
        }


        // select appropriate navbar link as active based on scroll position
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
            if (reached < (sec_tops[0] * zoom_ratio))
                break;
            if (
                reached >= (sec_tops[i] * zoom_ratio) &&
                reached < (sec_tops[i + 1] * zoom_ratio)
            ) {
                index = i;
                break;
            }
        }

        if (index == -1)
            $('#l_home').addClass('active');
        else
            sec_links[index].addClass('active');
    });


    // banner countdown
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


    // click events
    $('#scroll-btn').click(
        () => {
            let h_top =
                $('#info').position().top -
                $('#scroll-btn').position().top +
                $('#scroll-btn').height() -
                2 * navbar_size;
            if (h_top < 68) {
                smoothScrollTo(
                    $('#scroll-btn').position().top -
                    (navbar_size - $('#scroll-btn').height())
                );
            } else {
                smoothScrollTo(
                    $('#info').position().top -
                    navbar_size - 68
                );
            }
        }
    );

    $('#l_home').click(() => smoothScrollTo(0));

    $('#l_about').click(
        () => smoothScrollTo($('#about').position().top - navbar_size)
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
            top: top * zoom_ratio,
            behavior: 'smooth'
        });
    };

    $('#hamburger').click(() => $('nav .nav-links').slideToggle(250));

    // close dropdown if clicked elsewhere
    $(document).click(event => {
        if (
            $(window).width() < 992 &&
            $('nav .nav-links').is(':visible')
        ) {
            let e = $(event.target);
            if (
                e.parents('.nav-links').length === 0 &&
                !e.is('#hamburger')
            )
                $('nav .nav-links').slideToggle(250);
        }
    });


    // style properties for collapse bar contents
    let clickDisabled = false;
    $('#coll-context .card').hide();
    var collmenu = -1;
    var c_links = [ $('#venue'), $('#pconf'), $('#spons'), $('#contc') ];
    var cards = [ $('#c_ven'), $('#c_prv'), $('#c_spn'), $('#c_con') ];
    var toggleCollapseBar = i => {
        if (clickDisabled)
            return;

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
            clickDisabled = true;
            if (collmenu == i) {
                $('#coll-context .card').hide(200);
                setTimeout(() => {
                    $('#coll-context').css('height', '0');
                    setTimeout(() => clickDisabled = false, 500);
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

    $('#venue').click(() => toggleCollapseBar(0));
    $('#pconf').click(() => toggleCollapseBar(1));
    $('#spons').click(() => toggleCollapseBar(2));
    $('#contc').click(() => toggleCollapseBar(3));

    // set hover colors for header links
    for (var i = 0; i < c_links.length; i++) {
        $(c_links[i]).hover(
            function() {
                $(this).css('color', '#333');
            },
            function() {
                $(this).css('color', '#666');
            }
        );
    }
});
