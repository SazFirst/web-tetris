export default class ScoreSystem {
    constructor(scene) {
        this.score = 0;
        this.scene = scene;

        this.scene.add.text(230, 55, 'Score', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextTotalScore = this.scene.add.text(355, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });

        this.combo = 0;

        this.scene.add.text(390, 55, 'Combo', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextComboCount = this.scene.add.text(545, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });

        this.clearLine = 0;
        this.scene.add.text(100, 55, 'Line', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextClearLine = this.scene.add.text(190, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });

        this.playTime = 0;
        this.scene.add.text(590, 55, 'Time', { fontSize: 48, fontFamily: 'Arial' });
        this.sceneTextPlayTime = this.scene.add.text(700, 110, 0, { fontSize: 48, fontFamily: 'Arial', rtl: true });
    }

    addScore() {
        this.score += 10 + 5 * this.combo;
        this.sceneTextTotalScore.setText(this.score);
    }

    addCombo() {
        this.clearLine++;
        this.sceneTextClearLine.setText(this.clearLine);
        this.combo++;
        this.sceneTextComboCount.setText(this.combo);
    }

    downCombo() {
        if (this.combo > 0) {
            this.combo--;
        }

        this.sceneTextComboCount.setText(this.combo);
    }

    addTime(delta) {
        this.playTime += delta;

        let seconds = parseInt(this.playTime / 1000);

        let min = parseInt((seconds % 3600) / 60);
        min = min < 10 ? '0' + min : min;
        let sec = seconds % 60;
        sec = (sec < 10) ? '0' + sec : sec;

        this.sceneTextPlayTime.setText(`${min}:${sec}`);
    }
}