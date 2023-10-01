import Board from "../logic/board.js";
import DifficultySystem from "../logic/difficulty-system.js";
import Point from "../logic/point.js";
import ScoreSystem from "../logic/score-system.js";
import TetrominoFactory from "../tetromino/tetromino-factory.js";

export default class Game extends Phaser.Scene {

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
        this.load.image('game_over', 'assets/game_over.png');

        this.load.image('sky_unit', 'assets/sky_unit.png');
        this.load.image('yellow_unit', 'assets/yellow_unit.png');
        this.load.image('purple_unit', 'assets/purple_unit.png');
        this.load.image('blue_unit', 'assets/blue_unit.png');
        this.load.image('orange_unit', 'assets/orange_unit.png');
        this.load.image('green_unit', 'assets/green_unit.png');
        this.load.image('red_unit', 'assets/red_unit.png');

        this.load.image('silhouette_i', 'assets/silhouette_i.png');
        this.load.image('silhouette_o', 'assets/silhouette_o.png');
        this.load.image('silhouette_t', 'assets/silhouette_t.png');
        this.load.image('silhouette_j', 'assets/silhouette_j.png');
        this.load.image('silhouette_l', 'assets/silhouette_l.png');
        this.load.image('silhouette_s', 'assets/silhouette_s.png');
        this.load.image('silhouette_z', 'assets/silhouette_z.png');
    }

    create() {
        this.playing = true;

        this.add.image(400, 800, 'game_background');

        this.red_units = this.add.group({
            defaultKey: 'red_unit',
            maxSize: 200
        });

        this.board = new Board();
        this.tetrominoFactory = new TetrominoFactory(this, this.board);

        this.player = this.tetrominoFactory.generate();
        this.player.createOnBoard();

        this.difficultySystem = new DifficultySystem();
        this.downInterval = this.difficultySystem.getDownInterval();

        this.scoreSystem = new ScoreSystem(this);

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
            }
        });

        this.add.text(520, 60, 'NE\nXT', { fontSize: 48 });
        this.nextSilhouette = this.tetrominoFactory.getNextSilhouette().setVisible(true);
    }

    update(time, delta) {
        if (!this.playing) {
            return;
        }

        this.currentDownTimer += delta;

        if (this.difficultySystem.checkDifficultyUp(delta)) {
            console.log(time);
            this.downInterval = this.difficultySystem.getDownInterval();
        }

        if (this.currentDownTimer > this.downInterval) {
            this.currentDownTimer -= this.downInterval;

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
                this.scoreSystem.addCombo();
                this.scoreSystem.addScore();
            }
        }

        if (clearCount == 0) {
            this.scoreSystem.downCombo();
        }

        this.player = this.tetrominoFactory.generate();
        this.nextSilhouette.setVisible(false);
        this.nextSilhouette = this.tetrominoFactory.getNextSilhouette().setVisible(true);

        this.player.createOnBoard();
        if (!this.player.isCreatable()) {
            this.stopGame();
        }
    }

    stopGame() {
        this.playing = false;
        this.input.keyboard.removeAllListeners();

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, 800, 1600);
        graphics.setBlendMode(Phaser.BlendModes.DARKEN);

        this.add.image(400, 700, 'game_over');
    }
}