import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { swapVerticalOutline } from 'ionicons/icons';
import { ActionSheetController } from '@ionic/angular';
import {IonButton,IonIcon} from '@ionic/angular/standalone';


@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  imports:[IonButton,IonIcon]
})
export class SortComponent  implements OnInit {

  constructor( private actionSheetController:ActionSheetController) { 
    addIcons({swapVerticalOutline})
  }

  ngOnInit() {}
  @Output() sortValue:EventEmitter<string> = new EventEmitter<string>();
  async presentSortOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort Users  By Age',
      buttons: [
        {
          text: 'Low-High',
          handler: () => this.sortValue.emit('asc')
        },
        {
          text: 'High-Low',
          handler: () => this.sortValue.emit('desc')
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();

}
}
