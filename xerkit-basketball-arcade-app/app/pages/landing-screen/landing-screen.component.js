"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluetooth_service_1 = require("../../services/bluetooth/bluetooth.service");
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var navigation_service_1 = require("../../services/navigation/navigation.service");
var dialogs = require("ui/dialogs");
var nativescript_screen_orientation_1 = require("nativescript-screen-orientation");
var LandingScreenComponent = (function () {
    function LandingScreenComponent(_page, _ngZone, _navigationService, _bluetoothService) {
        this._page = _page;
        this._ngZone = _ngZone;
        this._navigationService = _navigationService;
        this._bluetoothService = _bluetoothService;
        this.startedScanning = false;
        this.bleDevicesFound = [];
        this.selectedDeviceIndex = -1;
        this.chosenBleDevice = null;
        this.isBluetoothDeviceConnected = false;
        this.isBluetoothEnabled = false;
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
    Object.defineProperty(LandingScreenComponent.prototype, "bluetoothDeviceConnectionStatus", {
        get: function () {
            return this.isBluetoothDeviceConnected ? "Device Connected" : "Device Not Connected";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandingScreenComponent.prototype, "bluetoothStatus", {
        get: function () {
            return this.isBluetoothEnabled ? "Bluetooth Enabled" : "Bluetooth Disabled";
        },
        enumerable: true,
        configurable: true
    });
    LandingScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.bluetoothEnabledSubscription = this._bluetoothService.isBluetoothEnabled$.subscribe(function (isBluetoothEnabled) {
            self._ngZone.run(function () {
                _this.isBluetoothEnabled = isBluetoothEnabled;
            });
        });
        this.bleDevicesFoundSubscription = this._bluetoothService.bleDevicesFound$.subscribe(function (devicesFound) {
            self._ngZone.run(function () {
                _this.bleDevicesFound = devicesFound;
            });
        });
        this.chosenBleDeviceSubscription = this._bluetoothService.bleDeviceChosen$.subscribe(function (chosenBleDevice) {
            self._ngZone.run(function () {
                _this.chosenBleDevice = chosenBleDevice;
                _this.selectedDeviceIndex = _this.bleDevicesFound.indexOf(chosenBleDevice, 0);
            });
        });
        this.bleDeviceConnectedSubscription = this._bluetoothService.isBleDeviceConnected$.subscribe(function (isBleDeviceConnected) {
            self._ngZone.run(function () {
                _this.isBluetoothDeviceConnected = isBleDeviceConnected;
                if (isBleDeviceConnected) {
                    _this.goToPlayScreen();
                }
            });
        });
        this._page.actionBarHidden = true;
    };
    LandingScreenComponent.prototype.goToPlayScreen = function () {
        this._navigationService.navigateToPlayScreen(false);
    };
    LandingScreenComponent.prototype.goToTopScoreScreen = function () {
        this._navigationService.navigateToTopScoreScreen(false);
    };
    LandingScreenComponent.prototype.onPlayTap = function () {
        if (this.isBluetoothEnabled) {
            //show list of bluetooth devices in a dialog
        }
        else {
            dialogs.alert("Enable Bluetooth First").then(function () {
                console.log("Bluetooth not enabled");
            });
        }
    };
    LandingScreenComponent.prototype.ngOnDestroy = function () {
        this.bluetoothEnabledSubscription.unsubscribe();
        this.bleDevicesFoundSubscription.unsubscribe();
        this.chosenBleDeviceSubscription.unsubscribe();
        this.bleDeviceConnectedSubscription.unsubscribe();
    };
    LandingScreenComponent.prototype.onScanPeripheralsTap = function () {
        this.selectedDeviceIndex = -1;
        this._bluetoothService.scanForBleDevices();
    };
    LandingScreenComponent.prototype.onBleDeviceTap = function ($event) {
        this._bluetoothService.setbleDeviceChosen(this.bleDevicesFound[$event.index]);
        console.log(this.bleDevicesFound[$event.index]);
        this._bluetoothService.connectToBleDevice(this.bleDevicesFound[$event.index]);
    };
    LandingScreenComponent = __decorate([
        core_1.Component({
            selector: "landingScreen",
            moduleId: module.id,
            templateUrl: "./landing-screen.component.html",
            styleUrls: ["./landing-screen-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, core_1.NgZone, navigation_service_1.NavigationService, bluetooth_service_1.BluetoothService])
    ], LandingScreenComponent);
    return LandingScreenComponent;
}());
exports.LandingScreenComponent = LandingScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0ZBQThFO0FBQzlFLHNDQUE0RjtBQUM1RixnQ0FBK0I7QUFDL0IsbUZBQWdGO0FBR2hGLG9DQUFzQztBQUN0QyxtRkFBNEY7QUFRNUY7SUFTSSxnQ0FBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxrQkFBcUMsRUFBVSxpQkFBbUM7UUFBaEksVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVBwSixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1Qix3QkFBbUIsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxvQkFBZSxHQUFRLElBQUksQ0FBQztRQUM1QiwrQkFBMEIsR0FBWSxLQUFLLENBQUM7UUFDNUMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBR2hDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHVEQUFxQixDQUFDLFdBQVcsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLG9EQUFrQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUVGLHNCQUFJLG1FQUErQjthQUFuQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUM7UUFDekYsQ0FBQzs7O09B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b0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELCtDQUFjLEdBQWQsVUFBZSxNQUFNO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBckdRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FVNkIsV0FBSSxFQUFtQixhQUFNLEVBQThCLHNDQUFpQixFQUE2QixvQ0FBZ0I7T0FUM0ksc0JBQXNCLENBc0dsQztJQUFELDZCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBCbHVldG9vdGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmx1ZXRvb3RoL2JsdWV0b290aC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2VcIlxuXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgc2V0Q3VycmVudE9yaWVudGF0aW9uLCBvcmllbnRhdGlvbkNsZWFudXAgfSBmcm9tICduYXRpdmVzY3JpcHQtc2NyZWVuLW9yaWVudGF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibGFuZGluZ1NjcmVlblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9sYW5kaW5nLXNjcmVlbi5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9sYW5kaW5nLXNjcmVlbi1jb21tb24uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExhbmRpbmdTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc3RhcnRlZFNjYW5uaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgYmxlRGV2aWNlc0ZvdW5kOiBhbnlbXSA9IFtdO1xuICAgIHNlbGVjdGVkRGV2aWNlSW5kZXg6IG51bWJlciA9IC0xO1xuICAgIGNob3NlbkJsZURldmljZTogYW55ID0gbnVsbDtcbiAgICBpc0JsdWV0b290aERldmljZUNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSwgcHJpdmF0ZSBfYmx1ZXRvb3RoU2VydmljZTogQmx1ZXRvb3RoU2VydmljZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBnZXQgYmx1ZXRvb3RoRGV2aWNlQ29ubmVjdGlvblN0YXR1cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JsdWV0b290aERldmljZUNvbm5lY3RlZCA/IFwiRGV2aWNlIENvbm5lY3RlZFwiIDogXCJEZXZpY2UgTm90IENvbm5lY3RlZFwiO1xuICAgIH1cblxuICAgIGdldCBibHVldG9vdGhTdGF0dXMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID8gXCJCbHVldG9vdGggRW5hYmxlZFwiIDogXCJCbHVldG9vdGggRGlzYWJsZWRcIjtcbiAgICB9XG5cbiAgICBibHVldG9vdGhFbmFibGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYmxlRGV2aWNlc0ZvdW5kU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgY2hvc2VuQmxlRGV2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmJsdWV0b290aEVuYWJsZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmlzQmx1ZXRvb3RoRW5hYmxlZCQuc3Vic2NyaWJlKChpc0JsdWV0b290aEVuYWJsZWQpID0+IHtcbiAgICAgICAgICAgIHNlbGYuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID0gaXNCbHVldG9vdGhFbmFibGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kU3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5ibGVEZXZpY2VzRm91bmQkLnN1YnNjcmliZSgoZGV2aWNlc0ZvdW5kKSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZCA9IGRldmljZXNGb3VuZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNob3NlbkJsZURldmljZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2JsdWV0b290aFNlcnZpY2UuYmxlRGV2aWNlQ2hvc2VuJC5zdWJzY3JpYmUoKGNob3NlbkJsZURldmljZSkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5CbGVEZXZpY2UgPSBjaG9zZW5CbGVEZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERldmljZUluZGV4ID0gdGhpcy5ibGVEZXZpY2VzRm91bmQuaW5kZXhPZihjaG9zZW5CbGVEZXZpY2UsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5pc0JsZURldmljZUNvbm5lY3RlZCQuc3Vic2NyaWJlKChpc0JsZURldmljZUNvbm5lY3RlZCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0JsdWV0b290aERldmljZUNvbm5lY3RlZCA9IGlzQmxlRGV2aWNlQ29ubmVjdGVkO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsZURldmljZUNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9QbGF5U2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb1RvUGxheVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1BsYXlTY3JlZW4oZmFsc2UpO1xuICAgIH1cblxuICAgIGdvVG9Ub3BTY29yZVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1RvcFNjb3JlU2NyZWVuKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblBsYXlUYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZCkge1xuICAgICAgICAgICAgLy9zaG93IGxpc3Qgb2YgYmx1ZXRvb3RoIGRldmljZXMgaW4gYSBkaWFsb2dcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJFbmFibGUgQmx1ZXRvb3RoIEZpcnN0XCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmx1ZXRvb3RoIG5vdCBlbmFibGVkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ibHVldG9vdGhFbmFibGVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2hvc2VuQmxlRGV2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb25TY2FuUGVyaXBoZXJhbHNUYXAoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREZXZpY2VJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLnNjYW5Gb3JCbGVEZXZpY2VzKCk7XG4gICAgfVxuXG4gICAgb25CbGVEZXZpY2VUYXAoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2JsdWV0b290aFNlcnZpY2Uuc2V0YmxlRGV2aWNlQ2hvc2VuKHRoaXMuYmxlRGV2aWNlc0ZvdW5kWyRldmVudC5pbmRleF0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJsZURldmljZXNGb3VuZFskZXZlbnQuaW5kZXhdKTtcblxuICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmNvbm5lY3RUb0JsZURldmljZSh0aGlzLmJsZURldmljZXNGb3VuZFskZXZlbnQuaW5kZXhdKTtcbiAgICB9XG59Il19