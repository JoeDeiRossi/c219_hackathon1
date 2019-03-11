$(document).ready(testFunction);

class Game {
    constructor(playerCount) {

        this.playerDrawCardCallback = this.playerDrawCardCallback.bind(this);
        this.tilePlacementResultsCallback = this.tilePlacementResultsCallback.bind(this);
        this.askIfCanPlaceTile = this.askIfCanPlaceTile.bind(this);
        this.getCurrentPlayerStats = this.getCurrentPlayerStats.bind(this);
        this.changeWorldStats = this.changeWorldStats.bind(this);
        this.changeCurrentPlayerStats = this.changeCurrentPlayerStats.bind(this);
        this.playActionCard = this.playActionCard.bind(this);
        this.addTile = this.addTile.bind(this);
        this.checkSell = this.checkSell.bind(this);
        this.sellActionCard = this.sellActionCard.bind(this);
        this.pass = this.pass.bind(this);
        this.playerSellActionCard = this.playerSellActionCard.bind(this);



        this.map = new Map(this.tilePlacementResultsCallback, this.askIfCanPlaceTile);
        $('.board').append(this.map.render());

        // action cards new callbacks
        this.deck = new Deck({
            getPlayerStats: this.getCurrentPlayerStats,
            changeWorldStats: this.changeWorldStats,
            changePlayerStats: this.changeCurrentPlayerStats,
            playCard: this.playActionCard,
            addTile: this.addTile,
            checkSellCard: this.checkSell,
            sellCard: this.sellActionCard
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
        this.isSelling = false;

        this.currentPlayerIndex = 0;
        this.currentPlayer = null;

        this.startGame();
    }



    // ---- GAME SEQUENCE ------------------------------------------------------

    startGame() {
        console.log('starting game');

        $('#pass').on('click', this.pass);

        this.makePlayers();

        this.addEventHandlers();

        this.dealCards(4);
        for (var index = this.players.length - 1; index >= 0; index--) {
            this.players[index].inventory.resourceTrackers['money'].changeAmount(25);
            this.players[index].inventory.resourceTrackers['steel'].changeAmount(0);
            this.players[index].inventory.resourceTrackers['titanium'].changeAmount(0);
            this.players[index].inventory.resourceTrackers['plants'].changeAmount(0);
            this.players[index].inventory.resourceTrackers['heat'].changeAmount(0);
        }

        this.startRound();
    }

    addEventHandlers() {
        var test = this;
        $("#playCard").on('click', function(){
            test.currentPlayer.updateHand();
            $("#playActionCardModal").parent().show();
        });
        $("#standardProject").on('click', function(){
            test.currentPlayer.checkStandardProjects();
            $("#standardProjectsModal").parent().show();
        });
        $("#convertResources").on('click', function(){
            test.currentPlayer.checkResources();
            $("#convertResourcesModal").parent().show();
        });

        $(".close").on('click', function(){
            var modalParent = $(".close").parent();
            var modalGrandparent = modalParent.parent();
            $(".modal-shadow").hide();
            this.isSelling = false;
        });

        //standard project modal
        $("#sellCards").on('click', test.currentPlayer.standardProjectSellCards);
        $("#powerPlant").on('click', test.currentPlayer.standardProjectPowerPlant);
        $("#increaseTemperature").on('click', test.currentPlayer.standardProjectAsteroid);
        $("#buildOcean").on('click', test.currentPlayer.standardProjectAquifer);
        $("#buildGreenery").on('click', test.currentPlayer.standardProjectGreenery);
        $("#buildCity").on('click', test.currentPlayer.standardProjectCity);
        //convert resources modal
        $("#sellSteel").on('click', test.currentPlayer.sellSteel);
        $("#sellTitanium").on('click', test.currentPlayer.sellTitanium);
        $("#convertPlants").on('click', test.currentPlayer.convertPlants);
        $("#convertHeat").on('click', test.currentPlayer.convertHeat);
    }

    makePlayers() {
        for (var index = 0; index < this.playerCount; index++){
            var newPlayer = new Player(index, {
                changeStatus: this.changeWorldStats,
                addTile: this.addTile,
                drawCard: this.playerDrawCardCallback,
                sellCard: this.playerSellActionCard
            });
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());

        }

        this.currentPlayer = this.players[0];
        this.highlightCurrentPlayer();
    }

    startRound() {
        this.activePlayers = this.players.slice();

        // all players get two cards per turn and reset actions to 2
        this.dealCards(2);
        for (var playerIndex in this.players) {
            this.players[playerIndex].actions = 2;
        }

        this.currentPlayerIndex = 0;
        this.currentPlayer = this.activePlayers[this.currentPlayerIndex];
        this.highlightCurrentPlayer();

        $('.playerInfo').removeClass('playerPassedHighlight');
    }

    highlightCurrentPlayer() {
        $('.playerInfo').removeClass('playerHighlight');
        $(this.currentPlayer.playerDomElement).addClass('playerHighlight');
    }

    muteCurrentPlayer() {
        $(this.currentPlayer.playerDomElement).addClass('playerPassedHighlight');
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
            this.muteCurrentPlayer();
            this.activePlayers.splice(this.currentPlayerIndex, 1);
            this.currentPlayerIndex--;
        }
        this.changePlayers();
    }

