"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var navigation_service_1 = require("../../services/navigation/navigation.service");
var LandingScreenComponent = (function () {
    function LandingScreenComponent(_page, _navigationService) {
        this._page = _page;
        this._navigationService = _navigationService;
    }
    ;
    LandingScreenComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
    };
    LandingScreenComponent.prototype.goToPlayScreen = function () {
        this._navigationService.navigateToPlayScreen(false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUMvQixtRkFBZ0Y7QUFRaEY7SUFFSSxnQ0FBb0IsS0FBVyxFQUFVLGtCQUFxQztRQUExRCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtJQUFHLENBQUM7SUFBQSxDQUFDO0lBRW5GLHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELCtDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVZRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FHNkIsV0FBSSxFQUE4QixzQ0FBaUI7T0FGckUsc0JBQXNCLENBV2xDO0lBQUQsNkJBQUM7Q0FBQSxBQVhELElBV0M7QUFYWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCJcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibGFuZGluZ1NjcmVlblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sYW5kaW5nLXNjcmVlbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9sYW5kaW5nLXNjcmVlbi1jb21tb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExhbmRpbmdTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7fTtcbiAgICBcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGdvVG9QbGF5U2NyZWVuKCkge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZVRvUGxheVNjcmVlbihmYWxzZSk7XG4gICAgfVxufSJdfQ==