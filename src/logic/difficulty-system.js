export default class difficultySystem {

    constructor() {
        this.difficulty = 2;
        this.difficultyUpInterval = 120 *1000;
        this.playTime = 0;
    }

    getDownInterval() {
        return 100 + (600 / this.difficulty ^ 0.6);
    }

    checkDifficultyUp(delta) {
        this.playTime += delta;
        if (this.playTime > this.difficultyUpInterval) {
            this.playTime -= this.difficultyUpInterval;
            this.difficulty += 1;

            return true;
        }

        return false;
    }
}