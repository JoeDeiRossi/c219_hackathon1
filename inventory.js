
class Inventory {
    constructor() {
        this.TR = 5; //starting value=5 instead of 20
        this.resources = ['money', 'steel', 'titanium', 'plants', 'energy', 'heat'];
        this.inventoryDomElement = null; //stores DOM element created by render method
        this.resourceTrackers = [];
    }

    createTrackers() {
        for (var resourceIndex = 0; resourceIndex < this.resources.length; resourceIndex++) {
            var tracker = new ResourceTracker(this.resources[resourceIndex]);
            this.resourceTrackers.push(tracker);
            var trackerDomElement = tracker.render();
            this.inventoryDomElement.append(trackerDomElement);
        }
    }

    render() { //move to game object
        this.inventoryDomElement = $('<div>').addClass('inventory');
        $('.players-display').append(this.inventoryDomElement);
        this.createTrackers();
    }

    getAmount(resource) { //takes in a number; ex: 0 for money, 1 for steel.... 5 for heat
        return this.resourceTrackers[resource].getAmount();
    }

    changeAmount(resource, amountToChange) {
        return this.resourceTrackers[resource].changeAmount(amountToChange);
    }

    getProduction(resource) {
        return this.resourceTrackers[resource].getProduction();
    }

    changeProduction(resource, amountToChange) {
        return this.resourceTrackers[resource].changeProduction(amountToChange);
    }

    //Everything below is being moved to the player object

    // checkResources() { //move to player object
    //     //runs when 'Conversions' button (person object) is clicked
    //     //convert buttons are greyed out by default, aka .disabled=true
    //     if (getAmount(1) >= 1 && actionsAvailable) {
    //         $('.sellSteelButton').disabled = false;
    //     }
    //     if (getAmount(2) >= 1 && actionsAvailable) {
    //         $('.sellTitaniumButton').disabled = false;
    //     }
    //     if (getAmount(3) >= 8 && actionsAvailable) {
    //         $('.convertPlantsButton').disabled = false;
    //     }
    //     if (getAmount(5) >= 8 && actionsAvailable) {
    //         $('.convertHeatButton').disabled = false;
    //     }
    // }

    // sellSteel() { //move to player object
    //     //runs when .sellSteelButton is clicked
    //     var numberToSell; //get number to sell from user input
    //     if (numberToSell <= getAmount(1)) {
    //         this.resourceTrackers[1].amount -= numberToSell;
    //         this.resourceTrackers[0].amount += 2*numberToSell;
    //         actionsAvailable--;
    //     }
    // }

    // sellTitanium() { //move to player object
    //     //runs when .sellTitaniumButton is clicked
    //     var numberToSell; //get number to sell from user input
    //     if (numberToSell <= getAmount(2)) {
    //         this.resourceTrackers[2].amount -= numberToSell;
    //         this.resourceTrackers[0].amount += 3*numberToSell;
    //         actionsAvailable--;
    //     }
    // }

    // convertPlants() { //move to player object
    //     //runs when .convertPlantsButton is clicked
    //     this.resourceTrackers[3].amount -= 8;
    //     this.TR++;
    //     actionsAvailable--;
    //     //also needs to give player a greenery tile and allow them to place it on any open space
    //     //also needs to increase oxygen by one step
    // }

    // convertHeat() { //move to player object
    //     //runs when .convertHeatButton is clicked
    //     this.resourceTrackers[5].amount -= 8;
    //     this.TR++;
    //     actionsAvailable--;
    //     //also needs to increase temp by one step
    // }
}