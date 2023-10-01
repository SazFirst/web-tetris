import Point from "../point.js";
import Tetromino from "./tetromino.js";

export default class TetrominoI extends Tetromino {

    constructor(board, unitPool) {
        const possibleShape = [
            [new Point(0, 0), new Point(0, 1), new Point(0, 2), new Point(0, 3)],
            [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(3, 0)]
        ];

        super(new Point(4, 16), board, unitPool, possibleShape);
    }
}