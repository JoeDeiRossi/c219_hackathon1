$(document).ready(testFunction);

class Game {
    constructor(players) {

        this.tilePlacementResultsCallback = this.tilePlacementResultsCallback.bind(this);
        //this.playerChangeStatusCallback = this.playerChangeStatusCallback.bind(this);
        //this.playerAddTileCallback = this.playerAddTileCallback.bind(this);
        //this.playerDrawCardCallback = this.playerDrawCardCallback.bind(this);
        this.askIfCanPlaceTile = this.askIfCanPlaceTile.bind(this);

        /*action cards new callbacks*/
        this.getCurrentPlayerStats = this.getCurrentPlayerStats.bind(this);
        this.changeWorldStats = this.changeWorldStats.bind(this);
        this.changeCurrentPlayerStats = this.changeCurrentPlayerStats.bind(this);
        this.playActionCard = this.playActionCard.bind(this);
        this.addTile = this.addTile.bind(this);

        this.board = new Board(titleInfoArray, this.tilePlacementResultsCallback, this.askIfCanPlaceTile);
        this.deck = new Deck({
            getPlayerStats: this.getCurrentPlayerStats,
            changeWorldStats: this.changeWorldStats,
            changePlayerStats: this.changeCurrentPlayerStats,
            playCard: this.playActionCard,
            addTile: this.addTile,
        });
        this.players = [];

        this.currentPlayer = null;
        this.firstTurn = true;
        this.roundEnd = false;
        this.gameOver = false;

        this.oxygen = {min: 0, max: 14, current: 0};
        this.temperature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;

        this.canPlaceTile = false;
        this.tilePlacementType = null;

        for (var index = 0; index < players; index++) {
            var newPlayer = new Player(index, this.playerChangeStatusCallback, this.playerAddTileCallback, this.playerDrawCardCallback);
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());

        }

        this.turnCount = 0;
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];

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
            this.dealCards(this.players[index], 6);
        }

        /* buy phase? */
    }

    dealCards(player, number) {
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
        this.currentPlayer = this.players[this.currentPlayerIndex];

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

    tilePlacementResultsCallback(mapTile, rewards) {
        this.canPlaceTile = false;

        mapTile.owner = this.currentPlayer;
        mapTile.typeOfTile = this.tilePlacementType;
        
        this.currentPlayer.process(rewards);
    }


    /*card action callbacks*/

    changeWorldStats(type, amount){
        if(this[type].current === this[type].max){
        } else {
            this[type].current += amount;
        }
        this.updateStatus();
    }

    updateStatus() {
        $(".statusOxygen > .statusValue").text(this.oxygen.current + '%');
        $(".statusTemp > .statusValue").text(this.temperature.current + 'C');
    }

    getCurrentPlayerStats(type, bankOrProduction) {
        if(bankOrProduction === 'bank') {
            var bankAmount = this.currentPlayer.inventory.resourceTrackers[type].getAmount();
            return bankAmount;
        } else if(bankOrProduction === 'production'){
            var productionAmount = this.currentPlayer.inventory.resourceTrackers[type].getProduction();
            return productionAmount;
        }
    }

    changeCurrentPlayerStats(type, amount, bankOrProduction){
        if(bankOrProduction === 'bank'){
            this.currentPlayer.inventory.resourceTrackers[type].changeAmount(amount);
        } else if(bankOrProduction === 'production'){
            this.currentPlayer.inventory.resourceTrackers[type].changeProduction(amount);
        } else if (type === 'tr'){
            this.currentPlayer.inventory.changeTR(amount);
            this.currentPlayer.updateTr();
        } else if(type === 'dealCard'){
            var newCards = this.deck.drawCards(amount);
            for(var cardIndex in newCards) {
                this.currentPlayer.hand.push(newCards[cardIndex])
            }
            this.currentPlayer.updateHand();
        }
    }

    playActionCard(cardObj) {
        this.currentPlayer.playCard(cardObj);
    }


    /* connects Card click handler and Player class */

    // playerChangeStatusCallback(status, change) {
    //     switch(status) {
    //         case 'temperature':
    //             this.addTemperature(change);
    //             break;
    //         case 'oxygen':
    //             this.addOxygen(change);
    //     }
    //
    //     this.updateStatus();
    // }

    // addOxygen(amountToAdd){
    //     if(this.oxygen.current === this.oxygen.max){
    //         return;
    //     } else {
    //         this.oxygen.current += amountToAdd;
    //     }
    //     return this.oxygen;
    // }
    //
    // addTemperature(amountToAdd){
    //     if(this.temperature.current === this.temperature.max){
    //         return;
    //     } else {
    //         this.temperature.current += amountToAdd;
    //     }
    //     return this.temperature; //need to update values to DOM
    //}

    addTile(type, amount) {
        this.canPlaceTile = true;
        this.tilePlacementType = type;
        this.tilePlacementAmount = amount;
    }

    // playerAddTileCallback(tileInfo) {
    //     this.canPlaceTile = true;
    //     this.tilePlacementType = tileInfo[0];
    //     this.tilePlacementAmount = tileInfo[1];
    // }

    askIfCanPlaceTile() {
      return this.canPlaceTile;
    }

    // playerDrawCardCallback(cardCount) {
    //     this.dealCards(this.currentPlayer, cardCount);
    // }
}

var test;

function testFunction() {
    function tester() {
        console.log('test');
    }

    test = new Game(1);
}
