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
