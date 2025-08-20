import { Component, OnInit,  CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonSearchbar, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Output() searchChanged = new EventEmitter<string>();

  onSearch(event: any) {
    const value = event.target.value?.toLowerCase() || '';
    this.searchChanged.emit(value);
  }

}
