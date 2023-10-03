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
        this.load.image('hold_button', 'assets/hold_button.png');
        this.load.image('rotate_button', 'assets/rotate_button.png');
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

        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {
        this.playing = true;

        this.add.image(0, 0, 'game_background').setOrigin(0, 0);

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

        this.input.keyboard.on('keydown-SHIFT', event => {
            this.player = this.tetrominoFactory.hold(this.player);
            this.player.createOnBoard();
        });

        this.add.text(810, 50, 'HOLD', { fontSize: 48, fontFamily: 'Arial' });
        this.add.text(810, 285, 'NEXT', { fontSize: 48, fontFamily: 'Arial' });

        this.holdButton = this.add.image(780, 945, 'hold_button')
            .setOrigin(0, 0)
            .setInteractive().on('pointerdown', () => {
                this.player = this.tetrominoFactory.hold(this.player);
                this.player.createOnBoard();
            });

        this.rotateButton = this.add.image(780, 1265, 'rotate_button')
            .setOrigin(0, 0)
            .setInteractive().on('pointerdown', () => {
                this.player.rotate();
            });

        this.joyStickControlDelay = 100;
        this.joyStickControlTimer = 0;
        this.joyStick = this.plugins
            .get('rexvirtualjoystickplugin')
            .add(this, {
                x: 250,
                y: 1350,
                radius: 150,
                base: this.add.circle(0, 0, 200, 0x888888).setAlpha(0.4).setDepth(1),
                thumb: this.add.circle(0, 0, 100, 0xcccccc).setAlpha(0.4).setDepth(1),
                dir: '4dir',
                forceMin: 75
            });
    }

    checkJoyStickControl() {
        if (this.joyStick.left) {
            if (this.player.isMovable(this.directionLeft)) {
                this.player.moveOnBoard(this.directionLeft);
            }
        }

        if (this.joyStick.right) {
            if (this.player.isMovable(this.directionRight)) {
                this.player.moveOnBoard(this.directionRight);
            }
        }

        if (this.joyStick.down) {
            if (this.player.isMovable(this.directionDown)) {
                this.player.moveOnBoard(this.directionDown);
            }
        }
    }

    update(time, delta) {
        if (!this.playing) {
            return;
        }

        if (this.difficultySystem.checkDifficultyUp(delta)) {
            console.log(time);
            this.downInterval = this.difficultySystem.getDownInterval();
        }

        this.currentDownTimer += delta;
        if (this.currentDownTimer > this.downInterval) {
            this.currentDownTimer -= this.downInterval;

            if (this.player.isMovable(this.directionDown)) {
                this.player.moveOnBoard(this.directionDown);
            }
            else {
                this.nextTetromino();
            }
        }

        this.joyStickControlTimer += delta;
        if (this.joyStickControlTimer > this.joyStickControlDelay) {
            this.joyStickControlTimer -= this.joyStickControlDelay;

            this.checkJoyStickControl();
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
        this.player.createOnBoard();

        if (!this.player.isCreatable()) {
            this.stopGame();
        }
    }

    stopGame() {
        this.playing = false;
        this.input.keyboard.removeAllListeners();
        this.joyStick.setEnable(false);
        this.holdButton.disableInteractive();
        this.rotateButton.disableInteractive();

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, 1200, 1600).setDepth(2);
        graphics.setBlendMode(Phaser.BlendModes.DARKEN);

        this.add.image(500, 800, 'game_over').setDepth(2);
    }
}