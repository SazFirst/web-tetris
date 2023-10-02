import Point from "../logic/point.js";

export default class Tetromino {
    constructor(initialPosition, board, unitPool, possibleShape) {
        this.board = board;
        this.unitPool = unitPool;
        this.units = [];
        this.possibleShape = possibleShape;
        this.rotationIndex = 0;

        this.positions = [];
        for (const shape of this.possibleShape[this.rotationIndex]) {
            this.positions.push(new Point(initialPosition.x + shape.x, initialPosition.y + shape.y));
        }
    }

    isCreatable() {
        let isCreatable = true;

        for (const position of this.positions) {
            if (!this.board.isBlank(position.x, position.y)) {
                isCreatable = false;
            }
        }

        return isCreatable;
    }

    createOnBoard() {
        for (const position of this.positions) {
            let newUnit = this.unitPool.get();
            newUnit.setActive(true);
            newUnit.setVisible(true);
            newUnit.setPosition(position.x * 64 + 112, 1488 - position.y * 64);
            this.units.push(newUnit);
        }
    }

    isMovable(direction) {
        for (const position of this.positions) {
            if (!this.board.isBlank(position.x + direction.x, position.y + direction.y)) {
                return false;
            }
        }

        return true;
    }

    getYPositions() {
        const results = new Set();

        for (const position of this.positions) {
            results.add(position.y);
        }

        return results;
    }

    moveOnBoard(direction) {
        for (let i = 0; i < this.positions.length; i++) {
            this.positions[i].x += direction.x;
            this.positions[i].y += direction.y;
            this.units[i].setPosition(this.positions[i].x * 64 + 112, 1488 - this.positions[i].y * 64);
        }
    }

    fixOnBoard() {
        for (const position of this.positions) {
            this.board.setUnit(position.x, position.y, this.units.shift());
        }
    }

    rotate() {
        const rotationAxis = new Point(this.positions[0].x - this.possibleShape[this.rotationIndex][0].x, this.positions[0].y - this.possibleShape[this.rotationIndex][0].y);
        let nextRotationIndex = (this.rotationIndex + 1) % this.possibleShape.length;
        let nextPositions = [];

        for (const shape of this.possibleShape[nextRotationIndex]) {
            nextPositions.push(new Point(shape.x + rotationAxis.x, shape.y + rotationAxis.y));
        }

        for (const position of nextPositions) {
            if (!this.board.isBlank(position.x, position.y)) {
                return false;
            }
        }

        this.positions = nextPositions;
        this.rotationIndex = nextRotationIndex;

        for (let i = 0; i < this.positions.length; i++) {
            this.units[i].setPosition(this.positions[i].x * 64 + 112, 1488 - this.positions[i].y * 64);
        }
    }

    clearImage() {
        for (const unit of this.units) {
            unit.setActive(false);
            unit.setVisible(false);
        }
    }
}