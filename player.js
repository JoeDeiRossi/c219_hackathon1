class Player {
    constructor(number, callbacks) {
        this.playerDomElement = null;
        this.number = number;
        this.inventory = new Inventory;
        this.callback = {
            changeStatus: callbacks.changeStatus,
            addTile: callbacks.addTile,
            drawCard: callbacks.drawCard,
            sellCard: callbacks.sellCard
        };

        this.hand = [];
        this.actions = 2;

        this.process = this.process.bind(this);
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

    }

    render() {
        this.playerDomElement = $('<div>', {'class': 'playerInfo'}).append(
            $('<div>', {'class': 'playerInner'}).append(
              $('<div>', {'class': 'playerNum'}).text('Player ' + (this.number + 1)),
              $('<div>', {'class': 'playerTR'}).text('TR: ' + this.inventory.TR)
            ),
            this.inventory.render()
        );
        return this.playerDomElement;
    }

    updateTr(){
        $(this.playerDomElement).find('.playerTR').text('TR: ' + this.inventory.TR);
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
                this.callback.drawCard(change);
                break;
        }
        this.inventory.changeTR(1);
        this.updateTr();
    }
    playCard(cardObj) {
        /* takes in card object from hand? or index of card in hand array
           remove from hand array and move to used cards
           then execute the card's functions */
            var indexOfObj = this.hand.indexOf(cardObj);
            this.hand.splice(indexOfObj, 1);
            $(".modal-shadow").hide();
    }

    checkStandardProjects() {
        //runs when 'Standard Projects' button is clicked
        if (this.hand.length <= 0) {
            document.getElementById('sellCards').disabled = true;
            $(document.getElementById('sellCards')).css('cursor', 'not-allowed');
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 11){
            document.getElementById('powerPlant').disabled = true;
            $(document.getElementById('powerPlant')).css('cursor', 'not-allowed');
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 14){//also needs to check temp
            document.getElementById('increaseTemperature').disabled = true;
            $(document.getElementById('increaseTemperature')).css('cursor', 'not-allowed');
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 18){//also needs to check # of oceans
            document.getElementById('buildOcean').disabled = true;
            $(document.getElementById('buildOcean')).css('cursor', 'not-allowed');
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 23){//also needs to check oxygen
            document.getElementById('buildGreenery').disabled = true;
            $(document.getElementById('buildGreenery')).css('cursor', 'not-allowed');
        }
        if (this.inventory.resourceTrackers.money.getAmount() < 25){
            document.getElementById('buildCity').disabled = true;
            $(document.getElementById('buildCity')).css('cursor', 'not-allowed');
        }


    }

    standardProjectSellCards() {
        //runs when .sellCardsButton is clicked
        //open hand modal
        //if player then clicks a card, remove it from their hand and increase their money by 1
        //once they close the modal, this.actions-- (but not if they didn't sell any cards)
        this.updateHand();
        $(".modal-shadow").hide();
        $("#playActionCardModal").parent().show();
        this.callback.sellCard();
    }

    standardProjectPowerPlant() {
        var confirmModal = new messageModals('confirm', this.standardProjectPowerPlantConfirm);
        confirmModal.buildModal();
    }

    standardProjectPowerPlantConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-11);
        this.inventory.resourceTrackers.energy.changeProduction(1);
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectAsteroid() {
        var confirmModal = new messageModals('confirm', this.standardProjectAsteroidConfirm);
        confirmModal.buildModal();
    }

    standardProjectAsteroidConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-14);
        this.callback.changeStatus('temperature', 2);
        this.inventory.changeTR(1);
        this.updateTr();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectAquifer() {
        var confirmModal = new messageModals('confirm', this.standardProjectAquiferConfirm);
        confirmModal.buildModal();
    }

    standardProjectAquiferConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-18);
        this.callback.addTile('ocean', 1);
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectGreenery() {
        var confirmModal = new messageModals('confirm', this.standardProjectGreeneryConfirm);
        confirmModal.buildModal();
    }

    standardProjectGreeneryConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-23);
        this.callback.addTile('greenery', 1);
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectCity() {
        var confirmModal = new messageModals('confirm', this.standardProjectCityConfirm);
        confirmModal.buildModal();
    }

    standardProjectCityConfirm() {
        this.inventory.resourceTrackers.money.changeAmount(-25);
        this.inventory.resourceTrackers.money.changeProduction(2);
        this.callback.addTile('city', 1);
        $(".modal-shadow").hide();
        this.actions--;
    }

    checkResources() {
        //runs when 'Conversions' button is clicked
        if (this.inventory.resourceTrackers.steel.getAmount() < 1){
            document.getElementById('sellSteel').disabled = true;
            $(document.getElementById('sellSteel')).css('cursor', 'not-allowed')
        }
        if (this.inventory.resourceTrackers.titanium.getAmount() < 1){
            document.getElementById('sellTitanium').disabled = true;
            $(document.getElementById('sellTitanium')).css('cursor', 'not-allowed')
        }
        if (this.inventory.resourceTrackers.plants.getAmount() < 8){
            document.getElementById('convertPlants').disabled = true;
            $(document.getElementById('convertPlants')).css('cursor', 'not-allowed')
        }
        if (this.inventory.resourceTrackers.heat.getAmount() < 8){
            document.getElementById('convertHeat').disabled = true;
            $(document.getElementById('convertHeat')).css('cursor', 'not-allowed')
        }
    }

    sellSteel() {
        this.inputModal = new messageModals('quantity', this.sellSteelConfirm, this.inventory.resourceTrackers.steel.getAmount());
        this.inputModal.buildModal();
    }

    sellSteelConfirm() {
        var userInput = this.inputModal.inputDomElement.val();
        this.inventory.resourceTrackers.steel.changeAmount(-1 * userInput);
        this.inventory.resourceTrackers.money.changeAmount(2 * userInput);
        $(".modal-shadow").hide();

        this.actions--;
    }

    sellTitanium() {
        this.inputModal = new messageModals('quantity', this.sellTitaniumConfirm, this.inventory.resourceTrackers.titanium.getAmount());
        this.inputModal.buildModal();
    }

    sellTitaniumConfirm() {
        var userInput = this.inputModal.inputDomElement.val();
        this.inventory.resourceTrackers.titanium.changeAmount(-1 * userInput);
        this.inventory.resourceTrackers.money.changeAmount(3 * userInput);
        $(".modal-shadow").hide();

        this.actions--;
    }

    convertPlants() {
        var confirmModal = new messageModals('confirm', this.convertPlantsConfirm);
        confirmModal.buildModal();
    }

    convertPlantsConfirm() {
        this.inventory.resourceTrackers.plants.changeAmount(-8);
        this.callback.addTile('greenery', 1);
        this.callback.changeStatus('oxygen', 1);
        $(".modal-shadow").hide();
        this.actions--;
    }

    convertHeat() {
        var confirmModal = new messageModals('confirm', this.convertHeatConfirm);
        confirmModal.buildModal();
    }

    convertHeatConfirm() {
        this.inventory.resourceTrackers.heat.changeAmount(-8);
        this.callback.changeStatus('temperature', 2);
        this.inventory.changeTR(1);
        this.updateTr();
        $(".modal-shadow").hide();
        this.actions--;
    }
}
