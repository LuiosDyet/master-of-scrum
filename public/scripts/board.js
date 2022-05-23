document.addEventListener('DOMContentLoaded', () => {
    // GAME FLOW

    async function getGameFlow() {
        const gameData = await fetch('/api/gameFlow');
        const gameDataJSON = await gameData.json();
        return gameDataJSON.data;
    }

    let turn = 0;

    async function setInfo() {
        const gameData = await getGameFlow();
        const turnData = gameData[turn];
        document.querySelector('#sprint').textContent = turnData.sprint;
        document.querySelector('#day').textContent = turnData.day;
        document.querySelector('#title').textContent = turnData.title;
        document.querySelector('#description').textContent =
            turnData.description;
    }

    function nextPart() {
        const nextPartButton = document.querySelector('#next-part');
        nextPartButton.addEventListener('click', () => {
            turn++;
            setInfo();
        });
    }

    setInfo();
    nextPart();

    // TIMER
    let downloadTimer;
    function startTimer() {
        let timeElapsed = 0;
        downloadTimer = setInterval(function () {
            timeElapsed++;
            document.getElementById('countdowntimer').textContent = timeElapsed;
        }, 1000);
    }

    function stopTimer() {
        document.getElementById('countdowntimer').textContent = 0;
        clearInterval(downloadTimer);
    }

    const timerToggler = document.getElementById('timer-toggler');
    timerToggler.addEventListener('click', () => {
        if (timerToggler.classList.contains('timer-active')) {
            stopTimer();
            timerToggler.textContent = 'Comenzar Timer';
        } else {
            startTimer();
            timerToggler.textContent = 'Finalizar Timer';
        }
        timerToggler.classList.toggle('timer-active');
    });

    // SITUATION CARD

    async function getSituationCard() {
        const response = await fetch('/api/situationCard');
        const situationCard = await response.json();
        return situationCard.data;
    }

    async function fillSituationCardSection() {
        const situationCard = await getSituationCard();
        document.getElementById('situation-card-title').textContent =
            situationCard.title;
        if (!situationCard.teamModifier) {
            document.getElementById(
                'situation-card-target'
            ).textContent = `Luis, `;
        } else {
            document.getElementById('situation-card-target').textContent = '';
        }
        document.getElementById('situation-card-description').textContent =
            situationCard.description;
    }

    function nextSituationButton() {
        const nextSituation = document.getElementById('next-situation');
        nextSituation.addEventListener('click', async () => {
            fillSituationCardSection();
        });
    }
    fillSituationCardSection();
    nextSituationButton();

    // POINTS
});
