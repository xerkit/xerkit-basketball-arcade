"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var top_score_screen_component_1 = require("./pages/top-score-screen/top-score-screen.component");
var core_1 = require("@angular/core");
var play_screen_component_1 = require("./pages/play-screen/play-screen.component");
var landing_screen_component_1 = require("./pages/landing-screen/landing-screen.component");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/landing-screen", pathMatch: "full" },
    { path: "landing-screen", component: landing_screen_component_1.LandingScreenComponent },
    { path: "play-screen", component: play_screen_component_1.PlayScreenComponent },
    { path: "top-score-screen", component: top_score_screen_component_1.TopScoreScreenComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtHQUE4RjtBQUM5RixzQ0FBeUM7QUFDekMsbUZBQWdGO0FBQ2hGLDRGQUF5RjtBQUN6RixzREFBdUU7QUFJdkUsSUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBQztJQUM1RCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLDJDQUFtQixFQUFDO0lBQ3RELEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRyxvREFBdUIsRUFBQztDQUNuRSxDQUFDO0FBTUY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb3BTY29yZVNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvdG9wLXNjb3JlLXNjcmVlbi90b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQbGF5U2NyZWVuQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvcGxheS1zY3JlZW4vcGxheS1zY3JlZW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMYW5kaW5nU2NyZWVuQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbGFuZGluZy1zY3JlZW4vbGFuZGluZy1zY3JlZW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvbGFuZGluZy1zY3JlZW5cIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxuICAgIHsgcGF0aDogXCJsYW5kaW5nLXNjcmVlblwiLCBjb21wb25lbnQ6IExhbmRpbmdTY3JlZW5Db21wb25lbnR9LFxuICAgIHsgcGF0aDogXCJwbGF5LXNjcmVlblwiLCBjb21wb25lbnQ6IFBsYXlTY3JlZW5Db21wb25lbnR9LFxuICAgIHsgcGF0aDogXCJ0b3Atc2NvcmUtc2NyZWVuXCIsIGNvbXBvbmVudDogIFRvcFNjb3JlU2NyZWVuQ29tcG9uZW50fVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH0iXX0=