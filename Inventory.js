class Inventory {
    constructor() {
        this.TR = 5;
        this.resources = ['money', 'steel', 'titanium', 'plants', 'energy', 'heat'];
        this.domElement = null;
        this.resourceTrackers = []
    }

    render() {
        this.domElement = $('<div>', {'class': 'inventory'});
        var inventoryInner = $('<div>', {'class': 'inventoryInner'});

        for (var resourceIndex = 0; resourceIndex < this.resources.length; resourceIndex++) {
            var tracker = new ResourceTracker(this.resources[resourceIndex], this);
            this.resourceTrackers.push(tracker);
            var trackerDomElement = tracker.render();
            inventoryInner.append(trackerDomElement);
        }

        this.domElement.append(inventoryInner);
        return this.domElement;
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
}