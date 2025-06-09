export class Review {
    reviewID: any; 
    user_id: any;
    game_id: any;
    rating: number = 0;
    description: string = ''; 
    postDate: Date = new Date();
    user_tags: string[] = []

    constructor(reviewID: any, user_id: any, game_id: any, rating: number, description: string, postDate: Date, user_tags: string[]) {
        this.reviewID = reviewID;
        this.user_id = user_id;
        this.game_id = game_id;
        this.rating = rating;
        this.description = description; 
        this.postDate = postDate; 
        this.user_tags = user_tags;
    }
}