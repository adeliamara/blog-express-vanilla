
import { Router } from 'express';

export const microblogRoutes: Router = Router()

import MicroblogController from '../controller/MicroblogController';

const microblogController: MicroblogController = new MicroblogController();

microblogRoutes.get('/posts', microblogController.getAllPosts);
microblogRoutes.get('/posts/:id', microblogController.getPostById)
microblogRoutes.delete('/posts/:id', microblogController.deleteById)
microblogRoutes.post('/posts', microblogController.createPost);
microblogRoutes.patch('/posts/:id/like', microblogController.incrementLikePostById )
microblogRoutes.patch('/posts/:id', microblogController.editPostById);
microblogRoutes.put('/posts/:id',microblogController.updateAllAttributesOfPostById);



