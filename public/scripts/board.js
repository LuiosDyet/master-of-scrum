document.addEventListener('DOMContentLoaded', () => {
    let gameData;
    let turn = 0;
    let players = [];

    // GAME FLOW

    async function getGameFlow() {
        const gameData = await fetch('/api/gameFlow');
        const gameDataJSON = await gameData.json();
        return gameDataJSON.data;
    }

    async function setInfo() {
        gameData = await getGameFlow();
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
    let timer;
    let timeElapsed = 0;
    let subtractPoints;

    function startTimer() {
        timer = setInterval(function () {
            timeElapsed++;
            document.getElementById('timer-count').textContent = timeElapsed;
            timerPointSubtract();
        }, 1000);
    }

    function stopTimer() {
        document.getElementById('timer-count').textContent = 0;
        clearInterval(timer);
        writePoints(subtractPoints);
        subtractPoints = 0;
        document.getElementById('timer-point-subtract').classList.add('hidden');
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

    function timerPointSubtract() {
        const timerPointSubtract = document.getElementById(
            'timer-point-subtract'
        );
        const timerPoint = document.getElementById('timer-point');
        if (timeElapsed === 120) {
            subtractPoints = -1;
            timerPointSubtract.classList.remove('hidden');
        }
        if (timeElapsed > 120 && timeElapsed % 10 === 0) {
            subtractPoints += subtractPoints;
        }
        timerPoint.textContent = subtractPoints;
    }

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
            ).textContent = `${getRandomPlayer()}, `;
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

    function getRandomPlayer() {
        const randomPlayer = Math.floor(Math.random() * players.length);
        return players[randomPlayer];
    }
    fillSituationCardSection();
    nextSituationButton();

    // POINTS
    let totalPoints = 0;

    function getPoints() {
        const points = document.getElementById('input-points');
        const inputPointsButton = document.getElementById('add-points');
        inputPointsButton.addEventListener('click', () => {
            const pointsValue = points.value;
            writePoints(pointsValue);
        });
    }
    function writePoints(pointsValue) {
        const sprint = gameData[turn].sprint;
        const day = gameData[turn].day;
        const tBody = document.getElementById('points-table-body');
        tBody.innerHTML =
            `<tr><td>${sprint} - ${day}</td><td>${pointsValue}</td></tr>` +
            tBody.innerHTML;

        const totalPointsEl = document.getElementById('total-points');
        totalPoints += Number(pointsValue);
        totalPointsEl.textContent = totalPoints;
    }

    getPoints();

    // PLAYERS

    function addPlayer() {
        const addPlayerButton = document.getElementById('add-player');
        addPlayerButton.addEventListener('click', () => {
            const playerName = document.getElementById('input-player-name');
            const playerNameValue = playerName.value;
            if (playerNameValue === '') return;
            players.push(playerNameValue);
            const playerList = document.getElementById('players-list');
            playerList.innerHTML += `<li>${playerNameValue}</li>`;
            playerName.value = '';
        });
    }
    addPlayer();
});
