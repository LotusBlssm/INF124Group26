import { Review } from "../review/review";

export class User {
    userId: string = "";

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

    constructor(username: string, userId: string, email: string, password: string, 
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

    static fromJSON(data: any): User {
        return new User(
            data.username,
            data.userId,
            data.email,
            data.password,
            data.firstName,
            data.lastName,
            data.isAdmin,
            data.isLoggedIn,
            data.biography,
            data.profileImage || "images/blankProfilePicture.jpg",
            new Date(data.dateJoined)
        );
    }

}
