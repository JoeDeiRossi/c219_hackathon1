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

    updateHand() {
        /* clear hand */
        $('.hand').empty();

        for(var cardIndex in this.hand) {
            var newCardDom = this.hand[cardIndex].render();
            $('.hand').append(newCardDom);
        }
    }

    playCard() {
        /* takes in card object from hand? or index of card in hand array 
           remove from hand array and move to used cards
           then execute the card's functions */
    }

    standardProjectSellCards() {

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
            $('.sellSteelButton').disabled = false;
        }
        if (this.inventory.getAmount(2) >= 1 && actions) {
            $('.sellTitaniumButton').disabled = false;
        }
        if (this.inventory.getAmount(3) >= 8 && actions) {
            $('.convertPlantsButton').disabled = false;
        }
        if (this.inventory.getAmount(5) >= 8 && actions) {
            $('.convertHeatButton').disabled = false;
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