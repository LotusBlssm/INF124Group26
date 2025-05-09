import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  notification:boolean = false; 
  expContent:boolean = false; 
  contraMode:boolean = false; 
  errorPassword:boolean = false; 
  formSubmitted: boolean = false; 
  signupUsers:any [] = []; 
  passwordForm: FormGroup;
  newPasswordObj:any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  constructor(private userInput: FormBuilder) {
    this.passwordForm = userInput.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      descriptioni: ['', Validators.required]
    });
   } 

  onSetPassword(){
    if (this.passwordForm.valid){
      this.formSubmitted = true; 
    }
    if (this.errorPassword) {
      this.errorPassword = false; 
    }
    let localData = localStorage.getItem('signUpUsers'); 
    this.signupUsers = localData ? JSON.parse(localData) : []; 
    const passwordCorrect = this.signupUsers.some(user =>
      user.password == this.newPasswordObj.oldPassword
    );

    if (!passwordCorrect) {
      this.errorPassword = true; 
      return 
    }

    if (this.newPasswordObj.newPassword != this.newPasswordObj.confirmPassword){
      this.errorPassword = true; 
      return // return for now
    }
    // check if the new password already exists 
    const passwordCheck = this.signupUsers.some(user =>
      user.password == this.newPasswordObj.newPassword
    );
    if (!passwordCheck){
      this.errorPassword = true; 
      return; 
    }
    // need to think how to set new password and transfer to the 
    this.newPasswordObj = {
      oldPassword: '', 
      newPassword: '',
      confirmPassword: ''
    };
  }

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
