import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Iperson } from 'src/app/interfaces/iperson';
import {
  AlertController, IonInput, IonList, IonItem, IonSelect, IonSelectOption
  , IonCheckbox, IonButton, IonLabel, IonContent, IonHeader, IonToolbar, IonIcon, IonTextarea
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cameraOutline } from 'ionicons/icons';
import { HttpClientRequestService } from 'src/app/services/http-client-request.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastService } from 'src/app/services/toast.service';
import { SqLiteService } from 'src/app/services/sq-lite.service';
import { CommonModule, Location } from '@angular/common';
import { Comment } from '@angular/compiler';
import { PhotoService } from 'src/app/services/photo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonInput, IonList, IonItem, IonSelect, IonSelectOption
    , IonCheckbox, IonButton, IonLabel, IonContent, IonHeader, IonToolbar, IonIcon, RouterLink
    , IonTextarea, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterFormComponent {
  persons: Iperson[] = []
  userForm: FormGroup;
  isSubmit: boolean = true;
  userId: string | null = null;
  selectedFile!: string;

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router,
    private clientservice: HttpClientRequestService, private activate: ActivatedRoute, private toast: ToastService
    , private sqLite: SqLiteService, private location: Location, private photoService: PhotoService, private loading: LoadingController) {
    addIcons({ arrowBackOutline, cameraOutline })
    this.userForm = this.fb.group({
      fullName: ['',Validators.required],
      email: [],
      contactNumber: [],
      age: [],
      premium: ['Non-Premium'],
      agree: [false, Validators.requiredTrue],
      description: ['', Validators.required],
      image: []
    })
  }
  onImageChange(event: any): void {
    const file = event.target.files[0]
    if (!file) return;
    const reader = new FileReader();
    this.selectedFile = file.name
    reader.onload = () => {
      const base64 = reader.result as string;
      this.userForm.get('image')?.setValue(base64);
      event.target.value = ''
      console.log("file",base64);
    };
    reader.readAsDataURL(file);
  }
    async captureFromCamera() {
    const base64 = await this.photoService.capturePhotoAsBase64();
    console.log("camere",base64)
    if (base64) {
      this.userForm.get('image')?.setValue(base64);
      this.toast.presentToast('top', 'Image captured successfully', 'success');
    } else {
      this.toast.presentToast('top', 'Failed to capture image', 'danger');
    }
  }
  async ionViewWillEnter() {
    this.userId = this.activate.snapshot.paramMap.get('id');
    if (this.userId) {
      this.clientservice.requestMethod<Iperson>('GET', this.userId).subscribe({
        next: (user) => {
          this.userForm.patchValue(user)
        }, error: (err) => {
          // console.log(err)
          this.toast.presentToast('top', err.statusText, 'danger')
        }
      })
      // const user = await this.sqLite.getPersonById(this.userId)
      // if (user) {
      //   this.userForm.patchValue(user)
      // } else {
      //   this.toast.presentToast('top', 'User not found', 'danger');
      //   this.router.navigate(['/home']);
      // }
    }
  }
  async registerUser() {
    this.userForm.get('agree')!.markAsTouched();
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value, id: uuidv4() }
      // console.log(formData)
      console.log(this.userForm);
      if (this.userId) {
        this.clientservice.requestMethod('PUT', this.userId, this.userForm.value).subscribe({
          next: () => {

            this.toast.presentToast('top', 'Updated SuccessFully', "success")
          },
          error: (err) => {
            console.log("Error Ocuured")
            this.toast.presentToast('top', "Error While Updating User", "danger")
          }
        });
        // this.sqLite.updatePerson({ ...this.userForm.value, id: this.userId }).then(() => {
        //   this.toast.presentToast('top', 'Updated SuccessFully', "success")

        // }).catch(() => {
        //   this.toast.presentToast('top', 'Updation Failed', "danger")

        // })
      } else {
        // this.sqLite.insertPerson(formData).then(() => {
        //   this.toast.presentToast('top', 'User Added SuccessFully', "success")
        // }).catch(() => {
        //   const errMsg = 'Error While Creating User'
        //   //       console.log(err)
        //   this.toast.presentToast('top', errMsg, "danger")
        // });
        // console.log(formData)



        this.clientservice.requestMethod('POST', '', this.userForm.value).subscribe({
          next: (data) => {
            // console.log("values",this.userForm.value)
            this.toast.presentToast('top', 'User Added SuccessFully', "success")

          }, error: (err) => {
            const errMsg = 'Error While Creating User'
            console.log(err)
            this.toast.presentToast('top', errMsg, "danger")
          }
        })
      }
      this.userForm.reset()
      const loading = await this.loading.create({
        message: 'Loading users...',
        spinner: 'circles',
        backdropDismiss: false
      });
      await loading.present();
      setTimeout(() => {

        this.location.back();
        loading.dismiss();

      }, 2000)
    }
  }
}