    // checks if round should end, if so call endRound
    endRoundCheck() {
        if(this.activePlayers.length === 0) {
            this.allocateResources();
            this.turnNumber++;
            this.updateStatus();
            this.startRound();
        }
    }

    // checks if game will end
    endGameCheck() {
        if(this.temperature.current === this.temperature.max && this.oxygen.current === this.oxygen.max && this.oceanTiles === 0) {
            var maxTR = 0;
            var winners = [];

            for(var player in this.players) {
                if (this.players[player].TR > maxTR) {
                    winners = [];
                    winners[0] = this.players[player].number;
                    maxTR = this.players[player].TR;
                } else if (this.players[player].TR === maxTR) {
                    winners.push(this.players[player].number);
                }
            }

            var message;

            if (winners.length > 1) {
                message = 'Player ' + winners[0] + ' wins!';
            } else {
                message = 'Player ' + winners[0];
                for (var index = 1; index < winners.length; index++) {
                    message += ' and ' + winners[index];
                }
                message += ' tied!';
            }

            var endGameModal = new messageModals('endgame', null, message);
            endGameModal.render();
        }
    }

    changePlayers() {
        // change the current player to the next in players array
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.activePlayers.length) {
            this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.activePlayers[this.currentPlayerIndex];
        if (this.currentPlayer) {
            this.highlightCurrentPlayer();
            this.currentPlayer.actions = 2;
            this.currentPlayer.updateHand();
        }
        this.endGameCheck();
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
        $(".statusTurnNumber > .statusValue").text(this.turnNumber);
        $(".statusOxygen > .statusValue").text(this.oxygen.current + '%');
        $(".statusTemp > .statusValue").text(this.temperature.current + 'C');
    }

    // for each Player, add resources equal to their production
    allocateResources() {
        var currentInventory;
        var resources = ['money', 'steel', 'titanium', 'plants', 'energy', 'heat'];
        var distModal = new distributionModal(this.players);
        distModal.buildModal();
        for (var playerIndex in this.players) {
            currentInventory = this.players[playerIndex].inventory;
            for (var resourceIndex in resources) {
                currentInventory.resourceTrackers[resources[resourceIndex]].changeAmount(
                    currentInventory.resourceTrackers[resources[resourceIndex]].getProduction());
            }
        }
    }


    
    // ---- CALLBACK FUNCTIONS -------------------------------------------------

    // called when Card is clicked, and played - handled by Player
    playActionCard(card) {
        this.currentPlayer.playCard(card);
        this.afterPlayerAction();
    }

    playerSellActionCard(){
        this.isSelling = true;
    }

    checkSell(){
        return this.isSelling;
    }

    sellActionCard(cardObj){
        this.isSelling = false;
        this.changeCurrentPlayerStats('money', 1, 'bank');
        this.playActionCard(cardObj);
    }

    // called by Player when they play a card or tile that lets them draw cards
    playerDrawCardCallback(cardCount) {
        this.dealCards(this.currentPlayer, cardCount);
    }

    // called by Player when they play a card or convert resources and get to place a tile
    addTile(type, amount) {
        this.canPlaceTile = true;
        for(var repeat = 0; repeat < amount; repeat++){
            this.map.findTileCategory(type)
        }
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
        this.map.removeClicks();
        mapTile.owner = this.currentPlayer;
        this.currentPlayer.process(mapTile.rewards);
    }

    changeWorldStats(type, amount){
        if(this[type].current === this[type].max){
        } else {
            this[type].current += amount;
        }
        this.updateStatus();
    }

    // called by Player when they play a card or convert resouces and get to change temp or O2 levels

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