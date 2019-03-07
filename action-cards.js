var cardDeck = [
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
    {'name': 'Noctis City', 'cost': 18, 'action': {'production': {'money': 3, 'energy': -1}, 'tile': {'city': 1}}},
    {'name': 'Underground City', 'cost': 18, 'action': {'production': {'steel': 2, 'energy': -2}, 'tile': {'city': 1}}},
    {'name': 'Towing a Comet', 'cost': 23, 'action': {'bank': {'plant': 2}, 'status': {'oxygen': 1}, 'tile': {'ocean': 1}}},
    {'name': 'Subterranean Reservoir', 'cost': 11, 'action': {'tile': {'ocean': 1}}},
    {'name': 'Convoy from Europa', 'cost': 15, 'action': {'tile': {'ocean': 1}, 'drawActionCard': 1}},
    {'name': 'Steel Mining Rights', 'cost': 9, 'action': {'tile': {'steel': 1}}},
    {'name': 'Titanium Mining Rights', 'cost': 9, 'action': {'tile': {'titanium': 1}}},
    {'name': 'Ice Asteroid', 'cost': 23, 'action': {'tile': {'ocean': 2}}},
    {'name': 'Nuclear Zone', 'cost': 10, 'action': {'status': {'temperature': 2}, 'tile': {'any': 1}}}, //tr: -2 at the end of game
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
        this.action = infoObject['action'];
        this.callBack = clickCallBack;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.callBack(this)
    }
    render() {
        var container = $("<div>", {'class': 'actionCardContainer'});
        container.on('click', this.handleClick);
        var innerContainer = $("<div>", {'class': 'actionCardInner'});
        var actionName = $("<div>", {'class': 'actionName'}).text('Name: ' + this.name);
        var actionCost = $("<div>", {'class': 'actionCost'}).text('Cost: ' + this.cost);
        var action = $("<div>", {'class': 'action'});
        var actionLabel = $("<div>", {'class': 'actionLabel'}).text('Action:');
        action.append(actionLabel);
        var actionInput = [];
        for(var index in this.action){ //objName[index] = value
            actionInput.push(index + ':');
            var detail = [];
            if(Object.keys(this.action[index]).length > 0){
                for(var resource in this.action[index]){
                    detail.push(resource + ': ' + this.action[index][resource]);
                }
            } else{
                detail.push(this.action[index]);
            }
            actionInput.push(detail);
            detail = [];
        }
        for(var i = 0; i < actionInput.length; i++){
            var actionDetail = $("<div>", {'class': 'actionDetail'});
            var text = actionDetail.text(actionInput[i]);
            var addBreak = $("<br>");
            if(i % 2 === 0){
                action.append(text);
            } else {
                if(i === actionInput.length - 1){
                    action.append(text);
                } else{
                    action.append(text, addBreak);
                }
            }
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