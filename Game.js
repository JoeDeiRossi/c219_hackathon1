$(document).ready(testFunction);

class Game {
    constructor(players, cardArray, mapTileInfoArray) {
      
        this.playCard = this.playCard.bind(this);
        this.rewardCallback = this.rewardCallback.bind(this);
        this.board = new Board(titleInfoArray, this.actionPhase, this.rewardCallback);
        this.deck = new Deck(this.playCard);
        this.players = [];

        this.currentPlayer = null;
        this.firstTurn = true;
        this.roundEnd = false;
        this.gameOver = false;

        for (var index = 0; index < players; index++) {
            var newPlayer = new Player(index);
            this.players.push(newPlayer);

            $('.playerInfoArea').append(newPlayer.render());

        }

        this.turnCount = 0;
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];

        this.startGame();
    }

    startGame() {
        /* starting hand */
        console.log('starting game')

        for (var index in this.players) {
            this.dealCards(this.players[index], 2);
        }

        this.startRound();
    }

    startRound() {
        /* all players get two cards per turn */
        for (var index in this.players) {
            this.dealCards(this.players[index], 2);
        }

        /* buy phase? */
    }

    dealCards(player, number, update=true) {
        var newCards = this.deck.drawCards(number);
        for(var cardIndex in newCards) {
            player.hand.push(newCards[cardIndex])
        }
            player.updateHand();
    }

    changePlayers() {
        /* change the current player to the next in players array */
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        this.currentPlayer = this.players[currentPlayerIndex];

        /* increment the turn counter by 1 - if everyone has had a turn, end the round */
        this.turnCount++;
        if(this.turnCount >= this.players.length) {
            this.turnCount = 0;
            this.roundEnd();
        }
    }

    /* sets up the buttons and play area for the current player, call after changing player turns */
    actionPhase() {
        console.log('test');
    }
        

        /* show buttons or hand? give the player their options */
        /* then change players - call changePlayers at the end of each action */

    rewardCallback(reward) {
        console.log('test');
    }

    /* connects Card click handler and Player class */
    playCard(card) {
        this.currentPlayer.playCard(card);
    }

    mapTileCallback(reward) {
        /* add rewards to current player */
    }

}

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

  var cardArray = [
    //production cards
    {'name': 'Giant Space Mirror', 'cost': 17, 'action': {'production': {'energy': 3}}},
    {'name': 'Geothermal Power', 'cost': 11, 'action': {'production': {'energy': 2}}},
    {'name': 'Strip Mine', 'cost': 25, 'action': {'production': {'steel': 2, 'titanium': 1, 'energy': -2}, 'status': {'oxygen': 2}}},
    {'name': 'Deep Well Heating', 'cost': 13, 'action': {'production': {'energy': 1}, 'status': {'temperature': 1}}},
    {'name': 'Peroxide Power', 'cost': 7, 'action': {'production': {'money': -1, 'energy': 2}}},
    {'name': 'Rad-Chem Factory', 'cost': 8, 'action': {'production': {'energy': -1}, 'tr': 2}},
    {'name': 'Power Plant', 'cost': 4, 'action': {'production': {'energy': 1}}},
    {'name': 'Adapted Lichen', 'cost': 9, 'action': {'production': {'plant': 1}}},
    {'name': 'Carbonate Processing', 'cost': 6, 'action': {'production': {'energy': -1, 'heat': 3}}},
    {'name': 'Micro-Mills', 'cost': 3, 'action': {'production': {'heat': 1}}},
    {'name': 'Magnetic Field Dome', 'cost': 5, 'action': {'production': {'plant': 1, 'energy': -2}, 'tr': 1}},
    {'name': 'Import of Advanced GHG', 'cost': 9, 'action': {'production': {'heat': 2}}},
    {'name': 'Nuclear Power', 'cost': 10, 'action': {'production': {'money': -2, 'energy': 3}}},
    {'name': 'Soletta', 'cost': 35, 'action': {'production': {'heat': 7}}},
    {'name': 'Magnetic Field Generators', 'cost': 20, 'action': {'production': {'plant': 2, 'energy': -4}, 'tr': 3}},
    {'name': 'Fueled Generators', 'cost': 1, 'action': {'production': {'money': -1, 'energy': 1}}},
    {'name': 'GHG Factories', 'cost': 11, 'action': {'production': {'energy': -1, 'heat': 4}}},
    {'name': 'Lunar Beam', 'cost': 13, 'action': {'production': {'money': -2, 'energy': 2, 'heat': 2}}},
    {'name': 'Industrial Microbes', 'cost': 12, 'action': {'production': {'steel': 1, 'energy': 1}}},
    {'name': 'Food Factory', 'cost': 12, 'action': {'production': {'money': 4, 'plant': -1}}}, //tr: 1 at the end of game
    {'name': 'Solar Power', 'cost': 11, 'action': {'production': {'energy': 1}}}, //tr: 1 at the end of game
    //bank cards
    {'name': 'Release of Inert Gas', 'cost': 14, 'action': {'tr': 2}},
    {'name': 'Imported GHG', 'cost': 7, 'action': {'bank': {'heat': 3}, 'production': {'heat': 1}}},
    {'name': 'Solar Wind Power', 'cost': 11, 'action': {'bank': {'titanium': 2}, 'production':{'energy': 2}}},
    //tile cards
    {'name': 'Black Polar Dust', 'cost': 15, 'action': {'production': {'money': -2, 'heat': 3}, 'tile': {'ocean': 1}}},
    {'name': 'Noctis City', 'cost': 18, 'action': {'production': {'money': 3, 'energy': -1}, 'tile': {'city': 'Noctis City'}}},
    {'name': 'Underground City', 'cost': 18, 'action': {'production': {'steel': 2, 'energy': -2}, 'tile': {'city': 1}}},
    {'name': 'Towing a Comet', 'cost': 23, 'action': {'bank': {'plant': 2}, 'status': {'oxygen': 1}, 'tile': {'ocean': 1}}},
    {'name': 'Subterranean Reservoir', 'cost': 11, 'action': {'tile': {'ocean': 1}}},
    {'name': 'Convoy from Europa', 'cost': 15, 'action': {'tile': {'ocean': 1}, 'drawActionCard': 1}},
    {'name': 'Steel Mining Rights', 'cost': 9, 'action': {'tile': {'steel': 1}}},
    {'name': 'Titanium Mining Rights', 'cost': 9, 'action': {'tile': {'titanium': 1}}},
    {'name': 'Ice Asteroid', 'cost': 23, 'action': {'tile': {'ocean': 2}}},
    {'name': 'Nuclear Zone', 'cost': 10, 'action': {'status': {'temperature': 2}, 'tile': {'any': 1}}}, //tr: -2 at the end of game
];

var test;

function testFunction() {
    function tester() {
        console.log('test');
    }
    
    test = new Game(1, cardArray, titleInfoArray);
}

