import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
import { Feedback } from '../../Classes/feedback/feedback';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HelpPageComponent implements OnInit {
  feedbackForm = new FormGroup({
    feedbackID: new FormControl(''),
    email: new FormControl('', [Validators.required, this.emailValidator]),
    corresponse: new FormControl(''),
    description: new FormControl('', [Validators.required, this.descriptionValidator])
  });

  get id() {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private route: ActivatedRoute, private apiService: APIService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.feedbackForm.get('feedbackID')?.setValue(id);
    }
  }

  onSubmit() {
    if (this.feedbackForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const feedback = new Feedback(
      this.id ?? '0',
      Date.now().toString(),
      this.feedbackForm.controls.email.value!,
      this.feedbackForm.controls.corresponse.value ?? '',
      this.feedbackForm.controls.description.value!,
      false.toString()
    );

    // Send feedback as a plain object to avoid class serialization issues
    this.apiService.addFeedback({ ...feedback }).subscribe({
      next: (data) => {
        console.log('Feedback successfully submitted:', data);
        alert('Thank you! Your feedback has been submitted.');
        this.feedbackForm.reset();
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
        alert('There was an error submitting your feedback.');
      }
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email || !email.includes('.com')) {
      return { mustContainCom: true };
    }
    return null;
  }

  descriptionValidator(control: AbstractControl): ValidationErrors | null {
    const description = control.value;
    if (!description) {
      return { mustContainDescription: true };
    }
    return null;
  }
}
