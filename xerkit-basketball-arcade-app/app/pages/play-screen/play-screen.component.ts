let sound = require('nativescript-sound');
import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { prompt, PromptResult, inputType } from "ui/dialogs";

import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import timer = require("timer");

@Component({
    selector: "playScreen",
    moduleId: module.id,
    templateUrl: "./play-screen.component.html",
    styleUrls: ["./play-screen-common.css"]
})
export class PlayScreenComponent implements OnInit {
    time: number = 150000;
    seconds: any = 2;
    minutes: any = "3" +"0";
    interval: any;

    tick = sound.create("~/sounds/tick.mp3");
    whistle = sound.create("~/sounds/whistle.mp3");

    constructor(private _page: Page, private _ngZone: NgZone) {
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
    }

    playWhistle() {
        this.whistle.play();
        this.interval = timer.setInterval(() => { this.decrementTimer() }, 1000);
        setTimeout(this.showInputTopScoreDialog, this.time);
    }

    showInputTopScoreDialog() {
        // if(Among Top Score) {
        let options = {
            title: "Name",
            defaultText: "Enter your name",
            inputType: inputType.text,
            okButtonText: "Ok"
        };

        prompt(options).then((result: PromptResult) => {
            console.log("Hello, " + result.text);
        });
        // }
    }

    decrementTimer() {
        this.time = this.time - 1000;
        this.msToTime(this.time);
        this.tick.play();
    }

    get timerCount(): string {
        return this.minutes + ":" + this.seconds;
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
        timer.clearInterval(this.interval);
        this.whistle.stop();
        this.tick.stop();
    }
}