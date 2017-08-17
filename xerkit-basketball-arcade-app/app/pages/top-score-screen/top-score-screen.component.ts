import { Component } from "@angular/core";
import { Page }from "ui/page";

import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
@Component({
    selector: "top-score-screen-component",
    moduleId: module.id,
    templateUrl: "./top-score-screen.component.html",
    styleUrls: ["./top-score-screen-common.css"]
})

export class TopScoreScreenComponent {
    constructor(_page: Page) {
        _page.on("navigatedTo", function () {
            setCurrentOrientation("landscape", function () {
                console.log("landscape orientation");
            });
        });
        _page.on("navigatingFrom", function () {
            orientationCleanup();
        });
    };
}