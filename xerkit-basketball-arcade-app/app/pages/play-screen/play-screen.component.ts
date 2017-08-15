import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";

@Component({
    selector: "playScreen",
    moduleId: module.id,
    templateUrl: "./play-screen.component.html",
    styleUrls: ["./play-screen-common.css"]
})
export class PlayScreenComponent implements OnInit {

    constructor(private _page: Page) {};
    
    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }
}