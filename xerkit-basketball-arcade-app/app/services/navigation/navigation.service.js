"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var NavigationService = (function () {
    function NavigationService(_router) {
        this._router = _router;
    }
    NavigationService.prototype.backToPreviousPage = function () {
        if (this._router.canGoBack()) {
            this._router.back();
        }
        else {
            this.navigateToLandingScreen(true);
        }
    };
    NavigationService.prototype.navigateToPlayScreen = function (clearHistory) {
        if (clearHistory === void 0) { clearHistory = false; }
        this._router.navigate(["/play-screen"], { clearHistory: clearHistory });
    };
    NavigationService.prototype.navigateToLandingScreen = function (clearHistory) {
        if (clearHistory === void 0) { clearHistory = false; }
        this._router.navigate(["/landing-screen"], { clearHistory: clearHistory });
    };
    NavigationService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    NavigationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions])
    ], NavigationService);
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXdEO0FBQ3hELHNDQUEyQztBQUUzQyw4QkFBcUM7QUFFckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUcvQjtJQUNFLDJCQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtJQUFHLENBQUM7SUFFMUMsOENBQWtCLEdBQXpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxtREFBdUIsR0FBOUIsVUFBK0IsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLHdDQUFZLEdBQXBCLFVBQXFCLEtBQWU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQXRCVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFa0IsdUNBQWdCO09BRGxDLGlCQUFpQixDQXVCN0I7SUFBRCx3QkFBQztDQUFBLEFBdkJELElBdUJDO0FBdkJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gICAgZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7fVxyXG4gIFxyXG4gIHB1YmxpYyBiYWNrVG9QcmV2aW91c1BhZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5fcm91dGVyLmNhbkdvQmFjaygpKSB7XHJcbiAgICAgIHRoaXMuX3JvdXRlci5iYWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9MYW5kaW5nU2NyZWVuKHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5hdmlnYXRlVG9QbGF5U2NyZWVuKGNsZWFySGlzdG9yeTogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvcGxheS1zY3JlZW5cIl0sIHsgY2xlYXJIaXN0b3J5OiBjbGVhckhpc3RvcnkgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmF2aWdhdGVUb0xhbmRpbmdTY3JlZW4oY2xlYXJIaXN0b3J5OiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9sYW5kaW5nLXNjcmVlblwiXSwgeyBjbGVhckhpc3Rvcnk6IGNsZWFySGlzdG9yeSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgfVxyXG59Il19