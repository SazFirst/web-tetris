import Point from "../point.js";
import Tetromino from "./tetromino.js";

export default class TetrominoT extends Tetromino {

    constructor(board, unitPool) {
        const possibleShape = [
            [new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(2, 1)],
            [new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(1, 2)],
            [new Point(0, 0), new Point(1, 0), new Point(2, 0), new Point(1, 1)],
            [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(0, 2)]
        ];

        super(new Point(4, 18), board, unitPool, possibleShape);
    }
}