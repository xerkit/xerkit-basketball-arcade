"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var sound = require('nativescript-sound');
var PlayScreenComponent = (function () {
    function PlayScreenComponent(_page) {
        this._page = _page;
    }
    ;
    PlayScreenComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        this.playWhistle();
    };
    PlayScreenComponent.prototype.playWhistle = function () {
        var whistle = sound.create("~/sounds/whistle.mp3").play();
    };
    PlayScreenComponent = __decorate([
        core_1.Component({
            selector: "playScreen",
            moduleId: module.id,
            templateUrl: "./play-screen.component.html",
            styleUrls: ["./play-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], PlayScreenComponent);
    return PlayScreenComponent;
}());
exports.PlayScreenComponent = PlayScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGdDQUErQjtBQUUvQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQVExQztJQUNJLDZCQUFvQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtJQUFHLENBQUM7SUFBQSxDQUFDO0lBRXBDLHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUNJLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBVlEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQUU2QixXQUFJO09BRHRCLG1CQUFtQixDQVcvQjtJQUFELDBCQUFDO0NBQUEsQUFYRCxJQVdDO0FBWFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmxldCBzb3VuZCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zb3VuZCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwbGF5U2NyZWVuXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYXktc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BsYXktc2NyZWVuLWNvbW1vbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUGxheVNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSkge307XG4gICAgXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5V2hpc3RsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5V2hpc3RsZSgpIHtcbiAgICAgICAgbGV0IHdoaXN0bGUgPSBzb3VuZC5jcmVhdGUoXCJ+L3NvdW5kcy93aGlzdGxlLm1wM1wiKS5wbGF5KCk7XG4gICAgfVxufSJdfQ==