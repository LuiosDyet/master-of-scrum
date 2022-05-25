document.addEventListener('DOMContentLoaded', function () {
    async function getActionCard() {
        const response = await fetch('/api/actionCard');
        const actionCard = await response.json();
        return actionCard.data;
    }

    async function fillActionCardSection() {
        const actionCardSection = document.getElementById(
            'action-card-section'
        );
        const actionCardData = await getActionCard();
        actionCardSection.innerHTML += `
            <article class="action-card ${cardColor()}">
                <div>
                    <h5 class="card-description">${
                        actionCardData.description
                    }</h5>
                    <p class="card-points">Puntos de esfuerzo: ${
                        actionCardData.points
                    }</p>
                   ${
                       actionCardData.special.cardType
                           ? '<p class="card-points-specials">Puntos de esfuerzo para actividades de' +
                             actionCardData.special.cardType +
                             ':' +
                             actionCardData.special.points +
                             '</p>'
                           : ''
                   } 
                </div>
                <button class="commit-button hidden">Utilizar acción</button>
            </article>
        `;
        const actionCards = document.querySelectorAll('.action-card');

        if (actionCards.length >= 4) {
            addEventListeners();
            return;
        }
        fillActionCardSection();
    }
    fillActionCardSection();

    function addEventListeners() {
        const actionCards = document.querySelectorAll('.action-card');
        if (actionCards.length > 0) {
            actionCards.forEach((actionCard) => {
                actionCard.addEventListener('click', () => {
                    selectActionCard(actionCard);
                });
            });
        }
    }

    function selectActionCard(actionCard) {
        const actionCards = document.querySelectorAll('.action-card');
        const commitButtons = document.querySelectorAll('.commit-button');
        actionCards.forEach((actionCard) => {
            actionCard.classList.remove('selected');
        });
        commitButtons.forEach((commitButton) => {
            commitButton.classList.add('hidden');
        });
        actionCard.classList.add('selected');
        const commitButton = actionCard.querySelector('.commit-button');
        commitButton.classList.remove('hidden');
        commitButton.addEventListener('click', () => {
            commitActionCard(actionCard);
        });
    }

    function commitActionCard(actionCard) {
        actionCard.remove();
        fillActionCardSection();
    }

    let currentCardColorIndex = 0;
    function cardColor() {
        const colors = [
            'bg-yellow',
            'bg-limegreen',
            'bg-lightskyblue',
            'bg-orange',
            'bg-pink',
            'bg-tan',
            'bg-lightblue',
        ];
        return colors[currentCardColorIndex++ % colors.length];
    }
});
