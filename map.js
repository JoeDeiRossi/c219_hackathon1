var tileInfoArray = [
    {rewards: {steel: 2}, canBeOcean: false},                       //FIRST ROW
    {rewards: {steel: 2}, canBeOcean: true},
    {rewards: {}, canBeOcean: false},
    {rewards: {card: 1}, canBeOcean: true},
    {rewards: {}, canBeOcean: true},
    {rewards: {}, canBeOcean: false},                               //SECOND ROW
    {rewards: {steel: 1}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {card: 2}, canBeOcean: true},
    {rewards: {card: 1}, canBeOcean: false},                        //THIRD ROW
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {steel: 1}, canBeOcean: false},
    {rewards: {greenery: 1, titanium: 1}, canBeOcean: false},       //FOURTH ROW
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: true},
    {rewards: {greenery: 2}, canBeOcean: false},                    //FIFTH ROW
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: true},
    {rewards: {greenery: 2}, canBeOcean: true},
    {rewards: {greenery: 2}, canBeOcean: true},
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},                    //SIXTH ROW
    {rewards: {greenery: 2}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: true},
    {rewards: {greenery: 1}, canBeOcean: true},
    {rewards: {greenery: 1}, canBeOcean: true},
    {rewards: {}, canBeOcean: false},                               //SEVENTH ROW
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {greenery: 1}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {steel: 2}, canBeOcean: false},                       //8TH ROW
    {rewards: {}, canBeOcean: false},
    {rewards: {card: 1}, canBeOcean: false},
    {rewards: {card: 1}, canBeOcean: false},
    {rewards: {}, canBeOcean: false},
    {rewards: {titanium: 1}, canBeOcean: false},
    {rewards: {steel: 1}, canBeOcean: false,},                      //9TH ROW
    {rewards: {steel: 2}, canBeOcean: false,},
    {rewards: {}, canBeOcean: false,},
    {rewards: {}, canBeOcean: false,},
    {rewards: {titanium: 2}, canBeOcean: true}
  ];
class Map {
    constructor(rewardCallback, askIfPlaceTileCallback) {
        this.data = tileInfoArray;
        this.rewardCallback = rewardCallback;
        this.askIfPlaceTileCallback = askIfPlaceTileCallback;
        /* Map object has an array of MapTile objects */
        this.mapTiles = [];
        this.mapRowLengths = [5, 6, 7, 8, 9, 8, 7, 6, 5];
        this.domElement = null;

    }

    findTileCategory(type){
        //to find city and greenery = ocean: false
        //ocean = ocean: true
        //activate click upon match
        if(type === 'ocean'){
            for(var index = 0; index < this.mapTiles.length; index++){
                if(this.mapTiles[index].canBeOcean === true && this.mapTiles[index].available === true){
                    this.mapTiles[index].domElement.on('click', this.mapTiles[index].clickHandler);
                    this.mapTiles[index].domElement.addClass('glow-active');
                    //this.mapTiles[index].domElement.removeClass('tile-inactive');
                    this.mapTiles[index].domElement.addClass('oceanTile-active');
                }
            }
        } else if(type === 'greenery'){
            for(var index = 0; index < this.mapTiles.length; index++){
                if(this.mapTiles[index].canBeOcean === false && this.mapTiles[index].rewards.hasOwnProperty('greenery') && this.mapTiles[index].available === true){
                    this.mapTiles[index].domElement.on('click', this.mapTiles[index].clickHandler);
                    this.mapTiles[index].domElement.addClass('glow-active');
                    this.mapTiles[index].domElement.addClass('greeneryTile-active');
                }
            }
        } else if(type === 'city'){
            for(var index = 0; index < this.mapTiles.length; index++){
                if(this.mapTiles[index].canBeOcean === false && !this.mapTiles[index].rewards.hasOwnProperty('greenery') && this.mapTiles[index].available === true){
                    this.mapTiles[index].domElement.on('click', this.mapTiles[index].clickHandler);
                    this.mapTiles[index].domElement.addClass('glow-active');
                    this.mapTiles[index].domElement.addClass('cityTile-active');
                }
            }
        }
    }
    removeClicks(){
        for(var index = 0; index < this.mapTiles.length; index++){
            this.mapTiles[index].domElement.find('.glow-active').off('click');
            this.mapTiles[index].domElement.removeClass('glow-active');
            this.mapTiles[index].domElement.removeClass('oceanTile-active');
            this.mapTiles[index].domElement.removeClass('greeneryTile-active');
            this.mapTiles[index].domElement.removeClass('cityTile-active');
        }
    }

