class ResourceTracker {
    
    constructor(type) {
        this.amount = 0;                // current amount saved
        this.production = 1;            // current production level
        this.type = type;               // type of resource - money, steel, titanium, plants, energy, or heat

        /* money is the only resource whose production can go into the negatives */
        this.canBeNegative = false;
        if (type === 'money') {
            this.canBeNegative = true;
        }
    }

    /* change amount - use for both positive and negative changes */
    changeAmount(change) {
        this.amount += change;
    }

    /* change production - accounts for money's -5 lower limit */
    changeProduction(change) {
        this.production += change;
        if(this.canBeNegative && this.production < -5) {
            this.production = -5;
        }
    }

    getAmount() {
        return this.amount;
    }

    getChange() {
        return this.production;
    }


}