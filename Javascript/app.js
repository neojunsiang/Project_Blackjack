const deck = [];
const STARTING_CARD_NUMBER = 2;
const MAX_CARD_NUMBER = 5;
let noOfHitClick = 0;
const MAX_AMOUNT_OF_HIT = 3;
let $conditionStats;

const player = {
    name: "Player",
    card: [],
    cardOnHand: 0,
    whoseTurn: true
};
const dealer = {
    name: "Dealer",
    card: [],
    cardOnHand: 0,
    whoseTurn: false
};

const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

$(() => {
    // Restart game
    const render = () => {
        $("#restart").show();
        $("#restart").on('click', () => {
            window.location.reload();
        })
    }

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
        for (let i = 0; i < 2; i++) {
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
                    input.card[i].value = 11;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    input.card[i].value = 10;
                } else {
                    input.card[i].value;
                }
                total += input.card[i].value;
            }
            return input.points = total;
        } else if (input.cardOnHand === 3) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    input.card[i].value = 10;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    input.card[i].value = 10;
                } else {
                    input.card[i].value;
                }
                total += input.card[i].value;
            }
            return input.points = total;
        } else if (input.cardOnHand >= 4) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    input.card[i].value = 1;
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    input.card[i].value = 10;
                } else {
                    input.card[i].value;
                }
                total += input.card[i].value;
            }
            return input.points = total;
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

    // Hit cards
    const hitCard = (userInput) => {
        userInput.card.push(deck.shift());
        userInput.cardOnHand++;
        countPoints(userInput);
        return userInput;
    }

    // On repeat hit cards
    const repeatHit = () => {
        if (noOfHitClick < MAX_AMOUNT_OF_HIT) {
            hitCard(player);
            const $addCard = $("<div>").addClass("card");
            const $hitCard = $addCard.attr("id", "player" + (noOfHitClick + 2));
            $hitCard.append(player.card[(noOfHitClick + 2)].value);
            $(".player").append($hitCard);
            calculateDeckLength();
            pointsTracker(player);
            checkBust();
            noOfHitClick++;
            checkSpecialWin(player);
            render();
        } else {
            $("#hit").hide();
        }
    }

    // Check bust if upon hit by player
    const checkBust = () => {
        if (player.points > 21) {
            return $(".result").text("Player Bust!");
        } else if (dealer.points > 21) {
            return $(".result").text("Dealer Bust!");
        }
    }

    // Condition for dealer to hit card
    const dealerToHit = () => {
        countPoints(dealer);
        let LOOP_COUNT = 0;
        while (dealer.points < 16) {
            LOOP_COUNT++;
            console.log(LOOP_COUNT);
            hitCard(dealer);
            const $addCard = $("<div>").addClass("card");
            const $hitCard = $addCard.attr("id", "dealer" + (LOOP_COUNT + 1));
            $hitCard.append(dealer.card[LOOP_COUNT + 1].value);
            $(".dealer").append($hitCard);
        }
    }

    // Check Winner
    const checkWin = () => {
        if (player.points > 21) {
            return (".result").text("Player Bust!");
        } else if (dealer.points > 21) {
            return $(".result").text("Dealer Bust!");
        } else {
            if (player.points > dealer.points) {
                return $(".result").text("Player Wins!");
            } else if (player.points < dealer.points) {
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
            $("#playerpoints").text("Player's Point: " + subject.points);
        } else {
            $("#dealerpoints").text("Dealer's Point: " + subject.points);
        }
    }

    // const continueGame = () => {
    //     $("#restart").on('click', () => {
    //         for (let i = 2; i < MAX_CARD_NUMBER; i++) {
    //             $("#player" + i).remove();
    //             $("#dealer" + i).remove();
    //         }
    //         for (let j = 0; j < STARTING_CARD_NUMBER; j++) {
    //             $("#player" + j).empty();
    //             $("#dealer" + j).empty();
    //         }
    //         player.card = [];
    //         dealer.card = [];
    //         distributeCards();
    //     })
    // }

    // Game on start
    $("#start").on('click', () => {
        // $("#restart").hide();
        $("#start").hide();
        makeCard(suit, value);
        shuffleCard();
        calculateDeckLength();
    }).on('click', () => {
        distributeCards();
        for (let i = 0; i < STARTING_CARD_NUMBER; i++) {
            $("#dealer" + i).append(dealer.card[i].value);
            $("#player" + i).append(player.card[i].value);
        }
        checkSpecialWin(player);
        checkSpecialWin(dealer);
        render();
        pointsTracker(player);
        calculateDeckLength();
    })

    // Player's hit
    $("#hit").on('click', () => {
        repeatHit();
    });

    // Dealer's Play
    $('#stay').on('click', () => {
        // const $notify = $("<p>").text("Dealer's Turn")
        // $notify.insertAfter($('.result'));
        dealerToHit();
        calculateDeckLength();
        pointsTracker(dealer);
        checkSpecialWin(dealer);
        checkWin();
        render();
    })







})





