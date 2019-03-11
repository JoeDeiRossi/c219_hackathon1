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
        this.domElement = null;
        this.name = infoObject['name'];
        this.cost = infoObject['cost'];
        this.actionInfo = infoObject['action'];
        this.owner = null;
        this.clickCallBack = {
            getPlayerStats: clickCallBack.getPlayerStats,
            changeWorldStats: clickCallBack.changeWorldStats,
            changePlayerStats: clickCallBack.changePlayerStats,
            playCard: clickCallBack.playCard,
            addTile: clickCallBack.addTile,
            checkSelling: clickCallBack.checkSellCard,
            sellCard: clickCallBack.sellCard
        }; //an object of functions

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
                    var prodArr = [];
                    for (var production in this.actionInfo[index]) {
                        prodArr.push(production);
                        prodArr.push(this.actionInfo[index][production]);
                    }
                    for (var deltaProdIndex = 0; deltaProdIndex < prodArr.length; deltaProdIndex += 2) {
                        if (this.clickCallBack.getPlayerStats(prodArr[deltaProdIndex], 'production') + prodArr[deltaProdIndex + 1] < 0) {
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
                        var bankArr = [];
                        for (var bank in this.actionInfo[index]) {
                            bankArr.push(bank);
                            bankArr.push(this.actionInfo[index][bank]);
                        }
                        for (var deltaBankIndex = 0; deltaBankIndex < bankArr.length; deltaBankIndex += 2) { //submit array to PLAYER's inventory BANK //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                             this.clickCallBack.changePlayerStats(bankArr[deltaBankIndex], bankArr[deltaBankIndex + 1], 'bank');
                        }
                        break;
                    case 'production': //pass production objects to player's production
                        console.log('add to production');
                        var prodArr = [];
                        for (var production in this.actionInfo[index]) {
                            prodArr.push(production);
                            prodArr.push(this.actionInfo[index][production]);
                        }
                        for (var deltaProdIndex = 0; deltaProdIndex < prodArr.length; deltaProdIndex += 2) {//submit array to PLAYER's inventory PRODUCTION //look even for resource name, odd for amount //example array [energy, 3, heat, 2]
                            this.clickCallBack.changePlayerStats(prodArr[deltaProdIndex], prodArr[deltaProdIndex + 1], 'production');
                        }
                        break;
                    case 'status': //pass status objects to status
                        var statusArr = [];
                        for (var status in this.actionInfo[index]) {
                            statusArr.push(status);
                            statusArr.push(this.actionInfo[index][status]);
                        }
                        for (var deltaStatusIndex = 0; deltaStatusIndex < statusArr.length; deltaStatusIndex += 2) {//submit array to BOARD's STATUS to make changes //look even for status name, odd for amount //example array [temperature, 2, oxygen, 1]
                            this.clickCallBack.changeWorldStats(statusArr[deltaStatusIndex], statusArr[deltaStatusIndex + 1]);
                        }
                        break;
                    case 'tr': //pass tr number to player's tr
                        var trAmount = this.actionInfo[index];
                        this.clickCallBack.changePlayerStats('tr', trAmount);
                        break;
                    case 'tile': //activate tile to click on, tiles should receive [ocean, city, steel, titanium, any]
                        var tileArr = [];
                        for (var tileType in this.actionInfo[index]) {
                            tileArr.push(tileType);
                            tileArr.push(this.actionInfo[index][tileType]);
                        }
                        for (var deltaTileIndex = 0; deltaTileIndex < tileArr.length; deltaTileIndex += 2) {//submit array to mapTiles //look even for tileType, odd for amount //example array [any, 1]; feeds [tileType, numberOfTiles]
                            this.clickCallBack.addTile(tileArr[deltaTileIndex], tileArr[deltaTileIndex + 1]);
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
        if(this.clickCallBack.checkSelling()){
            console.log('check selling in card', this.clickCallBack.checkSelling);
            this.clickCallBack.sellCard(this);
        } else {
            if(this.checkValidAction()){
                this.playAction();
                this.clickCallBack.playCard(this);
            } else {
                var modal = new messageModals('error');
                modal.buildModal();
            }
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