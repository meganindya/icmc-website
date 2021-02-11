export function swapSelection(target) {
    if (
        target.classList.contains('chair-selected') ||
        $(target).parents('.chair-selected').length !== 0
    )
        return;

    if (!target.classList.contains('chair-selector-btn')) {
        target = $(target).parents('.chair-selector-btn')[0];
    }

    $(target).addClass('chair-selected');
    if (target.id === 'chair-selector-btn-1') {
        $('#chair-selector-btn-2').removeClass('chair-selected');
        $('#chair-math').css({ display: 'flex' });
        $('#chair-comp').css({ display: 'none' });
    } else {
        $('#chair-selector-btn-1').removeClass('chair-selected');
        $('#chair-math').css({ display: 'none' });
        $('#chair-comp').css({ display: 'flex' });
    }

    setTimeout(refreshTPCDistribution, 50);
}

export function refreshTPCDistribution() {
    const findCounts = (items) => {
        const itemHeights = items.map((item) => item.offsetHeight);
        const sumHeights = itemHeights.reduce((a, b) => a + b, 0);
        const itemCount = itemHeights.length;
        let leftSum_1 = sumHeights,
            rightSum_1 = 0;
        let leftSum_2, rightSum_2;
        let leftCount_1 = itemCount,
            leftCount_2;
        for (let i = itemCount - 1; i >= 0; i--) {
            const currHeight = itemHeights[i];
            if (leftSum_1 - currHeight < rightSum_1 + currHeight) {
                leftSum_2 = leftSum_1 - currHeight;
                rightSum_2 = rightSum_1 + currHeight;
                leftCount_2 = leftCount_1 - 1;
                break;
            }
            leftSum_1 -= currHeight;
            rightSum_1 += currHeight;
            leftCount_1--;
        }
        const diff = [Math.abs(leftSum_1 - rightSum_1), Math.abs(leftSum_2 - rightSum_2)];
        const counts = [
            [leftCount_1, itemCount - leftCount_1],
            [leftCount_2, itemCount - leftCount_2]
        ];
        return diff[0] < diff[1] ? counts[0] : counts[1];
    };

    const curr =
        document.querySelector('.chair-selected p').innerHTML.search(/math/i) !== -1
            ? 'math'
            : 'comp';
    const currComm = document.querySelector(`#chair-${curr}`).childNodes;
    const items = [...currComm[0].childNodes, ...currComm[1].childNodes];
    const counts = findCounts(items);
    $(currComm[0]).empty();
    $(currComm[1]).empty();
    items.forEach((item, i) => currComm[i < counts[0] ? 0 : 1].appendChild(item));
}
