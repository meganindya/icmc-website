export function swapSessionSelection(target) {
    if (
        target.classList.contains('session-selected') ||
        $(target).parents('.session-selected').length !== 0
    )
        return;
    if (!target.classList.contains('session-selector-btn')) {
        target = $(target).parents('.session-selector-btn')[0];
    }
    $(target).addClass('session-selected');
    if (target.id === 'session-selector-btn-1') {
        $('#session-selector-btn-2').removeClass('session-selected');
        $('#sessions-math').css({ display: 'block' });
        $('#sessions-comp').css({ display: 'none' });
    } else {
        $('#session-selector-btn-1').removeClass('session-selected');
        $('#sessions-math').css({ display: 'none' });
        $('#sessions-comp').css({ display: 'block' });
    }
}
