class ResourceTracker {
    
    constructor(type) {
        this.domElement = null;         // the tracker dom element

        this.amount = 0;                // current amount saved
        this.production = 1;            // current production level
        this.type = type;               // type of resource - money, steel, titanium, plants, energy, or heat

        this.popup = null;
        this.popupDom = null;

        /* money is the only resource whose production can go into the negatives */
        this.canBeNegative = false;
        if (type === 'money') {
            this.canBeNegative = true;
        }
    }

    /* change amount - use for both positive and negative changes */
    changeAmount(change) {
        this.amount += change;

        if(change !== 0) {
            this.popup = new numberPopup(change);
            this.popupDom = this.popup.render();
            this.domElement.prepend(this.popupDom);
            this.popup.rise();
        }

        this.updateValues();
        return this.amount;
    }

    /* change production */
    changeProduction(change) {
        this.production += change;

        /* if resource can be negative */
        if(this.canBeNegative && this.production < -5) {
            this.production = -5;
        } else if(!this.canBeNegative && this.production < 0){
            this.production = 0;
        }

        this.updateValues();
        return this.production;
    }

    /* returns amount saved */
    getAmount() {
        return this.amount;
    }

    /* returns production level */
    getProduction() {
        return this.production;
    }

    /* creates a ResouceTracker and passes it back to a parent PlayerInventory */
    render() {
        var icons = {
            'money': '<i class="fa fa-bitcoin"></i>',
            'steel': '<i class="fa fa-cog"></i>',
            'titanium': '<i class="fa fa-star"></i>',
            'plants': '<i class="fa fa-leaf"></i>',
            'energy': '<i class="fa fa-bolt"></i>',
            'heat': '<i class="fa fa-free-code-camp"></i>'
        };
        this.domElement = $('<div>', {'class': 'trackerContainer'}).append(
            $('<div>', {'class': 'trackerInner'}).append(
                $('<div>', {'class': 'trackerType'}).append(icons[this.type]),
                $('<div>', {'class': 'trackerAmount'}).append(
                    // $('<div>', {'class': 'trackerLabel'}).text('Amount'),
                    $('<div>', {'class': 'trackerValue'}).text(0)
                ),
                $('<div>', {'class': 'trackerProduction'}).append(
                    $('<div>', {'class': 'trackerLabel'}).text('Prod.'),
                    $('<div>', {'class': 'trackerValue'}).text(1)
                )
            )
        );
        
        return this.domElement;
    }

    updateValues() {
        if (this.domElement) {
            $(this.domElement).find('.trackerAmount').find('.trackerValue').text(this.amount);
            $(this.domElement).find('.trackerProduction').find('.trackerValue').text(this.production);
        }
    }

}