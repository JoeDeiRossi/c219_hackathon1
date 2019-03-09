var titleInfoArray = [
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
    constructor(tileInfoArray, rewardCallback, askIfPlaceTileCallback) {
        this.data = tileInfoArray;
        this.rewardCallback = rewardCallback;
        this.askIfPlaceTileCallback = askIfPlaceTileCallback;
        /* Map object has an array of MapTile objects */
        this.mapTiles = [];
        this.mapRowLengths = [5, 6, 7, 8, 9, 8, 7, 6, 5];
        this.domElement = null;
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
    //   this.neighbors = ['???????????'];
    }
    clickHandler() {
        /* handle click by calling the function we got as a param and pass in THIS MapTile */
    //   this.callback(this);
        this.testForAvailability();
        this.testForOcean();
        this.removeRewardsFromMap();
        if(this.askIfPlaceTileCallback()) {
          this.rewardCallback(this, this.rewards);
      }
    }
    testForAvailability() {
        if(this.available === true) {
            console.log('your tile was placed');
            this.domElement.css('background-color', 'grey');
        } else {
            alert('Please choose another tile.')
        }
        this.available = false;
    }
    testForOcean() {
      if(this.canBeOcean === true && $('.statusOceanTiles .statusValue').text() > 0) {
        this.domElement.css('background-color', 'blue');
        var newValue = parseInt($('.statusOceanTiles .statusValue').text() - 1);
        $('.statusOceanTiles .statusValue').text(newValue)
        console.log('ocean was clicked');
      }
      this.canBeOcean = false;
    }
    showRewards() {
      if(this.rewards.greenery === 1) {
        // this.domElement.text('p')
        this.domElement.append('<i class="fa fa-leaf"></i>')
      }
      if(this.rewards.greenery === 2) {
        // this.domElement.text('pp')
        this.domElement.append('<i class="fa fa-leaf"></i>')
        this.domElement.append('<i class="fa fa-leaf"></i>')

      }
      if(this.rewards.steel === 1) {
        // this.domElement.text('s')
        this.domElement.append('<i class="fa fa-cog">');
      }
      if(this.rewards.steel === 2) {
        this.domElement.append('<i class="fa fa-cog">');
        this.domElement.append('<i class="fa fa-cog">');
      }
      if(this.rewards.titanium === 1) {
        this.domElement.append('t')
      }
      if(this.rewards.titanium === 2) {
        this.domElement.text('tt')
      }
      if(this.rewards.card === 1) {
        // this.domElement.text('c')
        this.domElement.append('<i class="fa fa-credit-card">');
      }
      if(this.rewards.card === 2) {
        this.domElement.append('<i class="fa fa-credit-card">');
        this.domElement.append('<i class="fa fa-credit-card">');
      }
    }
    removeRewardsFromMap() {
        this.domElement.text('')
    }
    render() {
        /* make a div for this MapTile and store it */
        this.domElement = $('<div>', {'class': 'tile'});
        if(this.canBeOcean === true) {
          this.domElement.css('background-color', 'dodgerblue');
        }
        this.showRewards()
        /* add a click handler to the div */
        this.domElement.click(this.clickHandler);
        /* return the div */
        return this.domElement;
    }
}
