import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
@Component({
  selector: 'app-site-settings-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './site-settings-page.component.html',
  styleUrl: './site-settings-page.component.css'
})
export class SiteSettingsPageComponent {
  passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, this.oldPasswordValidator]),
      newPassword: new FormControl('', [Validators.required, this.newPassowrdValidator]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPassowrdValidator])
    });
   get id() {
    return this.route.snapshot.paramMap.get('id');
  }
  constructor(private route: ActivatedRoute, private apiService: APIService) {
    console.log(this.id);
   } 


  oldPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password || password.trim() === '') { 
      return { require : true };
    }
    return null;
  }
  newPassowrdValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.value; 
    if (!newPassword || newPassword.trim() === '') {
      return { require : true };
    }

    if (newPassword.length < 8) {
      return { weakPassword: true };
    }
    return null;
  }

  confirmPassowrdValidator(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value; 
    if (!confirmPassword || confirmPassword.trim() === '') {
      return { require : true };
    }

    if (!/[A-Z]/.test(confirmPassword) || confirmPassword.length < 8) {
      return { weakPassword: true };
    }
    return null;
  }
  onSetPassword() {
   this.passwordForm.reset();
    
  }


  notification = false; 
  expContent = false; 
  contraMode = false; 

  toggleNotifi(){
    this.notification = !this.notification; 
  }
  toggleExpContent() {
    this.expContent = !this.expContent;
  }
  toggleContraMode(){
    this.contraMode = !this.contraMode; 
  }
}
