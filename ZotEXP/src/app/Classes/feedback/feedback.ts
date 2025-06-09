export class Feedback {
    feedbackID: any; 
    email: string = ''; 
    solved: number = 0;
    description: string = ''; 
    postDate: Date = new Date();
    tags: string = '';

    constructor(feedbackID: any, email: string, solved: number, description: string, postDate: Date, tags: string){
        this.feedbackID = this.feedbackID; 
        this.email = email; 
        this.solved = solved; 
        this.description = description; 
        this.postDate = postDate; 
        this.tags = tags; 
    
    }
}