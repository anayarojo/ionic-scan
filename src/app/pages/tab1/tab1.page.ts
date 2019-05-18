import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(private barcodeScanner: BarcodeScanner, 
              private storageService: StorageService,
              private utilsService: UtilitiesService) { }

  ionViewDidEnter() {
    console.log('viewDidEnter');
  }

  ionViewDidLeave() {
    console.log('viewDidLeave');
  }

  ionViewDidLoad() {
    console.log('viewDidLoad');
  }

  ionViewWillEnter() {
    console.log('viewWillEnter');
  }

  ionViewWillLeave() {
    console.log('viewWillLeave');
  }

  // Deprecated in Ionic 4
  ionViewWillUnload() {
    console.log('viewWillUnload');
  }

  scan() {
    const options = {
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : false, // iOS and Android
      showTorchButton : false, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats : "default", // default: all but PDF_417 and RSS_EXPANDED
      orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : false, // iOS
      disableSuccessBeep: false // iOS and Android
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if (!barcodeData.cancelled) {
        this.storageService.saveRegistry(barcodeData.format, barcodeData.text);
      }

     }).catch(err => {
         console.log('Error', err);
         this.storageService.saveRegistry('QRCode', 'geo:29.081899980957846,-110.95356359919435');
         // this.storageService.saveRegistry('QRCode', 'http://www.anayarojo.net');
     });
  }

}
