export function launchModal(e) {
    e.preventDefault();
    document.body.style.overflow = 'hidden';

    const modalWrapper = $('#modal-wrapper')[0];
    modalWrapper.style.visibility = 'visible';
    modalWrapper.style.top = `${window.scrollY}px`;

    const closeBtn = $('#modal-close')[0];
    closeBtn.onclick = () => {
        modalWrapper.style.visibility = 'hidden';
        document.body.style.overflow = 'unset';
    };

    const abstractText = e.target.dataset.abstract;
    modalWrapper.children[0].children[1].innerHTML = abstractText.split('\n').join('<br />');
}
