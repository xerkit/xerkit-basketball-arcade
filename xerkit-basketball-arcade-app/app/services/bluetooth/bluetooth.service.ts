import { Injectable } from '@angular/core';
import { BleDevice } from '../../models/ble-device.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/distinctUntilChanged';

import bluetooth = require('nativescript-bluetooth');

@Injectable()
export class BluetoothService {
    DEFAULT_SERVICE_UUID: string = "FFE0";
    DEFAULT_CHARACTERISTIC_UUID: string = "FFE1";

    constructor() {
        var self = this;

        this.getCentralDevicePermission().then(granted => {
            this.listenToBluetoothEnabled().subscribe((isBluetoothEnabled) => {
                self.setIsBluetoothEnabled(isBluetoothEnabled);
            });
        });
    }

    reset() {
        this.setIsBluetoothEnabled(false);
        this.setbleDeviceChosen(null);
        this.setBleDevicesFound([]);
        this.setbleDeviceConnected(false);
    }

    private isBluetoothEnabledSource = new Subject<boolean>();
    isBluetoothEnabled$ = this.isBluetoothEnabledSource.asObservable();
    isBluetoothEnabledObject: any = null;

    setIsBluetoothEnabled(bluetoothEnabled: boolean) {
        this.isBluetoothEnabledObject = bluetoothEnabled;
        this.isBluetoothEnabledSource.next(bluetoothEnabled);
    }

    private bleDeviceChosenSource = new Subject<any[]>();
    bleDeviceChosen$ = this.bleDeviceChosenSource.asObservable();
    bleDeviceChosenObject: any = null;

    setbleDeviceChosen(device: any) {
        this.bleDeviceChosenObject = device;
        this.bleDeviceChosenSource.next(device);
    }

    private bleDevicesFoundSource = new Subject<any[]>();
    bleDevicesFound$ = this.bleDevicesFoundSource.asObservable();
    bleDevicesFoundObject: any[] = [];

    setBleDevicesFound(devices: any[]) {
        this.bleDevicesFoundObject = devices;
        this.bleDevicesFoundSource.next(devices);
    }

    private isBleDeviceConnectedSource = new Subject<boolean>();
    isBleDeviceConnected$ = this.isBleDeviceConnectedSource.asObservable();
    isBleDeviceConnectedObject: boolean = false;

    setbleDeviceConnected(connected: boolean) {
        this.isBleDeviceConnectedObject = connected;
        this.isBleDeviceConnectedSource.next(connected);
    }

    listenToBluetoothEnabled(): Observable<boolean> {
        return new Observable(observer => {
            bluetooth.isBluetoothEnabled().then(enabled => observer.next(enabled))

            let intervalHandle = setInterval(
                () => {
                    bluetooth.isBluetoothEnabled()
                        .then(enabled => observer.next(enabled))
                }
                , 1000);

            // stop checking every second on unsubscribe
            return () => clearInterval(intervalHandle);
        });
    }

    scanForBleDevices() {
        var self = this;
        this.setBleDevicesFound([]); // Reset BLE Devices Found
        bluetooth.startScanning({
            seconds: 4,
            onDiscovered: function (peripheral) {
                console.log(`Periperhal Found - UUID: ${peripheral.UUID}, NAME: ${peripheral.name}`);
                self.bleDevicesFoundObject.push(peripheral);
            }
        }).then(function () {
            self.setBleDevicesFound(self.bleDevicesFoundObject);

            console.log("scanning complete");
        }, function (err) {
            console.log("error while scanning: " + err);
        });
    }

    sendMessageToBleDevice(message: string) {
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
        } else {
            throw new Error("BLE Device not connected!");
        }
    }

    connectToBleDevice(bleDevice: any) {
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
    }

    startBluetoothNotifyReader() {
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
    }

    stringToBluetoothHexString(str: string): string {
        var bluetoothHexString: string = "";
        for (var i = 0; i < str.length; i++) {
            bluetoothHexString += `0x${str.charCodeAt(i).toString(16)}`;

            if (i < (str.length - 1)) {
                bluetoothHexString += ",";
            }
        }

        console.log("BLUETOOTH HEX STRING: ", bluetoothHexString);
        return bluetoothHexString;
    }

    bluetoothHexStringToString(hexString: string): string {
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
    }

    // write(bluetoothMessage): void {
    //     console.log('Writing message: ' + JSON.stringify(bluetoothMessage));
    //     bluetooth.write(bluetoothMessage)
    //         .then((result) => console.log("Value written " + JSON.stringify(result)),
    //         (error) => console.log("Write error: " + error));
    // }

    getCentralDevicePermission(): Promise<boolean> {
        return bluetooth.hasCoarseLocationPermission()
            .then((granted) => {
                console.log("Has location permission ? " + granted);

                if (!granted) {
                    bluetooth.requestCoarseLocationPermission().then(() => console.log("Location permission requested"));
                }

                return granted;
            });
    }

    sendSetEngineIgnitionStatusOn(){
        this.sendMessageToBleDevice("password|C1");
    }

    sendSetEngineIgnitionStatusOff(){
        this.sendMessageToBleDevice("password|C0");
    }

}