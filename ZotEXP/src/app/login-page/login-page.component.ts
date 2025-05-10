import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  showSignUp:boolean = false; 
  createAccount:boolean = false; 
  signupUsers:any [] = [];
  signupObj:any = {
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
  };
  loginObj:any = {
    username: '',
    password: ''
  };
  constructor () { }

  toggleSignUp() {
    this.showSignUp = !this.showSignUp;
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null){
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    // this.signupUsers.push(this.signupObj);
    // localStorage.setItem("SignupUsers", JSON.stringify(this.signupUsers));
    let localData = localStorage.getItem("signupUsers");
    this.signupUsers = localData ? JSON.parse(localData) : []; 

    if (this.signupObj.password.length < 8){
      alert("Password < 8");
      return;
    }

    if (this.signupObj.password != this.signupObj.passwordCheck){
      alert("Passwords do not match!");
      return; 
    }

    // Username Check 
    const usernameExists = this.signupUsers.some(user => 
      user.username == this.signupObj.username
    );
    if (usernameExists) {
      alert("Username already exists!"); 
      return;
    }

    // Email Check 
    const emailExists = this.signupUsers.some(user =>
      user.email == this.signupObj.email
    );
    if (emailExists){
      alert("Email already exists!"); 
      return;
    }

    // Password Check 
    const passwordExists = this.signupUsers.some(user =>
      user.password == this.signupObj.password
    );
    if (passwordExists){
      alert("Passwod is already used by other user");
      return; 
    }

    // Add new account 
    this.signupUsers.push({
      username: this.signupObj.username,
      email: this.signupObj.email,
      password: this.signupObj.password
    });
    localStorage.setItem("SignupUsers", JSON.stringify(this.signupUsers));

    this.signupObj = {
      username: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
    
    // add notification message that account created successfully 

    this.toggleSignUp(); 
    alert("Account Created Successfully");
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
