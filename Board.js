class Board {
    constructor(tileInfoArray, rewardCallback, askIfPlaceTileCallback) {


        this.addTileCheck = true;
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
