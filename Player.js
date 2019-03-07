class Player {
    constructor(number, requestStatusChange, requestTileChange, requestDealCard) {
        this.domElement = null;
        this.number = number;
        this.inventory = new Inventory;
        this.statusCallBack = requestStatusChange;
        this.tileCallBack = requestTileChange;
        this.dealCardCallBack = requestDealCard;

        this.hand = [];

        this.playedCards = [];
        this.actions = 2;

        this.playCard = this.playCard.bind(this);
        this.standardProjectSellCards = this.standardProjectSellCards.bind(this);
        this.standardProjectPowerPlant = this.standardProjectPowerPlant.bind(this);
        this.standardProjectAsteroid = this.standardProjectAsteroid.bind(this);
        this.standardProjectAquifer = this.standardProjectAquifer.bind(this);
        this.standardProjectGreenery = this.standardProjectGreenery.bind(this);
        this.standardProjectCity = this.standardProjectCity.bind(this);
        this.sellSteel = this.sellSteel.bind(this);
        this.sellTitanium = this.sellTitanium.bind(this);
        this.convertPlants = this.convertPlants.bind(this);
        this.convertHeat = this.convertHeat.bind(this);

        this.eventListeners();
    }

    render() {
        this.domElement = $('<div>', {'class': 'playerInfo'}).append(
            $('<div>', {'class': 'playerInner'}).text('Player' + (this.number + 1)),
            this.inventory.render()
        );

        return this.domElement;
    }
    eventListeners(){ //for buttons activating action modals and modals itself
        $("#playCard").on('click', function(){
            $("#playActionCardModal").show();
        });
        $("#standardProject").on('click', function(){
            $("#standardProjectsModal").show();
        });
        $("#convertResources").on('click', function(){
            $("#convertResourcesModal").show();
        });
        //add playCard function click and bind
        $("#sellCards").on('click', this.standardProjectSellCards);
        $("#powerPlant").on('click', this.standardProjectPowerPlant);
        $("#increaseTemperature").on('click', this.standardProjectAsteroid);
        $("#buildOcean").on('click', this.standardProjectAquifer);
        $("#buildGreenery").on('click', this.standardProjectGreenery);
        $("#buildCity").on('click', this.standardProjectCity);
        $("#sellSteel").on('click', this.sellSteel);
        $("#sellTitanium").on('click', this.sellTitanium);
        $("#convertPlants").on('click', this.convertPlants);
        $("#convertHeat").on('click', this.convertHeat);
    }

    updateHand() {
        /* clear hand */
        $('.hand').empty();

        for(var cardIndex in this.hand) {
            var newCardDom = this.hand[cardIndex].render();
            $('.hand').append(newCardDom);
        }
    }

    playCard(cardObj) {

        /* takes in card object from hand? or index of card in hand array 
           remove from hand array and move to used cards
           then execute the card's functions */
        var action = cardObj.action;
        for(var index in action){
            switch(index) {
                case 'bank': //pass bank objects to player's bank
                    var bankAmountArray = [];
                    for (var bank in action[index]) {
                        bankAmountArray.push(bank);
                        bankAmountArray.push(action[index][bank]);
                    }
                    for (var index = 0; index < bankAmountArray.length; index += 2) { //submit array to PLAYER's inventory BANK //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                        this.inventory.changeAmount(index, index + 1)
                    }
                    break;
                case 'production': //pass production objects to player's production
                    var productionAmountArray = [];
                    for (var production in action[index]) {
                        productionAmountArray.push(production);
                        productionAmountArray.push(action[index][production]);
                    }
                    for (var index = 0; index < productionAmountArray.length; index += 2) {//submit array to PLAYER's inventory PRODUCTION //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                        this.inventory.changeProduction(index, index + 1)
                    }
                    break;
                case 'status': //pass status objects to status
                    var statusAmountArray = [];
                    for (var status in action[index]) {
                        statusAmountArray.push(status);
                        statusAmountArray.push(action[index][status]);
                    }
                    for (var index = 0; index < statusAmountArray.length; index += 2) {//submit array to BOARD's STATUS to make changes //look even for status name, odd for amount //example array [temperature, 2, oxygen, 1]
                        this.statusCallBack(index, index + 1); //requestStatusChange will need two parameters: statusType and amountToChange
                    }
                    break;
                case 'tr': //pass tr number to player's tr
                    var trAmount = action[index];
                    this.inventory.changeTR(trAmount);//submit number to PLAYER's TR to make changes
                    break;
                case 'tile': //activate tile to click on, tiles should receive [ocean, city, steel, titanium, any]
                    var tileTypeAmountArray = [];
                    for (var tileType in action[index]){
                        tileTypeAmountArray.push(tileType);
                        tileTypeAmountArray.push(action[index][tileType]);
                    }
                    for (var index = 0; index < statusAmountArray.length; index += 2) {//submit array to mapTiles //look even for tileType, odd for amount //example array [any, 1]; feeds [tileType, numberOfTiles]
                        this.tileCallBack(index, index + 1);//requestTileChange will need two parameters: tileType and amountToChange
                    }
                    break;
                case 'drawActionCard': //dealCards to player
                    var dealNumberOfCards = action[index];
                        this.dealCardCallBack(dealNumberOfCards); //submit number to GAME's DECK to push # of card(s) into currentPLAYER's HAND
                    break;
            }
        }
    }

    checkStandardProjects() {
        //runs when 'Standard Projects' button is clicked
        //project buttons are greyed out by default, aka .disabled=true
        if (this.hand.length > 0 && actions) {
            $('.sellCardsButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[0].getAmount() > 11 && actions) {
            $('.powerPlantButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[0].getAmount() > 14 && actions) {//also needs to check temp
            $('.asteroidButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[0].getAmount() > 18 && actions) {//also needs to check # of oceans
            $('.aquiferButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[0].getAmount() > 23 && actions) {//also needs to check oxygen
            $('.greeneryButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[0].getAmount() > 25 && actions) {
            $('.cityButton').disabled = false;
        }
    }

    standardProjectSellCards() {
        //runs when .sellCardsButton is clicked
        //open hand modal
        //if player then clicks a card, remove it from their hand and increase their money by 1
        //once they close the modal, actions-- (but not if they didn't sell any cards)
    }

    standardProjectPowerPlant() {
        //runs when .powerPlantButton is clicked
        this.inventory.resourceTrackers[0].changeAmount(-11);
        this.inventory.resourceTrackers[4].changeProduction(1);
        actions--;
    }

    standardProjectAsteroid() {
        this.inventory.resourceTrackers[0].changeAmount(-14);
        //needs to increase temp by 1 step and increase TR
        actions--;
    }

    standardProjectAquifer() {
        this.inventory.resourceTrackers[0].changeAmount(-18);
        //needs to give player an ocean tile to place, which will also increase their TR
        actions--;
    }

    standardProjectGreenery() {
        this.inventory.resourceTrackers[0].changeAmount(-23);
        //needs to give player a greenery tile to place, which will increase oxygen and their TR
        actions--;
    }

    standardProjectCity() {
        this.inventory.resourceTrackers[0].changeAmount(-25);
        this.inventory.resourceTrackers[0].changeProduction(1);
        //needs to give player a city tile to place
        actions--;
    }

    convertResources() {
        //runs when 'Conversions' button is clicked
        //convert buttons are greyed out by default, aka .disabled=true
        if (this.inventory.getAmount(1) >= 1 && actions) {
            $('#sellSteel').disabled = false;
        }
        if (this.inventory.getAmount(2) >= 1 && actions) {
            $('#sellTitanium').disabled = false;
        }
        if (this.inventory.getAmount(3) >= 8 && actions) {
            $('#convertPlants').disabled = false;
        }
        if (this.inventory.getAmount(5) >= 8 && actions) {
            $('#convertHeat').disabled = false;
        }
    }

    sellSteel() {
        //runs when .sellSteelButton is clicked
        var numberToSell; //get number to sell from user input
        if (numberToSell <= this.inventory.resourceTrackers[1].getAmount()) {
            this.inventory.resourceTrackers[1].changeAmount(-numberToSell);
            this.inventory.resourceTrackers[0].changeAmount(2 * numberToSell);
            this.actions--;
        }
    }

    sellTitanium() {
        //runs when .sellTitaniumButton is clicked
        var numberToSell; //get number to sell from user input
        if (numberToSell <= this.inventory.resourceTrackers[2].getAmount()) {
            this.inventory.resourceTrackers[2].changeAmount(-numberToSell);
            this.inventory.resourceTrackers[0].changeAmount(3 * numberToSell);
            this.actions--;
        }
    }

    convertPlants() {
        //runs when .convertPlantsButton is clicked
        this.inventory.resourceTrackers[3].changeAmount(-8);
        actions--;
        //needs to give player a greenery tile to place, which will increase oxygen and their TR
    }

    convertHeat() {
        //runs when .convertHeatButton is clicked
        this.inventory.resourceTrackers[5].changeAmount(-8);
        actions--;
        //also needs to increase temp by one step, and therefore increase TR by 1
    }
}