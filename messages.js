
class messageModals {
    constructor(type, callback, resourceBank) {
        this.type = type;   //could be error, confirm, or quantity
        this.callback = callback;
        this.resourceBank = resourceBank;
        this.inputDomElement = null;
    }

    deleteModal() {
        var modal = $(this).parent();
        modal.remove();
    }

    errorModal() {
        var modal = $('<div>').addClass('infoModal').text('Insufficient funds and/or resources');
        var cancelButton = $('<button>').addClass('cancelButton').text('CANCEL').on('click', this.deleteModal);
        modal.append(cancelButton);
        $('body').append(modal);
        modal.show();
    }

    confirmModal() {
        var modal = $('<div>').addClass('infoModal').text('Are you sure?');
        var confirmButton = $('<button>').addClass('confirmButton').text('CONFIRM').on('click', this.callback).on('click',           this.deleteModal);
        var cancelButton = $('<button>').addClass('cancelButton').text('CANCEL').on('click', this.deleteModal);
        modal.append(confirmButton, cancelButton);
        $('body').append(modal);
        modal.show();
    }

    inputModal() {
        var modal = $('<div>').addClass('infoModal').text('How many?');
        this.inputDomElement = $('<input>',{
            type: 'number',
            max: this.resourceBank,
            min: 1
        }).val(1);
        var confirmButton = $('<button>').addClass('confirmButton').text('CONFIRM').on('click', this.callback).on('click',           this.deleteModal);
        var cancelButton = $('<button>').addClass('cancelButton').text('CANCEL').on('click', this.deleteModal);
        modal.append(this.inputDomElement, confirmButton, cancelButton);
        $('body').append(modal);
        modal.show();
    }

    endGameModal() {
        var modal = $('<div>').addClass('infoModal').text(this.resourceBank);
        $('body').append(modal);
        modal.show();
    }

    buildModal() {
        if (this.type === 'error') {
            this.errorModal();
        } else if (this.type === 'confirm') {
            this.confirmModal();
        } else if (this.type === 'endgame') {
            this.endGameModal();
        } else {
                this.inputModal()
            };
        }
    }
}

class distributionModal {
    constructor(playersArray) {
        this.players = playersArray;
        this.icons = {
            'money': '<i class="fa fa-bitcoin"></i>',
            'steel': '<i class="fa fa-cog"></i>',
            'titanium': '<i class="fa fa-star"></i>',
            'plants': '<i class="fa fa-leaf"></i>',
            'energy': '<i class="fa fa-bolt"></i>',
            'heat': '<i class="fa fa-free-code-camp"></i>'
        };
        this.buildModal = this.buildModal.bind(this);
    }

    deleteModal() {
        var modal = $(this).parent();
        modal.remove();
    }

    buildModal() {
        var modal = $('<div>').addClass('infoModal');
        for (var playerIndex = 1; playerIndex <= this.players.length; playerIndex++) {
            var playerDiv = $('<div>').addClass('playerDistribution').text('Player ' + playerIndex);
            var icon;
            for (icon in this.icons) {
                var resourceDiv = $('<div>').text(icon + ':');
                playerDiv.append(resourceDiv);
                var amountDiv = $('<div>').text('+' + this.players[playerIndex-1].inventory.resourceTrackers[icon].production);
                playerDiv.append(amountDiv);
            }
            modal.append(playerDiv);
        }
        var confirmButton = $('<button>').addClass('distributionConfirmButton').text('Next Round').on('click', this.deleteModal);
        modal.append(confirmButton);
        $('body').append(modal);
    }
}