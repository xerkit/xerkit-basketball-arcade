"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var top_score_screen_component_1 = require("./pages/top-score-screen/top-score-screen.component");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var landing_screen_component_1 = require("./pages/landing-screen/landing-screen.component");
var play_screen_component_1 = require("./pages/play-screen/play-screen.component");
var navigation_service_1 = require("./services/navigation/navigation.service");
var bluetooth_service_1 = require("./services/bluetooth/bluetooth.service");
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
var AppModule = (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                landing_screen_component_1.LandingScreenComponent,
                play_screen_component_1.PlayScreenComponent,
                top_score_screen_component_1.TopScoreScreenComponent
            ],
            providers: [
                navigation_service_1.NavigationService,
                bluetooth_service_1.BluetoothService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrR0FBOEY7QUFDOUYsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUM5RSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBRS9DLDRGQUF5RjtBQUN6RixtRkFBZ0Y7QUFDaEYsK0VBQTZFO0FBQzdFLDRFQUEwRTtBQUUxRSwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBRXhFLDZFQUE2RTtBQUM3RSxzRUFBc0U7QUEyQnRFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXpCckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw4QkFBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osaURBQXNCO2dCQUN0QiwyQ0FBbUI7Z0JBQ25CLG9EQUF1QjthQUMxQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxzQ0FBaUI7Z0JBQ2pCLG9DQUFnQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb3BTY29yZVNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvdG9wLXNjb3JlLXNjcmVlbi90b3Atc2NvcmUtc2NyZWVuLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IExhbmRpbmdTY3JlZW5Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9sYW5kaW5nLXNjcmVlbi9sYW5kaW5nLXNjcmVlbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGxheVNjcmVlbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3BsYXktc2NyZWVuL3BsYXktc2NyZWVuLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJsdWV0b290aFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9ibHVldG9vdGgvYmx1ZXRvb3RoLnNlcnZpY2VcIjtcclxuXHJcbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHR3by13YXkgYmluZGluZ1xyXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5cclxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyAgaWYgeW91IG5lZWQgdG8gdXNlIHRoZSBIVFRQIHdyYXBwZXJcclxuLy8gaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExhbmRpbmdTY3JlZW5Db21wb25lbnQsXHJcbiAgICAgICAgUGxheVNjcmVlbkNvbXBvbmVudCxcclxuICAgICAgICBUb3BTY29yZVNjcmVlbkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIEJsdWV0b290aFNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG4vKlxyXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==