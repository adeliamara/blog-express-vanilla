import { Request, Response } from 'express';

import { Router } from 'express';

export const microblogRoutes: Router = Router()


//import microblog from './Services/MicroBlog/MicroBlog';
import MicroblogRepository from '../repositories/MicroblogRepository';

const microblog = new MicroblogRepository();
import { Post } from '../models/Post';

import MicroblogController from '../controller/MicroblogController';

const microblogController: MicroblogController = new MicroblogController();

microblogRoutes.get('/posts', microblogController.getAllPosts);
microblogRoutes.get('/posts/:id', microblogController.getPostById)
microblogRoutes.delete('/posts/:id', microblogController.deleteById)
microblogRoutes.post('/posts', microblogController.createPost);
microblogRoutes.patch('/posts/:id/like', microblogController.incrementLikePostById )
microblogRoutes.patch('/posts/:id', microblogController.editPostById);
microblogRoutes.put('/posts/:id',microblogController.updateAllAttributesOfPostById);



