export default class ScoreSystem {
    constructor(scene) {
        this.score = 0;
        this.scene = scene;

        this.scene.add.text(185, 55, 'Score', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextTotalScore = this.scene.add.text(310, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });

        this.combo = 0;

        this.scene.add.text(450, 55, 'Combo', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextComboCount = this.scene.add.text(605, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });
    }

    addScore() {
        this.score += 10 + 5 * this.combo;
        this.sceneTextTotalScore.setText(this.score);
    }

    addCombo() {
        this.combo++;
        this.sceneTextComboCount.setText(this.combo);
    }

    downCombo() {
        if (this.combo > 0) {
            this.combo--;
        }

        this.sceneTextComboCount.setText(this.combo);
    }
}