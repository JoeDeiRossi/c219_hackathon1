class Deck {
    constructor(cardArray, cardCallBack){
        this.cards = [];
        for (var cardIndex = 0; cardIndex < cardArray.length; cardIndex++) {
            var newCard = new Card(cardArray[cardIndex], cardCallBack);
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
                for(var nestedObjIndex in this.action[index]){
                    detail.push(nestedObjIndex + ': ' + this.action[index][nestedObjIndex]);
                }
            } else{
                detail.push(index + ': ' + this.action[index]);
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