import { Component } from "@angular/core";
import { Page } from "ui/page";
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    constructor(_page:Page) {
        _page.on("navigatedTo",function(){
            setCurrentOrientation("landscape",function(){
            console.log("portrait orientation");
            });
        });
        _page.on("navigatingFrom",function(){
            orientationCleanup();
        });
     }
 }
