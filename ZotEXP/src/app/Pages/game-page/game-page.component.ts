import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { GameTagComponent } from '../../game-tag/game-tag.component';
import { UserTagComponent } from '../../user-tag/user-tag.component';
import { ReviewComponent } from '../../review/review.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-game-page',
  imports: [
    GameTagComponent, 
    UserTagComponent, 
    ReviewComponent, 
    ReactiveFormsModule,
    FormsModule
    ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamePageComponent implements OnInit {
  gameData:any;
  reviewForm = new FormGroup({
    rating: new FormControl(0, [Validators.required, this.ratingValidator]),
    description: new FormControl(''),
    userTags: new FormControl<any>([]),
  });

  // Necessary to load gameData
  get id() {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private route: ActivatedRoute, private apiService: APIService) {
    console.log(this.id);
  }

  ngOnInit() {
    this.loadGameData();
  }

  loadGameData() {
    // TODO: load game data (from our database, or igdb if needed)
    
  }

  onSubmit() {
    // TODO: add the review to our database (will need to get user id, but the rest (review_id, date_created, game_id) shouldn't be hard)



    // reset form (should be done last in this function)
    this.reviewForm.reset();
    (document.getElementById('userReviewTags')! as HTMLTextAreaElement).value = '';
    this.reviewForm.get('rating')?.setValue(0);
  }

  ratingValidator(control: AbstractControl): ValidationErrors | null {
    const rating = control.value;
    if (rating == null || rating < 1 || rating > 5) {
      return { outOfRange: {min: 1, max: 5} };
    }
    return null;
  }

  onTextareaChange(event: Event) {
    // Converts the text the user inputted in the tags section into a list of strings (delimited by whitespace)
    this.reviewForm.controls.userTags.setValue((event.target as HTMLTextAreaElement).value.split(/\s+/));
  }
}
