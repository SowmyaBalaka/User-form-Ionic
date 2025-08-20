import { Component } from '@angular/core';
import { Network } from '@capacitor/network';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './comonents/header/header.component';
import { MenuComponent } from './comonents/menu/menu.component';
import { NetworkPluginService } from './services/network-plugin.service';
import { ToastService } from './services/toast.service';
import { SqLiteService } from './services/sq-lite.service';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor(private networkService: NetworkPluginService, private toast: ToastService,private sqLite:SqLiteService,private location:Location) {
    
    }
  private lastConnected!: boolean

  ngOnInit() {
    this.networkService.networkChange$.subscribe((status) => {
      if (status.connected !== this.lastConnected) {
        this.lastConnected = status.connected;
        if (!status.connected) {
          this.toast.presentToast("top", "You are offline", "warning")
        }
        else {
          this.toast.presentToast("top", "You are online", "success")
        }

      }
    });
    App.addListener('backButton',({canGoBack})=>{
      if(canGoBack){
        this.location.back();
      }else{
        App.exitApp();
      }
    })
    this.initApp(); 
  }
  async initApp(){
    await this.sqLite.initDB();
  }

}
