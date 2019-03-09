$(document).ready(testFunction);

class Game {
    constructor(playerCount) {

        this.playCard = this.playCard.bind(this);
        this.tilePlacementResultsCallback = this.tilePlacementResultsCallback.bind(this);
        this.playerChangeStatusCallback = this.playerChangeStatusCallback.bind(this);
        this.playerAddTileCallback = this.playerAddTileCallback.bind(this);
        this.playerDrawCardCallback = this.playerDrawCardCallback.bind(this);
        this.askIfCanPlaceTile = this.askIfCanPlaceTile.bind(this);

        this.board = new Board(titleInfoArray, this.tilePlacementResultsCallback, this.askIfCanPlaceTile);
        this.deck = new Deck(this.playCard);
        this.players = [];
        this.activePlayers = []

        this.playerCount = playerCount;
        this.currentPlayer = null;
        this.firstTurn = true;

        this.oxygen = {min: 0, max: 14, current: 0};
        this.temperature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;

        this.canPlaceTile = false;
        this.tilePlacementType = null;
        this.tilePlacementAmount = null;

        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];

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

    makePlayers() {
        for (var index = 0; index < this.playerCount; index++) {
            var newPlayer = new Player(index, this.playerChangeStatusCallback, this.playerAddTileCallback, this.playerDrawCardCallback);
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());
        }
    }

    startRound() {
        this.activePlayers = this.players.slice();

        // all players get two cards per turn
        for (var index in this.players) {
            this.dealCards(this.players[index], 2);
        }

        // allocate resources
        this.allocateResources();

    }

    changePlayers() {
        // change the current player to the next in players array
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.players[this.currentPlayerIndex];
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
    playCard(card) {
        this.currentPlayer.playCard(card);
    }

    // called by Player when they play a card or tile that lets them draw cards
    playerDrawCardCallback(cardCount) {
        this.dealCards(this.currentPlayer, cardCount);
    }

    // called by Player when they play a card or convert resources and get to place a tile
    playerAddTileCallback(tileInfo) {
        this.canPlaceTile = true;
        this.tilePlacementType = tileInfo[0];
        this.tilePlacementAmount = tileInfo[1];
    }

    /* 
       called by MapTile whenever it is clicked
       if the player has played a card or converted resources to place a tile, canPlaceTile should be true
    */
    askIfCanPlaceTile() {
      return this.canPlaceTile;
    }

    /* 
       called by MapTile when a tile has been successfully placed
       MapTile sends itself so that Game can edit its owner and type fields
       Game also grabs the tile rewards and sends it to the currentPlayer
    */
    tilePlacementResultsCallback(mapTile) {
        this.canPlaceTile = false;

        mapTile.owner = this.currentPlayer;
        mapTile.typeOfTile = this.tilePlacementType;
        
        this.currentPlayer.process(rewards);
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
    }

}

var test;

function testFunction() {
    console.log('making a game object');
    test = new Game(2);
}