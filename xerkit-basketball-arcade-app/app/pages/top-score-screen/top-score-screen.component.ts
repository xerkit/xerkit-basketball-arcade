import { stretchLastChildProperty } from 'tns-core-modules/ui/layouts/dock-layout';
let sound = require('nativescript-sound');
import { Component, OnInit, NgZone } from "@angular/core";
import { Page } from "ui/page";
require( "nativescript-localstorage" );

localStorage.setItem('Another Plugin', 'By Master Technology');

import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import timer = require('timer');

@Component({
    selector: "top-score-screen-component",
    moduleId: module.id,
    templateUrl: "./top-score-screen.component.html",
    styleUrls: ["./top-score-screen-common.css"]
})
export class TopScoreScreenComponent implements OnInit {
    time: number = 150000;
    seconds: any = 0;
    minutes: any = 0;
    interval: any;
    playerRow: Number = 0;
    playersName: Array<String> = ["Mark" ,"Mikee","Raven","Francis","Edsil"];

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
        let whistle = sound.create("~/sounds/whistle.mp3").play();
        this.interval = timer.setInterval(() => {this.decrementTimer()}, 1000);
    }

    decrementTimer() {
        this.time = this.time - 1000;
        this.msToTime(this.time);
    }

    playersRow( index ): Number {
        return this.playerRow = index + 1;
    }

    get timerCount(): string {
        return this.minutes + ":" + this.seconds;
    }

    get scoreOne(): string {
        return "25";
    }
    get scoreTwo(): string {
        return "24";
    }
    get scoreThree(): string {
        return "23";
    }
    get scoreFour(): string {
        return "22";
    }
    get scoreFive(): string {
        return "21";
    }





    msToTime(duration) {
        let date = new Date(null, null, null, 0, 0, 0, duration);
        this.minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        this.seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();

        if(this.minutes == 0 && this.seconds == 0) {
            timer.clearInterval(this.interval);
            //show score or if among top score show input dialog for leaderboard
        }
    }
}
