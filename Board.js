class Board {
    constructor(tileInfoArray, mapTileClickHandler, rewardCallback) {

        this.domElement = $('.board');
        this.map = new Map(tileInfoArray, mapTileClickHandler, rewardCallback);
        this.domElement.append(this.map.render());
    }

    /* probably should have more methods */

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
