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
                self._ngZone.run(function () {
                    console.log("Scored");
                    _this.score = _this.score + 1;
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXFFO0FBQ3JFLGdDQUErQjtBQUMvQixzQ0FBNkQ7QUFDN0QsZ0ZBQThFO0FBRTlFLG1GQUE0RjtBQUM1Riw2QkFBZ0M7QUFFaEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFTMUM7SUFZSSw2QkFBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxpQkFBbUM7UUFBakYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBWHJHLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixZQUFPLEdBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUV6QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBSWxCLFNBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsWUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUczQyxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUNwQix1REFBcUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixvREFBa0IsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFRixzQ0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsS0FBSyxDQUFD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RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQTlGUSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBYTZCLFdBQUksRUFBbUIsYUFBTSxFQUE2QixvQ0FBZ0I7T0FaNUYsbUJBQW1CLENBK0YvQjtJQUFELDBCQUFDO0NBQUEsQUEvRkQsSUErRkM7QUEvRlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SeCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBwcm9tcHQsIFByb21wdFJlc3VsdCwgaW5wdXRUeXBlIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgQmx1ZXRvb3RoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JsdWV0b290aC9ibHVldG9vdGguc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBzZXRDdXJyZW50T3JpZW50YXRpb24sIG9yaWVudGF0aW9uQ2xlYW51cCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zY3JlZW4tb3JpZW50YXRpb24nO1xyXG5pbXBvcnQgdGltZXIgPSByZXF1aXJlKFwidGltZXJcIik7XHJcblxyXG5sZXQgc291bmQgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtc291bmQnKTtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInBsYXlTY3JlZW5cIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BsYXktc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGxheS1zY3JlZW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxheVNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHRpbWU6IG51bWJlciA9IDE1MDAwMDtcclxuICAgIHNlY29uZHM6IGFueSA9IDI7XHJcbiAgICBtaW51dGVzOiBhbnkgPSBcIjNcIiArIFwiMFwiO1xyXG4gICAgaW50ZXJ2YWw6IGFueTtcclxuICAgIHNjb3JlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGRhdGFSZXN1bHRzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICB0aWNrID0gc291bmQuY3JlYXRlKFwifi9zb3VuZHMvdGljay5tcDNcIik7XHJcbiAgICB3aGlzdGxlID0gc291bmQuY3JlYXRlKFwifi9zb3VuZHMvd2hpc3RsZS5tcDNcIik7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2JsdWV0b290aFNlcnZpY2U6IEJsdWV0b290aFNlcnZpY2UpIHtcclxuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudE9yaWVudGF0aW9uKFwibGFuZHNjYXBlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZHNjYXBlIG9yaWVudGF0aW9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRpbmdGcm9tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnBsYXlXaGlzdGxlKCksIDIwMDApO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGFSZXN1bHRzdWJzY3JpcHRpb24gPSB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmRhdGFSZXN1bHQkLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NvcmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSB0aGlzLnNjb3JlICsgMTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVdoaXN0bGUoKSB7XHJcbiAgICAgICAgdGhpcy53aGlzdGxlLnBsYXkoKTtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gdGltZXIuc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLmRlY3JlbWVudFRpbWVyKCkgfSwgMTAwMCk7IC8vcGxheSBvbmx5IGF0IHRoZSBsYXN0IDEwIHNlY3NcclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc2hvd0lucHV0VG9wU2NvcmVEaWFsb2csIHRoaXMudGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJhc2tldFNjb3JlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmUgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJbnB1dFRvcFNjb3JlRGlhbG9nKCkge1xyXG4gICAgICAgIC8vIGlmKEFtb25nIFRvcCBTY29yZSkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJOYW1lXCIsXHJcbiAgICAgICAgICAgIGRlZmF1bHRUZXh0OiBcIkVudGVyIHlvdXIgbmFtZVwiLFxyXG4gICAgICAgICAgICBpbnB1dFR5cGU6IGlucHV0VHlwZS50ZXh0LFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByb21wdChvcHRpb25zKS50aGVuKChyZXN1bHQ6IFByb21wdFJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvLCBcIiArIHJlc3VsdC50ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcmVtZW50VGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGhpcy50aW1lIC0gMTAwMDtcclxuICAgICAgICB0aGlzLm1zVG9UaW1lKHRoaXMudGltZSk7XHJcbiAgICAgICAgLy90aGlzLnRpY2sucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW51dGVzQ291bnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taW51dGVzICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2Vjb25kc0NvdW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kcyArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgbXNUb1RpbWUoZHVyYXRpb24pIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG51bGwsIG51bGwsIG51bGwsIDAsIDAsIDAsIGR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLm1pbnV0ZXMgPSAoZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCkgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gKGRhdGUuZ2V0U2Vjb25kcygpIDwgMTApID8gXCIwXCIgKyBkYXRlLmdldFNlY29uZHMoKSA6IGRhdGUuZ2V0U2Vjb25kcygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5taW51dGVzID09IDAgJiYgdGhpcy5zZWNvbmRzID09IDApIHtcclxuICAgICAgICAgICAgdGltZXIuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICAgICAgdGhpcy53aGlzdGxlLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy50aWNrLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kYXRhUmVzdWx0c3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGltZXIuY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLndoaXN0bGUuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMudGljay5zdG9wKCk7XHJcbiAgICB9XHJcbn0iXX0=