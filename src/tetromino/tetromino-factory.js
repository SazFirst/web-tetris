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
            [TetrominoI, this.scene.add.group({ defaultKey: 'sky_unit', maxSize: 200 }), 'silhouette_i'],
            [TetrominoO, this.scene.add.group({ defaultKey: 'yellow_unit', maxSize: 200 }), 'silhouette_o'],
            [TetrominoT, this.scene.add.group({ defaultKey: 'purple_unit', maxSize: 200 }), 'silhouette_t'],
            [TetrominoJ, this.scene.add.group({ defaultKey: 'blue_unit', maxSize: 200 }), 'silhouette_j'],
            [TetrominoL, this.scene.add.group({ defaultKey: 'orange_unit', maxSize: 200 }), 'silhouette_l'],
            [TetrominoS, this.scene.add.group({ defaultKey: 'green_unit', maxSize: 200 }), 'silhouette_s'],
            [TetrominoZ, this.scene.add.group({ defaultKey: 'red_unit', maxSize: 200 }), 'silhouette_z'],
        ];

        this.nextSilhouetteQueueDisplayMeta = [
            { xPosition: 875, yPosition: 400 },
            { xPosition: 875, yPosition: 540 },
            { xPosition: 875, yPosition: 680 },
            { xPosition: 875, yPosition: 820 }
        ];

        this.nextSilhouetteQueue = [];

        // 초기 실루엣 큐 채우기
        for (const displayMeta of this.nextSilhouetteQueueDisplayMeta) {
            const randomIndex = Phaser.Math.Between(0, this.tetrominoBluePrint.length - 1);
            this.nextSilhouetteQueue.push({ index: randomIndex, image: this.scene.add.image(displayMeta.xPosition, displayMeta.yPosition, this.tetrominoBluePrint[randomIndex][2]) });
        }
    }

    generate() {
        // 다음 테트로미노 큐에서 꺼내기
        const nextTetromino = this.nextSilhouetteQueue.shift();

        const randomIndex = nextTetromino.index;
        const targetClass = this.tetrominoBluePrint[randomIndex][0];
        const targetColorPool = this.tetrominoBluePrint[randomIndex][1];

        // 큐에 다음 테트로미노 추가
        const newRandomIndex = Phaser.Math.Between(0, this.tetrominoBluePrint.length - 1);
        this.nextSilhouetteQueue.push({ index: newRandomIndex, image: this.scene.add.image(0, 0, this.tetrominoBluePrint[newRandomIndex][2]) });
        
        // 화면에 보여지는 이미지 재정렬
        nextTetromino.image.destroy();
        for (let i = 0; i < this.nextSilhouetteQueue.length; i++) {
            const xPosition = this.nextSilhouetteQueueDisplayMeta[i].xPosition;
            const yPosition = this.nextSilhouetteQueueDisplayMeta[i].yPosition;
            this.nextSilhouetteQueue[i].image.setPosition(xPosition, yPosition);
        }

        return new targetClass(this.board, targetColorPool);
    }
}