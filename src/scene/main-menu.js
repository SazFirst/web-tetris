export default class MainMenu extends Phaser.Scene {

    constructor() {
        super('main_menu');
    }

    preload() {
        this.load.image('main_menu', 'assets/main_menu.png');
        this.load.image('start_button', 'assets/game_start_button.png');
    }

    create() {
        this.add.image(400, 800, 'main_menu');
        this.add.image(400, 700, 'start_button')
            .setInteractive().on('pointerdown', () => {
                this.scene.start('game');
            });
    }
}