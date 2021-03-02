// banner countdown

/** stores event date */
const countDownDate = new Date('Mar 2, 2021 11:00:00').getTime();

/** updates countdown elements's inner text */
export default function updateCountdown(countdown) {
    /** stores time remaining in milliseconds */
    const diffMillis = countDownDate - Date.now();
    console.log(diffMillis);

    if (diffMillis < 0) {
        if (countdown) clearInterval(countdown);
        // reset countdown elements to 0
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('mins').innerHTML = '00';
        return;
    }

    const [days, hours, mins] = [
        Math.floor(diffMillis / (1000 * 60 * 60 * 24)),
        Math.floor((diffMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60))
    ].map((item) => item.toString().padStart(2, '0'));

    // update countdown elements
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('mins').innerHTML = mins;
}
