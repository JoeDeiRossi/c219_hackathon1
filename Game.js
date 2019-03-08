$(document).ready(testFunction);

class Game {
    constructor(players) {
      
        this.playCard = this.playCard.bind(this);
        this.rewardCallback = this.rewardCallback.bind(this);
        this.playerChangeStatusCallback = this.playerChangeStatusCallback.bind(this);
        this.playerAddTileCallback = this.playerAddTileCallback.bind(this);

        this.board = new Board(titleInfoArray, this.actionPhase, this.rewardCallback);
        this.deck = new Deck(this.playCard);
        this.players = [];

        this.currentPlayer = null;
        this.firstTurn = true;
        this.roundEnd = false;
        this.gameOver = false;

        this.canPlaceTile = false;

        for (var index = 0; index < players; index++) {
            var newPlayer = new Player(index, this.playerChangeStatusCallback, this.playerAddTileCallback);
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());

        }

        this.turnCount = 0;
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];

        this.oxygen = {min: 0, max: 14, current: 0};
        this.temperature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;

        this.startGame();
    }

    startGame() {
        /* starting hand */
        console.log('starting game')

        for (var index in this.players) {
            this.dealCards(this.players[index], 2);
            this.players[index].inventory.resourceTrackers['money'].changeAmount(25);
        }

        this.startRound();
    }

    startRound() {
        /* all players get two cards per turn */
        for (var index in this.players) {
            this.dealCards(this.players[index], 2);
        }

        /* buy phase? */
    }

    dealCards(player, number, update=true) {
        var newCards = this.deck.drawCards(number);
        for(var cardIndex in newCards) {
            player.hand.push(newCards[cardIndex])
        }
            player.updateHand();
    }

    changePlayers() {
        /* change the current player to the next in players array */
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.players[currentPlayerIndex];

        /* increment the turn counter by 1 - if everyone has had a turn, end the round */
        this.turnCount++;
        if(this.turnCount >= this.players.length) {
            this.turnCount = 0;
            this.roundEnd();
        }
    }

    /* sets up the buttons and play area for the current player, call after changing player turns */
    actionPhase() {
        console.log('test');
    }
        

        /* show buttons or hand? give the player their options */
        /* then change players - call changePlayers at the end of each action */

    rewardCallback(reward) {
        this.canPlaceTile = false;
        console.log(reward);
    }

    /* connects Card click handler and Player class */
    playCard(card) {
        this.currentPlayer.playCard(card);
    }


    playerChangeStatusCallback(status, change) {
        switch(status) {
            case 'temperature':
                this.addTemperature(change);
                break;
            case 'oxygen':
                this.addOxygen(change);
        }

        this.updateStatus();
    }

    updateStatus() {
        $(".statusOxygen > .statusValue").text(this.oxygen.current + '%');
        $(".statusTemp > .statusValue").text(this.temperature.current + 'C');
    }

    addOxygen(amountToAdd){
        if(this.oxygen.current === this.oxygen.max){
            return;
        } else {
            this.oxygen.current += amountToAdd;
        }
        return this.oxygen;
    }

    addTemperature(amountToAdd){
        if(this.temperature.current === this.temperature.max){
            return;
        } else {
            this.temperature.current += amountToAdd;
        }
        return this.temperature; //need to update values to DOM
    }

    playerAddTileCallback(tileType, change) {
        this.canPlaceTile = true;
    }

}

var test;

function testFunction() {
    function tester() {
        console.log('test');
    }
    
    test = new Game(1);
}