    render() {
        /* outer flex container for the Map */
        this.domElement = $('<div>', {'class': 'flex-container'});
        var tileNumber = 0;
        /* for each row in the Map */
        for (var rowIndex in this.mapRowLengths) {
            /* make a row div */
            var newRow = $('<div>', {'class': 'row'});
            /* then make enough row divs for each row */
            for (var tileIndex = 0; tileIndex < this.mapRowLengths[rowIndex]; tileIndex++) {
                /* make a new MapTile and add it to this Map's tile storage array */
                var newMapTile = new MapTile(
                    tileNumber,
                    this.data[tileNumber].rewards,
                    this.data[tileNumber].canBeOcean,
                    this.rewardCallback,
                    this.askIfPlaceTileCallback
                    );
                this.mapTiles.push(newMapTile);
                /* calling the new MapTile's render returns a div element - append to current row */
                var newMapTileRender = newMapTile.render();
                newRow.append(newMapTileRender);
                tileNumber++;
            }
            /* once all MapTiles are added to a row, append that row to the flex container */
            this.domElement.append(newRow);
        }
        return this.domElement;
    }
}
class MapTile {
    constructor(number, rewards, canBeOcean, rewardCallback, askIfPlaceTileCallback) {
        /* store the dom element associated with this MapTile*/
        this.domElement = null;
        /* callback function that is passed down from Map (or Game, really) */
        this.rewardCallback = rewardCallback;
        this.askIfPlaceTileCallback = askIfPlaceTileCallback;
        /* this MapTile's number */
        this.tileNumber = number;
        this.canBeOcean = canBeOcean;
        /* available goes to false once someone owns the tile */
        this.available = true;
        this.owner = null;
        /* if tile is owned, what kind of tile was placed on it? */
        this.typeOfTile = null;
        /* an object with this MapTile's rewards */
        this.rewards = rewards;
        this.clickHandler = this.clickHandler.bind(this);
        /* array of MapTile objects that are neighbors */

    }

    clickHandler() {
        /* handle click by calling the function we got as a param and pass in THIS MapTile */
    //   this.callback(this);
        if(this.askIfPlaceTileCallback()) {
            this.available = false;
            this.updateTakenAndOcean();
            this.removeRewardsFromMap();
            this.rewardCallback(this);
        }
    }

    updateTakenAndOcean() {
      if(this.canBeOcean === true && $('.statusOceanTiles .statusValue').text() > 0) {
        this.domElement.css('background-color', 'blue');
        var newValue = parseInt($('.statusOceanTiles .statusValue').text()) - 1;
        $('.statusOceanTiles .statusValue').text(newValue);
      } else if(this.canBeOcean === false && this.rewards.hasOwnProperty('greenery')) {
          this.domElement.css('background-color', 'green');
      } else if(this.canBeOcean === false) {
          this.domElement.css('background-color', 'grey');
      }
    }
    showRewards() {
      if(this.rewards.greenery === 1) {
        this.domElement.append('<i class="fa fa-leaf"></i>');
      }
      if(this.rewards.greenery === 2) {
        this.domElement.append('<i class="fa fa-leaf"></i>');
        this.domElement.append('<i class="fa fa-leaf"></i>');

      }
      if(this.rewards.steel === 1) {
        this.domElement.append('<i class="fa fa-cog"></i>');
      }
      if(this.rewards.steel === 2) {
        this.domElement.append('<i class="fa fa-cog"></i>');
        this.domElement.append('<i class="fa fa-cog"></i>');
      }
      if(this.rewards.titanium === 1) {

        this.domElement.append('<i class="fa fa-star"></i>');
      }
      if(this.rewards.titanium === 2) {
          this.domElement.append('<i class="fa fa-star"></i>');
          this.domElement.append('<i class="fa fa-star"></i>');
      }
      if(this.rewards.card === 1) {
        this.domElement.append('<i class="fa fa-credit-card"></i>');
      }
      if(this.rewards.card === 2) {
        this.domElement.append('<i class="fa fa-credit-card"></i>');
        this.domElement.append('<i class="fa fa-credit-card"></i>');
      }
    }
    removeRewardsFromMap() {
        this.domElement.text('')
    }


    render() {
        /* make a div for this MapTile and store it */
        this.domElement = $('<div>', {'class': 'tile tile-inactive'});
        if(this.canBeOcean === true) {
          this.domElement.css('background-color', 'dodgerblue');
        }
        this.showRewards();
        /* add a click handler to the div */
        //this.domElement.click(this.clickHandler);
        /* return the div */
        return this.domElement;
    }
}
