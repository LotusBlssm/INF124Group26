import { Review } from "../review/review";

export class Game {
    id: string = '';
    title: string = '';
    imageURL: string = '';
    company: string = '';
    releaseDate: Date = new Date();
    description: string = '';
    rating: number = 0;
    gameTags: string[] = [];
    userTags: string[] = [];
    reviews: Review[] = []

    constructor(title: string, imageURL: string, company: string, releaseDate: Date, description: string, rating: number, gameTags: string[], userTags: string[], reviews: Review[]) {
        this.title = title;
        this.imageURL = imageURL;
        this.company = company;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rating = rating;
        this.gameTags = gameTags;
        this.userTags = userTags; 
        this.reviews = reviews;
    }
}