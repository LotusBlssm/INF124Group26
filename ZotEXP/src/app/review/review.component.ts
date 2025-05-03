import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewComponent {
  @Input() reviewData:any;
}
