"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var navigation_service_1 = require("../../services/navigation/navigation.service");
var LandingScreenComponent = (function () {
    function LandingScreenComponent(_page, _navigationService) {
        this._page = _page;
        this._navigationService = _navigationService;
        this.isBluetoothConnected = false;
    }
    ;
    LandingScreenComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    LandingScreenComponent.prototype.goToPlayScreen = function () {
        this._navigationService.navigateToPlayScreen(false);
    };
    LandingScreenComponent.prototype.goToTopScoreScreen = function () {
        this._navigationService.navigateToTopScoreScreen(false);
    };
    Object.defineProperty(LandingScreenComponent.prototype, "bluetoothIcon", {
        get: function () {
            return this.isBluetoothConnected ? "res://bluetooth_button_connected" : "res://bluetooth_button_disconnected";
        },
        enumerable: true,
        configurable: true
    });
    LandingScreenComponent.prototype.toggleBluetoothIcon = function () {
        this.isBluetoothConnected = !this.isBluetoothConnected;
    };
    LandingScreenComponent = __decorate([
        core_1.Component({
            selector: "landingScreen",
            moduleId: module.id,
            templateUrl: "./landing-screen.component.html",
            styleUrls: ["./landing-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, navigation_service_1.NavigationService])
    ], LandingScreenComponent);
    return LandingScreenComponent;
}());
exports.LandingScreenComponent = LandingScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUMvQixtRkFBZ0Y7QUFRaEY7SUFHSSxnQ0FBb0IsS0FBVyxFQUFVLGtCQUFxQztRQUExRCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUY5RSx5QkFBb0IsR0FBWSxLQUFLLENBQUM7SUFFMkMsQ0FBQztJQUFBLENBQUM7SUFFbkYseUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsK0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsbURBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBSSxpREFBYTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsa0NBQWtDLEdBQUcscUNBQXFDLENBQUM7UUFDbEgsQ0FBQzs7O09BQUE7SUFFRCxvREFBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDM0QsQ0FBQztJQXZCUSxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzdDLENBQUM7eUNBSTZCLFdBQUksRUFBOEIsc0NBQWlCO09BSHJFLHNCQUFzQixDQXdCbEM7SUFBRCw2QkFBQztDQUFBLEFBeEJELElBd0JDO0FBeEJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2VcIlxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJsYW5kaW5nU2NyZWVuXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xhbmRpbmctc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2xhbmRpbmctc2NyZWVuLWNvbW1vbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTGFuZGluZ1NjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXNCbHVldG9vdGhDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge307XG4gICAgXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb1RvUGxheVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1BsYXlTY3JlZW4oZmFsc2UpO1xuICAgIH1cblxuICAgIGdvVG9Ub3BTY29yZVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1RvcFNjb3JlU2NyZWVuKGZhbHNlKTtcbiAgICB9XG5cbiAgICBnZXQgYmx1ZXRvb3RoSWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JsdWV0b290aENvbm5lY3RlZCA/IFwicmVzOi8vYmx1ZXRvb3RoX2J1dHRvbl9jb25uZWN0ZWRcIiA6IFwicmVzOi8vYmx1ZXRvb3RoX2J1dHRvbl9kaXNjb25uZWN0ZWRcIjtcbiAgICB9XG5cbiAgICB0b2dnbGVCbHVldG9vdGhJY29uKCkge1xuICAgICAgICB0aGlzLmlzQmx1ZXRvb3RoQ29ubmVjdGVkID0gIXRoaXMuaXNCbHVldG9vdGhDb25uZWN0ZWQ7XG4gICAgfVxufSJdfQ==