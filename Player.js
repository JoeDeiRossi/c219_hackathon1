class Player {
    constructor(number, requestStatusChange, requestTileChange, requestDealCard) {
        this.domElement = null;
        this.number = number;
        this.inventory = new Inventory;
        this.statusCallBack = requestStatusChange;
        this.tileCallBack = requestTileChange;
        this.dealCardCallBack = requestDealCard;

        this.isSelling = false;

        this.hand = [];

        this.playedCards = [];
        this.actions = 2;

        this.eventListeners = this.eventListeners.bind(this);
        this.playCard = this.playCard.bind(this);
        this.checkStandardProjects = this.checkStandardProjects.bind(this);
        this.checkResources = this.checkResources.bind(this);
        this.standardProjectSellCards = this.standardProjectSellCards.bind(this);
        this.standardProjectPowerPlant = this.standardProjectPowerPlant.bind(this);
        this.standardProjectPowerPlantConfirm = this.standardProjectPowerPlantConfirm.bind(this);
        this.standardProjectAsteroid = this.standardProjectAsteroid.bind(this);
        this.standardProjectAsteroidConfirm = this.standardProjectAsteroidConfirm.bind(this);
        this.standardProjectAquifer = this.standardProjectAquifer.bind(this);
        this.standardProjectAquiferConfirm = this.standardProjectAquiferConfirm.bind(this);
        this.standardProjectGreenery = this.standardProjectGreenery.bind(this);
        this.standardProjectGreeneryConfirm = this.standardProjectGreeneryConfirm.bind(this);
        this.standardProjectCity = this.standardProjectCity.bind(this);
        this.standardProjectCityConfirm = this.standardProjectCityConfirm.bind(this);
        this.sellSteel = this.sellSteel.bind(this);
        this.sellSteelConfirm = this.sellSteelConfirm.bind(this);
        this.sellTitanium = this.sellTitanium.bind(this);
        this.sellTitaniumConfirm = this.sellTitaniumConfirm.bind(this);
        this.convertPlants = this.convertPlants.bind(this);
        this.convertPlantsConfirm = this.convertPlantsConfirm.bind(this);
        this.convertHeat = this.convertHeat.bind(this);
        this.convertHeatConfirm = this.convertHeatConfirm.bind(this);

        this.inputModal = null;

        this.eventListeners();
    }

    render() {
        this.domElement = $('<div>', {'class': 'playerInfo'}).append(
            $('<div>', {'class': 'playerInner'}).text('Player ' + (this.number + 1) + '\nTR: ' + this.inventory.TR),
            this.inventory.render()
        );

        return this.domElement;
    }
    eventListeners(){ //for buttons activating action modals and modals itself

        var test = this;
        $("#playCard").on('click', function(){
            $("#playActionCardModal").show();
        });
        $("#standardProject").on('click', function(){
            test.checkStandardProjects();
            $("#standardProjectsModal").show();
        });
        $("#convertResources").on('click', function(){
            test.checkResources();
            $("#convertResourcesModal").show();
        });

        $(".close").on('click', function(){
            var modalParent = $(".close").parent();
            var modalGrandparent = modalParent.parent();
            modalGrandparent.hide();
        });

        //standard project modal
        $("#sellCards").on('click', this.standardProjectSellCards);
        $("#powerPlant").on('click', this.standardProjectPowerPlant);
        $("#increaseTemperature").on('click', this.standardProjectAsteroid);
        $("#buildOcean").on('click', this.standardProjectAquifer);
        $("#buildGreenery").on('click', this.standardProjectGreenery);
        $("#buildCity").on('click', this.standardProjectCity);
        //convert resources modal
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

    process(rewards) {
        var type = Object.keys(rewards)[0];
        var change = Object.values(rewards)[0];
        console.log(type, change);

        switch (type) {
            case 'greenery':
                this.inventory.resourceTrackers['plants'].changeAmount(change);
                break;
            case 'titanium':
                this.inventory.resourceTrackers['titanium'].changeAmount(change);
                break;
            case 'steel':
                this.inventory.resourceTrackers['steel'].changeAmount(change);
                break;
            case 'card':
                this.dealCardCallBack(change);
                break;
        }
        

    }

    playCard(cardObj) {

        /* takes in card object from hand? or index of card in hand array 
           remove from hand array and move to used cards
           then execute the card's functions */
        var action = cardObj.action;
        if(this.inventory.resourceTrackers['money'].getAmount() >= cardObj.cost) {   
            this.inventory.resourceTrackers['money'].changeAmount(-1 * cardObj.cost);
            for(var index in action){
                switch(index) {
                    case 'bank': //pass bank objects to player's bank
                    console.log('add to resources');
                        var bankAmountArray = [];
                        for (var bank in action[index]) {
                            bankAmountArray.push(bank);
                            bankAmountArray.push(action[index][bank]);
                        }
                        for (var bankChangeIndex = 0; bankChangeIndex < bankAmountArray.length; bankChangeIndex += 2) { //submit array to PLAYER's inventory BANK //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                            this.inventory.resourceTrackers[bankAmountArray[bankChangeIndex]].changeAmount(bankAmountArray[bankChangeIndex + 1]);
                        }
                        break;
                    case 'production': //pass production objects to player's production
                    console.log('add to production');
                        var productionAmountArray = [];
                        for (var production in action[index]) {
                            productionAmountArray.push(production);
                            productionAmountArray.push(action[index][production]);
                        }
                        for (var productionChangeIndex = 0; productionChangeIndex < productionAmountArray.length; productionChangeIndex += 2) {//submit array to PLAYER's inventory PRODUCTION //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                            this.inventory.resourceTrackers[productionAmountArray[productionChangeIndex]].changeAmount(productionAmountArray[productionChangeIndex + 1]);
                        }
                        break;
                    case 'status': //pass status objects to status
                        var statusAmountArray = [];
                        for (var status in action[index]) {
                            statusAmountArray.push(status);
                            statusAmountArray.push(action[index][status]);
                        }
                        for (var statusChangeIndex = 0; statusChangeIndex < statusAmountArray.length; statusChangeIndex += 2) {//submit array to BOARD's STATUS to make changes //look even for status name, odd for amount //example array [temperature, 2, oxygen, 1]
                            this.statusCallBack(statusAmountArray[statusChangeIndex], statusAmountArray[statusChangeIndex + 1]); //requestStatusChange will need two parameters: statusType and amountToChange
                        }
                        break;
                    case 'tr': //pass tr number to player's tr
                        console.log('add to TR');
                        var trAmount = action[index];
                        this.inventory.changeTR(trAmount);//submit number to PLAYER's TR to make changes
                        break;
                    case 'tile': //activate tile to click on, tiles should receive [ocean, city, steel, titanium, any]
                        var tileTypeAmountArray = [];
                        for (var tileType in action[index]){
                            tileTypeAmountArray.push(tileType);
                            tileTypeAmountArray.push(action[index][tileType]);
                        }
                        for (var tileChangeIndex = 0; tileChangeIndex < tileTypeAmountArray.length; tileChangeIndex += 2) {//submit array to mapTiles //look even for tileType, odd for amount //example array [any, 1]; feeds [tileType, numberOfTiles]
                            console.log('handle tile add');
                            this.tileCallBack(tileTypeAmountArray[tileChangeIndex], tileTypeAmountArray[tileChangeIndex + 1]);//requestTileChange will need two parameters: tileType and amountToChange
                        }
                        break;
                    case 'drawActionCard': //dealCards to player
                        var dealNumberOfCards = action[index];
                            console.log('handle drawing card');
                            this.dealCardCallBack(dealNumberOfCards); //submit number to GAME's DECK to push # of card(s) into currentPLAYER's HAND
                        break;
                }
            }
            var indexOfObj = this.hand.indexOf(cardObj);
            this.hand.splice(indexOfObj, 1);
            console.log(this.hand)
            $("#playActionCardModal").hide();
            this.actions--;
        } else {
            var modal = new messageModals('error');
            modal.buildModal();
            console.log('Not enough money');
        }
    }

    checkStandardProjects() {
        //runs when 'Standard Projects' button is clicked
        //project buttons are greyed out by default, aka .disabled=true
        if (this.hand.length <= 0) {
            document.getElementById('sellCards').disabled = true;
        } else {
            this.isSelling = true;
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 11){
            document.getElementById('powerPlant').disabled = true;
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 14){//also needs to check temp
            document.getElementById('increaseTemperature').disabled = true;
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 18){//also needs to check # of oceans
            document.getElementById('buildOcean').disabled = true;
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 23){//also needs to check oxygen
            document.getElementById('buildGreenery').disabled = true;
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 25){
            document.getElementById('buildCity').disabled = true;
        }
    }

    standardProjectSellCards() {
        //runs when .sellCardsButton is clicked
        //open hand modal
        //if player then clicks a card, remove it from their hand and increase their money by 1
        //once they close the modal, this.actions-- (but not if they didn't sell any cards)
        $("#playActionCardModal").show();
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    standardProjectPowerPlant() {
        var confirmModal = new messageModals('confirm', this.standardProjectPowerPlantConfirm);
        confirmModal.buildModal();
    }

    standardProjectPowerPlantConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-11);
        this.inventory.resourceTrackers.energy.changeProduction(1);
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    standardProjectAsteroid() {
        var confirmModal = new messageModals('confirm', this.standardProjectAsteroidConfirm);
        confirmModal.buildModal();
    }

    standardProjectAsteroidConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-14);
        this.statusCallBack('temperature', 1); //needs to increase temp by 1 step and increase TR
        this.inventory.changeTR(1);
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    standardProjectAquifer() {
        var confirmModal = new messageModals('confirm', this.standardProjectAquiferConfirm);
        confirmModal.buildModal();
    }

    standardProjectAquiferConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-18);
        this.tileCallBack('ocean', 1); //needs to give player an ocean tile to place, which will also increase their TR
        this.inventory.changeTR(1);
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    standardProjectGreenery() {
        var confirmModal = new messageModals('confirm', this.standardProjectGreeneryConfirm);
        confirmModal.buildModal();
    }

    standardProjectGreeneryConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-23);
        this.tileCallBack('greenery', 1); //needs to give player a greenery tile to place, which will increase oxygen and their TR
        this.inventory.changeTR(1);
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    standardProjectCity() {
        var confirmModal = new messageModals('confirm', this.standardProjectCityConfirm);
        confirmModal.buildModal();
    }

    standardProjectCityConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-25);
        this.inventory.resourceTrackers.money.changeProduction(2);
        this.tileCallBack('city', 1); //needs to give player a city tile to place
        this.inventory.changeTR(1);
        $("#standardProjectsModal").hide();
        this.actions--;
    }

    checkResources() {
        //runs when 'Conversions' button is clicked
        //convert buttons are greyed out by default, aka .disabled=true
        if (this.inventory.resourceTrackers.steel.getAmount() < 1){
            document.getElementById('sellSteel').disabled = true;
        }
        if (this.inventory.resourceTrackers.titanium.getAmount() < 1){
            document.getElementById('sellTitanium').disabled = true;
        }
        if (this.inventory.resourceTrackers.plants.getAmount() < 8){
            document.getElementById('convertPlants').disabled = true;
        }
        if (this.inventory.resourceTrackers.heat.getAmount() < 8){
            document.getElementById('convertHeat').disabled = true;
        }
    }

    sellSteel() {
        this.inputModal = new messageModals('quantity', this.sellSteelConfirm, this.inventory.resourceTrackers.steel.getAmount());
        this.inputModal.buildModal();
    }

    sellSteelConfirm() {
        var userInput = this.inputModal.quantityInput.val();
        this.inventory.resourceTrackers.steel.changeAmount(-1 * userInput);
        this.inventory.resourceTrackers.money.changeAmount(2 * userInput);
        $("#convertResourcesModal").hide();
        this.actions--;
    }

    sellTitanium() {
        this.inputModal = new messageModals('quantity', this.sellTitaniumConfirm, this.inventory.resourceTrackers.titanium.getAmount());
        this.inputModal.buildModal();
    }

    sellTitaniumConfirm() {
        var userInput = this.inputModal.quantityInput.val();
        this.inventory.resourceTrackers.titanium.changeAmount(-1 * userInput);
        this.inventory.resourceTrackers.money.changeAmount(3 * userInput);
        $("#convertResourcesModal").hide();
        this.actions--;
    }

    convertPlants() {
        var confirmModal = new messageModals('confirm', this.convertPlantsConfirm);
        confirmModal.buildModal();
    }

    convertPlantsConfirm() {
        this.inventory.resourceTrackers.plants.changeAmount(-8);
        this.tileCallBack('greenery', 1);
        this.statusCallBack('oxygen', 1);
        this.inventory.changeTR(1);
        $("#convertResourcesModal").hide();
        this.actions--;
        //needs to give player a greenery tile to place, which will increase oxygen and their TR
    }

    convertHeat() {
        var confirmModal = new messageModals('confirm', this.convertHeatConfirm);
        confirmModal.buildModal();
    }

    convertHeatConfirm() {
        this.inventory.resourceTrackers.heat.changeAmount(-8);
        this.statusCallBack('temperature', 1);
        this.inventory.changeTR(1);
        $("#convertResourcesModal").hide();
        this.actions--;
        //also needs to increase temp by one step, and therefore increase TR by 1
    }
}