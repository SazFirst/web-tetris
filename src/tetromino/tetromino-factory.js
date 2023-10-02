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
            [TetrominoI, this.scene.add.group({ defaultKey: 'sky_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_i').setVisible(false)],
            [TetrominoO, this.scene.add.group({ defaultKey: 'yellow_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_o').setVisible(false)],
            [TetrominoT, this.scene.add.group({ defaultKey: 'purple_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_t').setVisible(false)],
            [TetrominoJ, this.scene.add.group({ defaultKey: 'blue_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_j').setVisible(false)],
            [TetrominoL, this.scene.add.group({ defaultKey: 'orange_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_l').setVisible(false)],
            [TetrominoS, this.scene.add.group({ defaultKey: 'green_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_s').setVisible(false)],
            [TetrominoZ, this.scene.add.group({ defaultKey: 'red_unit', maxSize: 200 }), this.scene.add.image(875, 160, 'silhouette_z').setVisible(false)],
        ];

        this.scene.add.image(875, 400, 'silhouette_i');
        this.scene.add.image(875, 540, 'silhouette_i');
        this.scene.add.image(875, 680, 'silhouette_i');
        this.scene.add.image(875, 820, 'silhouette_i');

        this.randomIndex = Phaser.Math.Between(0, this.tetrominoBluePrint.length - 1);
    }

    getNextSilhouette() {
        return this.tetrominoBluePrint[this.randomIndex][2];
    }

    generate() {
        const targetClass = this.tetrominoBluePrint[this.randomIndex][0];
        const targetColorPool = this.tetrominoBluePrint[this.randomIndex][1];
        this.randomIndex = Phaser.Math.Between(0, this.tetrominoBluePrint.length - 1);

        return new targetClass(this.board, targetColorPool);
    }
}