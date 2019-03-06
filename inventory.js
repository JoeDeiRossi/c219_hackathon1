
class Inventory {
    constructor() {
        this.player; //assign each inventory object to a player
        this.TR = 5; //starting value=5 instead of 20
        this.domElement; //stores DOM element created by render method
        //The following will have buttons, greyed out if unavailable (false) and clickable if available (true)
        this.canSellSteel = false; //changes to true if steel amount >= 1 (and actions are available)
        this.canSellTitanium = false; //changes to true if titanium amount >= 1 (and actions are available)
        this.canConvertPlants = false; //changes to true if plant amount >= 8 (and actions are available)
        this.canConvertHeat = false; //changes to true if heat amount >= 8 (and actions are available)
    }
    createTrackers() {
        //create 6 tracker objects, one for each resource
        //append them to the rendered inventory DOM element
    }
    render() {
        //creates a DOM element to hold the current object
        //returns it as this.domElement
        //must be called before createTrackers, so trackers have somewhere to go
    }
    sellSteel(amount) {
        //takes in an amount of steel to be sold and removes from the steel tracker bank (not production)
        //multiplies amount x2 and adds that much money to bank
        //counts as one action
    }
    sellTitanium(amount) {
        //takes in an amount of titanium to be sold and removes from the titanium tracker bank
        //multiplies amount x3 and adds that much money to bank
        //counts as one action
    }
    convertPlants() {
        //removes 8 plants from plant bank
        //gives player a greenery tile and allows them to place it on any open space
        //increases oxygen by one step
        //increases player's TR by 1
    }
    convertHeat() {
        //removes 8 heat from heat bank
        //increases temp by one step
        //increases player's TR by 1
    }
}