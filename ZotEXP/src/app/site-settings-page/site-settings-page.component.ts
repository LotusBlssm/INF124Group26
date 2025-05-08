import { Component } from '@angular/core';

@Component({
  selector: 'app-site-settings-page',
  imports: [],
  templateUrl: './site-settings-page.component.html',
  styleUrl: './site-settings-page.component.css'
})
export class SiteSettingsPageComponent {
  notification:boolean = false; 
  expContent:boolean = false; 
  contraMode:boolean = false; 
  errorPassword:boolean = false; 
  signupUsers:any [] = []; 
  newPasswordObj:any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  constructor() { } 

  onSetPassword(){
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

    if (this.newPasswordObj.newPassword == this.newPasswordObj.confirmPassword){
      // need to think how to set new password and transfer to the 
    } else {
      this.errorPassword = true; 
    }
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
