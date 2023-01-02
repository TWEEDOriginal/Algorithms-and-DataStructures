/**
 * data structures for a generic deck of cards
 *
 * Also contains implementation of blackjack
 * using the data structures
 *
 */

class Card {
  constructor(suit, number) {
    this.suit = suit;
    this.number = number;
    this.available = true;
  }
  select() {
    this.available = false;
  }
}

class Hand {
  constructor() {
    this.cards = [];
    this.sum = 0;
  }

  addCard(card) {
    this.card.push(card);
  }

  getSum() {
    let number_of_As = 0;
    let sum = 0;
    for (let card of this.cards) {
      if (card.number >= 10) {
        sum += 10;
      } else if (card.number == 1) {
        number_of_As++;
      } else {
        sum += card.number;
      }
    }

    if (number_of_As > 0) {
      //can't have two aces being 11, that'll be 22
      while (number_of_As > 1) {
        sum++;
        number_of_As--;
      }

      if (sum >= 11) {
        sum++;
      } else {
        sum += 11;
      }
    }
    this.setSum = sum;
    return sum;
  }
  set setSum(sum) {
    this.sum = sum;
  }
}

class Suit {
  constructor(name) {
    this.name = name;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.currentIndex = 0;
    this.populateDeck();
    this.shuffle();
  }
  populateDeck() {
    for (let suit of ["club", "diamond", "heart", "spade"]) {
      const s = new Suit(suit);
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new Card(s, i));
      }
    }
  }
  //Fisher-Yates (aka Knuth) Shuffle
  shuffle() {
    let currentIndex = this.cards.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }

    return;
  }
  isEmpty() {
    if (this.currentIndex == this.cards.length) return true;
    return false;
  }

  pickCard() {
    if (this.isEmpty())
      throw new Error(
        "Dear dealer can't you see that the deck is clearly empty"
      );

    const card = this.cards[this.currentIndex];
    card.select();
    this.currentIndex++;
    return card;
  }
}

class Player {
  constructor() {
    this.hand = new Hand();
    this.bust = false;
  }
  remove() {
    this.bust = true;
  }
}

class Dealer extends Player {
  constructor() {
    super();
  }
  bustDealer() {
    this.bust = true;
  }
}

/** 
played by 2 to 7 players (excluding dealer)
Aim: get card total higher than the dealers and also closer to 21 without getting over 21
uses (1 - 8) 52 card decks
each player is only playing against the dealer
JQK worth 10 points; 2-10 worth what you see; ace 1 or 11 (whichever is better for the player )
game begins each player places a bet
each player dealt two cards (one card per dealing)
dealer keeps 1 card down while showing the other (don't matter for this simulation)
each player has the choice to hit or stand. hit means a player wants another card.
each player has to wait their turn to do above (can hit as much as they want while it's their turn)
bust once a players card get's over 21 and the player loses their bet and the dealer flips over their cards
once there's a bust the player loses their bet and is out of the game

//after first round then dealer turns card around and chooses to  hit or stand
the dealer is forced to hit if their first two cards equal 16 or less but has to stay if the more
if dealers hand exceeds 21 all players who didn't bust win immediately, their bet plus matching amount is returned
else if dealers hand is valid, only players that score higher than the dealer win,
if score same only original bet is returned else player loses

if a player's first two cards equal 21 then that's a blackjack

return winners, pushers and losers
*/

class Blackjack {
  constructor(number_of_players) {
    this.players = [];
    this.deck = new Deck();
    for (let i = 0; i < number_of_players; i++) {
      this.players.push(new Player());
    }
    this.dealer = new Dealer();
    this.blackjack = [];
    this.winners = [];
    this.pushers = [];
    this.losers = [];
    //place imaginary bet. harammm 🌚
    this.deal();
    this.play();
    this.dealerMove();
    this.getWinnersAndLosers();
  }

  deal() {
    for (let i = 0; i < 2; i++) {
      for (let i = 0; i < this.players.length; i++) {
        //give each player their card
        if (this.deck.isEmpty()) this.deck = new Deck();

        this.players[i].hand.cards.push(this.deck.pickCard());
      }
      if (this.deck.isEmpty()) this.deck = new Deck();
      this.dealer.hand.cards.push(this.deck.pickCard());
    }
  }
  play() {
    for (let player of this.players) {
      let playerSum = player.hand.getSum();
      if (playerSum == 21) continue;
      else if (playerSum > 21) {
        player.remove();
        this.losers.push(player);
      } else {
        //choose to hit or stand
        let hitOrStand = Math.floor(Math.random() * 2); // meant to use input instead of random
        console.log(player, "before potential hit", player.hand.cards);
        while (hitOrStand == 0 && playerSum < 21) {
          console.log(player, "chose to hit", player.hand.cards);

          if (this.deck.isEmpty()) this.deck = new Deck();
          player.hand.cards.push(this.deck.pickCard());

          hitOrStand = Math.floor(Math.random() * 2);
          playerSum = player.hand.getSum();
          console.log("new player sum", playerSum);
          console.log(player, "after hit", player.hand.cards);
        }

        if (playerSum > 21) {
          player.remove();
          this.losers.push(player);
        }
      }
    }
  }

  dealerMove() {
    console.log("reveal hidden card");
    let dealerSum = this.dealer.hand.getSum();
    console.log(this.dealer, "before potential hit", this.dealer.hand.cards);
    while (dealerSum <= 16) {
      console.log(this.dealer, "has to hit", this.dealer.hand.cards);
      if (this.deck.isEmpty()) this.deck = new Deck();
      this.dealer.hand.cards.push(this.deck.pickCard());

      dealerSum = this.dealer.hand.getSum();
      console.log("new Dealer sum", dealerSum);
      console.log(this.dealer, "after hit", this.dealer.hand.cards);
    }
    if (dealerSum > 21) {
      this.dealer.bustDealer();
    }
  }
  getWinnersAndLosers() {
    for (let player of this.players) {
      const playerSum = player.hand.sum;
      if (player.bust) continue;

      if (this.dealer.bust) {
        if (playerSum == 21) this.blackjack.push(player);
        else {
          this.winners.push(player);
        }
      } else {
        const dealerSum = this.dealer.hand.sum;
        if (playerSum > dealerSum) {
          playerSum == 21
            ? this.blackjack.push(player)
            : this.winners.push(player);
        } else if (playerSum == dealerSum) {
          this.pushers.push(player);
        } else {
          this.losers.push(player);
        }
      }
    }
    console.log("blackjack", this.blackjack);
    console.log("winners", this.winners);
    console.log("pushers", this.pushers);
    console.log("losers", this.losers);
    console.log(this.dealer);
  }
}

const round = new Blackjack(5);
