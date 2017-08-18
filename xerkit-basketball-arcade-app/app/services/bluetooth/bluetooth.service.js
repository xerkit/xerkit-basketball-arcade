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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw4Q0FBNkM7QUFDN0Msd0NBQXVDO0FBQ3ZDLGdDQUE4QjtBQUM5QixpQ0FBK0I7QUFDL0Isa0RBQWdEO0FBRWhELGtEQUFxRDtBQUdyRDtJQUlJO1FBQUEsaUJBUUM7UUFYRCx5QkFBb0IsR0FBVyxNQUFNLENBQUM7UUFDdEMsZ0NBQTJCLEdBQVcsTUFBTSxDQUFDO1FBb0JyQyw2QkFBd0IsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUMxRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkUsNkJBQXdCLEdBQVEsSUFBSSxDQUFDO1FBTzdCLDBCQUFxQixHQUFHLElBQUksaUJBQU8sRUFBUyxDQUFDO1FBQ3JELHFCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCwwQkFBcUIsR0FBUSxJQUFJLENBQUM7UUFPMUIsMEJBQXFCLEdBQUcsSUFBSSxpQkFBTyxFQUFTLENBQUM7UUFDckQscUJBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELDBCQUFxQixHQUFVLEVBQUUsQ0FBQztRQU8xQiwrQkFBMEIsR0FBRyxJQUFJLGlCQUFPLEVBQVcsQ0FBQztRQUM1RCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkUsK0JBQTBCLEdBQVksS0FBSyxDQUFDO1FBT3BDLHFCQUFnQixHQUFHLElBQUksaUJBQU8sRUFBTyxDQUFDO1FBQzlDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELHFCQUFnQixHQUFRLElBQUksQ0FBQztRQXZEekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDMUMsS0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsa0JBQWtCO2dCQUN6RCxJQUFJLENBQUMscUJBQXFCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBTUQsZ0RBQXFCLEdBQXJCLFVBQXNCLGdCQUF5QjtRQUMzQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFNRCw2Q0FBa0IsR0FBbEIsVUFBbUIsTUFBVztRQUMxQixJQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQU1ELDZDQUFrQixHQUFsQixVQUFtQixPQUFjO1FBQzdCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBTUQsZ0RBQXFCLEdBQXJCLFVBQXNCLFNBQWtCO1FBQ3BDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxTQUFTLENBQUM7UUFDNUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBTUQsd0NBQWEsR0FBYixVQUFjLFVBQWU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxtREFBd0IsR0FBeEI7UUFDSSxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLFVBQUEsUUFBUTtZQUMxQixTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUE7WUFFdEUsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUM1QjtnQkFDSSxTQUFTLENBQUMsa0JBQWtCLEVBQUU7cUJBQ3pCLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQTtZQUNoRCxDQUFDLEVBQ0MsSUFBSSxDQUFDLENBQUM7WUFFWiw0Q0FBNEM7WUFDNUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQTdCLENBQTZCLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNENBQWlCLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtRQUN2RCxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsWUFBWSxFQUFFLFVBQVUsVUFBVTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBNEIsVUFBVSxDQUFDLElBQUksZ0JBQVcsVUFBVSxDQUFDLElBQU0sQ0FBQyxDQUFDO2dCQUNyRixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hELENBQUM7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXBELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUUsVUFBVSxHQUFHO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBa0IsR0FBbEIsVUFBbUIsU0FBYztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNkLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtZQUNwQixXQUFXLEVBQUUsVUFBVSxVQUFVO2dCQUM3QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBRWpELDhEQUE4RDtnQkFDOUQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFPO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsY0FBYyxFQUFFLFVBQVUsVUFBVTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pFLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscURBQTBCLEdBQTFCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDckIsY0FBYyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJO1lBQy9DLFdBQVcsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQ3RDLGtCQUFrQixFQUFFLElBQUksQ0FBQywyQkFBMkI7WUFDcEQsUUFBUSxFQUFFLFVBQVUsTUFBTTtnQkFDdEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLDJDQUEyQztvQkFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxREFBMEIsR0FBMUI7UUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFO2FBQ3pDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO1lBQ3pHLENBQUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXZKUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0F5SjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXpKRCxJQXlKQztBQXpKWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbGVEZXZpY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmxlLWRldmljZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kaXN0aW5jdFVudGlsQ2hhbmdlZCc7XG5cbmltcG9ydCBibHVldG9vdGggPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYmx1ZXRvb3RoJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCbHVldG9vdGhTZXJ2aWNlIHtcbiAgICBERUZBVUxUX1NFUlZJQ0VfVVVJRDogc3RyaW5nID0gXCJGRkUwXCI7XG4gICAgREVGQVVMVF9DSEFSQUNURVJJU1RJQ19VVUlEOiBzdHJpbmcgPSBcIkZGRTFcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5nZXRDZW50cmFsRGV2aWNlUGVybWlzc2lvbigpLnRoZW4oZ3JhbnRlZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvQmx1ZXRvb3RoRW5hYmxlZCgpLnN1YnNjcmliZSgoaXNCbHVldG9vdGhFbmFibGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRJc0JsdWV0b290aEVuYWJsZWQoaXNCbHVldG9vdGhFbmFibGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhUmVzdWx0KG51bGwpO1xuICAgICAgICB0aGlzLnNldElzQmx1ZXRvb3RoRW5hYmxlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0YmxlRGV2aWNlQ2hvc2VuKG51bGwpO1xuICAgICAgICB0aGlzLnNldEJsZURldmljZXNGb3VuZChbXSk7XG4gICAgICAgIHRoaXMuc2V0YmxlRGV2aWNlQ29ubmVjdGVkKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQmx1ZXRvb3RoRW5hYmxlZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgaXNCbHVldG9vdGhFbmFibGVkJCA9IHRoaXMuaXNCbHVldG9vdGhFbmFibGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGlzQmx1ZXRvb3RoRW5hYmxlZE9iamVjdDogYW55ID0gbnVsbDtcblxuICAgIHNldElzQmx1ZXRvb3RoRW5hYmxlZChibHVldG9vdGhFbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNCbHVldG9vdGhFbmFibGVkT2JqZWN0ID0gYmx1ZXRvb3RoRW5hYmxlZDtcbiAgICAgICAgdGhpcy5pc0JsdWV0b290aEVuYWJsZWRTb3VyY2UubmV4dChibHVldG9vdGhFbmFibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJsZURldmljZUNob3NlblNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueVtdPigpO1xuICAgIGJsZURldmljZUNob3NlbiQgPSB0aGlzLmJsZURldmljZUNob3NlblNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBibGVEZXZpY2VDaG9zZW5PYmplY3Q6IGFueSA9IG51bGw7XG5cbiAgICBzZXRibGVEZXZpY2VDaG9zZW4oZGV2aWNlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VDaG9zZW5PYmplY3QgPSBkZXZpY2U7XG4gICAgICAgIHRoaXMuYmxlRGV2aWNlQ2hvc2VuU291cmNlLm5leHQoZGV2aWNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJsZURldmljZXNGb3VuZFNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueVtdPigpO1xuICAgIGJsZURldmljZXNGb3VuZCQgPSB0aGlzLmJsZURldmljZXNGb3VuZFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBibGVEZXZpY2VzRm91bmRPYmplY3Q6IGFueVtdID0gW107XG5cbiAgICBzZXRCbGVEZXZpY2VzRm91bmQoZGV2aWNlczogYW55W10pIHtcbiAgICAgICAgdGhpcy5ibGVEZXZpY2VzRm91bmRPYmplY3QgPSBkZXZpY2VzO1xuICAgICAgICB0aGlzLmJsZURldmljZXNGb3VuZFNvdXJjZS5uZXh0KGRldmljZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNCbGVEZXZpY2VDb25uZWN0ZWRTb3VyY2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIGlzQmxlRGV2aWNlQ29ubmVjdGVkJCA9IHRoaXMuaXNCbGVEZXZpY2VDb25uZWN0ZWRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgaXNCbGVEZXZpY2VDb25uZWN0ZWRPYmplY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHNldGJsZURldmljZUNvbm5lY3RlZChjb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZE9iamVjdCA9IGNvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5pc0JsZURldmljZUNvbm5lY3RlZFNvdXJjZS5uZXh0KGNvbm5lY3RlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkYXRhUmVzdWx0U291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGRhdGFSZXN1bHQkID0gdGhpcy5kYXRhUmVzdWx0U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGRhdGFSZXN1bHRPYmplY3Q6IGFueSA9IG51bGw7XG5cbiAgICBzZXREYXRhUmVzdWx0KGRhdGFSZXN1bHQ6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGFSZXN1bHRPYmplY3QgPSBkYXRhUmVzdWx0O1xuICAgICAgICB0aGlzLmRhdGFSZXN1bHRTb3VyY2UubmV4dChkYXRhUmVzdWx0KTtcbiAgICB9XG4gICAgbGlzdGVuVG9CbHVldG9vdGhFbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgICAgYmx1ZXRvb3RoLmlzQmx1ZXRvb3RoRW5hYmxlZCgpLnRoZW4oZW5hYmxlZCA9PiBvYnNlcnZlci5uZXh0KGVuYWJsZWQpKVxuXG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJsdWV0b290aC5pc0JsdWV0b290aEVuYWJsZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZW5hYmxlZCA9PiBvYnNlcnZlci5uZXh0KGVuYWJsZWQpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsIDEwMDApO1xuXG4gICAgICAgICAgICAvLyBzdG9wIGNoZWNraW5nIGV2ZXJ5IHNlY29uZCBvbiB1bnN1YnNjcmliZVxuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzY2FuRm9yQmxlRGV2aWNlcygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnNldEJsZURldmljZXNGb3VuZChbXSk7IC8vIFJlc2V0IEJMRSBEZXZpY2VzIEZvdW5kXG4gICAgICAgIGJsdWV0b290aC5zdGFydFNjYW5uaW5nKHtcbiAgICAgICAgICAgIHNlY29uZHM6IDQsXG4gICAgICAgICAgICBvbkRpc2NvdmVyZWQ6IGZ1bmN0aW9uIChwZXJpcGhlcmFsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBlcmlwZXJoYWwgRm91bmQgLSBVVUlEOiAke3BlcmlwaGVyYWwuVVVJRH0sIE5BTUU6ICR7cGVyaXBoZXJhbC5uYW1lfWApO1xuICAgICAgICAgICAgICAgIHNlbGYuYmxlRGV2aWNlc0ZvdW5kT2JqZWN0LnB1c2gocGVyaXBoZXJhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zZXRCbGVEZXZpY2VzRm91bmQoc2VsZi5ibGVEZXZpY2VzRm91bmRPYmplY3QpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjYW5uaW5nIGNvbXBsZXRlXCIpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHdoaWxlIHNjYW5uaW5nOiBcIiArIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbm5lY3RUb0JsZURldmljZShibGVEZXZpY2U6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhibGVEZXZpY2UuVVVJRCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgYmx1ZXRvb3RoLmNvbm5lY3Qoe1xuICAgICAgICAgICAgVVVJRDogYmxlRGV2aWNlLlVVSUQsXG4gICAgICAgICAgICBvbkNvbm5lY3RlZDogZnVuY3Rpb24gKHBlcmlwaGVyYWwpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldGJsZURldmljZUNvbm5lY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBFUklQSEVSQUwgQ09OTkVDVEVEIVwiLCBwZXJpcGhlcmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIHRoZSBwZXJpcGhlcmFsIG9iamVjdCBub3cgaGFzIGEgbGlzdCBvZiBhdmFpbGFibGUgc2VydmljZXM6XG4gICAgICAgICAgICAgICAgcGVyaXBoZXJhbC5zZXJ2aWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmljZSBmb3VuZDogXCIsIHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5zdGFydEJsdWV0b290aE5vdGlmeVJlYWRlcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRGlzY29ubmVjdGVkOiBmdW5jdGlvbiAocGVyaXBoZXJhbCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmlwZXJoYWwgZGlzY29ubmVjdGVkIHdpdGggVVVJRDogXCIgKyBwZXJpcGhlcmFsLlVVSUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydEJsdWV0b290aE5vdGlmeVJlYWRlcigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBibHVldG9vdGguc3RhcnROb3RpZnlpbmcoe1xuICAgICAgICAgICAgcGVyaXBoZXJhbFVVSUQ6IHNlbGYuYmxlRGV2aWNlQ2hvc2VuT2JqZWN0LlVVSUQsXG4gICAgICAgICAgICBzZXJ2aWNlVVVJRDogc2VsZi5ERUZBVUxUX1NFUlZJQ0VfVVVJRCxcbiAgICAgICAgICAgIGNoYXJhY3RlcmlzdGljVVVJRDogc2VsZi5ERUZBVUxUX0NIQVJBQ1RFUklTVElDX1VVSUQsXG4gICAgICAgICAgICBvbk5vdGlmeTogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWVSYXcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0LnZhbHVlUmF3LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGFSZXN1bHQocmVzdWx0LnZhbHVlUmF3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmVkIGZvciBCbHVldG9vdGggTm90aWZpY2F0aW9uc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2VudHJhbERldmljZVBlcm1pc3Npb24oKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBibHVldG9vdGguaGFzQ29hcnNlTG9jYXRpb25QZXJtaXNzaW9uKClcbiAgICAgICAgICAgIC50aGVuKChncmFudGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJIYXMgbG9jYXRpb24gcGVybWlzc2lvbiA/IFwiICsgZ3JhbnRlZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdyYW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmx1ZXRvb3RoLnJlcXVlc3RDb2Fyc2VMb2NhdGlvblBlcm1pc3Npb24oKS50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiTG9jYXRpb24gcGVybWlzc2lvbiByZXF1ZXN0ZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBncmFudGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59Il19