import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu,IonHeader,IonToolbar,IonContent,IonList,IonMenuToggle,IonItem,IonTitle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports:[IonMenu,IonHeader,IonToolbar,IonContent,IonList,IonMenuToggle,IonItem,IonTitle,RouterLink]
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
