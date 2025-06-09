export class Review {
    review_id: any; 
    user_id: any;
    game_id: any;
    rating: number = 0;
    description: string = ''; 
    created_at: Date = new Date();
    user_tags: string[] = []

    constructor(review_id: any, user_id: any, game_id: any, rating: number, description: string, created_at: Date, user_tags: string[]) {
        this.review_id = review_id;
        this.user_id = user_id;
        this.game_id = game_id;
        this.rating = rating;
        this.description = description; 
        this.created_at = created_at; 
        this.user_tags = user_tags;
    }
}