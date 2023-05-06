const IDLE_TIMEOUT = 2 * 60 * 1000;
const ROBOT_STATES = {
    NEUTRAL: 'neutral',
    HAPPY: 'happy',
    SAD: 'sad',
    BLINK: 'blink',
    FRUSTRATED: 'frustrated',
    POKERFACE: 'pokerface',
    ANGRY: 'angry',
};

const [left, right] = document.querySelectorAll('.eye');
const mouth = document.querySelector('.mouth');
const face = document.querySelector('.face-container');

let idleTimer;
let robotState;

function onUserIdle() {
    mouth.classList.add('yawn');
    setTimeout(() => {
        mouth.classList.remove('yawn');
    }, 5000);
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(onUserIdle, IDLE_TIMEOUT);
};

toggleState = (state) => {
    if (state) {
        if (left.classList.contains(`eye-left-${state}`)) {
            left.classList.remove(`eye-left-${state}`);
            right.classList.remove(`eye-right-${state}`);
        } else {
            left.classList.add(`eye-left-${state}`);
            right.classList.add(`eye-right-${state}`);
        }
    }
};

function getRandomRobotState() {
    const states = Object.values(ROBOT_STATES);
    const randomIndex = Math.floor(Math.random() * states.length);
    return states[randomIndex];
}

function setListeners() {
    document.addEventListener('robotstatechange', (e) => {
        toggleState(robotState);
        robotState = e.detail.state;
        toggleState(e.detail.state);
    });

    document.addEventListener('mousemove', (e) => {
        const { pageX, pageY } = e;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const midX = (centerX - pageX) / - 40;
        const midY = (centerY - pageY) / - 40;

        left.style.setProperty('--x', `${midX}%`);
        left.style.setProperty('--y', `${midY}%`);

        right.style.setProperty('--x', `${midX}%`);
        right.style.setProperty('--y', `${midY}%`);

        mouth.style.setProperty('--x', `${midX}%`);
        mouth.style.setProperty('--y', `${midY}%`);

        resetIdleTimer();
    });

    document.addEventListener('mouseleave', () => {
        left.style.setProperty('--x', `${0}%`);
        left.style.setProperty('--y', `${0}%`);

        right.style.setProperty('--x', `${0}%`);
        right.style.setProperty('--y', `${0}%`);

        mouth.style.setProperty('--x', `${0}%`);
        mouth.style.setProperty('--y', `${0}%`);

        resetIdleTimer();
    });
}

function setTimedChanges() {
    // setInterval(() => {
    //     document.dispatchEvent(new CustomEvent('robotstatechange', { detail: { state: getRandomRobotState() } }));
    // }, 1000);

    document.dispatchEvent(new CustomEvent('robotstatechange', { detail: { state: ROBOT_STATES.SAD } }));
}

function main() {
    setListeners();
    setTimedChanges();
    resetIdleTimer();
}

main();
