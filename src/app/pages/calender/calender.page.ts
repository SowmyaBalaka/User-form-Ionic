import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonLabel,IonGrid,IonRow,IonCol,IonFabButton,IonIcon,IonFab,IonImg,IonAccordionGroup,IonAccordion,IonItem} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/comonents/header/header.component';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
  standalone: true,
  imports: [IonContent,  IonImg,CommonModule, FormsModule,IonLabel,IonGrid,IonRow,IonCol,HeaderComponent,IonFabButton,IonIcon,IonFab,IonAccordionGroup,IonAccordion,IonItem]
})
export class CalenderPage implements OnInit {

  constructor(public photoService:PhotoService) {
    addIcons({ camera });
   }

  ngOnInit() {
  }
  addPhotoToGallery() {
  // this.photoService.addNewToGallery();
}

}
