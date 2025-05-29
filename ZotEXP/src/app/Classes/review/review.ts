export class Review {
    review_id: number = 0; 
    user_id: number = 0;
    game_id: number = 0;
    rating: number = 0;
    description: string = ''; 
    created_at: Date = new Date();

    constructor(review_id: number, user_id: number, game_id: number, rating: number, description: string, created_at: Date) {
        this.review_id = review_id;
        this.user_id = user_id;
        this.game_id = game_id;
        this.rating = rating;
        this.description = description; 
        this.created_at = created_at; 
    }
}