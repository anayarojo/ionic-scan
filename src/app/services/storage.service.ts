import { Injectable } from '@angular/core';
import { Registry } from '../models/registry.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File as IonFile } from '@ionic-native/file/ngx';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  savedRegistries: Registry[] = [];

  constructor(private storage: Storage,
              private utilsService: UtilitiesService,
              private navController: NavController,
              private inAppBrowser: InAppBrowser,
              private emailComposer: EmailComposer,
              private file: IonFile,) {
    this.loadSavedRegistries();
  }

  async loadSavedRegistries() {
    const savedRegistries = await this.storage.get('saved_registries');
    this.savedRegistries = savedRegistries || [];
    return this.savedRegistries;
  }

  async saveRegistry(format: string, text: string) {
    await this.loadSavedRegistries();
    const registry = new Registry(format, text);
    this.savedRegistries.unshift(registry);
    this.storage.set('saved_registries', this.savedRegistries);
    this.openSavedRegistry(registry);
  }

  openSavedRegistry(registry: Registry) {
    this.navController.navigateForward('/tabs/tab2');

    switch (registry.type) {
      case 'http':
        // const options: InAppBrowserOptions = {
        //   zoom: 'no',
        //   location: 'yes',
        //   toolbar: 'no'
        // };
        // his.inAppBrowser.create('https://www.google.com', '_self', options);
        // this.inAppBrowser.create(registry.text, '_self', options);
        this.inAppBrowser.create(registry.text, '_system');
        // this.navController.navigateForward(`/tabs/tab2/site/${registry.text.replace('http://', '').replace('https://', '')}`);
      break;

      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/map/${registry.text}`);
      break;
    }
  }

  sendEmail() {
    const arrTemp = [];
    const titles = 'Type, Format, Creation date, Text\n';

    arrTemp.push(titles);
    this.savedRegistries.forEach( registry => {
      const row = `${registry.type}, ${registry.format}, ${registry.created}, ${registry.text.replace(',', ' ')}\n`;
      arrTemp.push(row);
    });

    // console.log(arrTemp.join(''));
    this.createFile(arrTemp.join(''));
  }

  createFile(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registries.csv')
    .then( exists => {
      console.log('Exists file?', exists);
      return this.writeInFile(text);
    })
    .catch( error_at_check => {
      return this.file.createFile(this.file.dataDirectory, 'registries.csv', false)
      .then(created => {
        this.writeInFile(text);
      })
      .catch( error_at_create => {
        console.log('Error at create file', error_at_create);
        this.utilsService.showToast({
          message: `Error at create file: \n${error_at_create}`,
          duration: 5000,
          showCloseButton: true,
          color: 'danger',
        });
      });
    });
  }

  async writeInFile(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registries.csv', text);
    const filePath = `${this.file.dataDirectory}registries.csv`;
    console.log('File created');
    console.log(filePath);
    this.utilsService.showToast({
      message: `File created: \n${filePath}`,
      duration: 2000,
    });

    const email = {
      to: 'raulmartin_04@hotmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        filePath
      ],
      subject: 'History in Scan App',
      body: `Hello, We attached the history of scans in the <strong>Scan App</strong>`,
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
