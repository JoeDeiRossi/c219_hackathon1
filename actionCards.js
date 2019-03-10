var cardDeck = [
    //production cards
    {'name': 'Giant Space Mirror', 'cost': 17, 'action': {'production': {'energy': 3}}},
    {'name': 'Geothermal Power', 'cost': 11, 'action': {'production': {'energy': 2}}},
    {'name': 'Strip Mine', 'cost': 25, 'action': {'production': {'energy': -2, 'steel': 2, 'titanium': 1}, 'status': {'oxygen': 2}}},
    {'name': 'Deep Well Heating', 'cost': 13, 'action': {'production': {'energy': 1}, 'status': {'temperature': 1}}},
    {'name': 'Peroxide Power', 'cost': 7, 'action': {'production': {'money': -1, 'energy': 2}}},
    {'name': 'Rad-Chem Factory', 'cost': 8, 'action': {'production': {'energy': -1}, 'tr': 2}},
    {'name': 'Power plants', 'cost': 4, 'action': {'production': {'energy': 1}}},
    {'name': 'Adapted Lichen', 'cost': 9, 'action': {'production': {'plants': 1}}},
    {'name': 'Carbonate Processing', 'cost': 6, 'action': {'production': {'energy': -1, 'heat': 3}}},
    {'name': 'Micro-Mills', 'cost': 3, 'action': {'production': {'heat': 1}}},
    {'name': 'Magnetic Field Dome', 'cost': 5, 'action': {'production': {'energy': -2, 'plants': 1}, 'tr': 1}},
    {'name': 'Import of Advanced GHG', 'cost': 9, 'action': {'production': {'heat': 2}}},
    {'name': 'Nuclear Power', 'cost': 10, 'action': {'production': {'money': -2, 'energy': 3}}},
    {'name': 'Soletta', 'cost': 35, 'action': {'production': {'heat': 7}}},
    {'name': 'Magnetic Field Generators', 'cost': 20, 'action': {'production': {'energy': -4, 'plants': 2}, 'tr': 3}},
    {'name': 'Fueled Generators', 'cost': 1, 'action': {'production': {'money': -1, 'energy': 1}}},
    {'name': 'GHG Factories', 'cost': 11, 'action': {'production': {'energy': -1, 'heat': 4}}},
    {'name': 'Lunar Beam', 'cost': 13, 'action': {'production': {'money': -2, 'energy': 2, 'heat': 2}}},
    {'name': 'Industrial Microbes', 'cost': 12, 'action': {'production': {'steel': 1, 'energy': 1}}},
    {'name': 'Food Factory', 'cost': 12, 'action': {'production': {'plants': -1, 'money': 4}}}, //tr: 1 at the end of game
    {'name': 'Solar Power', 'cost': 11, 'action': {'production': {'energy': 1}}}, //tr: 1 at the end of game
    //bank cards
    {'name': 'Release of Inert Gas', 'cost': 14, 'action': {'tr': 2}},
    {'name': 'Imported GHG', 'cost': 7, 'action': {'production': {'heat': 1}, 'bank': {'heat': 3}}},
    {'name': 'Solar Wind Power', 'cost': 11, 'action': {'production':{'energy': 2}, 'bank': {'titanium': 2}}},
    //tile cards
    {'name': 'Black Polar Dust', 'cost': 15, 'action': {'production': {'money': -2, 'heat': 3}, 'tile': {'ocean': 1}}},
    {'name': 'Noctis City', 'cost': 18, 'action': {'production': {'energy': -1, 'money': 3}, 'tile': {'city': 1}}},
    {'name': 'Underground City', 'cost': 18, 'action': {'production': {'energy': -2, 'steel': 2}, 'tile': {'city': 1}}},
    {'name': 'Towing a Comet', 'cost': 23, 'action': {'bank': {'plants': 2}, 'status': {'oxygen': 1}, 'tile': {'ocean': 1}}},
    {'name': 'Subterranean Reservoir', 'cost': 11, 'action': {'tile': {'ocean': 1}}},
    {'name': 'Convoy from Europa', 'cost': 15, 'action': {'tile': {'ocean': 1}, 'drawActionCard': 1}},
    {'name': 'Steel Mining Rights', 'cost': 9, 'action': {'tile': {'city': 1}}},
    {'name': 'Titanium Mining Rights', 'cost': 9, 'action': {'tile': {'city': 1}}},
    {'name': 'Ice Asteroid', 'cost': 23, 'action': {'tile': {'ocean': 1}}},
    {'name': 'Nuclear Zone', 'cost': 10, 'action': {'status': {'temperature': 2}, 'tile': {'city': 1}}}, //tr: -2 at the end of game
];

