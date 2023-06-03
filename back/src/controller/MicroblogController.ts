import { Request, Response } from "express";
import { Post } from "../models/Post";
import MicroblogRepository from "../repositories/MicroblogRepository";
import { Router } from 'express';
import { BadRequestError, MethodNotAllowed, NotFoundError } from "../utils/api-error";


const microblog: MicroblogRepository = new MicroblogRepository();

export default class MicroblogController {

    getAllPosts = async (request: Request, response: Response) => {
        const posts: Post[] = await microblog.retrieveAll();

        return response.status(200).json(posts);
    }

    getPostById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const post: Post | undefined = await microblog.retrieve(Number(id));
        if (post) {
            return response.status(200).json(post)
        }
    }

    createPost = async (request: Request, response: Response) => {
        const { title, text } = request.body;

        if (!text || !title) {
            throw new BadRequestError('All parameters are required');
        }

        const newPost: Post = new Post(text, title);
        const post: Post = await microblog.create(newPost);

        return response.status(201).json(post);
    }


    deleteById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const post: Post | undefined = await microblog.retrieve(Number(id));
        if (post) {
            await microblog.delete(Number(id));
            return response.status(204).send();
        }

        throw new NotFoundError('Post not found!');

    }

    updateAllAttributesOfPostById = async (request: Request, response: Response) => {
        const { id } = request.params;
        console.log(id)
        const post: Post | undefined = await microblog.retrieve(Number(id));
        console.log(post)
        if (!post) {
            console.log('aqui')
            throw new NotFoundError('Post not found!');
        }

        const { title, text, likes } = request.body as { title?: string, text?: string; likes?: number };


        if (!text || !likes || !title) {
            console.log('aqui')
            throw new MethodNotAllowed('Method not allowed');
        }

        post.text = text;
        post.likes = likes;
        post.title = title;

        microblog.update(post);
        return response.status(200).json(post);

    }

    incrementLikePostById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const keys = Object.keys(request.body);
        
        if (keys.length > 1  || (keys.length === 1 && keys[0] !== 'likes')) {
          throw new MethodNotAllowed('bad request');
        }
        
        const post: Post | undefined = await microblog.retrieve(Number(id));
        if (!post) {
            throw new NotFoundError('Post not found!');
        }


        post.likes = post.likes + 1;
        await microblog.update(post);
        return response.status(200).json( post.likes);

    }

    editPostById = async (request: Request, response: Response) => {
            const { id } = request.params;
            const post: Post | undefined = await microblog.retrieve(Number(id));
            if (!post) {
                throw new NotFoundError('Post not found');
            }
    
            const { text, title } = request.body as { text?: string; title?: string };
    
            post.text = text ?? post.text;
            post.title = title ?? post.title;
    
            microblog.update(post);
            
            return response.status(200).json(post);
    
    }





}