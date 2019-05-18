import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private toastController: ToastController) { }

  async showToast(props: any) {

    const defaults = {
      message: 'Message.',
      duration: 1000,
      position: 'bottom',
      showCloseButton: false,
      closeButtonText: 'Close',
      color: 'dark',
    };

    props = Object.assign(defaults, props);

    const toast = await this.toastController.create(props);
    toast.present();
  }

}
