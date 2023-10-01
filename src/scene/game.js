import Board from "../board.js";
import Point from "../point.js";
import TetrominoFactory from "../tetromino/tetromino-factory.js";

export default class Game extends Phaser.Scene {

    downDelay = 700;
    currentDownTimer = 0;
    player;
    board;
    red_units;

    constructor() {
        super('game');

        this.directionDown = new Point(0, -1);
        this.directionLeft = new Point(-1, 0);
        this.directionRight = new Point(1, 0);
    }

    preload() {
        this.load.image('game_background', 'assets/game_background.png');
        this.load.image('start_button', 'assets/game_start_button.png');

        this.load.image('sky_unit', 'assets/sky_unit.png');
        this.load.image('yellow_unit', 'assets/yellow_unit.png');
        this.load.image('purple_unit', 'assets/purple_unit.png');
        this.load.image('blue_unit', 'assets/blue_unit.png');
        this.load.image('orange_unit', 'assets/orange_unit.png');
        this.load.image('green_unit', 'assets/green_unit.png');
        this.load.image('red_unit', 'assets/red_unit.png');
    }

    create() {
        this.add.image(400, 800, 'game_background');

        this.red_units = this.add.group({
            defaultKey: 'red_unit',
            maxSize: 200
        });

        this.board = new Board();
        this.tetrominoFactory = new TetrominoFactory(this, this.board);

        this.player = this.tetrominoFactory.generateRandom();
        this.player.createOnBoard();

        this.input.keyboard.on('keydown-LEFT', event => {
            if (this.player.isMovable(this.directionLeft)) {
                this.player.moveOnBoard(this.directionLeft);
            }
        });

        this.input.keyboard.on('keydown-RIGHT', event => {
            if (this.player.isMovable(this.directionRight)) {
                this.player.moveOnBoard(this.directionRight);
            }
        });

        this.input.keyboard.on('keydown-UP', event => {
            this.player.rotate();
        });

        this.input.keyboard.on('keydown-DOWN', event => {
            if (this.player.isMovable(this.directionDown)) {
                this.player.moveOnBoard(this.directionDown);
            } else {
                this.nextTetromino();
            }
        });
    }

    update(time, delta) {
        this.currentDownTimer += delta;
        if (this.currentDownTimer > this.downDelay) {
            this.currentDownTimer -= this.downDelay;

            if (this.player.isMovable(this.directionDown)) {
                this.player.moveOnBoard(this.directionDown);
            }
            else {
                this.nextTetromino();
            }
        }
    }

    nextTetromino() {
        this.player.fixOnBoard();

        let yPositions = this.player.getYPositions();
        let clearCount = 0;
        for (const y of yPositions) {
            if (this.board.isLineFull(y - clearCount)) {
                this.board.clearLine(y - clearCount);
                clearCount++;
            }
        }

        this.player = this.tetrominoFactory.generateRandom();
        this.player.createOnBoard();
    }
}