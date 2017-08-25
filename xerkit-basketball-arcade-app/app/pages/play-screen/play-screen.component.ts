import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { prompt, PromptResult, inputType } from "ui/dialogs";
import { BluetoothService } from '../../services/bluetooth/bluetooth.service';

import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import timer = require("timer");
import { LeaderBoard, Player } from "../../models/leader-board.model";

let sound = require('nativescript-sound');


@Component({
    selector: "playScreen",
    moduleId: module.id,
    templateUrl: "./play-screen.component.html",
    styleUrls: ["./play-screen-common.css"]
})


export class PlayScreenComponent implements OnInit, OnDestroy {
    time: number = 150000;
    seconds: any = 2;
    minutes: any = "3" + "0";
    interval: any;
    score: number = 0;
    topScores: any;
    playerName: string;

    dataResultsubscription: Subscription;

    tick = sound.create("~/sounds/tick.mp3");
    whistle = sound.create("~/sounds/whistle.mp3");

    constructor(private _page: Page, private _ngZone: NgZone, private _bluetoothService: BluetoothService, private _leaderBoard: LeaderBoard) {
        _page.on("navigatedTo", function () {
            setCurrentOrientation("landscape", function () {
                console.log("landscape orientation");
            });
        });
        _page.on("navigatingFrom", function () {
            orientationCleanup();
        });
    };



    ngOnInit(): void {
        this._page.actionBarHidden = true;
        var self = this;
        setTimeout(this.playWhistle(), 2000);

        this.dataResultsubscription = this._bluetoothService.dataResult$.subscribe((result) => {
            if (result) {
                self._ngZone.run(() => {
                    console.log("Scored");
                    this.score = this.score + 1;
                });
            }
        });
    }

    playWhistle() {
        this.whistle.play();
        this.interval = timer.setInterval(() => { this.decrementTimer() }, 1000); //play only at the last 10 secs
        setTimeout(this.checkTopScore(), this.time);
    }

    get basketScore(): string {
        return this.score + "";
    }

    checkTopScore() {

        this.topScores = (this._leaderBoard.getNameScore() || []);

        if (this.topScores.length == 5) {
            if(this.score > this.topScores[4].score) {
                this.showInputTopScoreDialog();
            } 
        } else {
            this.showInputTopScoreDialog();
        }

    }

    showInputTopScoreDialog() {
        let options = {
            title: "Name",
            defaultText: "Enter your name",
            inputType: inputType.text,
            okButtonText: "Ok"
        };

        prompt(options).then((result: PromptResult) => {
            this.topScores.push({
                name: result.text,
                score: this.score
            });
            this.topScores.sort((a,b)  => a - b);
            this.topScores.splice(5, this.topScores.length);
            this._leaderBoard.setNameScore(this.topScores);
        });
    }

    decrementTimer() {
        this.time = this.time - 1000;
        this.msToTime(this.time);
        //this.tick.play();
    }

    get minutesCount(): string {
        return this.minutes + "";
    }

    get secondsCount(): string {
        return this.seconds + "";
    }

    msToTime(duration) {
        let date = new Date(null, null, null, 0, 0, 0, duration);
        this.minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        this.seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();

        if (this.minutes == 0 && this.seconds == 0) {
            timer.clearInterval(this.interval);
            this.whistle.stop();
            this.tick.stop();
        }
    }

    ngOnDestroy(): void {
        this.dataResultsubscription.unsubscribe();
        timer.clearInterval(this.interval);
        this.whistle.stop();
        this.tick.stop();
    }
}
