class Board {
    constructor(tileInfoArray, mapTileClickHandler, rewardCallback) {

        this.domElement = $('.board');
        this.map = new Map(tileInfoArray, mapTileClickHandler, rewardCallback);
        this.oxygen = {min: 0, max: 14, current: 0};
        this.temperature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;
        this.domElement.append(this.map.render());
    }

    /* probably should have more methods */

    addOxygen(amountToAdd){
        if(this.oxygen.current === this.oxygen.max){
            return;
        } else {
            this.oxygen.current += amountToAdd;
        }
        $("statusOxygen > statusValue").text(this.oxygen.current);
        return this.oxygen; //need to update values on DOM
    }

    addTemperature(amountToAdd){
        if(this.temperature.current === this.temperature.max){
            return;
        } else {
            this.temperature.current += amountToAdd;
        }
        $("statusTemp > statusValue").text(this.temperature.current);
        return this.temperature; //need to update values to DOM
    }

    decreaseOceanTiles() {
        if(this.oceanTiles === 0){
            return;
        } else {
            this.oceanTiles--;
        }
      return this.oceanTiles
    }

    checkEndOfGame() {
        if(this.oxygen.current === this.oxygen.max
            && this.temperature.current === this.temperature.max
            && this.oceanTiles === 0){
            //= end of Game
        }
    }
}
