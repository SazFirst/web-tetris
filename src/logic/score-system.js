export default class ScoreSystem {
    constructor(scene) {
        this.score = 0;
        this.scene = scene;

        this.scene.add.text(100, 55, 'Score', { fontSize: 48 });
        this.sceneTextTotalScore = this.scene.add.text(245, 110, 0, { fontSize: 48, rtl: true });

        this.combo = 0;

        this.scene.add.text(300, 55, 'Combo', { fontSize: 48 });
        this.sceneTextComboCount = this.scene.add.text(445, 110, 0, { fontSize: 48, rtl: true });
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