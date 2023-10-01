import TetrominoI from "./tetromino-i.js";
import TetrominoJ from "./tetromino-j.js";
import TetrominoL from "./tetromino-l.js";
import TetrominoO from "./tetromino-o.js";
import TetrominoS from "./tetromino-s.js";
import TetrominoT from "./tetromino-t.js";
import TetrominoZ from "./tetromino-z.js";

export default class TetrominoFactory {
    constructor(scene, board) {
        this.scene = scene;
        this.board = board;

        this.tetrominoBluePrint = [
            [TetrominoI, this.scene.add.group({ defaultKey: 'sky_unit', maxSize: 200 })],
            [TetrominoO, this.scene.add.group({ defaultKey: 'yellow_unit', maxSize: 200 })],
            [TetrominoT, this.scene.add.group({ defaultKey: 'purple_unit', maxSize: 200 })],
            [TetrominoJ, this.scene.add.group({ defaultKey: 'blue_unit', maxSize: 200 })],
            [TetrominoL, this.scene.add.group({ defaultKey: 'orange_unit', maxSize: 200 })],
            [TetrominoS, this.scene.add.group({ defaultKey: 'green_unit', maxSize: 200 })],
            [TetrominoZ, this.scene.add.group({ defaultKey: 'red_unit', maxSize: 200 })],
        ];
    }

    generateRandom() {
        const randomIndex = Phaser.Math.Between(0, this.tetrominoBluePrint.length - 1);
        const targetClass = this.tetrominoBluePrint[randomIndex][0];
        const targetColorPool = this.tetrominoBluePrint[randomIndex][1];

        return new targetClass(this.board, targetColorPool);
    }
}