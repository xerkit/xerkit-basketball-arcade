import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { NavigationService } from "../../services/navigation/navigation.service"

@Component({
    selector: "landingScreen",
    moduleId: module.id,
    templateUrl: "./landing-screen.component.html",
    styleUrls: ["./landing-screen-common.css"]
})
export class LandingScreenComponent implements OnInit {

    constructor(private _page: Page, private _navigationService: NavigationService) {};
    
    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }

    goToPlayScreen() {
        this._navigationService.navigateToPlayScreen(false);
    }

    goToTopScoreScreen() {
        this._navigationService.navigateToTopScoreScreen(false);
    }
}