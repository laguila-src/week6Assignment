// Week 6 Coding Assignment- War! An Automated Card Game
//
// Requirements:
// •	Deal 26 Cards to each Player from a Deck of 52 cards.
// •	Iterate through the turns where each Player plays a Card.
// •	The Player who played the higher card is awarded a point
// •    Ties result in zero points for both Players
// •	After all cards have been played, display the score and declare the winner.
// •	Write a Unit Test using Mocha and Chai for at least one of the functions you write.


// Cards have suits, ranks and values, ex:
// A queen of hearts:
//          suit- hearts, rank- queen, value- 12
class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}

// let sampleCard = new Card("clubs \u2663", "3", 3)
// console.log(sampleCard);

class Deck {
    constructor(){
        this.cards = []; // this array will hold cards in the deck
    }

    // Methods

    // Create a deck of 52 cards
    createDeck(){
        // Using UNICODE values for clubs, diamonds, hearts and spades.
        //let suits = ['clubs \u2663', 'diamonds \u2666', 'hearts\u2665', 'spades \u2660']
        let suits = ['\u2663', '\u2666', '\u2665', '\u2660']
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] 

        // There are 4 suits
        for (let i = 0; i < suits.length; i++){
            // There are 13 cards in each suit
            for (let j = 0; j < ranks.length; j++){
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
        //console.log("There are a total of " + this.cards.length + " cards in a deck");
    }

    // Using the Fisher-Yates Shuffle Algorithm to randomly shuffle the array 
    shuffleDeck(){
        let oldCard;
        // console.log("Inside shuffleDeck")
        // console.log(this.cards.length)
        for (let i = this.cards.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldCard = this.cards[i];
        this.cards[i] = this.cards[rand];
        this.cards[rand] = oldCard;
        }
    }
}

// Players have a name and a "hand" of cards
class Player {
    constructor(name){
        this.playerName = name;
        this.playerHand = [];
    }
}

// Dealer starts the game, shuffles cards and deals a hand to each player.
class Dealer {
    constructor(){
        this.players = [];
    }

    // Method for dealer to start a game of war
    startGame(player1, player2) {
        // Create instances of Player for each player and add them to the players array
        this.players.push(new Player(player1));
        this.players.push(new Player(player2));

        console.log(`Let's start a game of War!\n\n`);

        // Create a deck of cards and shuffle them by calling Deck class methods
        let newDeck = new Deck();
        newDeck.createDeck();
        newDeck.shuffleDeck();

        // deckMidpoint to hold a dynamic number of cards in half of deck
        const deckMidpoint = Math.ceil(newDeck.cards.length / 2);
        //console.log(`Deck Midpoint: ${deckMidpoint}`);

        // Deal half of the deck(26 cards) to each player
        // Push the first half of the cards in the newDeck to player1's hand and second half to player2's hand
        // Using the array.slice method which returns a shallow copy of array into new array
        // from start index to end index, not including end index.
        this.players[0].playerHand = newDeck.cards.slice(0,deckMidpoint);
        this.players[1].playerHand = newDeck.cards.slice(deckMidpoint, newDeck.cards.length );

        // console.log("Cards dealt: \n");
        // console.log(this.players[0].playerHand);
        // console.log(this.players[1].playerHand);
        
        // Let's play war
        this.playWar(this.players[0], this.players[1]);
    }

    // This method will determine who the winner is by comparing players' card values
    // and keeping a score for each player. Score is incremented by 1 for player with higher
    // card value. If card value is the same for both players, 0 is added.
    playWar(player1, player2){
        let player1Score = 0;
        let player2Score = 0

        for (let i = 0; i < player1.playerHand.length; i++){
            if (player1.playerHand[i].value > player2.playerHand[i].value){
                player1Score++;
            }else if (player2.playerHand[i].value > player1.playerHand[i].value){
                player2Score++;
            }else if (player1.playerHand[i].value === player2.playerHand[i].value){
                player1Score += 0;
                player2Score += 0;
            }
           // Print players' card at each turn
            console.log(player1.playerName + "'s card: " + player1.playerHand[i].rank + " " + player1.playerHand[i].suit);
            console.log(player2.playerName + "'s card: " + player2.playerHand[i].rank + " " + player2.playerHand[i].suit+"\n\n");
        }

        console.log(`End of game.`);
        console.log(
            `%c
            Final Score:
        
            ${player1.playerName}: ${player1Score}    ${player2.playerName}: ${player2Score}
          `,
            "color: blue; "
          );
        //console.log("Final Score: \n" + player1.playerName+": " + player1Score + " points  " + player2.playerName+": " + player2Score + " points\n");

        if (player1Score > player2Score){
            console.log(
                `%c
            The winner is ${player1.playerName}!🏆
              `,
                "color: red; "
              );
            //console.log(`The winner is ${player1.playerName}!`);
        }else if (player2Score > player1Score){
            console.log(
                `%c
            The winner is ${player2.playerName}!🏆
              `,
                "color: red; "
              );
            //console.log(`The winner is ${player2.playerName}!`);
        }else{
            console.log(
                `%c
            ${player1.playerName} and ${player2.playerName} tied!
              `,
                "color: red; "
              );
            //console.log(`${player1.playerName} and ${player2.playerName} tied!`);
        } 
    }
}

// Create an instance of the Dealer class to start a new game by calling method startGame.
// Method startGame takes the 2 player names as arguments.
newGame = new Dealer();
newGame.startGame("Mozart", "Vivaldi");