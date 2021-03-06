// console.log("Linked");

const deck = [];
const suit = ["Hearts", "Spades"];
const value = ["A", 10];
const player1 = [];
const dealer = [];

// const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
// const value = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];

// const card1 = {
//     suit: suit[0],
//     value: value[0]
// };
// console.log(card1);

// const card2 = {
//     suit: suit[0],
//     value: value[1]
// }
// console.log(card2);

// const card3 = {
//     suit: suit[1],
//     value: value[0]
// }
// console.log(card3);

// const card4 = {
//     suit: suit[1],
//     value: value[1]
// }
// console.log(card4);

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

makeCard(suit, value);
// console.log(deck);
// console.log(deck.length);

// let cardToShuffle = deck[2];
// console.log("deck[2]", cardToShuffle);
// deck[2] = deck[0];
// console.log(deck);
// deck[0] = cardToShuffle;
// console.log(deck);

// let cardToShuffle2 = deck[1];
// console.log("deck[1]", cardToShuffle2);
// deck[1] = deck[3];
// console.log(deck);
// deck[3] = cardToShuffle2;
// console.log(deck);

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

shuffleCard();


// Distribute cards

// console.log("deck Before", deck);
// console.log("player1 Before", player1);
// console.log("dealer Before", dealer);
// player1.push(deck[0]);
// deck.shift();
// console.log("deck After", deck);
// console.log("player1 After", player1);
// dealer.push(deck[1]);
// deck.shift();
// console.log("deck After After", deck);
// console.log("dealer", dealer);
// player1.push(deck[0]);
// deck.shift();
// console.log("deck After", deck);
// console.log("player1 After", player1);
// dealer.push(deck[1]);
// deck.shift();
// console.log("deck After After", deck);

const distributeCards = () => {
    for (let i = 0; i < 2; i++) {
        player1.push(deck[0]);
        dealer.push(deck[1]);
        deck.splice(0, 2);
        // deck.shift();
        console.log("player1", player1);
        console.log("dealer", dealer);
        console.log("deck", deck);
    }
}
distributeCards();


