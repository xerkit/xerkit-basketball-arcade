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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9wLXNjb3JlLXNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQyxnQ0FBOEI7QUFDOUIsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9ELG1GQUE0RjtBQVE1RjtJQUNJLGlDQUFZLEtBQVc7UUFDbkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsdURBQXFCLENBQUMsV0FBVyxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsb0RBQWtCLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBVk8sdUJBQXVCO1FBUG5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBR3FCLFdBQUk7T0FEZCx1QkFBdUIsQ0FXbkM7SUFBRCw4QkFBQztDQUFBLEFBWEQsSUFXQztBQVhZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfWZyb20gXCJ1aS9wYWdlXCI7XHJcbnJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XHJcblxyXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnQW5vdGhlciBQbHVnaW4nLCAnQnkgTWFzdGVyIFRlY2hub2xvZ3knKTtcclxuXHJcbmltcG9ydCB7IHNldEN1cnJlbnRPcmllbnRhdGlvbiwgb3JpZW50YXRpb25DbGVhbnVwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNjcmVlbi1vcmllbnRhdGlvbic7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG9wLXNjb3JlLXNjcmVlbi1jb21wb25lbnRcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RvcC1zY29yZS1zY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi90b3Atc2NvcmUtc2NyZWVuLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3BTY29yZVNjcmVlbkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihfcGFnZTogUGFnZSkge1xyXG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGVkVG9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZXRDdXJyZW50T3JpZW50YXRpb24oXCJsYW5kc2NhcGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbkNsZWFudXAoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn0iXX0=