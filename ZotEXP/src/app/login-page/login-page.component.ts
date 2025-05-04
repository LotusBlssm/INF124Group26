import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  signupUsers: any [] = [];
  signupObj:any = {
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
  }
  loginObj:any = {
    username: '',
    password: ''
  };
  constructor () { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null){
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem("SignupUsers", JSON.stringify(this.signupUsers));
    this.signupObj = {
      username: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
  }

  onLogIn() {
    const isUserExit = this.signupUsers.find(m => m.username == this.loginObj.username && m.password == this.loginObj.password);
    if (isUserExit != undefined){
      alert("User Login Successfully"); 
    } else{
      alert('Failed to Login');
    }
  }
}
