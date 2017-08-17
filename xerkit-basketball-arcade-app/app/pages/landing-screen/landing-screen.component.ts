import { Subscription } from 'rxjs/Rx';
import { BluetoothService } from '../../services/bluetooth/bluetooth.service';
import { Component, ElementRef, OnInit, ViewChild, NgZone, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import { NavigationService } from "../../services/navigation/navigation.service"

import bluetooth = require('nativescript-bluetooth');
import * as dialogs from "ui/dialogs";
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';

@Component({
    selector: "landingScreen",
    moduleId: module.id,
    templateUrl: "./landing-screen.component.html",
    styleUrls: ["./landing-screen-common.css"]
})
export class LandingScreenComponent implements OnInit {

    startedScanning: boolean = false;
    bleDevicesFound: any[] = [];
    selectedDeviceIndex: number = -1;
    chosenBleDevice: any = null;
    isBluetoothDeviceConnected: boolean = false;
    isBluetoothEnabled: boolean = false;

    constructor(private _page: Page, private _ngZone: NgZone, private _navigationService: NavigationService, private _bluetoothService: BluetoothService) {
        _page.on("navigatedTo", function () {
            setCurrentOrientation("landscape", function () {
                console.log("landscape orientation");
            });
        });
        _page.on("navigatingFrom", function () {
            orientationCleanup();
        });
    };

    get bluetoothDeviceConnectionStatus(): string {
        return this.isBluetoothDeviceConnected ? "Device Connected" : "Device Not Connected";
    }

    get bluetoothStatus(): string {
        return this.isBluetoothEnabled ? "Bluetooth Enabled" : "Bluetooth Disabled";
    }

    bluetoothEnabledSubscription: Subscription;
    bleDevicesFoundSubscription: Subscription;
    chosenBleDeviceSubscription: Subscription;
    bleDeviceConnectedSubscription: Subscription;

    ngOnInit() {
        var self = this;
        this.bluetoothEnabledSubscription = this._bluetoothService.isBluetoothEnabled$.subscribe((isBluetoothEnabled) => {
            self._ngZone.run(() => {
                this.isBluetoothEnabled = isBluetoothEnabled;
            });
        });

        this.bleDevicesFoundSubscription = this._bluetoothService.bleDevicesFound$.subscribe((devicesFound) => {
            self._ngZone.run(() => {
                this.bleDevicesFound = devicesFound;
            });
        });

        this.chosenBleDeviceSubscription = this._bluetoothService.bleDeviceChosen$.subscribe((chosenBleDevice) => {
            self._ngZone.run(() => {
                this.chosenBleDevice = chosenBleDevice;
                this.selectedDeviceIndex = this.bleDevicesFound.indexOf(chosenBleDevice, 0);
            });
        });

        this.bleDeviceConnectedSubscription = this._bluetoothService.isBleDeviceConnected$.subscribe((isBleDeviceConnected) => {
            self._ngZone.run(() => {
                this.isBluetoothDeviceConnected = isBleDeviceConnected;
                if (isBleDeviceConnected) {
                    this.goToPlayScreen();
                }
            });
        });

        this._page.actionBarHidden = true;
    }

    goToPlayScreen() {
        this._navigationService.navigateToPlayScreen(false);
    }

    goToTopScoreScreen() {
        this._navigationService.navigateToTopScoreScreen(false);
    }

    onPlayTap() {
        if (this.isBluetoothEnabled) {
            //show list of bluetooth devices in a dialog
        } else {
            dialogs.alert("Enable Bluetooth First").then(() => {
                console.log("Bluetooth not enabled");
            });
        }
    }

    ngOnDestroy() {
        this.bluetoothEnabledSubscription.unsubscribe();
        this.bleDevicesFoundSubscription.unsubscribe();
        this.chosenBleDeviceSubscription.unsubscribe();
        this.bleDeviceConnectedSubscription.unsubscribe();
    }

    onScanPeripheralsTap() {
        this.selectedDeviceIndex = -1;
        this._bluetoothService.scanForBleDevices();
    }

    onBleDeviceTap($event) {
        this._bluetoothService.setbleDeviceChosen(this.bleDevicesFound[$event.index]);
        console.log(this.bleDevicesFound[$event.index]);

        this._bluetoothService.connectToBleDevice(this.bleDevicesFound[$event.index]);
    }
}