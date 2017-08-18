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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZGluZy1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0ZBQThFO0FBQzlFLHNDQUE4RztBQUM5RyxnQ0FBK0I7QUFDL0IsbUZBQWdGO0FBR2hGLG9DQUFzQztBQUN0QyxtRkFBNEY7QUFRNUY7SUFVSSxnQ0FBb0IsS0FBVyxFQUFVLE9BQWUsRUFBVSxrQkFBcUMsRUFBVSxpQkFBbUM7UUFBaEksVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVJwSixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFVLEVBQUUsQ0FBQztRQUM1Qix3QkFBbUIsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxvQkFBZSxHQUFRLElBQUksQ0FBQztRQUM1QiwrQkFBMEIsR0FBWSxLQUFLLENBQUM7UUFDNUMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBSWhDLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1lBQ3BCLHVEQUFxQixDQUFDLFdBQVcsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLG9EQUFrQixFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUVGLHNCQUFJLG1FQUErQjthQUFuQztZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUM7UUFDekYsQ0FBQzs7O09B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RSxDQUFDO0lBQy9DLENBQUM7SUFwSFEsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQVc2QixXQUFJLEVBQW1CLGFBQU0sRUFBOEIsc0NBQWlCLEVBQTZCLG9DQUFnQjtPQVYzSSxzQkFBc0IsQ0FxSGxDO0lBQUQsNkJBQUM7Q0FBQSxBQXJIRCxJQXFIQztBQXJIWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEJsdWV0b290aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ibHVldG9vdGgvYmx1ZXRvb3RoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgTmdab25lLCBPbkRlc3Ryb3ksIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZVwiXG5cbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBzZXRDdXJyZW50T3JpZW50YXRpb24sIG9yaWVudGF0aW9uQ2xlYW51cCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zY3JlZW4tb3JpZW50YXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJsYW5kaW5nU2NyZWVuXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xhbmRpbmctc2NyZWVuLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2xhbmRpbmctc2NyZWVuLWNvbW1vbi5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgTGFuZGluZ1NjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBzdGFydGVkU2Nhbm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBibGVEZXZpY2VzRm91bmQ6IGFueVtdID0gW107XG4gICAgc2VsZWN0ZWREZXZpY2VJbmRleDogbnVtYmVyID0gLTE7XG4gICAgY2hvc2VuQmxlRGV2aWNlOiBhbnkgPSBudWxsO1xuICAgIGlzQmx1ZXRvb3RoRGV2aWNlQ29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNCbHVldG9vdGhFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXJyYXlMaXN0OiBBcnJheTxzdHJpbmc+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX25hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSwgcHJpdmF0ZSBfYmx1ZXRvb3RoU2VydmljZTogQmx1ZXRvb3RoU2VydmljZSkge1xuICAgICAgICBfcGFnZS5vbihcIm5hdmlnYXRlZFRvXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnRPcmllbnRhdGlvbihcImxhbmRzY2FwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYW5kc2NhcGUgb3JpZW50YXRpb25cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9wYWdlLm9uKFwibmF2aWdhdGluZ0Zyb21cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZW50YXRpb25DbGVhbnVwKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBnZXQgYmx1ZXRvb3RoRGV2aWNlQ29ubmVjdGlvblN0YXR1cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JsdWV0b290aERldmljZUNvbm5lY3RlZCA/IFwiRGV2aWNlIENvbm5lY3RlZFwiIDogXCJEZXZpY2UgTm90IENvbm5lY3RlZFwiO1xuICAgIH1cblxuICAgIGdldCBibHVldG9vdGhTdGF0dXMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID8gXCJCbHVldG9vdGggRW5hYmxlZFwiIDogXCJCbHVldG9vdGggRGlzYWJsZWRcIjtcbiAgICB9XG5cbiAgICBibHVldG9vdGhFbmFibGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYmxlRGV2aWNlc0ZvdW5kU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgY2hvc2VuQmxlRGV2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmJsdWV0b290aEVuYWJsZWRTdWJzY3JpcHRpb24gPSB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmlzQmx1ZXRvb3RoRW5hYmxlZCQuc3Vic2NyaWJlKChpc0JsdWV0b290aEVuYWJsZWQpID0+IHtcbiAgICAgICAgICAgIHNlbGYuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkID0gaXNCbHVldG9vdGhFbmFibGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kU3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5ibGVEZXZpY2VzRm91bmQkLnN1YnNjcmliZSgoZGV2aWNlc0ZvdW5kKSA9PiB7XG4gICAgICAgICAgICBzZWxmLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZCA9IGRldmljZXNGb3VuZDtcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5TGlzdCA9IHRoaXMuYmxlRGV2aWNlc0ZvdW5kLm1hcChkZXZpY2VzID0+IGRldmljZXMubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAvL1RPLURPOiBjaGVjayBpZiBzY2FubmluZyBjb21wbGV0ZSBiZWZvcmUgZXhlY3V0aW5nIHNob3dNb2RhbCgpXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNob3NlbkJsZURldmljZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2JsdWV0b290aFNlcnZpY2UuYmxlRGV2aWNlQ2hvc2VuJC5zdWJzY3JpYmUoKGNob3NlbkJsZURldmljZSkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaG9zZW5CbGVEZXZpY2UgPSBjaG9zZW5CbGVEZXZpY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERldmljZUluZGV4ID0gdGhpcy5ibGVEZXZpY2VzRm91bmQuaW5kZXhPZihjaG9zZW5CbGVEZXZpY2UsIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ29ubmVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5fYmx1ZXRvb3RoU2VydmljZS5pc0JsZURldmljZUNvbm5lY3RlZCQuc3Vic2NyaWJlKChpc0JsZURldmljZUNvbm5lY3RlZCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0JsdWV0b290aERldmljZUNvbm5lY3RlZCA9IGlzQmxlRGV2aWNlQ29ubmVjdGVkO1xuICAgICAgICAgICAgICAgIGlmIChpc0JsZURldmljZUNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9QbGF5U2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gICAgcHVibGljIHNob3dNb2RhbCgpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCJCbHVldG9vdGggRGV2aWNlc1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJTZWxlY3QgZGV2aWNlIHRvIGNvbm5lY3RcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiB0aGlzLmFycmF5TGlzdFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vaWYgKCF0aGlzLmFycmF5TGlzdCA9PSBudWxsKSB7XG4gICAgICAgICAgICBkaWFsb2dzLmFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLnNldGJsZURldmljZUNob3Nlbih0aGlzLmJsZURldmljZXNGb3VuZFt0aGlzLmFycmF5TGlzdC5pbmRleE9mKHJlc3VsdCldKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVldG9vdGhTZXJ2aWNlLmNvbm5lY3RUb0JsZURldmljZSh0aGlzLmJsZURldmljZXNGb3VuZFt0aGlzLmFycmF5TGlzdC5pbmRleE9mKHJlc3VsdCldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAvL31cbiAgICB9XG5cbiAgICBnb1RvUGxheVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1BsYXlTY3JlZW4oZmFsc2UpO1xuICAgIH1cblxuICAgIGdvVG9Ub3BTY29yZVNjcmVlbigpIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGVUb1RvcFNjb3JlU2NyZWVuKGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblBsYXlUYXAoKSB7XG4gICAgICAgIGlmKHRoaXMuaXNCbHVldG9vdGhEZXZpY2VDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ29Ub1BsYXlTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZCAmJiAhdGhpcy5pc0JsdWV0b290aERldmljZUNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5vblNjYW5QZXJpcGhlcmFsc1RhcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIkVuYWJsZSBCbHVldG9vdGggRmlyc3RcIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCbHVldG9vdGggbm90IGVuYWJsZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJsdWV0b290aEVuYWJsZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VzRm91bmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jaG9zZW5CbGVEZXZpY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDb25uZWN0ZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBvblNjYW5QZXJpcGhlcmFsc1RhcCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERldmljZUluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX2JsdWV0b290aFNlcnZpY2Uuc2NhbkZvckJsZURldmljZXMoKTtcbiAgICB9XG59Il19