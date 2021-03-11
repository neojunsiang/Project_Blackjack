const deck = [];
const STARTING_CARD_NUMBER = 2;
const MAX_CARD_NUMBER = 5;
const GAMEPOINT = 21;
const BANBAN_POINTS = 22;
const MIN_POINT = 16;
const HIT_AUDIO = new Audio("Sounds/Huat Ah!.mp3");
const STAY_AUDIO = new Audio("Sounds/Ding Ding.mp3");

// Main data
const player = {
    name: "Player",
    card: [],
    cardOnHand: 0,
    totalPoints: 0,
    roundWin: 0
};
const dealer = {
    name: "Dealer",
    card: [],
    cardOnHand: 0,
    totalPoints: 0,
    roundWin: 0
};

const suit = ["♥", "♠", "♦", "♣"];
const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

$(() => {
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
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10;
                } else {
                    total += input.card[i].value;
                }
            }
            return input.totalPoints = total;
        } else if (input.cardOnHand === 3) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    total += 10
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10
                } else {
                    total += input.card[i].value;
                }
            }
            return input.totalPoints = total;
        } else if (input.cardOnHand >= 4) {
            for (let i = 0; i < input.card.length; i++) {
                if (input.card[i].value === "A") {
                    total += 1
                } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                    total += 10
                } else {
                    total += input.card[i].value;
                }
            }
            return input.totalPoints = total;
        }
    }

    // Show cards when there is value
    const showCards = (input) => {
        if (input === player) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                if (player.card[i] !== undefined) {
                    $("#playervalue" + i).append(player.card[i].value);
                    $("#playersuit" + i).append(player.card[i].suit);
                    $("#player" + i).show();
                } else {
                    $("#player" + i).hide();
                }
            }
        } else if (input === dealer) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                if (dealer.card[i] !== undefined) {
                    $("#dealervalue" + i).hide();
                    $("#dealersuit" + i).hide();
                } else {
                    $("#dealer" + i).hide();
                }
            }
        }
    }

    // Dealer shows card and points after each round
    const showDealerCardsAtEnd = () => {
        for (let i = 0; i < MAX_CARD_NUMBER; i++) {
            if (dealer.card[i] !== undefined) {
                $("#dealervalue" + i).append(dealer.card[i].value);
                $("#dealersuit" + i).append(dealer.card[i].suit);
                $("#dealer" + i).show("linear").css("background-color", "white");
                $("#dealervalue" + i).show("linear");
                $("#dealersuit" + i).show("linear");
            } else {
                $("#dealervalue" + i).hide();
                $("#dealersuit" + i).hide();
                $("#dealer" + i).hide();
            }
        }
        pointsTracker(dealer);
    }

    // Hit cards
    const hitCardProcess = (userInput) => {
        userInput.card.push(deck.shift());
        userInput.cardOnHand++;
        pointsTracker(userInput);
        return userInput;
    }

    // <Player> On repeat hit cards
    const onHit = () => {
        if (player.cardOnHand < MAX_CARD_NUMBER) {
            hitCardProcess(player);
            render(player);
            showCards(player);
            calculateDeckLength();
            checkSpecialWin(player);
            checkBust();
            roundTracker(player);
        } else {
            $("#hit").hide();
        }
    }

    // Condition for dealer to hit card
    const dealerToHit = () => {
        countPoints(dealer);
        while (dealer.totalPoints < MIN_POINT) {
            hitCardProcess(dealer);
        }
    }

    // Hide Stay & Hit Button
    const hideStayAndHitButtons = () => {
        $("#stay").hide();
        $("#hit").hide();
    }

    // Check for Ban Ban & Ban Luck win
    const checkSpecialWin = (input) => {
        countPoints(input);
        if (input.cardOnHand === STARTING_CARD_NUMBER && countPoints(input) === BANBAN_POINTS) {
            input.roundWin++;
            showDealerCardsAtEnd();
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text(`Ban Ban! ${input.name} Wins!`);
        } else if (input.cardOnHand === STARTING_CARD_NUMBER && countPoints(input) === GAMEPOINT) {
            input.roundWin++;
            showDealerCardsAtEnd();
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text(`Ban Luck! ${input.name} Wins!`);
        } else if (input.cardOnHand === MAX_CARD_NUMBER && countPoints(input) <= GAMEPOINT) {
            input.roundWin++;
            showDealerCardsAtEnd();
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text(`Five Dragon! ${input.name} Wins!`);
        }
    }

    // Check bust if upon hit by player
    const checkBust = () => {
        if (player.totalPoints > GAMEPOINT) {
            dealer.roundWin++;
            showDealerCardsAtEnd();
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text("Player Bust! Dealer Wins!");
        } else if (dealer.totalPoints > GAMEPOINT) {
            player.roundWin++;
            showDealerCardsAtEnd();
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text("Dealer Bust! Player Wins");
        }
    }

    // Check Winner
    const checkWin = () => {
        if (player.totalPoints > GAMEPOINT) {
            dealer.roundWin++;
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text("Player Bust! Dealer Wins");
        } else if (dealer.totalPoints > GAMEPOINT) {
            player.roundWin++;
            hideStayAndHitButtons();
            $(".result").show("linear");
            return $(".result").text("Dealer Bust! Player Wins");
        } else {
            if (player.totalPoints > dealer.totalPoints) {
                player.roundWin++;
                hideStayAndHitButtons();
                $(".result").show("linear");
                return $(".result").text("Player Wins!");
            } else if (player.totalPoints < dealer.totalPoints) {
                dealer.roundWin++;
                hideStayAndHitButtons();
                $(".result").show("linear");
                return $(".result").text("Dealer Wins!");
            } else if (player.totalPoints === dealer.totalPoints) {
                hideStayAndHitButtons();
                $(".result").show("linear");
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

    // Track the rounds won
    const roundTracker = () => {
        $("#playerround").text("Player Round Won: " + player.roundWin);
        $("#dealerround").text("Dealer Round Won: " + dealer.roundWin);
    }

    // Empty content
    const render = (input) => {
        if (input === player) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                $("#playervalue" + i).empty();
                $("#playersuit" + i).empty();
            }
        } else if (input === dealer) {
            for (let i = 0; i < MAX_CARD_NUMBER; i++) {
                $("#dealervalue" + i).empty();
                $("#dealersuit" + i).empty();
                $("#dealer" + i).css("background-color", "lightblue");
            }
        }
    }

    // Initial gameplay
    const gamePlay = () => {
        distributeCards();
        showCards(player);
        showCards(dealer);
        pointsTracker(player);
        calculateDeckLength();
        checkSpecialWin(player) || checkSpecialWin(dealer);
        roundTracker(player);
        roundTracker(dealer);
    }

    // Continue game
    const continueGame = () => {
        $("#hit").show();
        $("#stay").show();
        $(".result").text("");
        $(".result").hide();
        player.card = [];
        dealer.card = [];
        player.cardOnHand = 0;
        dealer.cardOnHand = 0;
        player.totalPoints = 0;
        dealer.totalPoints = 0;
        $(".result").empty();
        pointsTracker(player);
        pointsTracker(dealer);
        render(player);
        render(dealer);
    }

    // Pre-game Introduction
    const preGame = () => {
        $(".container").hide();
        hideStayAndHitButtons();
        $("#continue").hide();
        $("#end").hide();
        $(".result").hide();
    }

    // Action when game starts 
    const startGame = () => {
        $("h1").hide()
        $(".container").show();
        $("#stay").show();
        $("#continue").show();
        $("#end").show();
        $("#hit").show();
        $(".introduction").hide();
        $("#start").hide();
    }

    // Game on start
    preGame();
    $("#start").on('click', () => {
        startGame();
        makeCard(suit, value);
        shuffleCard();
        gamePlay();
    });

    // Hit Cards
    $("#hit").on('click', () => {
        HIT_AUDIO.play();
        onHit();
    })

    // Proceed to Dealer Turn
    $('#stay').on('click', () => {
        if (player.totalPoints < MIN_POINT) {
            alert("Mininum 16 points is required. Please hit as per needed.")
        } else {
            STAY_AUDIO.play();
            dealerToHit();
            calculateDeckLength();
            checkSpecialWin(dealer);
            checkWin();
            render(dealer);
            showDealerCardsAtEnd();
            roundTracker(dealer);
        }
    })

    // Proceed to continue
    $("#continue").on('click', () => {
        if ($(".result").text() === "") {
            alert("Please complete the round before proceeding...");
        } else {
            continueGame();
            gamePlay();
            if (deck.length <= MAX_CARD_NUMBER) {
                makeCard(suit, value);
                shuffleCard();
                calculateDeckLength();
            } else {
                return;
            }
        }
    });

    // Proceed to end
    $("#end").on('click', () => {
        window.location.reload();
    })
})