class Deck {
    constructor(cardCallBack){
        this.cards = [];
        for (var cardIndex = 0; cardIndex < cardDeck.length; cardIndex++) {
            var newCard = new Card(cardDeck[cardIndex], cardCallBack);
            this.cards.push(newCard);
        }
    }
    drawCards(numberOfCards){
        var cardArray = [];
        for(var repeat = 0; repeat < numberOfCards; repeat++){
            var randomIndex = Math.floor(Math.random() * (this.cards.length - 1));
            cardArray.push(this.cards[randomIndex]);
        }
        return cardArray;
    }
}

class Card {
    constructor(infoObject, clickCallBack) {
        this.domElement = {
            getPlayerStats: clickCallBack.getCurrentPlayerStats,
            changeWorldStats: clickCallBack.changeWorldStats,
            changePlayerStats: clickCallBack.changeCurrentPlayerStats,
            playCard: clickCallBack.playCard,
            addTile: clickCallBack.addTile,
        };
        this.name = infoObject['name'];
        this.cost = infoObject['cost'];
        this.actionInfo = infoObject['action'];
        this.owner = null;
        this.clickCallBack = clickCallBack; //an object of functions


        this.handleClick = this.handleClick.bind(this);
        this.playAction = this.playAction.bind(this);
    }
    changeOwner(newOwner){
        this.owner = newOwner;
    }
    checkValidAction(){
        if (this.clickCallBack.getPlayerStats('money', 'bank') >= this.cost) {
            for (var index in this.actionInfo) {
                if(index === 'production') {
                    var productionAmountArray = [];
                    for (var production in this.actionInfo[index]) {
                        productionAmountArray.push(production);
                        productionAmountArray.push(this.actionInfo[index][production]);
                    }
                    for (var productionChangeIndex = 0; productionChangeIndex < productionAmountArray.length; productionChangeIndex += 2) {
                        if (this.clickCallBack.getPlayerStats(productionAmountArray[productionChangeIndex], 'production') + productionAmountArray[productionChangeIndex + 1] < 0) {
                            return false;
                        }
                    }
                }
            }
            return true; //pass money and production checks
        } else {
            return false;
        }
    }
    playAction() {
        if (this.clickCallBack.getPlayerStats('money', 'bank') >= this.cost) {
            this.clickCallBack.changePlayerStats('money', (this.cost * -1), 'bank');
            for (var index in this.actionInfo) {
                switch (index) {
                    case 'bank': //pass bank objects to player's bank
                        console.log('add to resources');
                        var bankAmountArray = [];
                        for (var bank in this.actionInfo[index]) {
                            bankAmountArray.push(bank);
                            bankAmountArray.push(this.actionInfo[index][bank]);
                        }
                        for (var bankChangeIndex = 0; bankChangeIndex < bankAmountArray.length; bankChangeIndex += 2) { //submit array to PLAYER's inventory BANK //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                             this.clickCallBack.changePlayerStats(bankAmountArray[bankChangeIndex], bankAmountArray[bankChangeIndex + 1], 'bank');
                        }
                        break;
                    case 'production': //pass production objects to player's production
                        console.log('add to production');
                        var productionAmountArray = [];
                        for (var production in this.actionInfo[index]) {
                            productionAmountArray.push(production);
                            productionAmountArray.push(this.actionInfo[index][production]);
                        }
                        for (var productionChangeIndex = 0; productionChangeIndex < productionAmountArray.length; productionChangeIndex += 2) {//submit array to PLAYER's inventory PRODUCTION //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                            this.clickCallBack.changePlayerStats(productionAmountArray[productionChangeIndex], productionAmountArray[productionChangeIndex + 1], 'production');
                        }
                        break;
                    case 'status': //pass status objects to status
                        var statusAmountArray = [];
                        for (var status in this.actionInfo[index]) {
                            statusAmountArray.push(status);
                            statusAmountArray.push(this.actionInfo[index][status]);
                        }
                        for (var statusChangeIndex = 0; statusChangeIndex < statusAmountArray.length; statusChangeIndex += 2) {//submit array to BOARD's STATUS to make changes //look even for status name, odd for amount //example array [temperature, 2, oxygen, 1]
                            this.clickCallBack.changeWorldStats(statusAmountArray[statusChangeIndex], statusAmountArray[statusChangeIndex + 1]);
                        }
                        break;
                    case 'tr': //pass tr number to player's tr
                        var trAmount = this.actionInfo[index];
                        this.clickCallBack.changePlayerStats('tr', trAmount);
                        break;
                    case 'tile': //activate tile to click on, tiles should receive [ocean, city, steel, titanium, any]
                        var tileTypeAmountArray = [];
                        for (var tileType in this.actionInfo[index]) {
                            tileTypeAmountArray.push(tileType);
                            tileTypeAmountArray.push(this.actionInfo[index][tileType]);
                        }
                        for (var tileChangeIndex = 0; tileChangeIndex < tileTypeAmountArray.length; tileChangeIndex += 2) {//submit array to mapTiles //look even for tileType, odd for amount //example array [any, 1]; feeds [tileType, numberOfTiles]
                            this.clickCallBack.addTile(tileTypeAmountArray[tileChangeIndex], tileTypeAmountArray[tileChangeIndex + 1]);
                        }
                        break;
                    case 'drawActionCard': //dealCards to player
                        var dealNumberOfCards = this.actionInfo[index];
                        this.clickCallBack.changePlayerStats('dealCard', dealNumberOfCards);
                        break;
                }
            }
        }
    }
    handleClick() {
        if(this.checkValidAction()){
            this.playAction();
            this.clickCallBack.playCard(this);
        } else {
            var modal = new messageModals('error');
            modal.buildModal();
        }
    }
    render() {
        var container = $("<div>", {'class': 'actionCardContainer'});
        container.on('click', this.handleClick);
        var innerContainer = $("<div>", {'class': 'actionCardInner'});
        var actionName = $("<div>", {'class': 'actionName'}).text(this.name);
        var actionCost = $("<div>", {'class': 'actionCost'}).text('Cost: ' + this.cost);
        var action = $("<div>", {'class': 'action'});
        var actionLabel = $("<div>", {'class': 'actionLabel'}).text('Action:');
        action.append(actionLabel);
        var actionInput = [];
        for(var index in this.actionInfo){ //objName[index] = value
            actionInput.push(index + ':');
            var detail = [];
            if(Object.keys(this.actionInfo[index]).length > 0){
                for(var resource in this.actionInfo[index]){
                    detail.push(resource + ': ' + this.actionInfo[index][resource]);
                }
            } else{
                detail.push(this.actionInfo[index]);
            }
            actionInput.push(detail);
            detail = [];
        }
        for(var i = 0; i < actionInput.length; i++){
            var actionDetail = $("<div>", {'class': 'actionDetail'});
            var text = actionDetail.text(actionInput[i]);
            action.append(text);
        }
        innerContainer.append(actionName, actionCost, action);
        this.domElement = container.append(innerContainer);
        return this.domElement;
    }
}

/*
<div class="actionCard">
    <div class="actionInner">
        <div class="actionName">name: this.name</div>
        <div class="actionCost">cost: this.cost</div>
        <div class="action">action: text</div>
    </div>
</div>

 */