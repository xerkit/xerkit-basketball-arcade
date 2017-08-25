export interface Player {
    name: string;
    score: number;
}

export class LeaderBoard {
    constructor() { }

    getNameScore() {
        return JSON.parse(localStorage.getItem('nameScore'));
    }

    setNameScore(nameScore: Array<Player>) {
        localStorage.setItem('nameScore', JSON.stringify(nameScore));
    }
}