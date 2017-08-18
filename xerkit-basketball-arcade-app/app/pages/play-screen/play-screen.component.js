"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sound = require('nativescript-sound');
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var timer = require("timer");
var PlayScreenComponent = (function () {
    function PlayScreenComponent(_page, _ngZone) {
        this._page = _page;
        this._ngZone = _ngZone;
        this.time = 150000;
        this.seconds = 0;
        this.minutes = 0;
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
    PlayScreenComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        var self = this;
        setTimeout(this.playWhistle(), 2000);
    };
    PlayScreenComponent.prototype.playWhistle = function () {
        var _this = this;
        var whistle = sound.create("~/sounds/whistle.mp3").play();
        this.interval = timer.setInterval(function () { _this.decrementTimer(); }, 1000);
    };
    PlayScreenComponent.prototype.decrementTimer = function () {
        this.time = this.time - 1000;
        this.msToTime(this.time);
    };
    Object.defineProperty(PlayScreenComponent.prototype, "timerCount", {
        get: function () {
            return this.minutes + ":" + this.seconds;
        },
        enumerable: true,
        configurable: true
    });
    PlayScreenComponent.prototype.msToTime = function (duration) {
        var date = new Date(null, null, null, 0, 0, 0, duration);
        this.minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        this.seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
        if (this.minutes == 0 && this.seconds == 0) {
            timer.clearInterval(this.interval);
            //show score or if among top score show input dialog for leaderboard
        }
    };
    PlayScreenComponent = __decorate([
        core_1.Component({
            selector: "playScreen",
            moduleId: module.id,
            templateUrl: "./play-screen.component.html",
            styleUrls: ["./play-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, core_1.NgZone])
    ], PlayScreenComponent);
    return PlayScreenComponent;
}());
exports.PlayScreenComponent = PlayScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsc0NBQTBEO0FBQzFELGdDQUErQjtBQUUvQixtRkFBNEY7QUFDNUYsNkJBQWdDO0FBUWhDO0lBTUksNkJBQW9CLEtBQVcsRUFBVSxPQUFlO1FBQXBDLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTHhELFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFPLEdBQVEsQ0FBQyxDQUFDO1FBSWIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsdURBQXFCLENBQUMsV0FBVyxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsb0RBQWtCLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBRUYsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUFBLGlCQUdDO1FBRkcsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFPLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHNCQUFJLDJDQUFVO2FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNDQUFRLEdBQVIsVUFBUyxRQUFRO1FBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0RixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXRGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxvRUFBb0U7UUFDeEUsQ0FBQztJQUNMLENBQUM7SUE5Q1EsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxDQUFDO3lDQU82QixXQUFJLEVBQW1CLGFBQU07T0FOL0MsbUJBQW1CLENBK0MvQjtJQUFELDBCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNvdW5kID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXNvdW5kJyk7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBzZXRDdXJyZW50T3JpZW50YXRpb24sIG9yaWVudGF0aW9uQ2xlYW51cCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zY3JlZW4tb3JpZW50YXRpb24nO1xuaW1wb3J0IHRpbWVyID0gcmVxdWlyZShcInRpbWVyXCIpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwbGF5U2NyZWVuXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYXktc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BsYXktc2NyZWVuLWNvbW1vbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgUGxheVNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGltZTogbnVtYmVyID0gMTUwMDAwO1xuICAgIHNlY29uZHM6IGFueSA9IDA7XG4gICAgbWludXRlczogYW55ID0gMDtcbiAgICBpbnRlcnZhbDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgX3BhZ2Uub24oXCJuYXZpZ2F0ZWRUb1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRDdXJyZW50T3JpZW50YXRpb24oXCJsYW5kc2NhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZHNjYXBlIG9yaWVudGF0aW9uXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRpbmdGcm9tXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uQ2xlYW51cCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucGxheVdoaXN0bGUoKSwgMjAwMCk7XG4gICAgfVxuXG4gICAgcGxheVdoaXN0bGUoKSB7XG4gICAgICAgIGxldCB3aGlzdGxlID0gc291bmQuY3JlYXRlKFwifi9zb3VuZHMvd2hpc3RsZS5tcDNcIikucGxheSgpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gdGltZXIuc2V0SW50ZXJ2YWwoKCkgPT4ge3RoaXMuZGVjcmVtZW50VGltZXIoKX0sIDEwMDApO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFRpbWVyKCkge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUgLSAxMDAwO1xuICAgICAgICB0aGlzLm1zVG9UaW1lKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVyQ291bnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcyArIFwiOlwiICsgdGhpcy5zZWNvbmRzO1xuICAgIH1cblxuICAgIG1zVG9UaW1lKGR1cmF0aW9uKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUobnVsbCwgbnVsbCwgbnVsbCwgMCwgMCwgMCwgZHVyYXRpb24pO1xuICAgICAgICB0aGlzLm1pbnV0ZXMgPSAoZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCkgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IChkYXRlLmdldFNlY29uZHMoKSA8IDEwKSA/IFwiMFwiICsgZGF0ZS5nZXRTZWNvbmRzKCkgOiBkYXRlLmdldFNlY29uZHMoKTtcblxuICAgICAgICBpZih0aGlzLm1pbnV0ZXMgPT0gMCAmJiB0aGlzLnNlY29uZHMgPT0gMCkge1xuICAgICAgICAgICAgdGltZXIuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIC8vc2hvdyBzY29yZSBvciBpZiBhbW9uZyB0b3Agc2NvcmUgc2hvdyBpbnB1dCBkaWFsb2cgZm9yIGxlYWRlcmJvYXJkXG4gICAgICAgIH1cbiAgICB9XG59Il19