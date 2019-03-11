class numberPopup {
    constructor(number) {
        this.number = number;
        this.color = null;
        this.setColor();
        this.domElement = null;
    }

    setColor() {
        if (this.number > 0) {
            this.color = 'green';
        } else {
            this.color = 'red';
        }
    }

    render() {
        this.domElement = $('<div>', {'class': 'numberPopup'}).text(this.number).css('color', this.color);
        return this.domElement;
    }
}