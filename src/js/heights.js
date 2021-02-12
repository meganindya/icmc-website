/**
 * adjusts line height of speakers' details
 * @deprecated
 * */
export function refreshSpeakerDetailSizes() {
    const details = $('#speak .speak-info p:nth-of-type(2)');

    if ($(window).width() < 992) {
        details.css('height', 'auto');
        return;
    }

    details.css('height', 'auto');
    const websites = $('#speak .speak-info p:nth-of-type(4)');
    for (let i = 0; i < details.length; i += 2) {
        if (i == 6 && $(websites[7]).height() > $(websites[6]).height()) continue;
        const h1 = $(details[i]).height(),
            h2 = $(details[i + 1]).height();
        const max = h1 > h2 ? h1 : h2;
        $(details[i]).css('height', max);
        $(details[i + 1]).css('height', max);
    }
}

/** adjusts height of speaker name blocks per row */
export function refreshSpeakerNameSizes() {
    const chairs = $('.speaker-name');
    chairs.css('height', 'auto');

    if ($(window).width() < 768) return;

    for (let i = 0; i < chairs.length; i += 2) {
        const h1 = $(chairs[i]).height(),
            h2 = $(chairs[i + 1]).height();
        const max = h1 > h2 ? h1 : h2;
        $(chairs[i]).css('height', max + 36);
        $(chairs[i + 1]).css('height', max + 36);
    }
}

/** adjusts height of committee chair blocks per row */
export function refreshChairSizes() {
    if ($(window).width() < 992) return;

    const chairs = $('.chair');
    chairs.css('height', 'auto');

    const refreshHeights = () => {
        for (let i = 0; i < 6; i += 2) {
            const h1 = $(chairs[i]).height(),
                h2 = $(chairs[i + 1]).height();
            const max = 4 + (h1 > h2 ? h1 : h2);
            $(chairs[i]).css('height', max);
            $(chairs[i + 1]).css('height', max);
        }
    };

    let counter = 6;
    const interval = setInterval(() => {
        if (counter) {
            refreshHeights();
            counter--;
        } else {
            clearInterval(interval);
        }
    }, 150);
}

const cardHeights = [
    [886, 483, 391, 537],
    [1008, 518, 535, 583],
    [576, 501, 535, 583]
];

export function refreshCollbarHeight(i, header_size, navbar_size) {
    let index;
    if ($(window).width() < 576) index = 0;
    else if ($(window).width() < 992) index = 1;
    else index = 2;

    const height = Math.max(
        cardHeights[index][i],
        $(window).height() - (header_size + navbar_size)
    );
    $('#coll-context').css('height', height);
}
