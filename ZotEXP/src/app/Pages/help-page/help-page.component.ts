import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';

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
  feedbackForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.emailValidator]),
      corresponse: new FormControl(''),
      description: new FormControl('', [Validators.required, this.descriptionValidator]),
      postDate: new FormControl('')
  });
  
  get id() {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private route: ActivatedRoute, private apiService: APIService) {
    console.log(this.id);
  }
  
  onSubmit(){
    const now = new Date().toString();
    this.feedbackForm.get('postDate')?.setValue(now);
    this.feedbackForm.reset();
  }

  emailValidator(control: AbstractControl) : Validators | null {
    const email = control.value; 
    if (!email || !email.includes('.com')){
      return { mustContainCom: true };
    }
    return null;
  }

  typeValidator(control: AbstractControl) : Validators | null {
    const type = control.value; 
    if (!type) {
      return { mustContainType: true }; 
    }
    return null;
  }

  descriptionValidator(control: AbstractControl) : Validators | null {
    const description = control.value;
    if (!description) {
      return {mustContainDescription: true}; 
    }
    return null;
  }
}
