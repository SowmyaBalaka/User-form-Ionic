import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent, IonHeader, IonThumbnail, IonActionSheet, IonButton, IonTitle, IonToolbar, AlertController, IonRefresherContent, IonRefresher, IonInfiniteScroll,
  IonInfiniteScrollContent, RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from 'src/app/comonents/header/header.component';
import { Iperson } from 'src/app/interfaces/iperson';
import { addIcons } from 'ionicons';
import { add, createOutline, scanCircleOutline, shareSocialOutline, trashOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { HttpClientRequestService } from 'src/app/services/http-client-request.service';
import { ToastService } from 'src/app/services/toast.service';
import { BarCodeScannerService } from 'src/app/services/bar-code-scanner.service';
import { FilterComponent } from 'src/app/comonents/filter/filter.component';
import { SearchComponent } from 'src/app/comonents/search/search.component';
import { SortComponent } from 'src/app/comonents/sort/sort.component';
import { SqLiteService } from 'src/app/services/sq-lite.service';
import { ShareService } from 'src/app/services/share.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,
    HeaderComponent, RouterLink, FilterComponent, SearchComponent,
    SortComponent, IonRefresherContent, IonRefresher,
    IonInfiniteScroll,
    IonInfiniteScrollContent, ScrollingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  persons: Iperson[] = []
  // userForm:FormGroup;
  isSubmit: boolean = true;
  alertButtons = ['Close'];
  filteredPersons: Iperson[] = [];
  dbUser!: Iperson[]
  selectedFilter = 'all';

  constructor(private fb: FormBuilder, private alertController: AlertController, private clientService: HttpClientRequestService
    , private toast: ToastService, private barcode: BarCodeScannerService
    , private router: Router, private sqLite: SqLiteService, private shareService: ShareService, private loading: LoadingController
  ) {
    addIcons({
      trashOutline, createOutline, add, scanCircleOutline, shareSocialOutline
    })
  }

  ngOnInit() {
    console.log("Inside Hoem Ts");

  }

  handleRefresh(event: RefresherCustomEvent) {
    this.filteredPersons = [];
    this.getAllUser();
    event.target.complete()
  }
  shareData(user: Iperson) {
    this.shareService.shareUserData(user)
  }

  ionViewWillEnter() {
    this.getAllUser()
  }
  async openScanner() {
    this.barcode.scanCode().then((data) => {
      this.toast.presentToast('top', `Hey , ${data} Welcome...`, 'success');
    }).catch(err => {
      this.toast.presentToast('top', err, 'danger')
    })


  }
  async getAllUser() {
    //   const loading = await this.loading.create({
    //   message: 'Loading users...',
    //   spinner: 'circles',
    //   backdropDismiss: false
    // });

    // await loading.present();
    // this.sqLite.loadUsers().then((data) => {
    //   this.persons = [...this.sqLite.getUsers()];
    //   this.filteredPersons = [...this.persons];
    // }).catch(err => {
    //   // console.log(err)
    //   const errMsg = 'Unable to fetch Users From DB'
    //   this.toast.presentToast('top', errMsg, 'danger')
    // });
    this.clientService.requestMethod<Iperson[]>('GET', '').subscribe({
      next: (data) => {
        this.persons = data;
        this.selectedFilter = 'all';
        this.filteredPersons = [...this.persons];
        console.log("person", this.filteredPersons);
        // loading.dismiss();
      }, error: (err) => {
        // loading.dismiss();
        const errMsg = 'Unable to fetch Users...'
        this.toast.presentToast('top', errMsg, 'danger');
      },
    })
  }
  async deleteUser(userId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Do you Want to Delete',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          // this.sqLite.deletePerson(userId).then((data)=>{
          //   this.getAllUser();
          // this.toast.presentToast("top", "Deleted Successfully", 'success');
          // }).catch(err=>{
          //   this.toast.presentToast('top',"Unable to Delete User",'danger');
          // });
          console.log("Before Delete ",this.filteredPersons)
          this.clientService.requestMethod("DELETE", `${userId}`).subscribe({
            next:() => {
              console.log("After Delete",this.filteredPersons)
              this.toast.presentToast("top", "Deleted SuccessFully", 'success');
              this.getAllUser();
            }, error: (error) => {
              this.toast.presentToast("top", "Deletion Falied", 'danger')
            }
          })
        },
      },],
    });

    await alert.present();

  }
  editUser(userId: string) {
    this.router.navigate(['/form', userId])
  }
  applyFilter(filter: string) {
    this.selectedFilter = filter;

    if (filter === 'all') {
      this.filteredPersons = [...this.persons];
    } else {
      this.filteredPersons = this.persons.filter(
        user => user.premium === filter
      );
    }
  }
  applySearch(query: string) {
    const baseList = this.selectedFilter === 'all' ? this.persons : this.persons.filter(user => user.premium === this.selectedFilter);

     if (query.trim() === '') {
    this.filteredPersons = [...baseList];
    // console.log(this.filteredPersons);
    return;
  }

    this.filteredPersons = baseList.filter(user =>
      user.fullName.toLowerCase().includes(query)
    );
  }
  applySort(order: string) {
    if (order === 'asc') {
      this.filteredPersons.sort((a, b) => Number(a.age) - Number(b.age))
    } else if (order === 'desc') {
      this.filteredPersons.sort((a, b) => Number(b.age) - Number(a.age))
    }
    this.filteredPersons = [...this.filteredPersons];
  }
}
