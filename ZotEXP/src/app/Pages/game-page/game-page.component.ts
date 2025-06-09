import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { GameTagComponent } from '../../game-tag/game-tag.component';
import { UserTagComponent } from '../../user-tag/user-tag.component';
import { ReviewComponent } from '../../review/review.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
import { Review } from '../../Classes/review/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-page',
  imports: [
    GameTagComponent, 
    UserTagComponent, 
    ReviewComponent, 
    ReactiveFormsModule,
    FormsModule,
    CommonModule
    ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamePageComponent implements OnInit {
  public gameData:any;
  public gameDataLoaded: Promise<Boolean>;
  reviewForm = new FormGroup({
    rating: new FormControl(0, [Validators.required, this.ratingValidator]),
    description: new FormControl(''),
    userTags: new FormControl<any>([]),
  });
  token: any = localStorage.getItem('token');

  // Necessary to load gameData
  get id() {
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private route: ActivatedRoute, private apiService: APIService) {
    this.gameDataLoaded = Promise.resolve(false);
    console.log('constructing game-page for', this.id);
  }

  ngOnInit() {
    this.loadGameData();
  }

  loadGameData() {
    // TODO: load game data (from our database, or igdb if needed)
    this.apiService.getGame(this.id).subscribe( (data:any) => {
      this.gameData = data;
      this.gameData.releaseDate = new Date(this.gameData.releaseDate);
      this.gameDataLoaded = Promise.resolve(true);
    });
  }

  onSubmit() {
    const review = new Review(
      '0', // TODO: NEED TO ACTUALLY GENERATE A UNIQUE REVIEW ID
      '0', // TODO: NEED TO ACTUALLY RETREIVE USER ID / INFO
      this.id, 
      this.reviewForm.controls.rating.value!,
      this.reviewForm.controls.description.value!,
      new Date(Date.now()).getTime(),
      this.reviewForm.controls.userTags.value!
    );

    this.apiService.addReview(review).subscribe(data => { });

    // reset form (should be done last in this function)
    this.resetForm();

    this.gameData.reviews.unshift(review);
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

  resetForm() {
    this.reviewForm.reset();
    (document.getElementById('userReviewTags')! as HTMLTextAreaElement).value = '';
    this.reviewForm.controls.rating?.setValue(0);
    this.reviewForm.controls.description?.setValue('');
    this.reviewForm.controls.userTags?.setValue([]);
  }
}
