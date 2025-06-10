export class Feedback {
    feedbackID: any; 
    email: string = ''; 
    solved: number = 0;
    description: string = ''; 
    postDate: Date = new Date();
    type: string = '';

    constructor(feedbackID: any, email: string, solved: number, description: string, postDate: Date, type: string){
        this.feedbackID = this.feedbackID; 
        this.email = email; 
        this.solved = solved; 
        this.description = description; 
        this.postDate = postDate; 
        this.type = type; 
    
    }
}