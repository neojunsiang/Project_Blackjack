const deck = [];
const STARTING_CARD_NUMBER = 2;
const MAX_CARD_NUMBER = 5;
// let noOfHitClick = 0;
// const MAX_AMOUNT_OF_HIT = 3;

const player = {
    name: "Player",
    card: [],
    cardOnHand: 0,
    totalPoints: 0,
};
const dealer = {
    name: "Dealer",
    card: [],
    cardOnHand: 0,
    totalPoints: 0,
};

const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

$(() => {
    // Restart game
    // const render = () => {
    //     $("#restart").show();
    //     $("#restart").on('click', () => {
    //         window.location.reload();
    //     })
    // }

    // Make Cards
    const makeCard = (suit, value) => {
        for (let i = 0; i < suit.length; i++) {
            for (let j = 0; j < value.length; j++) {
                const card = {
                    suit: suit[i],
                    value: value[j]
                }
                deck.push(card);
            }
        }
    }

    // Shuffle cards
    const shuffleCard = () => {
        for (let i = 0; i < deck.length; i++) {
            let location1 = Math.floor(Math.random() * (deck.length - 1));
            let location2 = Math.round(Math.random() * (deck.length - 1));
            let tempCard = deck[location1];
            deck[location1] = deck[location2];
            deck[location2] = tempCard;
        }
    }

    // Distribute cards
    const distributeCards = () => {
        const playerDeck = player.card;
        const dealerDeck = dealer.card;
        for (let i = 0; i < STARTING_CARD_NUMBER; i++) {
            playerDeck.push(deck[0]);
            player.cardOnHand++;
            dealerDeck.push(deck[1]);
            dealer.cardOnHand++;
            deck.splice(0, 2);
        }
    }

    // Count points
    const countPoints = (input) => {
        let total = 0;
        if (input.cardOnHand < 3) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    total += 11;
                    // input.card[i].value = 11;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10;
                    // input.card[i].value = 10;
                } else {
                    total += input.card[i].value;
                    // input.card[i].value;
                }
                // total += input.card[i].value;
            }
            return input.totalPoints = total;
            // return input.points = total;
        } else if (input.cardOnHand === 3) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    total += 10
                    // input.card[i].value = 10;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10
                    // input.card[i].value = 10;
                } else {
                    total += input.card[i].value;
                    // input.card[i].value;
                }
                // total += input.card[i].value;
            }
            return input.totalPoints = total;
        } else if (input.cardOnHand >= 4) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    total += 1
                    // input.card[i].value = 1;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10
                    // input.card[i].value = 10;
                } else {
                    total += input.card[i].value;
                    // input.card[i].value;
                }
                // total += input.card[i].value;
            }
            return input.totalPoints = total;
        }
    }

    // Check for Ban Ban & Ban Luck win
    const checkSpecialWin = (input) => {
        countPoints(input);
        if (input.cardOnHand === STARTING_CARD_NUMBER && countPoints(input) === 22) {
            $(`#${input}points`).hide();
            return $(".result").text(`Ban Ban! ${input.name} Wins!`);
        } else if (input.cardOnHand === STARTING_CARD_NUMBER && countPoints(input) === 21) {
            return $(".result").text(`Ban Luck! ${input.name} Wins!`);
        } else if (input.cardOnHand === MAX_CARD_NUMBER && countPoints(input) <= 21) {
            return $(".result").text(`You are a Dragon! ${input.name} Wins!`);
        }
    }

    // Show cards when there is value
    const showCards = (input) => {
        if (input === player) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                if (player.card[i] !== undefined) {
                    $("#player" + i).append(player.card[i].value);
                    $("#player" + i).show();
                    $()
                } else {
                    $("#player" + i).hide();
                }
            }
        } else if (input === dealer) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                if (dealer.card[i] !== undefined) {
                    $("#dealer" + i).append(dealer.card[i].value);
                    $("#dealer" + i).show();
                    $()
                } else {
                    $("#dealer" + i).hide();
                }
            }
        }
    }

    // Hit cards
    const hitCard = (userInput) => {
        userInput.card.push(deck.shift());
        userInput.cardOnHand++;
        // countPoints(userInput);
        pointsTracker(userInput);
        return userInput;
    }

    // Empty content
    const render2 = (input) => {
        if (input === player) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                $("#player" + i).empty();
            }
        } else {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                $("#dealer" + i).empty();
            }
        }

    }

    // On repeat hit cards
    const repeatHit = () => {
        if (player.cardOnHand < MAX_CARD_NUMBER) {
            hitCard(player);
            render2(player);
            showCards(player);
            calculateDeckLength();
            checkBust();
        } else {
            $("#hit").hide();
        }
    }

    // Check bust if upon hit by player
    const checkBust = () => {
        if (player.totalPoints > 21) {
            return $(".result").text("Player Bust!");
        } else if (dealer.totalPoints > 21) {
            return $(".result").text("Dealer Bust!");
        }
    }

    // Condition for dealer to hit card
    const dealerToHit = () => {
        countPoints(dealer);
        // let loopCount = 0;
        while (dealer.totalPoints < 16) {
            // loopCount++;
            // console.log(loopCount);
            hitCard(dealer);
            render2(dealer)
            showCards(dealer);
        }
    }

    // Check Winner
    const checkWin = () => {
        if (player.totalPoints > 21) {
            return (".result").text("Player Bust!");
        } else if (dealer.totalPoints > 21) {
            return $(".result").text("Dealer Bust!");
        } else {
            if (player.totalPoints > dealer.totalPoints) {
                return $(".result").text("Player Wins!");
            } else if (player.totalPoints < dealer.totalPoints) {
                return $(".result").text("Dealer Wins!");
            } else {
                return $(".result").text("Game Tie!");
            }
        }
    }

    // Calculate remaining cards in deck
    const calculateDeckLength = () => {
        $('.remain').text("Remaining: " + deck.length);
    }

    // Count and append points on screen
    const pointsTracker = (subject) => {
        countPoints(subject);
        if (subject === player) {
            $("#playerpoints").text("Player's Point: " + subject.totalPoints);
        } else {
            $("#dealerpoints").text("Dealer's Point: " + subject.totalPoints);
        }
    }

    const gamePlay = () => {
        distributeCards();
        showCards(player);
        showCards(dealer);
        pointsTracker(player);
        calculateDeckLength();
        checkSpecialWin(player);
        checkSpecialWin(dealer);
    }

    const playerPlay = () => {
        $("#hit").on('click', () => {
            repeatHit();
        })
    }

    const dealerPlay = () => {
        $('#stay').on('click', () => {
            dealerToHit();
            calculateDeckLength();
            pointsTracker(dealer);
            checkSpecialWin(dealer);
            checkWin();
        })
    }


    const continueGame = () => {
        $(".result").hide();
        player.card = [];
        dealer.card = [];
        player.cardOnHand = 0;
        dealer.cardOnHand = 0;
        player.totalPoints = 0;
        dealer.totalPoints = 0;
        render2(player);
        render2(dealer);
    }


    // Game on start
    $("#start").on('click', () => {
        // $("#restart").hide();
        $("#start").hide();
        makeCard(suit, value);
        shuffleCard();
    }).on('click', () => {
        gamePlay();
    })

    playerPlay();
    dealerPlay();
    $("#restart").on('click', () => {
        continueGame();
        gamePlay();
        pointsTracker(dealer);
        playerPlay();
        dealerPlay();
    });

    // if (deck.length === 0) {
    //     makeCard();
    //     shuffleCard();
    // } else {
    //     continueGame();
    // }


})





