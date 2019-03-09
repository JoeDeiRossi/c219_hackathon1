$(document).ready(testFunction);

class Game {
    constructor(playerCount) {

        this.tilePlacementResultsCallback = this.tilePlacementResultsCallback.bind(this);
        this.askIfCanPlaceTile = this.askIfCanPlaceTile.bind(this);
        this.getCurrentPlayerStats = this.getCurrentPlayerStats.bind(this);
        this.changeWorldStats = this.changeWorldStats.bind(this);
        this.changeCurrentPlayerStats = this.changeCurrentPlayerStats.bind(this);
        this.playActionCard = this.playActionCard.bind(this);
        // this.addTile = this.addTile.bind(this);

        this.board = new Board(titleInfoArray, this.tilePlacementResultsCallback, this.askIfCanPlaceTile);

        // action cards new callbacks
        this.deck = new Deck({
            getPlayerStats: this.getCurrentPlayerStats,
            changeWorldStats: this.changeWorldStats,
            changePlayerStats: this.changeCurrentPlayerStats,
            playCard: this.playActionCard,
            addTile: this.addTile,
        });

        this.players = [];
        this.activePlayers = [];

        this.playerCount = playerCount;
        this.currentPlayer = null;

        this.oxygen = {min: 0, max: 14, current: 0};
        this.temperature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;

        this.canPlaceTile = false;

        this.currentPlayerIndex = 0;
        this.currentPlayer = null;

        this.startGame();
    }



    // ---- GAME SEQUENCE ------------------------------------------------------

    startGame() {
        console.log('starting game')

        this.makePlayers();

        this.dealCards(4);
        for (var index = this.players.length - 1; index >= 0; index--) {
            this.players[index].inventory.resourceTrackers['money'].changeAmount(25);
        }

        this.startRound();
    }


    startRound() {
        /* all players get two cards per turn */
        this.activePlayer = this.players.slice();
        for (var index in this.players) {
            this.dealCards(this.players[index], 6);
        }
    }

    makePlayers() {
        for (var index = 0; index < this.playerCount; index++) {
            var newPlayer = new Player(index, this.playerChangeStatusCallback, this.playerAddTileCallback, this.playerDrawCardCallback);
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());

        }

        this.currentPlayer = this.players[0];
    }

    startRound() {
        this.activePlayers = this.players.slice();

        // all players get two cards per turn and reset actions to 2
        for (var playerIndex in this.players) {
            this.dealCards(this.players[playerIndex], 2);
            this.players[playerIndex].actions = 2;
        }
    }

    // runs after every Player action
    // decrements the current Player's actions by 1 and checks if they have 0 actions left
    //     if true, change currentPlayer to the next activePlayer
    afterPlayerAction() {
        this.currentPlayer.actions--;
        if (this.currentPlayer.actions === 0) {
            this.changePlayers();
        }
    }

    // runs when Player clicks on the pass button
    // checks if the player has 2 actions remaining
    //     if true, remove them from the activePlayers
    pass() {
        if(this.currentPlayer.actions === 2) {
            this.currentPlayerIndex--;
            // kick current Player out of activePlayers
        }
        this.changePlayers();
    }

    // checks if round should end, if so call endRound
    endRoundCheck() {
        if(this.activePlayers.length === 0) {
            this.allocateResources();
            this.startRound();
        }
    }

    changePlayers() {
        // change the current player to the next in players array
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.activePlayers.length) {
            this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.activePlayers[this.currentPlayerIndex];
        this.endRoundCheck();
    }

    // ---- GAME FUNCTIONS -----------------------------------------------------

    // if player is not specified, dealCards will deal cards to all players
    dealCards(number, player) {
        var newCards;

        for(var playerIndex in this.players) {
            if (!player || this.players[playerIndex] === player) {
                newCards = this.deck.drawCards(number);
                for(var cardIndex in newCards) {
                    this.players[playerIndex].hand.push(newCards[cardIndex])
                }
                this.players[playerIndex].updateHand();
            }
        }
    }

    // updates the status display on the board
    updateStatus() {
        $(".statusOxygen > .statusValue").text(this.oxygen.current + '%');
        $(".statusTemp > .statusValue").text(this.temperature.current + 'C');
    }


    // INCOMPLETE - for each Player, add resources equal to their production
    allocateResources() {

        for (var playerIndex in this.players) {
            // add resources equal to their production
        }
    }


    
    // ---- CALLBACK FUNCTIONS -------------------------------------------------

    // called when Card is clicked, and played - handled by Player
    playActionCard(card) {
        this.currentPlayer.playCard(card);
        this.afterPlayerAction();
    }

    // called by Player when they play a card or tile that lets them draw cards
    playerDrawCardCallback(cardCount) {
        this.dealCards(this.currentPlayer, cardCount);
    }

    // called by Player when they play a card or convert resources and get to place a tile
    addTile(type, amount) {
        this.canPlaceTile = true;
    }

    // called by MapTile whenever it is clicked
    // if the player has played a card or converted resources to place a tile, canPlaceTile should be true
    askIfCanPlaceTile() {
      return this.canPlaceTile;
    }

    // called by MapTile when a tile has been successfully placed
    // MapTile sends itself so that Game can edit its owner and type fields
    // Game also grabs the tile rewards and sends it to the currentPlayer
    tilePlacementResultsCallback(mapTile) {
        this.canPlaceTile = false;

        mapTile.owner = this.currentPlayer;
        mapTile.typeOfTile = this.tilePlacementType;
        
        this.currentPlayer.process(rewards);
        this.afterPlayerAction();
    }

    changeWorldStats(type, amount){
        if(this[type].current === this[type].max){
        } else {
            this[type].current += amount;
        }
        this.updateStatus();
    }

    // called by Player when they play a card or convert resouces and get to change temp or O2 levels
    playerChangeStatusCallback(status, change) {
        switch(status) {
            case 'temperature':
                this.addTemperature(change);
                break;
            case 'oxygen':
                this.addOxygen(change);
        }
        this.updateStatus();
        this.afterPlayerAction();
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
}

var test;

function testFunction() {
    console.log('making a game object');
    test = new Game(2);
}