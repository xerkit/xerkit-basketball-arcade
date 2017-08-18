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
                _this.arrayList = _this.bleDevicesFound.map(function (devices) { return devices.name; });
                //TO-DO: check if scanning complete before executing showModal()
                _this.showModal();
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
    LandingScreenComponent.prototype.showModal = function () {
        var _this = this;
        var options = {
            title: "Bluetooth Devices",
            message: "Select device to connect",
            cancelButtonText: "Cancel",
            actions: this.arrayList
        };
        //if (!this.arrayList == null) {
        dialogs.action(options).then(function (result) {
            _this._bluetoothService.setbleDeviceChosen(_this.bleDevicesFound[_this.arrayList.indexOf(result)]);
            _this._bluetoothService.connectToBleDevice(_this.bleDevicesFound[_this.arrayList.indexOf(result)]);
        });
        //}
    };
    LandingScreenComponent.prototype.goToPlayScreen = function () {
        this._navigationService.navigateToPlayScreen(false);
    };
    LandingScreenComponent.prototype.goToTopScoreScreen = function () {
        this._navigationService.navigateToTopScoreScreen(false);
    };
    LandingScreenComponent.prototype.onPlayTap = function () {
        if (this.isBluetoothDeviceConnected) {
            this.goToPlayScreen();
        }
        else if (this.isBluetoothEnabled && !this.isBluetoothDeviceConnected) {
            this.onScanPeripheralsTap();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0ZBQThFO0FBQzlFLHNDQUE4RztBQUM5RyxnQ0FBK0I7QUFDL0IsbUZBQWdGO0FBR2hGLG9DQUFzQztBQUN0QyxtRkFBNEY7QUFRNUY7SUFVSSxnQ0FBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxrQkFBcUMsRUFBVSxpQkFBbUM7UUFBaEksVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVJwSixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1Qix3QkFBbUIsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxvQkFBZSxHQUFRLElBQUksQ0FBQztRQUM1QiwrQkFBMEIsR0FBWSxLQUFLLENBQUM7UUFDNUMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBSWhDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHVEQUFxQixDQUFDLFdBQVcsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLG9EQUFrQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUVGLHNCQUFJLG1FQUErQjthQUFuQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUM7UUFDekYsQ0FBQzs7O09B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RSxDQUFDO0lBQy9DLENBQUM7SUFwSFEsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQVc2QixXQUFJLEVBQW1CLGFBQU0sRUFBOEIsc0NBQWlCLEVBQTZCLG9DQUFnQjtPQVYzSSxzQkFBc0IsQ0FxSGxDO0lBQUQsNkJBQUM7Q0FBQSxBQXJIRCxJQXFIQztBQXJIWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcclxuaW1wb3J0IHsgQmx1ZXRvb3RoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JsdWV0b290aC9ibHVldG9vdGguc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCJcclxuXHJcbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgc2V0Q3VycmVudE9yaWVudGF0aW9uLCBvcmllbnRhdGlvbkNsZWFudXAgfSBmcm9tICduYXRpdmVzY3JpcHQtc2NyZWVuLW9yaWVudGF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibGFuZGluZ1NjcmVlblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbGFuZGluZy1zY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9sYW5kaW5nLXNjcmVlbi1jb21tb24uY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5kaW5nU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBzdGFydGVkU2Nhbm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGJsZURldmljZXNGb3VuZDogYW55W10gPSBbXTtcclxuICAgIHNlbGVjdGVkRGV2aWNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgY2hvc2VuQmxlRGV2aWNlOiBhbnkgPSBudWxsO1xyXG4gICAgaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYXJyYXlMaXN0OiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9uYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsIHByaXZhdGUgX2JsdWV0b290aFNlcnZpY2U6IEJsdWV0b290aFNlcnZpY2UpIHtcclxuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudE9yaWVudGF0aW9uKFwibGFuZHNjYXBlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZHNjYXBlIG9yaWVudGF0aW9uXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRpbmdGcm9tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldCBibHVldG9vdGhEZXZpY2VDb25uZWN0aW9uU3RhdHVzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQgPyBcIkRldmljZSBDb25uZWN0ZWRcIiA6IFwiRGV2aWNlIE5vdCBDb25uZWN0ZWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYmx1ZXRvb3RoU3RhdHVzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID8gXCJCbHVldG9vdGggRW5hYmxlZFwiIDogXCJCbHVldG9vdGggRGlzYWJsZWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBibHVldG9vdGhFbmFibGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBibGVEZXZpY2VzRm91bmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGNob3NlbkJsZURldmljZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYmx1ZXRvb3RoRW5hYmxlZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2JsdWV0b290aFNlcnZpY2UuaXNCbHVldG9vdGhFbmFibGVkJC5zdWJzY3JpYmUoKGlzQmx1ZXRvb3RoRW5hYmxlZCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLl9uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID0gaXNCbHVldG9vdGhFbmFibGVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VzRm91bmRTdWJzY3JpcHRpb24gPSB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmJsZURldmljZXNGb3VuZCQuc3Vic2NyaWJlKChkZXZpY2VzRm91bmQpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZCA9IGRldmljZXNGb3VuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlMaXN0ID0gdGhpcy5ibGVEZXZpY2VzRm91bmQubWFwKGRldmljZXMgPT4gZGV2aWNlcy5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1RPLURPOiBjaGVjayBpZiBzY2FubmluZyBjb21wbGV0ZSBiZWZvcmUgZXhlY3V0aW5nIHNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jaG9zZW5CbGVEZXZpY2VTdWJzY3JpcHRpb24gPSB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmJsZURldmljZUNob3NlbiQuc3Vic2NyaWJlKChjaG9zZW5CbGVEZXZpY2UpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNob3NlbkJsZURldmljZSA9IGNob3NlbkJsZURldmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREZXZpY2VJbmRleCA9IHRoaXMuYmxlRGV2aWNlc0ZvdW5kLmluZGV4T2YoY2hvc2VuQmxlRGV2aWNlLCAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5pc0JsZURldmljZUNvbm5lY3RlZCQuc3Vic2NyaWJlKChpc0JsZURldmljZUNvbm5lY3RlZCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLl9uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQgPSBpc0JsZURldmljZUNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgIGlmIChpc0JsZURldmljZUNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1BsYXlTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzaG93TW9kYWwoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkJsdWV0b290aCBEZXZpY2VzXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VsZWN0IGRldmljZSB0byBjb25uZWN0XCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMuYXJyYXlMaXN0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pZiAoIXRoaXMuYXJyYXlMaXN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgZGlhbG9ncy5hY3Rpb24ob3B0aW9ucykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLnNldGJsZURldmljZUNob3Nlbih0aGlzLmJsZURldmljZXNGb3VuZFt0aGlzLmFycmF5TGlzdC5pbmRleE9mKHJlc3VsdCldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JsdWV0b290aFNlcnZpY2UuY29ubmVjdFRvQmxlRGV2aWNlKHRoaXMuYmxlRGV2aWNlc0ZvdW5kW3RoaXMuYXJyYXlMaXN0LmluZGV4T2YocmVzdWx0KV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgIH1cclxuXHJcbiAgICBnb1RvUGxheVNjcmVlbigpIHtcclxuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZVRvUGxheVNjcmVlbihmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub1RvcFNjb3JlU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlVG9Ub3BTY29yZVNjcmVlbihmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QbGF5VGFwKCkge1xyXG4gICAgICAgIGlmKHRoaXMuaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nb1RvUGxheVNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0JsdWV0b290aEVuYWJsZWQgJiYgIXRoaXMuaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNjYW5QZXJpcGhlcmFsc1RhcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJFbmFibGUgQmx1ZXRvb3RoIEZpcnN0XCIpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggbm90IGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmJsdWV0b290aEVuYWJsZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMuY2hvc2VuQmxlRGV2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDb25uZWN0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNjYW5QZXJpcGhlcmFsc1RhcCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGV2aWNlSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLnNjYW5Gb3JCbGVEZXZpY2VzKCk7XHJcbiAgICB9XHJcbn0iXX0=