import { stretchLastChildProperty } from 'tns-core-modules/ui/layouts/dock-layout';
import { Component, OnInit, NgZone } from "@angular/core";
import { Page } from "ui/page";

import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import { LeaderBoard, Player } from "../../models/leader-board.model";

@Component({
    selector: "top-score-screen-component",
    moduleId: module.id,
    templateUrl: "./top-score-screen.component.html",
    styleUrls: ["./top-score-screen-common.css"],
    providers: [LeaderBoard]
})
export class TopScoreScreenComponent implements OnInit {
    topScore: Array<any> = [];

    constructor(private _page: Page, private _leaderBoard: LeaderBoard) {
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
        this.topScore = (this._leaderBoard.getNameScore()) || [];
    }

}
