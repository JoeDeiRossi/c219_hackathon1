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

    standardProjectSellCards() {
        //check if length of this.hand > 0, if 0 css display grey button and return
        //open up play card modal
        //check position of card in player,
        //check
    }

    standardProjectPowerPlant() {
    }

    standardProjectAsteroid() {

    }

    standardProjectAquifer() {

    }

    standardProjectGreenery() {

    }

    standardProjectCity() {

    }

    convertResources() {
        //runs when 'Conversions' button (person object) is clicked
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
        if (numberToSell <= this.inventory.getAmount(1)) {
            this.inventory.resourceTrackers[1].amount -= numberToSell;
            this.inventory.resourceTrackers[0].amount += 2*numberToSell;
            this.actions--;
        }
    }

    sellTitanium() {
        //runs when .sellTitaniumButton is clicked
        var numberToSell; //get number to sell from user input
        if (numberToSell <= getAmount(2)) {
            this.resourceTrackers[2].amount -= numberToSell;
            this.resourceTrackers[0].amount += 3*numberToSell;
            actions--;
        }
    }

    convertPlants() {
        //runs when .convertPlantsButton is clicked
        this.resourceTrackers[3].amount -= 8;
        this.TR++;
        actions--;
        //also needs to give player a greenery tile and allow them to place it on any open space
        //also needs to increase oxygen by one step
    }

    convertHeat() {
        //runs when .convertHeatButton is clicked
        this.resourceTrackers[5].amount -= 8;
        this.TR++;
        actions--;
        //also needs to increase temp by one step
    }
}