"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("ui/dialogs");
var bluetooth_service_1 = require("../../services/bluetooth/bluetooth.service");
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var timer = require("timer");
var sound = require('nativescript-sound');
var PlayScreenComponent = (function () {
    function PlayScreenComponent(_page, _ngZone, _bluetoothService) {
        this._page = _page;
        this._ngZone = _ngZone;
        this._bluetoothService = _bluetoothService;
        this.time = 150000;
        this.seconds = 2;
        this.minutes = "3" + "0";
        this.score = 0;
        this.tick = sound.create("~/sounds/tick.mp3");
        this.whistle = sound.create("~/sounds/whistle.mp3");
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
        var _this = this;
        this._page.actionBarHidden = true;
        var self = this;
        setTimeout(this.playWhistle(), 2000);
        this.dataResultsubscription = this._bluetoothService.dataResult$.subscribe(function (result) {
            if (result) {
                _this.score = _this.score + 1;
            }
        });
    };
    PlayScreenComponent.prototype.playWhistle = function () {
        var _this = this;
        this.whistle.play();
        this.interval = timer.setInterval(function () { _this.decrementTimer(); }, 1000); //play only at the last 10 secs
        setTimeout(this.showInputTopScoreDialog, this.time);
    };
    Object.defineProperty(PlayScreenComponent.prototype, "basketScore", {
        get: function () {
            return this.score + "";
        },
        enumerable: true,
        configurable: true
    });
    PlayScreenComponent.prototype.showInputTopScoreDialog = function () {
        // if(Among Top Score) {
        var options = {
            title: "Name",
            defaultText: "Enter your name",
            inputType: dialogs_1.inputType.text,
            okButtonText: "Ok"
        };
        dialogs_1.prompt(options).then(function (result) {
            console.log("Hello, " + result.text);
        });
        // }
    };
    PlayScreenComponent.prototype.decrementTimer = function () {
        this.time = this.time - 1000;
        this.msToTime(this.time);
        //this.tick.play();
    };
    Object.defineProperty(PlayScreenComponent.prototype, "minutesCount", {
        get: function () {
            return this.minutes + "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayScreenComponent.prototype, "secondsCount", {
        get: function () {
            return this.seconds + "";
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
            this.whistle.stop();
            this.tick.stop();
        }
    };
    PlayScreenComponent.prototype.ngOnDestroy = function () {
        this.dataResultsubscription.unsubscribe();
        timer.clearInterval(this.interval);
        this.whistle.stop();
        this.tick.stop();
    };
    PlayScreenComponent = __decorate([
        core_1.Component({
            selector: "playScreen",
            moduleId: module.id,
            templateUrl: "./play-screen.component.html",
            styleUrls: ["./play-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, core_1.NgZone, bluetooth_service_1.BluetoothService])
    ], PlayScreenComponent);
    return PlayScreenComponent;
}());
exports.PlayScreenComponent = PlayScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXFFO0FBQ3JFLGdDQUErQjtBQUMvQixzQ0FBNkQ7QUFDN0QsZ0ZBQThFO0FBRTlFLG1GQUE0RjtBQUM1Riw2QkFBZ0M7QUFFaEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFTMUM7SUFZSSw2QkFBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxpQkFBbUM7UUFBakYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBWHJHLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFPLEdBQVEsR0FBRyxHQUFFLEdBQUcsQ0FBQztRQUV4QixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBSWYsU0FBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6QyxZQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRzNDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHVEQUFxQixDQUFDLFdBQVcsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLG9EQUFrQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUVGLHNDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxLQUFLLENBQUMs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QUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBM0ZRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FhNkIsV0FBSSxFQUFtQixhQUFNLEVBQTZCLG9DQUFnQjtPQVo1RixtQkFBbUIsQ0E0Ri9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVGRCxJQTRGQztBQTVGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IHByb21wdCwgUHJvbXB0UmVzdWx0LCBpbnB1dFR5cGUgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBCbHVldG9vdGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmx1ZXRvb3RoL2JsdWV0b290aC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IHNldEN1cnJlbnRPcmllbnRhdGlvbiwgb3JpZW50YXRpb25DbGVhbnVwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNjcmVlbi1vcmllbnRhdGlvbic7XHJcbmltcG9ydCB0aW1lciA9IHJlcXVpcmUoXCJ0aW1lclwiKTtcclxuXHJcbmxldCBzb3VuZCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zb3VuZCcpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwicGxheVNjcmVlblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGxheS1zY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wbGF5LXNjcmVlbi1jb21tb24uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbGF5U2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgdGltZTogbnVtYmVyID0gMTUwMDAwO1xyXG4gICAgc2Vjb25kczogYW55ID0gMjtcclxuICAgIG1pbnV0ZXM6IGFueSA9IFwiM1wiICtcIjBcIjtcclxuICAgIGludGVydmFsOiBhbnk7XHJcbiAgICBzY29yZTogYW55ID0gMDtcclxuXHJcbiAgICBkYXRhUmVzdWx0c3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgdGljayA9IHNvdW5kLmNyZWF0ZShcIn4vc291bmRzL3RpY2subXAzXCIpO1xyXG4gICAgd2hpc3RsZSA9IHNvdW5kLmNyZWF0ZShcIn4vc291bmRzL3doaXN0bGUubXAzXCIpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9ibHVldG9vdGhTZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgX3BhZ2Uub24oXCJuYXZpZ2F0ZWRUb1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBvcmllbnRhdGlvblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3BhZ2Uub24oXCJuYXZpZ2F0aW5nRnJvbVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uQ2xlYW51cCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5V2hpc3RsZSgpLCAyMDAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhUmVzdWx0c3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5kYXRhUmVzdWx0JC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSB0aGlzLnNjb3JlICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlXaGlzdGxlKCkge1xyXG4gICAgICAgIHRoaXMud2hpc3RsZS5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHRpbWVyLnNldEludGVydmFsKCgpID0+IHsgdGhpcy5kZWNyZW1lbnRUaW1lcigpIH0sIDEwMDApOyAvL3BsYXkgb25seSBhdCB0aGUgbGFzdCAxMCBzZWNzXHJcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnNob3dJbnB1dFRvcFNjb3JlRGlhbG9nLCB0aGlzLnRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBiYXNrZXRTY29yZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjb3JlICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SW5wdXRUb3BTY29yZURpYWxvZygpIHtcclxuICAgICAgICAvLyBpZihBbW9uZyBUb3AgU2NvcmUpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTmFtZVwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0VGV4dDogXCJFbnRlciB5b3VyIG5hbWVcIixcclxuICAgICAgICAgICAgaW5wdXRUeXBlOiBpbnB1dFR5cGUudGV4dCxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcm9tcHQob3B0aW9ucykudGhlbigocmVzdWx0OiBQcm9tcHRSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbywgXCIgKyByZXN1bHQudGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGRlY3JlbWVudFRpbWVyKCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRoaXMudGltZSAtIDEwMDA7XHJcbiAgICAgICAgdGhpcy5tc1RvVGltZSh0aGlzLnRpbWUpO1xyXG4gICAgICAgIC8vdGhpcy50aWNrLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWludXRlc0NvdW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcyArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlY29uZHNDb3VudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlY29uZHMgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG1zVG9UaW1lKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShudWxsLCBudWxsLCBudWxsLCAwLCAwLCAwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gKGRhdGUuZ2V0TWludXRlcygpIDwgMTApID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IChkYXRlLmdldFNlY29uZHMoKSA8IDEwKSA/IFwiMFwiICsgZGF0ZS5nZXRTZWNvbmRzKCkgOiBkYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWludXRlcyA9PSAwICYmIHRoaXMuc2Vjb25kcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMud2hpc3RsZS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGljay5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGF0YVJlc3VsdHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRpbWVyLmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy53aGlzdGxlLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnRpY2suc3RvcCgpO1xyXG4gICAgfVxyXG59Il19