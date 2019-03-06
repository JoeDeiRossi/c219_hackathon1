class ResourceTracker {
    
    constructor(type) {
        this.domElement = null;         // the tracker dom element

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
        return this.amount;
    }

    /* change production */
    changeProduction(change) {
        this.production += change;

        /* if resource can be negative */
        if(this.canBeNegative && this.production < -5) {
            this.production = -5;
        }

        return this.production;
    }

    /* returns amount saved */
    getAmount() {
        return this.amount;
    }

    /* returns production level */
    getChange() {
        return this.production;
    }

    /* creates a ResouceTracker and passes it back to a parent PlayerInventory */
    render() {
        this.domElement = $('<div>', {'class': 'trackerContainer'}).append(
            $('<div>', {'class': 'trackerInner'}).append(
                $(`<div>${this.type}</div>`, {'class': 'trackerType'}),
                $('<div>', {'class': 'trackerAmount'}).append(
                    $('<div>Amount</div>', {'class': 'trackerLabel'}),
                    $('<div>0</div>', {'class': 'trackerValue'})
                ),
                $('<div>', {'class': 'trackerProduction'}).append(
                    $('<div>Production</div>', {'class': 'trackerLabel'}),
                    $('<div>1</div>', {'class': 'trackerValue'})
                )
            )
        )
        
        return this.domElement;
    }

    updateValues() {
        // if (this.domElement) {
        //     $(this.domElement)
        // }
    }

}

$(document).ready(initApp);

function initApp() {
    var test = new ResourceTracker('money');
    var testDom = test.render();
    $('body').append(testDom);
}