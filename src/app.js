import Game from "./scene/game.js";
import MainMenu from "./scene/main-menu.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1600,
    scene: [MainMenu, Game],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);