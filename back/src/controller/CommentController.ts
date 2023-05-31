import { Comment } from "../models/Comment";
import { Router } from "express";
import CommentRepository from "../repositories/CommentRepository";


const comment: CommentRepository = new CommentRepository();

export default class CommentController {
    
}