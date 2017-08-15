import { Component, OnInit } from "@angular/core";

@Component({
    selector: "top-score-screen-component",
    moduleId: module.id,
    templateUrl: "./top-score-screen.component.html",
    styleUrls: ["./top-score-screen-common.css"]
})
export class TopScoreScreenComponent implements OnInit {
    

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    
    ngOnInit() {

    }
}