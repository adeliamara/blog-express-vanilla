import { Request, Response } from 'express';

import { Router } from 'express';

export const microblogRoutes: Router = Router()


//import microblog from './Services/MicroBlog/MicroBlog';
import MicroblogPersistente from '../repositories/MicroBlogPersistente';

const microblog = new MicroblogPersistente();
import { Post } from '../models/Post';

import MicroblogController from '../controller/MicroblogController';

const microblogController: MicroblogController = new MicroblogController();

microblogRoutes.get('/posts', microblogController.getAllPosts);
microblogRoutes.get('/posts/:id', microblogController.getPostById)
microblogRoutes.delete('/posts/:id', microblogController.deleteById)
microblogRoutes.post('/posts', microblogController.createPost);
microblogRoutes.patch('/posts/:id/like', microblogController.incrementLikePostById )

microblogRoutes.patch('/posts/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post: Post | undefined = await microblog.retrieve(Number(id));
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const { text, likes } = req.body as { text?: string; likes?: number };

        post.text = text ?? post.text;
        post.likes = likes ?? post.likes;

        microblog.update(post);
        return res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: 'Post not found' });
    }
});

microblogRoutes.put('/posts/:id',microblogController.updateAllAttributesOfPostById);



