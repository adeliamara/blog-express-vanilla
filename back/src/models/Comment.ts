import { IComment } from './interfaces/IComments';
import { v4 as uuidv4 } from 'uuid';


export class Comment implements IComment {
    public id: number;
    public text: string;
    public idPost: number;

    constructor(text: string, idPost: number, numericId: number = parseInt(uuidv4().replace(/-/g, '').substring(0, 8), 16)){
        this.id = numericId;
        this.text = text;
        this.idPost = idPost;
    }
    
}