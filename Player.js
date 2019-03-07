class Player {
    constructor(number) {
        this.domElement = null;
        this.number = number;
        this.inventory = new Inventory;

        this.hand = [];
        this.playedCards = [];
        this.actions = 2;
    }

    render() {
        this.domElement = $('<div>', {'class': 'playerInfo'}).append(
            $('<div>', {'class': 'playerInner'}).text('P' + (this.number + 1)),
            this.inventory.render()
        )

        return this.domElement;
    }

    playCard() {
        /* takes in card object from hand? or index of card in hand array 
           remove from hand array and move to used cards
           then execute the card's functions */
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
        if (this.inventory.resourceTrackers[1].getAmount() >= 1 && actions) {
            $('.sellSteelButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[2].getAmount() >= 1 && actions) {
            $('.sellTitaniumButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[3].getAmount() >= 8 && actions) {//also needs to check oxygen
            $('.convertPlantsButton').disabled = false;
        }
        if (this.inventory.resourceTrackers[5].getAmount() >= 8 && actions) {//also needs to check temp
            $('.convertHeatButton').disabled = false;
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