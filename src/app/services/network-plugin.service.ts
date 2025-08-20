import { Injectable } from '@angular/core';
import { Network, NetworkStatus } from '@capacitor/network';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkPluginService {

  private networkChange = new Subject<NetworkStatus>();
  public networkChange$ = this.networkChange.asObservable();

  constructor() {
    this.listenToNetworkChanges();
  }

  private listenToNetworkChanges() {
    Network.addListener('networkStatusChange', (status) => {
      // console.log('Network status changed:', status);
      this.networkChange.next(status); 
    });
  }
  
}
