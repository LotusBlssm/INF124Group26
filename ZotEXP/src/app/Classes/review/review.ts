import { User } from "../user/user";

export class Review {
    reviewID: any; 
    user_id: any;
    game_id: any;
    rating: number = 0;
    description: string = ''; 
    postDate: any = new Date();
    user_tags: string[] = []
    author: any;

    constructor(reviewID: any, user_id: any, game_id: any, rating: number, description: string, postDate: any, user_tags: string[]) {
        this.reviewID = reviewID;
        this.user_id = user_id;
        this.game_id = game_id;
        this.rating = rating;
        this.description = description; 
        this.postDate = postDate; 
        this.user_tags = user_tags;
        this.author = undefined;
    }

    attachUser(user:any) {
        // 'user' parameter should be JSON with keys [username, profileImage]
        console.log("attachUser called in review.ts");
        this.author = new User(
            user.username,       // actual user's username
            0, '0', '0', '0', '0', false, false, '0', // default vals
            user.profileImage,   // actual user's PFP
            new Date(Date.now())                      // default val
        );
    }
}