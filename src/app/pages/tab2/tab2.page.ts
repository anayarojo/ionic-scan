import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public storageService: StorageService,
              private utilsService: UtilitiesService) { }

  sendEmail() {
    // console.log('Send email');
    this.utilsService.showToast({message: 'Sending email...'});
    this.storageService.sendEmail();
  }
}

