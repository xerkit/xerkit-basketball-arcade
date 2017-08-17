"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var AppComponent = (function () {
    function AppComponent(_page) {
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
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsZ0NBQThCO0FBQzlCLG1GQUE0RjtBQVE1RjtJQUNJLHNCQUFZLEtBQVc7UUFDbkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsdURBQXFCLENBQUMsV0FBVyxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsb0RBQWtCLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBVk8sWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQUdxQixXQUFJO09BRGQsWUFBWSxDQVd4QjtJQUFELG1CQUFDO0NBQUEsQUFYRCxJQVdDO0FBWFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9ZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IHNldEN1cnJlbnRPcmllbnRhdGlvbiwgb3JpZW50YXRpb25DbGVhbnVwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNjcmVlbi1vcmllbnRhdGlvbic7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihfcGFnZTogUGFnZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuIl19