import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameTagComponent } from '../../game-tag/game-tag.component';
import { UserTagComponent } from '../../user-tag/user-tag.component';
import { ReviewComponent } from '../../review/review.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  gameData:any = { // will be instantiated via backend later 
    title: "Game",
    image: undefined,
    company: "Company",
    releaseDate: new Date(1999, 8, 22),
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    rating: Math.random() * 5,
    gameTags: ["Multiplayer", "Controller Friendly", "Microtransactions", "Co-Op", "Mod Supported", "Fun with Friends"],
    userTags: ["Teamwork Heavy", "Not for Noobs", "Mod Supported", "Replayable", "Friendly Community"]
  }
  reviews:any = this.getReviews()

  // User's review form construction
  userReview: any [] = []; 
  userReviewForm:FormGroup;
  formSubmitted:boolean = false;
  userReviewObj:any = {
    userReviewText: ''
  };
  constructor(private userInput: FormBuilder) {
    this.userReviewForm = userInput.group({
      userReviewText: ['', Validators.required]
    });
  }
  

  // Displayed reviews collection
  getReviews () { 
    // will change when backend is made 
    function randomDate(start: Date, end: Date) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let names = ['Brian Griffin', 'Jane Doe', 'John Doe', 'Stan Marsh', 'Edmond Honda']
    let reviews = [];
    for (let i = 0; i < 19; ++i) {
      reviews.push({
        date: randomDate(new Date(2000, 0, 1), new Date()),
        memberName: names[Math.floor((Math.random() * names.length))],
        profilePicture: undefined,
        rating: Math.random() * 5,
        userTags: ["Teamwork Heavy", "Not for Noobs", "Mod Supported"],
        message: 'Yeah I thought the game was pretty coo, I picked up Sombra and for some reason everyone in my game was mad at me. I now pick Hammond and throw matches for most of my fun, and pick other games to try competitively.'
      });
    }
    console.log(reviews);
    return reviews;
  }

  onSubmit() {
    if (this.userReviewForm.valid){
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
}
