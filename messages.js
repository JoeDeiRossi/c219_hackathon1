
class messageModals {
    constructor(type, callback, resourceBank) {
        this.type = type;   //could be error, confirm, or quantity
        this.callback = callback;
        this.resourceBank = resourceBank;
        this.quantityInput = null;
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
        this.quantityInput = $('<input>',{
            type: 'number',
            max: this.resourceBank,
            min: 1
        }).val(1);
        var confirmButton = $('<button>').addClass('confirmButton').text('CONFIRM').on('click', this.callback).on('click',           this.deleteModal);
        var cancelButton = $('<button>').addClass('cancelButton').text('CANCEL').on('click', this.deleteModal);
        modal.append(this.quantityInput, confirmButton, cancelButton);
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