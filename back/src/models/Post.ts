import { IPost } from "./interfaces/IPost";
import { v4 as uuidv4 } from 'uuid';


export class Post implements IPost {
    public id: number;
    public title: string;
    public text: string;
    public likes: number;
    public date: Date;

    constructor(text: string, title: string, likes: number = 0, numericId: number = parseInt(uuidv4().replace(/-/g, '').substring(0, 8), 16), date =  new Date()){
        this.id = numericId;
        this.title = title;
        this.text = text;
        this.likes = likes;
        this.date = date;
    }
    
}