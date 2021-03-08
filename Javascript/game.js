// console.log("Linked");

const deck = [];
const player = {
    card: [],
    cardOnHand: 0,
    whoseTurn: true
};
const dealer = {
    card: [],
    cardOnHand: 0,
    whoseTurn: false
};

// const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
// const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

const suit = ["Hearts", "Spades"];
const value = ["K", 9, "A"];

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

// Shuffle Cards
const shuffleCard = () => {
    for (let i = 0; i < deck.length; i++) {
        let location1 = Math.floor(Math.random() * (deck.length - 1));
        // console.log(location1);
        let location2 = Math.round(Math.random() * (deck.length - 1));
        // console.log(location2);
        let tempCard = deck[location1];
        // console.log("tempCard", tempCard);
        deck[location1] = deck[location2];
        // console.log("deck[location1]", deck[location1]) 
        deck[location2] = tempCard;
        // console.log("deck[location2]", deck[location2]);
        // console.log(deck);
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
                // console.log("new", input.card[i].value);
            } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                input.card[i].value = 10;
                // console.log("non-A value", input.card[i].value);
            } else {
                input.card[i].value;
                // console.log("no change", input.card[i].value);
            }
            total += input.card[i].value;
        }
        return input.points = total;
    } else if (input.cardOnHand === 3) {
        for (let i = 0; i < input.card.length; i++) {
            if (input.card[i].value === "A") {
                input.card[i].value = 10;
                // console.log("new", input.card[i].value);
            } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                input.card[i].value = 10;
                // console.log("non-A value", input.card[i].value);
            } else {
                input.card[i].value;
                // console.log("no change", input.card[i].value);
            }
            total += input.card[i].value;
        }
        return input.points = total;
    } else if (input.cardOnHand >= 4) {
        for (let i = 0; i < input.card.length; i++) {
            if (input.card[i].value === "A") {
                input.card[i].value = 1;
                // console.log("new", input.card[i].value);
            } else if (input.card[i].value === "K" || input.card[i].value === "Q" || input.card[i].value === "J") {
                input.card[i].value = 10;
                // console.log("non-A value", input.card[i].value);
            } else {
                input.card[i].value;
                // console.log("no change", input.card[i].value);
            }
            total += input.card[i].value;
        }
        return input.points = total;
    }
}

const hitCard = (userInput) => {
    userInput.card.push(deck.shift());
    userInput.cardOnHand++;
    countPoints(userInput);
    // console.log("deck length", deck.length);
    return userInput;
}

const playerToHit = () => {
    while (player.points < 16) {
        hitCard(player);
    }
}

const dealerToHit = () => {
    while (dealer.points < 16) {
        hitCard(dealer);
    }
}

const checkWin = () => {
    if (player.points > 21) {
        return "Player Bust!";
    } else if (dealer.points > 21) {
        return "Dealer Bust!"
    } else {
        if (player.points > dealer.points) {
            return "Player Wins!"
        } else if (player.points < dealer.points) {
            return "Dealer Wins!"
        } else {
            return "Game Tie!"
        }
    }
}

// const checkSpecialWin = () => {
//     if (player.points === 21 && dealer.points === 21) {
//         console.log("Zao Ah Zao!");
//     } else if (player.points === 21) {
//         console.log("Player Ban Luck");
//     } else if (dealer.points === 21) {
//         console.log("Dealer Ban Luck");
//     } else {
//         return 0;
//     }
// }

// Terminal //
makeCard(suit, value);
// console.log("initial", deck);
shuffleCard();
// console.log("after shuffle", deck);
distributeCards();

countPoints(player);
console.log("initial player", player);

countPoints(dealer);
console.log("initial dealer", dealer);

console.log(checkSpecialWin());
// console.log("initial on player", player1);
// console.log("initial on dealer", dealer);
// countPoints(player1);
// countPoints(dealer);
// console.log("after point count player1", player1);
// console.log("after point count dealer", dealer);
// console.log("deck after distribution", deck.length);

hitCard(player);
// console.log("player deck after first hit", player1);
// console.log("dealer deck after first hit", dealer);
// console.log('deck after first hit', deck);

// playerToHit();
// console.log("player object after hit", player1);
// console.log("player points after hit", player1.points);

// dealerToHit();
// console.log("dealer object after hit", dealer);
// console.log("dealer points after dealer hit", dealer.points);
// console.log(checkWin());
// Terminal

