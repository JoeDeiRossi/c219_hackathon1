class numberPopup {
    constructor(number) {
        this.number = number;
        this.domElement = null;
    }

    render() {
        this.domElement = $('<div>', {'class': 'numberPopup'}).text(this.number);
        if (this.number > 0) {
            this.domElement.addClass('popupGreen');
        } else {
            this.domElement.addClass('popupRed');
        }
        return this.domElement;
    }

    rise() {
        var self = this.domElement;
        this.domElement.animate({
            top: '-50%'
        }, 1000);
        setTimeout(function () {
            self.remove();
        }, 1000);
    }
}