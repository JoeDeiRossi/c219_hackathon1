
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

    buildModal() {
        if (this.type === 'error') {
            var modal = $('<div>').addClass('modal').text('Insufficient funds and/or resources');
            var cancelButton = $('<button>').text('CANCEL').on('click', this.deleteModal);
            modal.append(cancelButton);
            $('body').append(modal);
            modal.show();
        } else if (this.type === 'confirm') {
            var modal = $('<div>').addClass('modal').text('Are you sure?');
            var confirmButton = $('<button>').text('CONFIRM').on('click', this.callback).on('click',           this.deleteModal);
            var cancelButton = $('<button>').text('CANCEL').on('click', this.deleteModal);
            modal.append(confirmButton, cancelButton);
            $('body').append(modal);
            modal.show();
        } else {
            var modal = $('<div>').addClass('modal').text('How many?');
            this.quantityInput = $('<input>',{
                type: 'number',
                max: this.resourceBank,
                min: 1
            }).val(1);
            var confirmButton = $('<button>').text('CONFIRM').on('click', this.callback).on('click',           this.deleteModal);
            var cancelButton = $('<button>').text('CANCEL').on('click', this.deleteModal);
            modal.append(this.quantityInput, confirmButton, cancelButton);
            $('body').append(modal);
            modal.show();
        }
    }
}

    //after clicking 'sell steel'
        //'how many?' with input field and CONFIRM button
            //could change to confirmation of steel sold and $ gained
            //could change to 'invalid amount' message

    //after clicking 'sell titanium'
        //'how many?' with input field and CONFIRM button
            //could change to confirmation of titanium sold and $ gained
            //could change to 'invalid amount' message