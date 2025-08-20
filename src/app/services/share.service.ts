import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Iperson } from '../interfaces/iperson';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  async shareUserData(user:Iperson){
    await Share.share({
  title: 'User Data',
  text: `Name: ${user.fullName}\nEmail: ${user.email}\nContact: ${user.contactNumber}`,
  dialogTitle: 'Share with buddies',
});
  }
}
