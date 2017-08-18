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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw4Q0FBNkM7QUFDN0Msd0NBQXVDO0FBQ3ZDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0Isa0RBQWdEO0FBRWhELGtEQUFxRDtBQUdyRDtJQUlJO1FBQUEsaUJBUUM7UUFYRCx5QkFBb0IsR0FBVyxNQUFNLENBQUM7UUFDdEMsZ0NBQTJCLEdBQVcsTUFBTSxDQUFDO1FBbUJyQyw2QkFBd0IsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUMxRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkUsNkJBQXdCLEdBQVEsSUFBSSxDQUFDO1FBTzdCLDBCQUFxQixHQUFHLElBQUksaUJBQU8sRUFBUyxDQUFDO1FBQ3JELHFCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCwwQkFBcUIsR0FBUSxJQUFJLENBQUM7UUFPMUIsMEJBQXFCLEdBQUcsSUFBSSxpQkFBTyxFQUFTLENBQUM7UUFDckQscUJBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELDBCQUFxQixHQUFVLEVBQUUsQ0FBQztRQU8xQiwrQkFBMEIsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUM1RCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkUsK0JBQTBCLEdBQVksS0FBSyxDQUFDO1FBN0N4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUMxQyxLQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxTQUFTLENB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QU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGtDQUFrQztJQUNsQywyRUFBMkU7SUFDM0Usd0NBQXdDO0lBQ3hDLG9GQUFvRjtJQUNwRiw0REFBNEQ7SUFDNUQsSUFBSTtJQUVKLHFEQUEwQixHQUExQjtRQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLEVBQUU7YUFDekMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFNBQVMsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFDekcsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsd0RBQTZCLEdBQTdCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCx5REFBOEIsR0FBOUI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQTlNUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0FzTjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXRORCxJQXNOQztBQXROWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJsZURldmljZSB9IGZyb20gJy4uLy4uL21vZGVscy9ibGUtZGV2aWNlLm1vZGVsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZCc7XHJcblxyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmx1ZXRvb3RoU2VydmljZSB7XHJcbiAgICBERUZBVUxUX1NFUlZJQ0VfVVVJRDogc3RyaW5nID0gXCJGRkUwXCI7XHJcbiAgICBERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQ6IHN0cmluZyA9IFwiRkZFMVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpLnRoZW4oZ3JhbnRlZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9CbHVldG9vdGhFbmFibGVkKCkuc3Vic2NyaWJlKChpc0JsdWV0b290aEVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0SXNCbHVldG9vdGhFbmFibGVkKGlzQmx1ZXRvb3RoRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0SXNCbHVldG9vdGhFbmFibGVkKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldGJsZURldmljZUNob3NlbihudWxsKTtcclxuICAgICAgICB0aGlzLnNldEJsZURldmljZXNGb3VuZChbXSk7XHJcbiAgICAgICAgdGhpcy5zZXRibGVEZXZpY2VDb25uZWN0ZWQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNCbHVldG9vdGhFbmFibGVkU291cmNlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZCQgPSB0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZE9iamVjdDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBzZXRJc0JsdWV0b290aEVuYWJsZWQoYmx1ZXRvb3RoRW5hYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkT2JqZWN0ID0gYmx1ZXRvb3RoRW5hYmxlZDtcclxuICAgICAgICB0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZS5uZXh0KGJsdWV0b290aEVuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmxlRGV2aWNlQ2hvc2VuU291cmNlID0gbmV3IFN1YmplY3Q8YW55W10+KCk7XHJcbiAgICBibGVEZXZpY2VDaG9zZW4kID0gdGhpcy5ibGVEZXZpY2VDaG9zZW5Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBibGVEZXZpY2VDaG9zZW5PYmplY3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgc2V0YmxlRGV2aWNlQ2hvc2VuKGRldmljZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDaG9zZW5PYmplY3QgPSBkZXZpY2U7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDaG9zZW5Tb3VyY2UubmV4dChkZXZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmxlRGV2aWNlc0ZvdW5kU291cmNlID0gbmV3IFN1YmplY3Q8YW55W10+KCk7XHJcbiAgICBibGVEZXZpY2VzRm91bmQkID0gdGhpcy5ibGVEZXZpY2VzRm91bmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBibGVEZXZpY2VzRm91bmRPYmplY3Q6IGFueVtdID0gW107XHJcblxyXG4gICAgc2V0QmxlRGV2aWNlc0ZvdW5kKGRldmljZXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VzRm91bmRPYmplY3QgPSBkZXZpY2VzO1xyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kU291cmNlLm5leHQoZGV2aWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0JsZURldmljZUNvbm5lY3RlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgICBpc0JsZURldmljZUNvbm5lY3RlZCQgPSB0aGlzLmlzQmxlRGV2aWNlQ29ubmVjdGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgaXNCbGVEZXZpY2VDb25uZWN0ZWRPYmplY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzZXRibGVEZXZpY2VDb25uZWN0ZWQoY29ubmVjdGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZE9iamVjdCA9IGNvbm5lY3RlZDtcclxuICAgICAgICB0aGlzLmlzQmxlRGV2aWNlQ29ubmVjdGVkU291cmNlLm5leHQoY29ubmVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5Ub0JsdWV0b290aEVuYWJsZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiBvYnNlcnZlci5uZXh0KGVuYWJsZWQpKVxyXG5cclxuICAgICAgICAgICAgbGV0IGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGVuYWJsZWQgPT4gb2JzZXJ2ZXIubmV4dChlbmFibGVkKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9wIGNoZWNraW5nIGV2ZXJ5IHNlY29uZCBvbiB1bnN1YnNjcmliZVxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbkZvckJsZURldmljZXMoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc2V0QmxlRGV2aWNlc0ZvdW5kKFtdKTsgLy8gUmVzZXQgQkxFIERldmljZXMgRm91bmRcclxuICAgICAgICBibHVldG9vdGguc3RhcnRTY2FubmluZyh7XHJcbiAgICAgICAgICAgIHNlY29uZHM6IDQsXHJcbiAgICAgICAgICAgIG9uRGlzY292ZXJlZDogZnVuY3Rpb24gKHBlcmlwaGVyYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQZXJpcGVyaGFsIEZvdW5kIC0gVVVJRDogJHtwZXJpcGhlcmFsLlVVSUR9LCBOQU1FOiAke3BlcmlwaGVyYWwubmFtZX1gKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYmxlRGV2aWNlc0ZvdW5kT2JqZWN0LnB1c2gocGVyaXBoZXJhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRCbGVEZXZpY2VzRm91bmQoc2VsZi5ibGVEZXZpY2VzRm91bmRPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzY2FubmluZyBjb21wbGV0ZVwiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igd2hpbGUgc2Nhbm5pbmc6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTWVzc2FnZVRvQmxlRGV2aWNlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5ibGVEZXZpY2VDaG9zZW5PYmplY3QpIHtcclxuICAgICAgICAgICAgYmx1ZXRvb3RoLndyaXRlV2l0aG91dFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOiBzZWxmLmJsZURldmljZUNob3Nlbk9iamVjdC5VVUlELFxyXG4gICAgICAgICAgICAgICAgc2VydmljZVVVSUQ6IHNlbGYuREVGQVVMVF9TRVJWSUNFX1VVSUQsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJpc3RpY1VVSUQ6IHNlbGYuREVGQVVMVF9DSEFSQUNURVJJU1RJQ19VVUlELFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHNlbGYuc3RyaW5nVG9CbHVldG9vdGhIZXhTdHJpbmcobWVzc2FnZSkgLy8gYSBoZXhcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZhbHVlIHdyaXR0ZW5cIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3cml0ZSBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCTEUgRGV2aWNlIG5vdCBjb25uZWN0ZWQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0VG9CbGVEZXZpY2UoYmxlRGV2aWNlOiBhbnkpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgICBVVUlEOiBibGVEZXZpY2UuVVVJRCxcclxuICAgICAgICAgICAgb25Db25uZWN0ZWQ6IGZ1bmN0aW9uIChwZXJpcGhlcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldGJsZURldmljZUNvbm5lY3RlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUEVSSVBIRVJBTCBDT05ORUNURUQhXCIsIHBlcmlwaGVyYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSBwZXJpcGhlcmFsIG9iamVjdCBub3cgaGFzIGEgbGlzdCBvZiBhdmFpbGFibGUgc2VydmljZXM6XHJcbiAgICAgICAgICAgICAgICBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goZnVuY3Rpb24gKHNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2UgZm91bmQ6IFwiLCBzZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRCbHVldG9vdGhOb3RpZnlSZWFkZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIChwZXJpcGhlcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmlwZXJoYWwgZGlzY29ubmVjdGVkIHdpdGggVVVJRDogXCIgKyBwZXJpcGhlcmFsLlVVSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRCbHVldG9vdGhOb3RpZnlSZWFkZXIoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGJsdWV0b290aC5zdGFydE5vdGlmeWluZyh7XHJcbiAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOiBzZWxmLmJsZURldmljZUNob3Nlbk9iamVjdC5VVUlELFxyXG4gICAgICAgICAgICBzZXJ2aWNlVVVJRDogc2VsZi5ERUZBVUxUX1NFUlZJQ0VfVVVJRCxcclxuICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOiBzZWxmLkRFRkFVTFRfQ0hBUkFDVEVSSVNUSUNfVVVJRCxcclxuICAgICAgICAgICAgb25Ob3RpZnk6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgUmVzdWx0IGhlcmUgdG8gZGlzcGF0Y2hlclxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVkFMVUUgUkVBRFwiLCBzZWxmLmJsdWV0b290aEhleFN0cmluZ1RvU3RyaW5nKHJlc3VsdC52YWx1ZVJhdy50b1N0cmluZygpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmVkIGZvciBCbHVldG9vdGggTm90aWZpY2F0aW9uc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdHJpbmdUb0JsdWV0b290aEhleFN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGJsdWV0b290aEhleFN0cmluZzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBibHVldG9vdGhIZXhTdHJpbmcgKz0gYDB4JHtzdHIuY2hhckNvZGVBdChpKS50b1N0cmluZygxNil9YDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpIDwgKHN0ci5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgYmx1ZXRvb3RoSGV4U3RyaW5nICs9IFwiLFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJMVUVUT09USCBIRVggU1RSSU5HOiBcIiwgYmx1ZXRvb3RoSGV4U3RyaW5nKTtcclxuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoSGV4U3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGJsdWV0b290aEhleFN0cmluZ1RvU3RyaW5nKGhleFN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBGT1JNQVQ6IDw2ODY1NmM2YyA2Zjc3PlxyXG4gICAgICAgIC8vIFNob3VsZCBzdHJpcCBzcGFjZXMgYW5kIHMgICAgdHJpcCBndCBhbmQgbHRcclxuICAgICAgICBoZXhTdHJpbmcgPSBoZXhTdHJpbmcucmVwbGFjZSgvXFxXL2csICcnKTtcclxuXHJcbiAgICAgICAgdmFyIGhleCA9IGhleFN0cmluZztcclxuICAgICAgICB2YXIgaGV4U3RyaW5nID0gJyc7XHJcbiAgICAgICAgdmFyIGhleENoYXIgPSAnJztcclxuICAgICAgICB2YXIgc3Vic3RyaW5nID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBoZXgubGVuZ3RoOyBuICs9IDIpIHtcclxuICAgICAgICAgICAgc3Vic3RyaW5nID0gaGV4LnN1YnN0cihuLCAyKTtcclxuICAgICAgICAgICAgaGV4Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoc3Vic3RyaW5nLCAxNikpO1xyXG4gICAgICAgICAgICBoZXhTdHJpbmcgKz0gaGV4Q2hhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoZXhTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd3JpdGUoYmx1ZXRvb3RoTWVzc2FnZSk6IHZvaWQge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdXcml0aW5nIG1lc3NhZ2U6ICcgKyBKU09OLnN0cmluZ2lmeShibHVldG9vdGhNZXNzYWdlKSk7XHJcbiAgICAvLyAgICAgYmx1ZXRvb3RoLndyaXRlKGJsdWV0b290aE1lc3NhZ2UpXHJcbiAgICAvLyAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IGNvbnNvbGUubG9nKFwiVmFsdWUgd3JpdHRlbiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpLFxyXG4gICAgLy8gICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUubG9nKFwiV3JpdGUgZXJyb3I6IFwiICsgZXJyb3IpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBnZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgIC50aGVuKChncmFudGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBsb2NhdGlvbiBwZXJtaXNzaW9uID8gXCIgKyBncmFudGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJMb2NhdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3RlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyYW50ZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRTZXRFbmdpbmVJZ25pdGlvblN0YXR1c09uKCl7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQmxlRGV2aWNlKFwicGFzc3dvcmR8QzFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFNldEVuZ2luZUlnbml0aW9uU3RhdHVzT2ZmKCl7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZVRvQmxlRGV2aWNlKFwicGFzc3dvcmR8QzBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGlzY29ubmVjdChVVUlEOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIC8vICAgICBibHVldG9vdGguZGlzY29ubmVjdCh7IFVVSUQ6IFVVSUQgfSlcclxuICAgIC8vICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJEaXNjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5XCIpLFxyXG4gICAgLy8gICAgICAgICAoZXJyKSA9PiBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3Rpb24gZXJyb3I6IFwiICsgZXJyKSk7XHJcbiAgICAvLyB9XHJcblxyXG59Il19