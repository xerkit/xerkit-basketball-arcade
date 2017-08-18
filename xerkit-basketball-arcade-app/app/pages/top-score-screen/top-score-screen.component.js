"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
require("nativescript-localstorage");
localStorage.setItem('Another Plugin', 'By Master Technology');
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var TopScoreScreenComponent = (function () {
    function TopScoreScreenComponent(_page) {
        _page.on("navigatedTo", function () {
            nativescript_screen_orientation_1.setCurrentOrientation("landscape", function () {
                console.log("landscape orientation");
            });
        });
        _page.on("navigatingFrom", function () {
            nativescript_screen_orientation_1.orientationCleanup();
        });
    }
    ;
    TopScoreScreenComponent = __decorate([
        core_1.Component({
            selector: "top-score-screen-component",
            moduleId: module.id,
            templateUrl: "./top-score-screen.component.html",
            styleUrls: ["./top-score-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], TopScoreScreenComponent);
    return TopScoreScreenComponent;
}());
exports.TopScoreScreenComponent = TopScoreScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXNjb3JlLXNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxnQ0FBOEI7QUFDOUIsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9ELG1GQUE0RjtBQVE1RjtJQUNJLGlDQUFZLEtBQVc7UUFDbkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsdURBQXFCLENBQUMsV0FBVyxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsb0RBQWtCLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBVk8sdUJBQXVCO1FBUG5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBR3FCLFdBQUk7T0FEZCx1QkFBdUIsQ0FXbkM7SUFBRCw4QkFBQztDQUFBLEFBWEQsSUFXQztBQVhZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH1mcm9tIFwidWkvcGFnZVwiO1xucmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0Fub3RoZXIgUGx1Z2luJywgJ0J5IE1hc3RlciBUZWNobm9sb2d5Jyk7XG5cbmltcG9ydCB7IHNldEN1cnJlbnRPcmllbnRhdGlvbiwgb3JpZW50YXRpb25DbGVhbnVwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNjcmVlbi1vcmllbnRhdGlvbic7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0b3Atc2NvcmUtc2NyZWVuLWNvbXBvbmVudFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3RvcC1zY29yZS1zY3JlZW4tY29tbW9uLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIFRvcFNjb3JlU2NyZWVuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihfcGFnZTogUGFnZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59Il19