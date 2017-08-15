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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUMvQixtRkFBZ0Y7QUFRaEY7SUFFSSxnQ0FBb0IsS0FBVyxFQUFVLGtCQUFxQztRQUExRCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtJQUFHLENBQUM7SUFBQSxDQUFDO0lBRW5GLHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELCtDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVZRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FHNkIsV0FBSSxFQUE4QixzQ0FBaUI7T0FGckUsc0JBQXNCLENBV2xDO0lBQUQsNkJBQUM7Q0FBQSxBQVhELElBV0M7QUFYWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZVwiXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImxhbmRpbmdTY3JlZW5cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xhbmRpbmctc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbGFuZGluZy1zY3JlZW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZGluZ1NjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7fTtcclxuICAgIFxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvVG9QbGF5U2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlVG9QbGF5U2NyZWVuKGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==