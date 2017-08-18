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
        this.dataResultSource = new Subject_1.Subject();
        this.dataResult$ = this.dataResultSource.asObservable();
        this.dataResultObject = null;
        var self = this;
        this.getCentralDevicePermission().then(function (granted) {
            _this.listenToBluetoothEnabled().subscribe(function (isBluetoothEnabled) {
                self.setIsBluetoothEnabled(isBluetoothEnabled);
            });
        });
    }
    BluetoothService.prototype.reset = function () {
        this.setDataResult(null);
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
    BluetoothService.prototype.setDataResult = function (dataResult) {
        this.dataResultObject = dataResult;
        this.dataResultSource.next(dataResult);
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
                if (result.valueRaw) {
                    // console.log(result.valueRaw.toString());
                    self.setDataResult(result.valueRaw);
                }
            }
        }).then(function () {
            console.log("Subscribed for Bluetooth Notifications");
        });
    };
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
    BluetoothService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BluetoothService);
    return BluetoothService;
}());
exports.BluetoothService = BluetoothService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw4Q0FBNkM7QUFDN0Msd0NBQXVDO0FBQ3ZDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0Isa0RBQWdEO0FBRWhELGtEQUFxRDtBQUdyRDtJQUlJO1FBQUEsaUJBUUM7UUFYRCx5QkFBb0IsR0FBVyxNQUFNLENBQUM7UUFDdEMsZ0NBQTJCLEdBQVcsTUFBTSxDQUFDO1FBb0JyQyw2QkFBd0IsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUMxRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkUsNkJBQXdCLEdBQVEsSUFBSSxDQUFDO1FBTzdCLDBCQUFxQixHQUFHLElBQUksaUJBQU8sRUFBUyxDQUFDO1FBQ3JELHFCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCwwQkFBcUIsR0FBUSxJQUFJLENBQUM7UUFPMUIsMEJBQXFCLEdBQUcsSUFBSSxpQkFBTyxFQUFTLENBQUM7UUFDckQscUJBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELDBCQUFxQixHQUFVLEVBQUUsQ0FBQztRQU8xQiwrQkFBMEIsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUM1RCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkUsK0JBQTBCLEdBQVksS0FBSyxDQUFDO1FBT3BDLHFCQUFnQixHQUFHLElBQUksaUJBQU8sRUFBTyxDQUFDO1FBQzlDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELHFCQUFnQixHQUFRLElBQUksQ0FBQztRQXZE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RTs7T0FDQSxnQkFBZ0IsQ0F5SjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXpKRCxJQXlKQztBQXpKWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJsZURldmljZSB9IGZyb20gJy4uLy4uL21vZGVscy9ibGUtZGV2aWNlLm1vZGVsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZCc7XHJcblxyXG5pbXBvcnQgYmx1ZXRvb3RoID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWJsdWV0b290aCcpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQmx1ZXRvb3RoU2VydmljZSB7XHJcbiAgICBERUZBVUxUX1NFUlZJQ0VfVVVJRDogc3RyaW5nID0gXCJGRkUwXCI7XHJcbiAgICBERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQ6IHN0cmluZyA9IFwiRkZFMVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpLnRoZW4oZ3JhbnRlZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9CbHVldG9vdGhFbmFibGVkKCkuc3Vic2NyaWJlKChpc0JsdWV0b290aEVuYWJsZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0SXNCbHVldG9vdGhFbmFibGVkKGlzQmx1ZXRvb3RoRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YVJlc3VsdChudWxsKTtcclxuICAgICAgICB0aGlzLnNldElzQmx1ZXRvb3RoRW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zZXRibGVEZXZpY2VDaG9zZW4obnVsbCk7XHJcbiAgICAgICAgdGhpcy5zZXRCbGVEZXZpY2VzRm91bmQoW10pO1xyXG4gICAgICAgIHRoaXMuc2V0YmxlRGV2aWNlQ29ubmVjdGVkKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgICBpc0JsdWV0b290aEVuYWJsZWQkID0gdGhpcy5pc0JsdWV0b290aEVuYWJsZWRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBpc0JsdWV0b290aEVuYWJsZWRPYmplY3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgc2V0SXNCbHVldG9vdGhFbmFibGVkKGJsdWV0b290aEVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmlzQmx1ZXRvb3RoRW5hYmxlZE9iamVjdCA9IGJsdWV0b290aEVuYWJsZWQ7XHJcbiAgICAgICAgdGhpcy5pc0JsdWV0b290aEVuYWJsZWRTb3VyY2UubmV4dChibHVldG9vdGhFbmFibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJsZURldmljZUNob3NlblNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueVtdPigpO1xyXG4gICAgYmxlRGV2aWNlQ2hvc2VuJCA9IHRoaXMuYmxlRGV2aWNlQ2hvc2VuU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgYmxlRGV2aWNlQ2hvc2VuT2JqZWN0OiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHNldGJsZURldmljZUNob3NlbihkZXZpY2U6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ2hvc2VuT2JqZWN0ID0gZGV2aWNlO1xyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ2hvc2VuU291cmNlLm5leHQoZGV2aWNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJsZURldmljZXNGb3VuZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueVtdPigpO1xyXG4gICAgYmxlRGV2aWNlc0ZvdW5kJCA9IHRoaXMuYmxlRGV2aWNlc0ZvdW5kU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgYmxlRGV2aWNlc0ZvdW5kT2JqZWN0OiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIHNldEJsZURldmljZXNGb3VuZChkZXZpY2VzOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuYmxlRGV2aWNlc0ZvdW5kT2JqZWN0ID0gZGV2aWNlcztcclxuICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZFNvdXJjZS5uZXh0KGRldmljZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNCbGVEZXZpY2VDb25uZWN0ZWRTb3VyY2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gICAgaXNCbGVEZXZpY2VDb25uZWN0ZWQkID0gdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIGlzQmxlRGV2aWNlQ29ubmVjdGVkT2JqZWN0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc2V0YmxlRGV2aWNlQ29ubmVjdGVkKGNvbm5lY3RlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNCbGVEZXZpY2VDb25uZWN0ZWRPYmplY3QgPSBjb25uZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZFNvdXJjZS5uZXh0KGNvbm5lY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhUmVzdWx0U291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgZGF0YVJlc3VsdCQgPSB0aGlzLmRhdGFSZXN1bHRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBkYXRhUmVzdWx0T2JqZWN0OiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHNldERhdGFSZXN1bHQoZGF0YVJlc3VsdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhUmVzdWx0T2JqZWN0ID0gZGF0YVJlc3VsdDtcclxuICAgICAgICB0aGlzLmRhdGFSZXN1bHRTb3VyY2UubmV4dChkYXRhUmVzdWx0KTtcclxuICAgIH1cclxuICAgIGxpc3RlblRvQmx1ZXRvb3RoRW5hYmxlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xyXG4gICAgICAgICAgICBibHVldG9vdGguaXNCbHVldG9vdGhFbmFibGVkKCkudGhlbihlbmFibGVkID0+IG9ic2VydmVyLm5leHQoZW5hYmxlZCkpXHJcblxyXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBibHVldG9vdGguaXNCbHVldG9vdGhFbmFibGVkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZW5hYmxlZCA9PiBvYnNlcnZlci5uZXh0KGVuYWJsZWQpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3AgY2hlY2tpbmcgZXZlcnkgc2Vjb25kIG9uIHVuc3Vic2NyaWJlXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FuRm9yQmxlRGV2aWNlcygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zZXRCbGVEZXZpY2VzRm91bmQoW10pOyAvLyBSZXNldCBCTEUgRGV2aWNlcyBGb3VuZFxyXG4gICAgICAgIGJsdWV0b290aC5zdGFydFNjYW5uaW5nKHtcclxuICAgICAgICAgICAgc2Vjb25kczogNCxcclxuICAgICAgICAgICAgb25EaXNjb3ZlcmVkOiBmdW5jdGlvbiAocGVyaXBoZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmlwZXJoYWwgRm91bmQgLSBVVUlEOiAke3BlcmlwaGVyYWwuVVVJRH0sIE5BTUU6ICR7cGVyaXBoZXJhbC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ibGVEZXZpY2VzRm91bmRPYmplY3QucHVzaChwZXJpcGhlcmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnNldEJsZURldmljZXNGb3VuZChzZWxmLmJsZURldmljZXNGb3VuZE9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjYW5uaW5nIGNvbXBsZXRlXCIpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBzY2FubmluZzogXCIgKyBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3RUb0JsZURldmljZShibGVEZXZpY2U6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGJsZURldmljZS5VVUlEKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xyXG4gICAgICAgICAgICBVVUlEOiBibGVEZXZpY2UuVVVJRCxcclxuICAgICAgICAgICAgb25Db25uZWN0ZWQ6IGZ1bmN0aW9uIChwZXJpcGhlcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldGJsZURldmljZUNvbm5lY3RlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUEVSSVBIRVJBTCBDT05ORUNURUQhXCIsIHBlcmlwaGVyYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSBwZXJpcGhlcmFsIG9iamVjdCBub3cgaGFzIGEgbGlzdCBvZiBhdmFpbGFibGUgc2VydmljZXM6XHJcbiAgICAgICAgICAgICAgICBwZXJpcGhlcmFsLnNlcnZpY2VzLmZvckVhY2goZnVuY3Rpb24gKHNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpY2UgZm91bmQ6IFwiLCBzZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRCbHVldG9vdGhOb3RpZnlSZWFkZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25EaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIChwZXJpcGhlcmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmlwZXJoYWwgZGlzY29ubmVjdGVkIHdpdGggVVVJRDogXCIgKyBwZXJpcGhlcmFsLlVVSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRCbHVldG9vdGhOb3RpZnlSZWFkZXIoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGJsdWV0b290aC5zdGFydE5vdGlmeWluZyh7XHJcbiAgICAgICAgICAgIHBlcmlwaGVyYWxVVUlEOiBzZWxmLmJsZURldmljZUNob3Nlbk9iamVjdC5VVUlELFxyXG4gICAgICAgICAgICBzZXJ2aWNlVVVJRDogc2VsZi5ERUZBVUxUX1NFUlZJQ0VfVVVJRCxcclxuICAgICAgICAgICAgY2hhcmFjdGVyaXN0aWNVVUlEOiBzZWxmLkRFRkFVTFRfQ0hBUkFDVEVSSVNUSUNfVVVJRCxcclxuICAgICAgICAgICAgb25Ob3RpZnk6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWVSYXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQudmFsdWVSYXcudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRhUmVzdWx0KHJlc3VsdC52YWx1ZVJhdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmVkIGZvciBCbHVldG9vdGggTm90aWZpY2F0aW9uc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gYmx1ZXRvb3RoLmhhc0NvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpXHJcbiAgICAgICAgICAgIC50aGVuKChncmFudGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBsb2NhdGlvbiBwZXJtaXNzaW9uID8gXCIgKyBncmFudGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBibHVldG9vdGgucmVxdWVzdENvYXJzZUxvY2F0aW9uUGVybWlzc2lvbigpLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJMb2NhdGlvbiBwZXJtaXNzaW9uIHJlcXVlc3RlZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyYW50ZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==