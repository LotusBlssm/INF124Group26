export class Feedback {
    feedbackID: string; 
    postDate: string;
    email: string = '';
    description: string = ''; 
    type: string = '';
    solved: string = false.toString();

    constructor(feedbackID: string, postDate: string, email: string, type: string, description: string, solved: string){
        this.feedbackID = feedbackID; 
        this.email = email; 
        this.description = description; 
        this.postDate = postDate; 
        this.type = type; 
        this.solved = solved; 
    
    }
}