class Board {
    constructor(tileInfoArray, mapTileClickHandler) {
        this.domElement = $('.board');
        this.map = new Map(tileInfoArray, mapTileClickHandler);
        this.oxygen = {min: 0, max: 14, current: 0};
        this.tempurature = {min: -30, max: 8, current: -30};
        this.oceanTiles = 9;
        this.turnNumber = 1;
        this.domElement.append(this.map.render());
    }

    /* probably should have more methods */
}