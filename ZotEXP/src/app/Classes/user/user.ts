import { Review } from "../review/review";

export class User {
    userId: number = 0;

    username: string = "DEFAULT_USER";
    email: string = "DEFAULT_EMAIL";
    password: string = "DEFAULT_PASSWORD";
    firstName: string = "DEFAULT_FIRST_NAME";
    lastName: string = "DEFAULT_LAST_NAME";
    isAdmin: boolean = false;
    isLoggedIn: boolean = false;
    biography: string = "DEFAULT_BIOGRAPHY";
    dateJoined: Date = new Date();

    reviews: Review[] = [];

    profileImage: string = "images/blankProfilePicture.jpg";
    // userProfileImage is a string that contains the path to the default profile image. 

    constructor(username: string, userId: number, email: string, password: string, 
                firstName: string, lastName: string, isAdmin: boolean, isLoggedIn: boolean, biography: string, profileImage: string = "images/blankProfilePicture.jpg", dateJoined: Date) {
        this.userId = userId;
        
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
        this.isLoggedIn = isLoggedIn;
        this.biography = biography;

        this.profileImage = profileImage;
        this.dateJoined = new Date(dateJoined);
    }

}
