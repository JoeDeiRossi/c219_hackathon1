class Inventory {
    constructor() {
        this.TR = 5;
        this.resources = ['money', 'steel', 'titanium', 'plants', 'energy', 'heat'];
        this.domElement = null;
        this.resourceTrackers = {};
    }

    render() {
        this.domElement = $('<div>', {'class': 'inventory'});
        var inventoryInner = $('<div>', {'class': 'inventoryInner'});

        for (var resourceIndex = 0; resourceIndex < this.resources.length; resourceIndex++) {
            var tracker = new ResourceTracker(this.resources[resourceIndex]);
            this.resourceTrackers[this.resources[resourceIndex]] = tracker;
            var trackerDomElement = tracker.render();
            inventoryInner.append(trackerDomElement);
        }

        this.domElement.append(inventoryInner);
        return this.domElement;
    }

    changeTR(amountToChange){ //can you have negative TR?, made a check just in case
        if(this.TR >= 0){
            this.TR += amountToChange;
        } else {
            this.TR = 0;
        }
        //return? just need to update TR values on DOM
    }
}
