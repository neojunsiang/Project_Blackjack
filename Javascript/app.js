// console.log("Linked");

const deck = [];
// const suit = ["Hearts", "Spades"];
// const value = ["K", 10, 2];
const player1 = {
    card: [],
    cardOnHand: 0,
    whoseTurn: true
};
const dealer = {
    card: [],
    cardOnHand: 0,
    whoseTurn: false
};

const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

// Make Cards
const makeCard = (suit, value) => {
    for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < value.length; j++) {
            const card = {
                suit: suit[i],
                value: value[j]
            }
            // console.log(card);
            deck.push(card);
        }
    }
}

// makeCard(suit, value);

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
// shuffleCard();

// Distribute cards
const distributeCards = () => {
    for (let i = 0; i < 2; i++) {
        player1.card.push(deck[0]);
        player1.cardOnHand++;
        dealer.card.push(deck[1]);
        dealer.cardOnHand++;
        deck.splice(0, 2);
    }
}
// distributeCards();

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
// console.log(player1.card);
// console.log(countPoints(player1));

// const changeTurn = (who) => {
//     console.log(countPoints(who));
//     if (who.whoseTurn === true) {
//         return dealer
//     } else {
//         return player1
//     }
// }
// console.log(changeTurn(player1));

makeCard(suit, value);
// console.log("initial", deck);
shuffleCard();
// console.log("after shuffle", deck);
distributeCards();
// console.log("initial on player", player1);
// console.log("initial on dealer", dealer);
countPoints(player1);
countPoints(dealer);
console.log("after point count player1", player1); {
    console.log("after point count dealer", dealer);
}
console.log("deck after distribution", deck);

// console.log(deck.shift());
// player1.card.push(deck.shift());
// player1.cardOnHand++;
// countPoints(player1);
// console.log(player1);
// console.log("deck after first draw", deck)

const hitCard = (userInput) => {
    userInput.card.push(deck.shift());
    userInput.cardOnHand++;
    countPoints(userInput);
    // console.log("deck length", deck.length);
    return userInput;
}
hitCard(player1);
console.log("player deck after first hit", player1);
console.log("dealer deck after first hit", dealer);
console.log('deck after first hit', deck);

console.log(player1.points);

const checkWin = () => {
    if (player1.points > 21) {
        return "Player Bust!";
    } else if (dealer.points > 22) {
        return "Dealer Bust!"
    } else {
        if (player1.points > dealer.points) {
            return "Player Wins!"
        } else if (player1.points < dealer.points) {
            return "Dealer Wins!"
        } else {
            return "Game Tie!"
        }
    }
}
console.log(checkWin());