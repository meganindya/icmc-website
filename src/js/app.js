import '../css/main.scss';
import '../img/logos/logo-iiests-white.png';
import '../img/hamburger-white.png';
import '../res/ICMC_2021_accepted_list.pdf';
import '../res/ICMC_2021_registration_form.pdf';
import '../res/ICMC_2021_publishing_agreement_springer.pdf';
import '../res/ICMC_2021_permission_request_form_springer.pdf';

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import { refreshSpeakerNameSizes, refreshChairSizes, refreshCollbarHeight } from './heights';
import { registerToggleCards, registerToggleCardContact } from './collbar';

import updateCountdown from './countdown';
import registerSmoothScrollToSection from './scroll';
import { swapSelection, refreshTPCDistribution } from './chair';

$(document).ready(function () {
    // display collapsebar after ready
    setTimeout(() => $('#collbar').css({ display: 'block' }), 0);

    let header_size = $('#header').height();
    let navbar_size = $('#navbar').height();

    // -- dynamic heights --------------------------------------------------------------------------

    // adjust height of speaker name blocks per row
    setTimeout(refreshSpeakerNameSizes, 200);

    // adjust height of committee chair blocks per row
    // setTimeout(refreshChairSizes, 300);

    // adjust distribution of left and right column in TP Committee
    setTimeout(refreshTPCDistribution, 350);

    // -- dynamically style collapsebar ------------------------------------------------------------

    $('#coll-context .d_card').hide();

    const collbarLinks = ['#venue', '#pconf', /*'#spons',*/ '#contc'];
    const collbarCards = ['#c_ven', '#c_prv', /*'#c_spn',*/ '#c_con'];

    // register toggling
    let currentCollmenuIndex = -1;
    registerToggleCards(collbarLinks, collbarCards, currentCollmenuIndex, header_size, navbar_size);

    // set hover colors for header links
    collbarLinks.forEach((link) =>
        $(link).hover(
            () => $(link).css('color', '#333'),
            () => $(link).css('color', '#666')
        )
    );

    // collapse properties for contacts list
    registerToggleCardContact();

    // -- on resize --------------------------------------------------------------------------------

    $(window).on('resize orientationchange', function () {
        header_size = $('#header').height();
        navbar_size = $('#navbar').height();

        setTimeout(refreshSpeakerNameSizes, 100);
        // setTimeout(refreshChairSizes, 150);
        setTimeout(refreshTPCDistribution, 100);

        // if collapse bar open, adjust height
        if ($('#coll-context').height() != 0) {
            refreshCollbarHeight(currentCollmenuIndex, header_size, navbar_size);
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

    // -- on scroll --------------------------------------------------------------------------------

    $(window).scroll(() => {
        // collapse collapse bar if open
        if ($('#coll-context').height() != 0) {
            if (
                $('#coll-context').height() === $(window).height() - (header_size + navbar_size) ||
                $(window).scrollTop() >=
                    header_size +
                        $('#coll-context').height() +
                        navbar_size -
                        $(window).height() +
                        96
            ) {
                window.scrollTo(0, 0);
                $('#coll-context .d_card').hide(200);
                setTimeout(() => {
                    $('#coll-context').css('height', '0');
                    setTimeout(() => window.scrollTo(0, 0), 500);
                    for (let i = 0; i < collbarLinks.length; i++)
                        $(collbarLinks[i]).css('color', '#666');
                }, 200);

                return;
            }
        }

        // adjust navbar related styles based on scroll position
        if ($(window).scrollTop() >= header_size + $('#collbar').height()) {
            $('#navbar').addClass('fixed');
            $('#content-body').css('margin-top', navbar_size + 'px');
            $('nav').css('background', '#333');
            $('#logo-iiests').css({
                background: 'url("../img/logos/logo-iiests-white.png") no-repeat',
                'background-size': 'auto 90%',
                'background-position': '50% 50%'
            });
            $('#hamburger').css({
                background: 'url("../img/hamburger-white.png")',
                'background-size': 'cover'
            });
            $('nav .logos span').css('color', '#ccc');
            $('nav .nav-links ul li div').css('color', '#ccc');
            $('.active').css('color', '#80ebff');
        } else {
            $('#navbar').removeClass('fixed');
            $('#content-body').css('margin-top', '0');
            $('nav').css('background', 'white');
            $('#logo-iiests').css({
                background: 'url("../img/logos/logo-iiests.png") no-repeat',
                'background-size': 'auto 90%',
                'background-position': '50% 50%'
            });
            $('#hamburger').css({
                background: 'url("../img/hamburger.png")',
                'background-size': 'cover'
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

        // display scroll to top button based on scroll position
        if ($(window).scrollTop() >= header_size) {
            $('#btn-top').css({
                opacity: '.75',
                visibility: 'visible',
                transition: 'all .75s ease-out'
            });
        } else {
            $('#btn-top').css({
                opacity: '0',
                visibility: 'hidden'
            });
        }

        // update scroll percentage bar's (in navbar) width
        $('#scroll-percent-bar').css({
            width: `${
                $(window).width() *
                ($(window).scrollTop() / ($(document).height() - $(window).height()))
            }px`
        });

        // select appropriate navbar link as active based on scroll position
        let reached = $(window).scrollTop() - navbar_size + ($(window).height() >> 1);
        let sec_tops = [];
        let sec_elems = [
            $('#info'),
            $('#about-icmc'),
            $('#speak'),
            $('#comm'),
            $('#trax'),
            $('#guide'),
            $('#reg'),
            $('#foot')
        ];
        let sec_links = [
            $('#l_dates'),
            $('#l_about'),
            $('#l_speak'),
            $('#l_comm'),
            $('#l_trax'),
            $('#l_accepted'),
            $('#l_reg'),
            $('#foot')
        ];

        for (let i = 0; i < sec_elems.length; i++) {
            sec_tops[i] = sec_elems[i].position().top;
            sec_links[i].removeClass('active');
        }

        let index = -1;
        for (let i = 0; i < sec_tops.length - 1; i++) {
            if (reached < sec_tops[0]) break;
            if (reached >= sec_tops[i] && reached < sec_tops[i + 1]) {
                index = i;
                break;
            }
        }

        if (index > -1 && index < sec_links.length) sec_links[index].addClass('active');
    });

    // -- banner countdown -------------------------------------------------------------------------

    updateCountdown();
    const countdown = setInterval(() => updateCountdown(countdown), 60000);

    // -- register click events --------------------------------------------------------------------

    // register click on scroll to section links
    registerSmoothScrollToSection(
        {
            '#l_dates': '#info',
            '#l_about': '#about-icmc',
            '#l_speak': '#speak',
            '#l_comm': '#comm',
            '#l_trax': '#trax',
            '#l_accepted': '#accepted',
            '#l_reg': '#reg',
            '#btn-top': null
        },
        navbar_size
    );

    // register hamburger click toggle
    $('#hamburger').click(() => $('nav .nav-links').slideToggle(250));

    // external collapse click cases
    $(document).click((event) => {
        let e = $(event.target);

        // close dropdown if clicked elsewhere
        if ($(window).width() < 992 && $('nav .nav-links').is(':visible')) {
            if (e.parents('.nav-links').length === 0 && !e.is('#hamburger'))
                $('nav .nav-links').slideToggle(250);
        }

        // close collapsebar if clicked on navbar link
        if ($('#collbar').height() != 0) {
            if (e.parents('.nav-links').length != 0 || e.is('#hamburger')) {
                if (e.is('#hamburger')) $('nav .nav-links').slideToggle(0);

                window.scrollTo(0, 0);
                $('#coll-context .d_card').hide(200);
                setTimeout(() => {
                    $('#coll-context').css('height', '0');
                    window.scrollTo(0, 0);
                    for (let i = 0; i < collbarLinks.length; i++)
                        collbarLinks[i].css('color', '#666');
                }, 200);
            }
        }
    });

    // technical-committee chair selection
    $('.chair-selector-btn').click((event) => swapSelection(event.target));
});
