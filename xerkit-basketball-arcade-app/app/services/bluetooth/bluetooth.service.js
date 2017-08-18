"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/distinctUntilChanged");
var bluetooth = require("nativescript-bluetooth");
var BluetoothService = (function () {
    function BluetoothService() {
        var _this = this;
        this.DEFAULT_SERVICE_UUID = "FFE0";
        this.DEFAULT_CHARACTERISTIC_UUID = "FFE1";
        this.isBluetoothEnabledSource = new Subject_1.Subject();
        this.isBluetoothEnabled$ = this.isBluetoothEnabledSource.asObservable();
        this.isBluetoothEnabledObject = null;
        this.bleDeviceChosenSource = new Subject_1.Subject();
        this.bleDeviceChosen$ = this.bleDeviceChosenSource.asObservable();
        this.bleDeviceChosenObject = null;
        this.bleDevicesFoundSource = new Subject_1.Subject();
        this.bleDevicesFound$ = this.bleDevicesFoundSource.asObservable();
        this.bleDevicesFoundObject = [];
        this.isBleDeviceConnectedSource = new Subject_1.Subject();
        this.isBleDeviceConnected$ = this.isBleDeviceConnectedSource.asObservable();
        this.isBleDeviceConnectedObject = false;
        var self = this;
        this.getCentralDevicePermission().then(function (granted) {
            _this.listenToBluetoothEnabled().subscribe(function (isBluetoothEnabled) {
                self.setIsBluetoothEnabled(isBluetoothEnabled);
            });
        });
    }
    BluetoothService.prototype.reset = function () {
        this.setIsBluetoothEnabled(false);
        this.setbleDeviceChosen(null);
        this.setBleDevicesFound([]);
        this.setbleDeviceConnected(false);
    };
    BluetoothService.prototype.setIsBluetoothEnabled = function (bluetoothEnabled) {
        this.isBluetoothEnabledObject = bluetoothEnabled;
        this.isBluetoothEnabledSource.next(bluetoothEnabled);
    };
    BluetoothService.prototype.setbleDeviceChosen = function (device) {
        this.bleDeviceChosenObject = device;
        this.bleDeviceChosenSource.next(device);
    };
    BluetoothService.prototype.setBleDevicesFound = function (devices) {
        this.bleDevicesFoundObject = devices;
        this.bleDevicesFoundSource.next(devices);
    };
    BluetoothService.prototype.setbleDeviceConnected = function (connected) {
        this.isBleDeviceConnectedObject = connected;
        this.isBleDeviceConnectedSource.next(connected);
    };
    BluetoothService.prototype.listenToBluetoothEnabled = function () {
        return new Observable_1.Observable(function (observer) {
            bluetooth.isBluetoothEnabled().then(function (enabled) { return observer.next(enabled); });
            var intervalHandle = setInterval(function () {
                bluetooth.isBluetoothEnabled()
                    .then(function (enabled) { return observer.next(enabled); });
            }, 1000);
            // stop checking every second on unsubscribe
            return function () { return clearInterval(intervalHandle); };
        });
    };
    BluetoothService.prototype.scanForBleDevices = function () {
        var self = this;
        this.setBleDevicesFound([]); // Reset BLE Devices Found
        bluetooth.startScanning({
            seconds: 4,
            onDiscovered: function (peripheral) {
                console.log("Periperhal Found - UUID: " + peripheral.UUID + ", NAME: " + peripheral.name);
                self.bleDevicesFoundObject.push(peripheral);
            }
        }).then(function () {
            self.setBleDevicesFound(self.bleDevicesFoundObject);
            console.log("scanning complete");
        }, function (err) {
            console.log("error while scanning: " + err);
        });
    };
    BluetoothService.prototype.sendMessageToBleDevice = function (message) {
        var self = this;
        if (this.bleDeviceChosenObject) {
            bluetooth.writeWithoutResponse({
                peripheralUUID: self.bleDeviceChosenObject.UUID,
                serviceUUID: self.DEFAULT_SERVICE_UUID,
                characteristicUUID: self.DEFAULT_CHARACTERISTIC_UUID,
                value: self.stringToBluetoothHexString(message) // a hex
            }).then(function (result) {
                console.log("value written", result);
            }, function (err) {
                console.log("write error: " + err);
            });
        }
        else {
            throw new Error("BLE Device not connected!");
        }
    };
    BluetoothService.prototype.connectToBleDevice = function (bleDevice) {
        console.log(bleDevice.UUID);
        var self = this;
        bluetooth.connect({
            UUID: bleDevice.UUID,
            onConnected: function (peripheral) {
                self.setbleDeviceConnected(true);
                console.log("PERIPHERAL CONNECTED!", peripheral);
                // the peripheral object now has a list of available services:
                peripheral.services.forEach(function (service) {
                    console.log("Service found: ", service);
                });
                self.startBluetoothNotifyReader();
            },
            onDisconnected: function (peripheral) {
                self.reset();
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
            }
        });
    };
    BluetoothService.prototype.startBluetoothNotifyReader = function () {
        var self = this;
        bluetooth.startNotifying({
            peripheralUUID: self.bleDeviceChosenObject.UUID,
            serviceUUID: self.DEFAULT_SERVICE_UUID,
            characteristicUUID: self.DEFAULT_CHARACTERISTIC_UUID,
            onNotify: function (result) {
                if (result) {
                    // Handle Result here to dispatcher
                    console.log("VALUE READ", self.bluetoothHexStringToString(result.valueRaw.toString()));
                }
            }
        }).then(function () {
            console.log("Subscribed for Bluetooth Notifications");
        });
    };
    BluetoothService.prototype.stringToBluetoothHexString = function (str) {
        var bluetoothHexString = "";
        for (var i = 0; i < str.length; i++) {
            bluetoothHexString += "0x" + str.charCodeAt(i).toString(16);
            if (i < (str.length - 1)) {
                bluetoothHexString += ",";
            }
        }
        console.log("BLUETOOTH HEX STRING: ", bluetoothHexString);
        return bluetoothHexString;
    };
    BluetoothService.prototype.bluetoothHexStringToString = function (hexString) {
        // FORMAT: <68656c6c 6f77>
        // Should strip spaces and s    trip gt and lt
        hexString = hexString.replace(/\W/g, '');
        var hex = hexString;
        var hexString = '';
        var hexChar = '';
        var substring = '';
        for (var n = 0; n < hex.length; n += 2) {
            substring = hex.substr(n, 2);
            hexChar = String.fromCharCode(parseInt(substring, 16));
            hexString += hexChar;
        }
        return hexString;
    };
    // write(bluetoothMessage): void {
    //     console.log('Writing message: ' + JSON.stringify(bluetoothMessage));
    //     bluetooth.write(bluetoothMessage)
    //         .then((result) => console.log("Value written " + JSON.stringify(result)),
    //         (error) => console.log("Write error: " + error));
    // }
    BluetoothService.prototype.getCentralDevicePermission = function () {
        return bluetooth.hasCoarseLocationPermission()
            .then(function (granted) {
            console.log("Has location permission ? " + granted);
            if (!granted) {
                bluetooth.requestCoarseLocationPermission().then(function () { return console.log("Location permission requested"); });
            }
            return granted;
        });
    };
    BluetoothService.prototype.sendSetEngineIgnitionStatusOn = function () {
        this.sendMessageToBleDevice("password|C1");
    };
    BluetoothService.prototype.sendSetEngineIgnitionStatusOff = function () {
        this.sendMessageToBleDevice("password|C0");
    };
    BluetoothService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BluetoothService);
    return BluetoothService;
}());
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw4Q0FBNkM7QUFDN0Msd0NBQXVDO0FBQ3ZDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0Isa0RBQWdEO0FBRWhELGtEQUFxRDtBQUdyRDtJQUlJO1FBQUEsaUJBUUM7UUFYRCx5QkFBb0IsR0FBVyxNQUFNLENBQUM7UUFDdEMsZ0NBQTJCLEdBQVcsTUFBTSxDQUFDO1FBbUJyQyw2QkFBd0IsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUMxRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkUsNkJBQXdCLEdBQVEsSUFBSSxDQUFDO1FBTzdCLDBCQUFxQixHQUFHLElBQUksaUJBQU8sRUFBUyxDQUFDO1FBQ3JELHFCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCwwQkFBcUIsR0FBUSxJQUFJLENBQUM7UUFPMUIsMEJBQXFCLEdBQUcsSUFBSSxpQkFBTyxFQUFTLENBQUM7UUFDckQscUJBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELDBCQUFxQixHQUFVLEVBQUUsQ0FBQztRQU8xQiwrQkFBMEIsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUM1RCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkUsK0JBQTBCLEdBQVksS0FBSyxDQUFDO1FBN0N4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUMxQyxLQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxTQUFTLENB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QyxDQUFDO1lBQ3ZELFNBQVMsSUFBSSxPQUFPLENBQUM7UUFDekIsQ0FBQztRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGtDQUFrQztJQUNsQywyRUFBMkU7SUFDM0Usd0NBQXdDO0lBQ3hDLG9GQUFvRjtJQUNwRiw0REFBNEQ7SUFDNUQsSUFBSTtJQUVKLHFEQUEwQixHQUExQjtRQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLEVBQUU7YUFDekMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFDekcsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsd0RBQTZCLEdBQTdCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCx5REFBOEIsR0FBOUI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQS9NUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0FpTjVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpORCxJQWlOQztBQWpOWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJsZURldmljZSB9IGZyb20gJy4uLy4uL21vZGVscy9ibGUtZGV2aWNlLm1vZGVsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZCc7XHJcblxyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmx1ZXRvb3RoU2VydmljZSB7XHJcbiAgICBERUZBVUxUX1NFUlZJQ0VfVVVJRDogc3RyaW5nID0gXCJGRkUwXCI7XHJcbiAgICBERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQ6IHN0cmluZyA9IFwiRkZFMVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpLnRoZW4oZ3JhbnRlZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9CbHVldG9vdGhFbmFibGVkKCkuc3Vic2NyaWJlKChpc0JsdWV0b290aEVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0SXNCbHVldG9vdGhFbmFibGVkKGlzQmx1ZXRvb3RoRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0SXNCbHVldG9vdGhFbmFibGVkKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldGJsZURldmljZUNob3NlbihudWxsKTtcclxuICAgICAgICB0aGlzLnNldEJsZURldmljZXNGb3VuZChbXSk7XHJcbiAgICAgICAgdGhpcy5zZXRibGVEZXZpY2VDb25uZWN0ZWQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNCbHVldG9vdGhFbmFibGVkU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZCQgPSB0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZE9iamVjdDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBzZXRJc0JsdWV0b290aEVuYWJsZWQoYmx1ZXRvb3RoRW5hYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkT2JqZWN0ID0gYmx1ZXRvb3RoRW5hYmxlZDtcclxuICAgICAgICB0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZS5uZXh0KGJsdWV0b290aEVuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmxlRGV2aWNlQ2hvc2VuU291cmNlID0gbmV3IFN1YmplY3Q8YW55W10+KCk7XHJcbiAgICBibGVEZXZpY2VDaG9zZW4kID0gdGhpcy5ibGVEZXZpY2VDaG9zZW5Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBibGVEZXZpY2VDaG9zZW5PYmplY3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgc2V0YmxlRGV2aWNlQ2hvc2VuKGRldmljZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDaG9zZW5PYmplY3QgPSBkZXZpY2U7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDaG9zZW5Tb3VyY2UubmV4dChkZXZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmxlRGV2aWNlc0ZvdW5kU291cmNlID0gbmV3IFN1YmplY3Q8YW55W10+KCk7XHJcbiAgICBibGVEZXZpY2VzRm91bmQkID0gdGhpcy5ibGVEZXZpY2VzRm91bmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBibGVEZXZpY2VzRm91bmRPYmplY3Q6IGFueVtdID0gW107XHJcblxyXG4gICAgc2V0QmxlRGV2aWNlc0ZvdW5kKGRldmljZXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VzRm91bmRPYmplY3QgPSBkZXZpY2VzO1xyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kU291cmNlLm5leHQoZGV2aWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0JsZURldmljZUNvbm5lY3RlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgICBpc0JsZURldmljZUNvbm5lY3RlZCQgPSB0aGlzLmlzQmxlRGV2aWNlQ29ubmVjdGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgaXNCbGVEZXZpY2VDb25uZWN0ZWRPYmplY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzZXRibGVEZXZpY2VDb25uZWN0ZWQoY29ubmVjdGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZE9iamVjdCA9IGNvbm5lY3RlZDtcclxuICAgICAgICB0aGlzLmlzQmxlRGV2aWNlQ29ubmVjdGVkU291cmNlLm5leHQoY29ubmVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5Ub0JsdWV0b290aEVuYWJsZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiBvYnNlcnZlci5uZXh0KGVuYWJsZWQpKVxyXG5cclxuICAgICAgICAgICAgbGV0IGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGVuYWJsZWQgPT4gb2JzZXJ2ZXIubmV4dChlbmFibGVkKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9wIGNoZWNraW5nIGV2ZXJ5IHNlY29uZCBvbiB1bnN1YnNjcmliZVxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbkZvckJsZURldmljZXMoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc2V0QmxlRGV2aWNlc0ZvdW5kKFtdKTsgLy8gUmVzZXQgQkxFIERldmljZXMgRm91bmRcclxuICAgICAgICBibHVldG9vdGguc3RhcnRTY2FubmluZyh7XHJcbiAgICAgICAgICAgIHNlY29uZHM6IDQsXHJcbiAgICAgICAgICAgIG9uRGlzY292ZXJlZDogZnVuY3Rpb24gKHBlcmlwaGVyYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJpcGVyaGFsIEZvdW5kIC0gVVVJRDogJHtwZXJpcGhlcmFsLlVVSUR9LCBOQU1FOiAke3BlcmlwaGVyYWwubmFtZX1gKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYmxlRGV2aWNlc0ZvdW5kT2JqZWN0LnB1c2gocGVyaXBoZXJhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRCbGVEZXZpY2VzRm91bmQoc2VsZi5ibGVEZXZpY2VzRm91bmRPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzY2FubmluZyBjb21wbGV0ZVwiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgc2Nhbm5pbmc6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTWVzc2FnZVRvQmxlRGV2aWNlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5ibGVEZXZpY2VDaG9zZW5PYmplY3QpIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLndyaXRlV2l0aG91dFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOiBzZWxmLmJsZURldmljZUNob3Nlbk9iamVjdC5VVUlELFxyXG4gICAgICAgICAgICAgICAgc2VydmljZVVVSUQ6IHNlbGYuREVGQVVMVF9TRVJWSUNFX1VVSUQsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6IHNlbGYuREVGQVVMVF9DSEFSQUNURVJJU1RJQ19VVUlELFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHNlbGYuc3RyaW5nVG9CbHVldG9vdGhIZXhTdHJpbmcobWVzc2FnZSkgLy8gYSBoZXhcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIHdyaXR0ZW5cIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3cml0ZSBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCTEUgRGV2aWNlIG5vdCBjb25uZWN0ZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0VG9CbGVEZXZpY2UoYmxlRGV2aWNlOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhibGVEZXZpY2UuVVVJRCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGJsdWV0b290aC5jb25uZWN0KHtcclxuICAgICAgICAgICAgVVVJRDogYmxlRGV2aWNlLlVVSUQsXHJcbiAgICAgICAgICAgIG9uQ29ubmVjdGVkOiBmdW5jdGlvbiAocGVyaXBoZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRibGVEZXZpY2VDb25uZWN0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBFUklQSEVSQUwgQ09OTkVDVEVEIVwiLCBwZXJpcGhlcmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgcGVyaXBoZXJhbCBvYmplY3Qgbm93IGhhcyBhIGxpc3Qgb2YgYXZhaWxhYmxlIHNlcnZpY2VzOlxyXG4gICAgICAgICAgICAgICAgcGVyaXBoZXJhbC5zZXJ2aWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXJ2aWNlIGZvdW5kOiBcIiwgc2VydmljZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0Qmx1ZXRvb3RoTm90aWZ5UmVhZGVyKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiBmdW5jdGlvbiAocGVyaXBoZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJpcGVyaGFsIGRpc2Nvbm5lY3RlZCB3aXRoIFVVSUQ6IFwiICsgcGVyaXBoZXJhbC5VVUlEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0Qmx1ZXRvb3RoTm90aWZ5UmVhZGVyKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBibHVldG9vdGguc3RhcnROb3RpZnlpbmcoe1xyXG4gICAgICAgICAgICBwZXJpcGhlcmFsVVVJRDogc2VsZi5ibGVEZXZpY2VDaG9zZW5PYmplY3QuVVVJRCxcclxuICAgICAgICAgICAgc2VydmljZVVVSUQ6IHNlbGYuREVGQVVMVF9TRVJWSUNFX1VVSUQsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljVVVJRDogc2VsZi5ERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQsXHJcbiAgICAgICAgICAgIG9uTm90aWZ5OiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIFJlc3VsdCBoZXJlIHRvIGRpc3BhdGNoZXJcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZBTFVFIFJFQURcIiwgc2VsZi5ibHVldG9vdGhIZXhTdHJpbmdUb1N0cmluZyhyZXN1bHQudmFsdWVSYXcudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJlZCBmb3IgQmx1ZXRvb3RoIE5vdGlmaWNhdGlvbnNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyaW5nVG9CbHVldG9vdGhIZXhTdHJpbmcoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBibHVldG9vdGhIZXhTdHJpbmc6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoSGV4U3RyaW5nICs9IGAweCR7c3RyLmNoYXJDb2RlQXQoaSkudG9TdHJpbmcoMTYpfWA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA8IChzdHIubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIGJsdWV0b290aEhleFN0cmluZyArPSBcIixcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCTFVFVE9PVEggSEVYIFNUUklORzogXCIsIGJsdWV0b290aEhleFN0cmluZyk7XHJcbiAgICAgICAgcmV0dXJuIGJsdWV0b290aEhleFN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBibHVldG9vdGhIZXhTdHJpbmdUb1N0cmluZyhoZXhTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gRk9STUFUOiA8Njg2NTZjNmMgNmY3Nz5cclxuICAgICAgICAvLyBTaG91bGQgc3RyaXAgc3BhY2VzIGFuZCBzICAgIHRyaXAgZ3QgYW5kIGx0XHJcbiAgICAgICAgaGV4U3RyaW5nID0gaGV4U3RyaW5nLnJlcGxhY2UoL1xcVy9nLCAnJyk7XHJcblxyXG4gICAgICAgIHZhciBoZXggPSBoZXhTdHJpbmc7XHJcbiAgICAgICAgdmFyIGhleFN0cmluZyA9ICcnO1xyXG4gICAgICAgIHZhciBoZXhDaGFyID0gJyc7XHJcbiAgICAgICAgdmFyIHN1YnN0cmluZyA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgaGV4Lmxlbmd0aDsgbiArPSAyKSB7XHJcbiAgICAgICAgICAgIHN1YnN0cmluZyA9IGhleC5zdWJzdHIobiwgMik7XHJcbiAgICAgICAgICAgIGhleENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHN1YnN0cmluZywgMTYpKTtcclxuICAgICAgICAgICAgaGV4U3RyaW5nICs9IGhleENoYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGV4U3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdyaXRlKGJsdWV0b290aE1lc3NhZ2UpOiB2b2lkIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZygnV3JpdGluZyBtZXNzYWdlOiAnICsgSlNPTi5zdHJpbmdpZnkoYmx1ZXRvb3RoTWVzc2FnZSkpO1xyXG4gICAgLy8gICAgIGJsdWV0b290aC53cml0ZShibHVldG9vdGhNZXNzYWdlKVxyXG4gICAgLy8gICAgICAgICAudGhlbigocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhcIlZhbHVlIHdyaXR0ZW4gXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQpKSxcclxuICAgIC8vICAgICAgICAgKGVycm9yKSA9PiBjb25zb2xlLmxvZyhcIldyaXRlIGVycm9yOiBcIiArIGVycm9yKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgZ2V0Q2VudHJhbERldmljZVBlcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIGJsdWV0b290aC5oYXNDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKVxyXG4gICAgICAgICAgICAudGhlbigoZ3JhbnRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJIYXMgbG9jYXRpb24gcGVybWlzc2lvbiA/IFwiICsgZ3JhbnRlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFncmFudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLnJlcXVlc3RDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKS50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiTG9jYXRpb24gcGVybWlzc2lvbiByZXF1ZXN0ZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBncmFudGVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kU2V0RW5naW5lSWduaXRpb25TdGF0dXNPbigpe1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0JsZURldmljZShcInBhc3N3b3JkfEMxXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRTZXRFbmdpbmVJZ25pdGlvblN0YXR1c09mZigpe1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VUb0JsZURldmljZShcInBhc3N3b3JkfEMwXCIpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==