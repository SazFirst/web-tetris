import Point from "../logic/point.js";
import Tetromino from "./tetromino.js";

export default class TetrominoO extends Tetromino {

    constructor(board, unitPool) {
        const possibleShape = [
            [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1)]
        ];

        super(new Point(4, 18), board, unitPool, possibleShape);
    }
}