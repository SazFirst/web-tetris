export default class Board {

    constructor() {
        this.map = new Array(10);

        for (var i = 0; i < 10; i++) {
            this.map[i] = new Array(20);
        }
    }

    isBlank(x, y) {
        return x > -1 && y > -1 && x < 10 && y < 20 && this.map[x][y] === undefined;
    }

    setUnit(x, y, unit) {
        this.map[x][y] = unit;
        unit.setPosition(x * 64 + 112, 1488 - y * 64);
    }

    isLineFull(y) {
        for (let i = 0; i < 10; i++) {
            if (!this.map[i][y]) {
                return false;
            }
        }

        return true;
    }

    clearLine(y) {
        for (let i = 0; i < 10; i++) {
            if (this.map[i][y]) {
                this.map[i][y].setActive(false);
                this.map[i][y].setVisible(false);
            }

            this.map[i][y] = undefined;
            for (let j = y + 1; j < 20; j++) {
                if (this.map[i][j]) {
                    this.setUnit(i, j - 1, this.map[i][j]);
                }
                this.map[i][j] = undefined;
            }
        }
    }
}