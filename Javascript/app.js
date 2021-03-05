// console.log("Linked");

const deck = [];
const suit = ["Hearts", "Spades"];
const value = ["A", 10,];

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
        for (let i = 0; i < value.length; i++) {
            const card = {
                suit: suit[i],
                value: value[i]
            }
            console.log(card);
            deck.push(card);
        }
    }
}

makeCard(suit, value);
console.log(deck);
