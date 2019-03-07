$(document).ready( startApp);


function startApp() {
  var tile = new Map(titleInfoArray);
  // $('.tile').on('click', testLocationOfTile);

}


var titleInfoArray = [
  //FIRST ROW
  {rewards: {steel: 2},
  canBeOcean: false,
  },
  {rewards: {steel: 2},
  canBeOcean: true,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {card: 1},
  canBeOcean: true,
  },
  {rewards: {},
  canBeOcean: true,
  },
  //SECOND ROW
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {steel: 1},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {card: 2},
  canBeOcean: true,
  },
  //THIRD ROW
  {rewards: {card: 1},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {steel: 1},
  canBeOcean: false,
  },
  //FOURTH ROW
  {rewards: {greenery: 1, titanium: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: true,
  },
  //FIFTH ROW
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: true,
  },
  {rewards: {greenery: 2},
  canBeOcean: true,
  },
  {rewards: {greenery: 2},
  canBeOcean: true,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  //SIXTH ROW
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 2},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: true,
  },
  {rewards: {greenery: 1},
  canBeOcean: true,
  },
  {rewards: {greenery: 1},
  canBeOcean: true,
  },
  //SEVENTH ROW
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {greenery: 1},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  //8TH ROW
  {rewards: {steel: 2},
  canBeOcean:false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {card: 1},
  canBeOcean: false,
  },
  {rewards: {card: 1},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {titanium: 1},
  canBeOcean: false,
  },
  //9TH ROW
  {rewards: {steel: 1},
  canBeOcean: false,
  },
  {rewards: {steel: 2},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {},
  canBeOcean: false,
  },
  {rewards: {titanium: 2},
  canBeOcean: true,
  },
];


class Board{
  constructor(tileType, player) {
    this.map = new Map(titleInfoArray);
    this.tileType = tileType;
    this.tileOptions = ['ocean', 'greenery', 'city'];
    this.player = player;
  }

  //if ocean, set a click handler to all of the oceans that are true;
  oceanCheck() {
    if(this.titleOptions.indexOf(this.tileType) >= 0 && this.titleOptions === 'ocean') {
      //place event handler on the ocean tiles
    }
  }
}
class Map {
    constructor(hardCodedData) {
        this.newMapTile = null;
        this.spaces = [];  //available tiles
        this.tileNumber = null;



        for (var dataIndex in hardCodedData) {
            this.newMapTile = new MapTile(dataIndex,  hardCodedData[dataIndex].rewards, hardCodedData[dataIndex].canBeOcean);
            this.spaces.push(this.newMapTile)
        }
        console.log(this.spaces)

    }



}


class MapTile {
    constructor(number, rewards, canBeOcean) {
        /* store the dom element associated with this MapTile*/
        this.domElement = null;
        this.tileNumber = number;
        this.available = true;
        this.canBeOcean = null;
        this.rewards = rewards;
        /* if tile is owned, what kind of tile was placed on it? */
        this.typeOfTile = null;
        /* array of MapTile objects that are neighbors */
        this.neighbors = ['???????????'];

        this.handleClick();
        this.testLocationOfTile = this.testLocationOfTile.bind(this);
    }
    getTileNumber() {
        return this.tileNumber;
    }
    isAvailble() {
        return this.available;
    }
    handleClick() {
      $('.tile').on('click', this.testLocationOfTile);
      $('.tile').on('click', markAsUnavailable)
    }

    testLocationOfTile() {
        var numIndex = $(this).attr('id').indexOf('-');
        this.tileNumber = parseInt($(this).attr('id').slice(numIndex+1));

        console.log('tileNumber ' + this.tileNumber + ' was clicked');

    }

    markAsUnavailable

    render() {
        var newDiv = $('<div>', {class: 'mapTile', id: 'tile-' + this.tileNumber});
        this.domElement.click(putClickHandlerFunctionHere);
        return this.domElement;
    }
}



//If clicked space is equal to

//Availability Check
//if someone clicks on a space, mark that as no longer available
  //if not an ocean spot, log who it is taken by
  //if it already wasn't available, tell them to pick another spot


//Ocean Check
  //if an ocean tile is chosen && the class name of the location is ocean:
    //TR ++;

//Greenery tile
  //Must be adjacent to a tile you own, if possible  **Neighbor
  //Mark who the owner is
  //Oxygen level increase
  //If oxygen is able to increase, TR ++
    //else: nothing happens
  //VP ++
  //VP ++ for adjacent city

//City Tile
  //Cannot be placed next to another City
  //if next to a green tile, VP ++ (at end of game)


//Give Rewards
  //if class is greenery, double-greenery, steel, double-steel, titanium, double-titanium, card, double-card,
  //give reward to that player



//If no longer available, who is it taken by?

//Type

//Neighbors
