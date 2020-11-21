import { refreshCollbarHeight } from './heights';

/** register toggle card action on clicking links */
export function registerToggleCards(links, cards, collmenu, header_size, navbar_size) {
    let clickDisabled = false;

    function toggleCollapseBar(i) {
        if (clickDisabled) return;

        $('.header-links ul li div').css('color', '#666');
        if ($('#coll-context').height() === 0) {
            refreshCollbarHeight(i, header_size, navbar_size);
            setTimeout(() => $(cards[i]).show(200), 200);
            collmenu = i;
            $(links[i]).css('color', '#333');
        } else {
            if (collmenu == i) {
                clickDisabled = true;
                $('#coll-context .d_card').hide(200);
                setTimeout(() => {
                    $('#coll-context').css('height', '0');
                    setTimeout(() => (clickDisabled = false), 500);
                }, 200);
                collmenu = -1;
            } else {
                $(cards[collmenu]).hide(200);
                setTimeout(() => {
                    refreshCollbarHeight(i, header_size, navbar_size);
                    $(cards[i]).show(200);
                }, 200);
                collmenu = i;
                $(links[i]).css('color', '#333');
            }
        }
    }

    links.forEach((link, i) => $(link).click(() => toggleCollapseBar(i)));
}

/** register collapse properties for contacts list */
export function registerToggleCardContact() {
    let contacts = $('#c_con .contact-person');

    function expandContact(index) {
        for (let i = 0; i < contacts.length; i++) {
            if (i === index) {
                $(contacts[i]).removeClass('collapse-contact');
            } else {
                $(contacts[i]).addClass('collapse-contact');
            }
        }
    }

    for (let i = 0; i < contacts.length; i++) {
        $(contacts[i]).click(() => expandContact(i));
    }
}
