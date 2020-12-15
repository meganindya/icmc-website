export function swapSelection(target) {
    if (
        target.classList.contains('chair-selected') ||
        $(target).parents('.chair-selected').length !== 0
    ) return;

    if (!target.classList.contains('chair-selector-btn')) {
        target = $(target).parents('.chair-selector-btn')[0];
    }

    $(target).addClass('chair-selected');
    if (target.id === 'chair-selector-btn-1') {
        $('#chair-selector-btn-2').removeClass('chair-selected');
        $('#chair-math').css({ display: "flex" });
        $('#chair-comp').css({ display: "none" });
    } else {
        $('#chair-selector-btn-1').removeClass('chair-selected');
        $('#chair-math').css({ display: "none" });
        $('#chair-comp').css({ display: "flex" });
    }
}
