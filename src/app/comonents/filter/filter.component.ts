import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {IonSegment,IonSegmentButton,IonLabel,IonRow,IonCol} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, filterOutline } from 'ionicons/icons';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterComponent {

  constructor(private actionSheetController:ActionSheetController) {
    addIcons({filterOutline})
   }
   @Output() filterChanged = new EventEmitter<string>();
  async presentFilterOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter Users',
      buttons: [
        {
          text: 'All',
          handler: () => this.filterChanged.emit('all')
        },
        {
          text: 'Premium',
          handler: () => this.filterChanged.emit('premium')
        },
        {
          text: 'Non-Premium',
          handler: () => this.filterChanged.emit('nonPremium')
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }}
