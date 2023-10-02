export default class MainMenu extends Phaser.Scene {

    constructor() {
        super('main_menu');
    }

    preload() {
        this.load.image('main_menu', 'assets/main_menu.png');
        this.load.image('start_button', 'assets/game_start_button.png');
    }

    create() {
        this.add.image(0, 0, 'main_menu').setOrigin(0, 0);
        this.add.image(500, 800, 'start_button')
            .setInteractive().on('pointerdown', () => {
                this.scene.start('game');
            });
    }
}