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
    NavigationService.prototype.navigateToTopScoreScreen = function (clearHistory) {
        if (clearHistory === void 0) { clearHistory = false; }
        this._router.navigate(["/top-score-screen"], { clearHistory: clearHistory });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXdEO0FBQ3hELHNDQUEyQztBQUUzQyw4QkFBcUM7QUFFckMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUcvQjtJQUNFLDJCQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtJQUFHLENBQUM7SUFFMUMsOENBQWtCLEdBQXpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxtREFBdUIsR0FBOUIsVUFBK0IsWUFBNkI7UUFBN0IsNkJBQUEsRUFBQSxvQkFBNkI7UUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLG9EQUF3QixHQUEvQixVQUFnQyxZQUE2QjtRQUE3Qiw2QkFBQSxFQUFBLG9CQUE2QjtRQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU8sd0NBQVksR0FBcEIsVUFBcUIsS0FBZTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBMUJVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUVrQix1Q0FBZ0I7T0FEbEMsaUJBQWlCLENBMkI3QjtJQUFELHdCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgeyBTdWJqZWN0IH0gICAgZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zKSB7fVxuICBcbiAgcHVibGljIGJhY2tUb1ByZXZpb3VzUGFnZSgpIHtcbiAgICBpZiAodGhpcy5fcm91dGVyLmNhbkdvQmFjaygpKSB7XG4gICAgICB0aGlzLl9yb3V0ZXIuYmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG9MYW5kaW5nU2NyZWVuKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuYXZpZ2F0ZVRvUGxheVNjcmVlbihjbGVhckhpc3Rvcnk6IGJvb2xlYW4gPSBmYWxzZSl7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9wbGF5LXNjcmVlblwiXSwgeyBjbGVhckhpc3Rvcnk6IGNsZWFySGlzdG9yeSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuYXZpZ2F0ZVRvTGFuZGluZ1NjcmVlbihjbGVhckhpc3Rvcnk6IGJvb2xlYW4gPSBmYWxzZSl7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcIi9sYW5kaW5nLXNjcmVlblwiXSwgeyBjbGVhckhpc3Rvcnk6IGNsZWFySGlzdG9yeSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuYXZpZ2F0ZVRvVG9wU2NvcmVTY3JlZW4oY2xlYXJIaXN0b3J5OiBib29sZWFuID0gZmFsc2Upe1xuICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXCIvdG9wLXNjb3JlLXNjcmVlblwiXSwgeyBjbGVhckhpc3Rvcnk6IGNsZWFySGlzdG9yeSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufSJdfQ==