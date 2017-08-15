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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXdEO0FBQ3hELHNDQUEyQztBQUUzQyw4QkFBcUM7QUFFckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUcvQjtJQUNFLDJCQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtJQUFHLENBQUM7SUFFMUMsOENBQWtCLEdBQXpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxtREFBdUIsR0FBOUIsVUFBK0IsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVPLHdDQUFZLEdBQXBCLFVBQXFCLEtBQWU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQXRCVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFa0IsdUNBQWdCO09BRGxDLGlCQUFpQixDQXVCN0I7SUFBRCx3QkFBQztDQUFBLEFBdkJELElBdUJDO0FBdkJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xuaW1wb3J0IHsgU3ViamVjdCB9ICAgIGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyRXh0ZW5zaW9ucykge31cbiAgXG4gIHB1YmxpYyBiYWNrVG9QcmV2aW91c1BhZ2UoKSB7XG4gICAgaWYgKHRoaXMuX3JvdXRlci5jYW5Hb0JhY2soKSkge1xuICAgICAgdGhpcy5fcm91dGVyLmJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZpZ2F0ZVRvTGFuZGluZ1NjcmVlbih0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmF2aWdhdGVUb1BsYXlTY3JlZW4oY2xlYXJIaXN0b3J5OiBib29sZWFuID0gZmFsc2Upe1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvcGxheS1zY3JlZW5cIl0sIHsgY2xlYXJIaXN0b3J5OiBjbGVhckhpc3RvcnkgfSk7XG4gIH1cblxuICBwdWJsaWMgbmF2aWdhdGVUb0xhbmRpbmdTY3JlZW4oY2xlYXJIaXN0b3J5OiBib29sZWFuID0gZmFsc2Upe1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvbGFuZGluZy1zY3JlZW5cIl0sIHsgY2xlYXJIaXN0b3J5OiBjbGVhckhpc3RvcnkgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn0iXX0=