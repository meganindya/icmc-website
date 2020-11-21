// smooth scroll to section

const smoothScrollTo = (top) => {
    let delay = 0;
    if ($(window).width() < 992 && $('nav .nav-links').is(':visible')) {
        $('nav .nav-links').slideToggle(250);
        delay = 250;
    }

    setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), delay);
};

/** register link click to corresponding section */
export default function registerSmoothScrollToSection(linkSectionMap, offset) {
    Object.keys(linkSectionMap).forEach((link) =>
        $(link).click(() =>
            smoothScrollTo(
                linkSectionMap[link] ? $(linkSectionMap[link]).position().top - offset : 0
            )
        )
    );
}
