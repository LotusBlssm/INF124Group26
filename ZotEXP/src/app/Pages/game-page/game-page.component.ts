import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameTagComponent } from '../../game-tag/game-tag.component';
import { UserTagComponent } from '../../user-tag/user-tag.component';
import { ReviewComponent } from '../../review/review.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  imports: [
    GameTagComponent, 
    UserTagComponent, 
    ReviewComponent, 
    ReactiveFormsModule
    ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamePageComponent {
  gameData:any;
  // User's review form construction
  userReview: any [] = []; 
  userReviewForm:FormGroup;
  formSubmitted:boolean = false;
  userReviewObj:any = {
    userReviewText: ''
  };

  // Necessary to load gameData
  get id() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  loadGameData() {
    // TODO: load game data (from our database, or igdb if needed)

  }

  onSubmit() {
    if (this.userReviewForm.valid) {
      this.formSubmitted = true; 
      let localData = localStorage.getItem("Feedback"); 
      this.userReview.push(
        this.userReviewForm
      );
      // default setting 
      this.userReviewObj = {
        userReviewText: ''
      };
    }
  }
  
  constructor(private userInput: FormBuilder, private route: ActivatedRoute) {
    this.userReviewForm = userInput.group({
      userReviewText: ['', Validators.required]
    });

    console.log(this.id);
  }
}
