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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXFFO0FBQ3JFLGdDQUErQjtBQUMvQixzQ0FBNkQ7QUFDN0QsZ0ZBQThFO0FBRTlFLG1GQUE0RjtBQUM1Riw2QkFBZ0M7QUFFaEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFTMUM7SUFZSSw2QkFBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxpQkFBbUM7UUFBakYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBWHJHLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFPLEdBQVEsR0FBRyxHQUFFLEdBQUcsQ0FBQztRQUV4QixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBSWYsU0FBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6QyxZQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRzNDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHVEQUFxQixDQUFDLFdBQVcsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLG9EQUFrQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUVGLHNDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxLQUFLLENBQUMs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QUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBM0ZRLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FhNkIsV0FBSSxFQUFtQixhQUFNLEVBQTZCLG9DQUFnQjtPQVo1RixtQkFBbUIsQ0E0Ri9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVGRCxJQTRGQztBQTVGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IHByb21wdCwgUHJvbXB0UmVzdWx0LCBpbnB1dFR5cGUgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgQmx1ZXRvb3RoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JsdWV0b290aC9ibHVldG9vdGguc2VydmljZSc7XG5cbmltcG9ydCB7IHNldEN1cnJlbnRPcmllbnRhdGlvbiwgb3JpZW50YXRpb25DbGVhbnVwIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNjcmVlbi1vcmllbnRhdGlvbic7XG5pbXBvcnQgdGltZXIgPSByZXF1aXJlKFwidGltZXJcIik7XG5cbmxldCBzb3VuZCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1zb3VuZCcpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBsYXlTY3JlZW5cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGxheS1zY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vcGxheS1zY3JlZW4tY29tbW9uLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBQbGF5U2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHRpbWU6IG51bWJlciA9IDE1MDAwMDtcbiAgICBzZWNvbmRzOiBhbnkgPSAyO1xuICAgIG1pbnV0ZXM6IGFueSA9IFwiM1wiICtcIjBcIjtcbiAgICBpbnRlcnZhbDogYW55O1xuICAgIHNjb3JlOiBhbnkgPSAwO1xuXG4gICAgZGF0YVJlc3VsdHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgdGljayA9IHNvdW5kLmNyZWF0ZShcIn4vc291bmRzL3RpY2subXAzXCIpO1xuICAgIHdoaXN0bGUgPSBzb3VuZC5jcmVhdGUoXCJ+L3NvdW5kcy93aGlzdGxlLm1wM1wiKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9ibHVldG9vdGhTZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlKSB7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGVkVG9cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0Q3VycmVudE9yaWVudGF0aW9uKFwibGFuZHNjYXBlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBvcmllbnRhdGlvblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgX3BhZ2Uub24oXCJuYXZpZ2F0aW5nRnJvbVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbkNsZWFudXAoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnBsYXlXaGlzdGxlKCksIDIwMDApO1xuXG4gICAgICAgIHRoaXMuZGF0YVJlc3VsdHN1YnNjcmlwdGlvbiA9IHRoaXMuX2JsdWV0b290aFNlcnZpY2UuZGF0YVJlc3VsdCQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSB0aGlzLnNjb3JlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxheVdoaXN0bGUoKSB7XG4gICAgICAgIHRoaXMud2hpc3RsZS5wbGF5KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB0aW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMuZGVjcmVtZW50VGltZXIoKSB9LCAxMDAwKTsgLy9wbGF5IG9ubHkgYXQgdGhlIGxhc3QgMTAgc2Vjc1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc2hvd0lucHV0VG9wU2NvcmVEaWFsb2csIHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgZ2V0IGJhc2tldFNjb3JlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3JlICsgXCJcIjtcbiAgICB9XG5cbiAgICBzaG93SW5wdXRUb3BTY29yZURpYWxvZygpIHtcbiAgICAgICAgLy8gaWYoQW1vbmcgVG9wIFNjb3JlKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiTmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFRleHQ6IFwiRW50ZXIgeW91ciBuYW1lXCIsXG4gICAgICAgICAgICBpbnB1dFR5cGU6IGlucHV0VHlwZS50ZXh0LFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgfTtcblxuICAgICAgICBwcm9tcHQob3B0aW9ucykudGhlbigocmVzdWx0OiBQcm9tcHRSZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8sIFwiICsgcmVzdWx0LnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGRlY3JlbWVudFRpbWVyKCkge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWUgLSAxMDAwO1xuICAgICAgICB0aGlzLm1zVG9UaW1lKHRoaXMudGltZSk7XG4gICAgICAgIC8vdGhpcy50aWNrLnBsYXkoKTtcbiAgICB9XG5cbiAgICBnZXQgbWludXRlc0NvdW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbnV0ZXMgKyBcIlwiO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRzQ291bnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kcyArIFwiXCI7XG4gICAgfVxuXG4gICAgbXNUb1RpbWUoZHVyYXRpb24pIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShudWxsLCBudWxsLCBudWxsLCAwLCAwLCAwLCBkdXJhdGlvbik7XG4gICAgICAgIHRoaXMubWludXRlcyA9IChkYXRlLmdldE1pbnV0ZXMoKSA8IDEwKSA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gKGRhdGUuZ2V0U2Vjb25kcygpIDwgMTApID8gXCIwXCIgKyBkYXRlLmdldFNlY29uZHMoKSA6IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIGlmICh0aGlzLm1pbnV0ZXMgPT0gMCAmJiB0aGlzLnNlY29uZHMgPT0gMCkge1xuICAgICAgICAgICAgdGltZXIuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMud2hpc3RsZS5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLnRpY2suc3RvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YVJlc3VsdHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aW1lci5jbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLndoaXN0bGUuc3RvcCgpO1xuICAgICAgICB0aGlzLnRpY2suc3RvcCgpO1xuICAgIH1cbn0iXX0=