import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css'
})
export class HelpPageComponent {
  feedback: any [] = []; 
  feedbackForm:FormGroup;
  formSubmitted:boolean = false;
  feedbackObj:any = {
    email: '',
    type: '',
    description: ''
  };
  constructor(private userInput: FormBuilder) {
    this.feedbackForm = userInput.group({
      email: ['', Validators.required],
      corresponse: ['', Validators.required],
      description: ['', Validators.required]
    });
    
  }
  
  onSubmit(){
    if (this.feedbackForm.valid){
      this.formSubmitted = true; 
      let localData = localStorage.getItem("Feedback"); 
      this.feedback.push(
        this.feedbackForm
      );
      // default setting 
      this.feedbackObj = {
        email: '',
        type: '',
        description: ''
      };
    }
  }
}
