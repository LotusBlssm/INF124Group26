import { Component, OnInit } from '@angular/core';
import { User } from '../../Classes/user/user';
import { ReviewComponent } from '../../review/review.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
    user: User;

    isOwnProfilePage: boolean = false;

    constructor() {
        this.user = new User("DEFAULT_USERNAME", "USER_ID", "DEFAULT_EMAIL", "DEFAULT_PASSWORD",
            "DEFAULT_FIRST_NAME", "DEFAULT_LAST_NAME", false, false, "DEFAULT_BIOGRAPHY", 
            "images/blankProfilePicture.jpg", new Date());
        this.isOwnProfilePage = false;
    }

    ngOnInit(): void {
        this.checkIfOwnProfilePage();
        // This is where you would typically fetch the user data from a service
        // For now, we'll just use the default user data
    }

    checkIfOwnProfilePage(): void {
        // if this.user.userId == currentUser.userId
        //     this.isOwnProfilePage = true;
        // and then set visibility of editProfile button to be true
    }

    editProfileClicked(){
        console.log("Edit Profile Clicked");
    }
}
