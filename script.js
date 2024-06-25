document.addEventListener('DOMContentLoaded', () => {
    const cardStyles = {
        soccer: [
            { name: 'player1', img: 'images/soccer/player1.jpg' },
            { name: 'player2', img: 'images/soccer/player2.jpg' },
            // Add more soccer players
        ],
        disney: [
            { name: 'character1', img: 'images/disney/character1.jpg' },
            { name: 'character2', img: 'images/disney/character2.jpg' },
            // Add more Disney characters
        ],
        animals: [
            { name: 'animal1', img: 'images/animals/animal1.jpg' },
            { name: 'animal2', img: 'images/animals/animal2.jpg' },
            // Add more animals
        ],
        foods: [
            { name: 'food1', img: 'images/foods/food1.jpg' },
            { name: 'food2', img: 'images/foods/food2.jpg' },
            // Add more foods
        ]
    };
    const difficulties = {
        easy: 5,   // 5 pairs = 10 cards
        medium: 10, // 10 pairs = 20 cards
        hard: 15   // 15 pairs = 30 cards
    };

    document.getElementById('startGame').addEventListener('click', startGame);

    function startGame() {
        const difficulty = document.getElementById('difficulty').value;
        const cardStyle = document.getElementById('cardStyle').value;
        const cardCount = difficulties[difficulty];
        const selectedCards = cardStyles[cardStyle].slice(0, cardCount);
        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(cardCount * 2))}, 100px)`;

        let cards = [...selectedCards, ...selectedCards];
        cards.sort(() => 0.5 - Math.random());

        cards.forEach(card => {
            let cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;

            let front = document.createElement('div');
            front.classList.add('front');
            front.style.backgroundImage = `url(${card.img})`;

            let back = document.createElement('div');
            back.classList.add('back');

            cardElement.appendChild(front);
            cardElement.appendChild(back);
            gameBoard.appendChild(cardElement);
        });
        initializeGame();
    }

    function initializeGame() {
        let firstCard, secondCard;
        let lockBoard = false;

        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;

            this.classList.add('flip');

            if (!firstCard) {
                firstCard = this;
                return;
            }

            secondCard = this;
            checkForMatch();
        }

        function checkForMatch() {
            if (firstCard.dataset.name === secondCard.dataset.name) {
                disableCards();
            } else {
                unflipCards();
            }
        }
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1500);
        }
        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }

        document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
    }
});