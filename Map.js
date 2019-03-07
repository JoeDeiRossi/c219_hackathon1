class Map {
    constructor(tileInfoArray, mapTileClickHandler, rewardCallback) {

        this.data = tileInfoArray;
        this.mapTileCallback = mapTileClickHandler;
        this.rewardCallback = rewardCallback;
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
                    this.mapTileCallback
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
    constructor(number, rewards, canBeOcean, callback, rewardCallback) {

        /* store the dom element associated with this MapTile*/
        this.domElement = null;

        /* callback function that is passed down from Map (or Game, really) */
        this.callback = callback;

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

        this.rewardCallback = rewardCallback;
        this.clickHandler = this.clickHandler.bind(this);

        /* array of MapTile objects that are neighbors */
    //   this.neighbors = ['???????????'];
    }

    clickHandler() {
        /* handle click by calling the function we got as a param and pass in THIS MapTile */
      this.callback(this);
      this.testForOcean();
      this.testForAvailability();
      this.rewardCallback(this.rewards);
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

    testForAvailability() {
      if(this.available === true) {
        console.log('your tile was placed');
        
      } else {
        console.log('choose another tile')
      }
      this.available = false;
    }


    render() {
        /* make a div for this MapTile and store it */
        this.domElement = $('<div>', {'class': 'tile'});
        if(this.canBeOcean === true) {
          this.domElement.css('background-color', 'dodgerblue');
        }

        /* add a click handler to the div */

      this.domElement.click(this.clickHandler);

        /* return the div */
        return this.domElement;
    }
}
