# Ionic scanner
Aplicación hecha en ionic 4 para scanear codigos de barra y QR

![Ionic 4 ─ Scanner ─ Preview 1](https://raw.githubusercontent.com/anayarojo/ionic-scanner/master/wiki/img/Ionic%204%20%E2%94%80%20Scanner%20%E2%94%80%20Preview%201.PNG)

![Ionic 4 ─ Scanner ─ Preview 2](https://raw.githubusercontent.com/anayarojo/ionic-scanner/master/wiki/img/Ionic%204%20%E2%94%80%20Scanner%20%E2%94%80%20Preview%202.PNG)

![Ionic 4 ─ Scanner ─ Preview 3](https://raw.githubusercontent.com/anayarojo/ionic-scanner/master/wiki/img/Ionic%204%20%E2%94%80%20Scanner%20%E2%94%80%20Preview%203.PNG)

```
ionic start scanner tabs
```

## Barcode scanner implementation

```
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install @ionic-native/barcode-scanner
```

### Example

```typescript
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

constructor(private barcodeScanner: BarcodeScanner) { }

...

this.barcodeScanner.scan().then(barcodeData => {
 console.log('Barcode data', barcodeData);
}).catch(err => {
    console.log('Error', err);
});
```

### Documentation

https://ionicframework.com/docs/native/in-app-browser#installation

```
ionic g service services/storage
ionic g service services/utilities
```

## Storage implementation

```
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage
```

### Example 

```
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // ...
  ],
  providers: [
    // ...
  ]
})
export class AppModule {}
```

```
import { Storage } from '@ionic/storage';

export class MyApp {
  constructor(private storage: Storage) { }

  ...

  // set a key/value
  storage.set('name', 'Max');

  // Or to get a key/value pair
  storage.get('age').then((val) => {
    console.log('Your age is', val);
  });
}
```

### Documentation

https://ionicframework.com/docs/building/storage

## In app browser implementation

```
ionic cordova plugin add cordova-plugin-inappbrowser
npm install @ionic-native/in-app-browser
```

### Example

```typescript
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

constructor(private iab: InAppBrowser) { }

...

const browser = this.iab.create('https://ionicframework.com/');

browser.executeScript(...);

browser.insertCSS(...);
browser.on('loadstop').subscribe(event => {
   browser.insertCSS({ code: "body{color: red;" });
});

browser.close();
```

### Documentation

https://ionicframework.com/docs/native/in-app-browser

```
ionic g page pages/map
```

## File implementation

```
ionic cordova plugin add cordova-plugin-file
npm install @ionic-native/file
```

### Documentation

https://ionicframework.com/docs/native/file


## Email implementation

```
ionic cordova plugin add cordova-plugin-email-composer
npm install @ionic-native/email-composer
```

### Example

```typescript
import { EmailComposer } from '@ionic-native/email-composer/ngx';

constructor(private emailComposer: EmailComposer) { }

...

this.emailComposer.isAvailable().then((available: boolean) =>{
 if(available) {
   //Now we know we can send
 }
});

let email = {
  to: 'max@mustermann.de',
  cc: 'erika@mustermann.de',
  bcc: ['john@doe.com', 'jane@doe.com'],
  attachments: [
    'file://img/logo.png',
    'res://icon.png',
    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
    'file://README.pdf'
  ],
  subject: 'Cordova Icons',
  body: 'How are you? Nice greetings from Leipzig',
  isHtml: true
}

// Send a text message using default options
this.emailComposer.open(email);
```

### Documentation

https://ionicframework.com/docs/native/email-composer
