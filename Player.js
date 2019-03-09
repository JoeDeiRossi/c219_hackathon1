class Player {
    constructor(number, callbacks) {
        this.playerDomElement = null;
        this.number = number;
        this.inventory = new Inventory;
        this.callback = {
            changeStatus: callbacks.changeStatus,
            addTile: callbacks.addTile,
            drawCard: callbacks.drawCard
        };
        this.isSelling = false;

        this.hand = [];
        this.actions = 2;

        this.eventListeners = this.eventListeners.bind(this);
        this.playCard = this.playCard.bind(this);
        this.checkStandardProjects = this.checkStandardProjects.bind(this);
        this.checkResources = this.checkResources.bind(this);
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
        this.playerDomElement = $('<div>', {'class': 'playerInfo'}).append(
            $('<div>', {'class': 'playerInner'}).text('Player ' + (this.number + 1) + '\nTR: ' + this.inventory.TR),
            this.inventory.render()
        );
        return this.playerDomElement;
    }

    updateTr(){
        $(this.playerDomElement).find('.playerInner').text('Player ' + (this.number + 1) + '\nTR: ' + this.inventory.TR);
    }

    eventListeners(){ //for buttons activating action modals and modals itself

        var test = this;
        $("#playCard").on('click', function(){
            // $("#playActionCardModal").show();
            $("#playActionCardModal").parent().show();
        });
        $("#standardProject").on('click', function(){
            test.checkStandardProjects();
            // $("#standardProjectsModal").show();
            $("#standardProjectsModal").parent().show();
        });
        $("#convertResources").on('click', function(){
            test.checkResources();
            // $("#convertResourcesModal").show();
            $("#convertResourcesModal").parent().show();
        });

        $(".close").on('click', function(){
            var modalParent = $(".close").parent();
            var modalGrandparent = modalParent.parent();
            // modalGrandparent.hide();
            $(".modal-shadow").hide();
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
            var indexOfObj = this.hand.indexOf(cardObj);
            this.hand.splice(indexOfObj, 1);
            console.log(this.hand);
            this.updateHand();
            $(".modal-shadow").hide();
    }

    checkStandardProjects() {
        //runs when 'Standard Projects' button is clicked
        //project buttons are greyed out by default, aka .disabled=true
        if (this.hand.length <= 0) {
            document.getElementById('sellCards').disabled = true;
            $(document.getElementById('sellCards')).css('cursor', 'not-allowed');
        } else {
            this.isSelling = true;
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
        $("#playActionCardModal").show();
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectPowerPlant() {
        //runs when .powerPlantButton is clicked
        this.inventory.resourceTrackers.money.changeAmount(-11);
        this.inventory.resourceTrackers.energy.changeProduction(1);
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectAsteroid() {
        this.inventory.resourceTrackers.money.changeAmount(-14);
        this.callback.changeStatus('temperature', 1); //needs to increase temp by 1 step and increase TR
        this.inventory.changeTR(1);
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectAquifer() {
        this.inventory.resourceTrackers.money.changeAmount(-18);
        this.callback.addTile('ocean', 1); //needs to give player an ocean tile to place, which will also increase their TR
        this.inventory.changeTR(1);
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectGreenery() {
        this.inventory.resourceTrackers.money.changeAmount(-23);
        this.callback.addTile('greenery', 1); //needs to give player a greenery tile to place, which will increase oxygen and their TR
        this.inventory.changeTR(1);
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    standardProjectCity() {
        this.inventory.resourceTrackers.money.changeAmount(-25);
        this.inventory.resourceTrackers.money.changeProduction(2);
        this.callback.addTile('city', 1); //needs to give player a city tile to place
        this.inventory.changeTR(1);
        // $("#standardProjectsModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    checkResources() {
        //runs when 'Conversions' button is clicked
        //convert buttons are greyed out by default, aka .disabled=true
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
        //runs when .sellSteelButton is clicked
        this.inventory.resourceTrackers.steel.changeAmount(-1);
        this.inventory.resourceTrackers.money.changeAmount(2);
        // $("#convertResourcesModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    sellTitanium() {
        //runs when .sellTitaniumButton is clicked
        this.inventory.resourceTrackers.titanium.changeAmount(-1);
        this.inventory.resourceTrackers.money.changeAmount(3);
        // $("#convertResourcesModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
    }

    convertPlants() {
        //runs when .convertPlantsButton is clicked
        this.inventory.resourceTrackers.plants.changeAmount(-8);
        this.callback.addTile('greenery', 1);
        this.callback.changeStatus('oxygen', 1);
        this.inventory.changeTR(1);
        // $("#convertResourcesModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
        //needs to give player a greenery tile to place, which will increase oxygen and their TR
    }

    convertHeat() {
        //runs when .convertHeatButton is clicked
        this.inventory.resourceTrackers.heat.changeAmount(-8);
        this.callback.changeStatus('temperature', 1);
        this.inventory.changeTR(1);
        // $("#convertResourcesModal").hide();
        $(".modal-shadow").hide();
        this.actions--;
        //also needs to increase temp by one step, and therefore increase TR by 1
    }
}
