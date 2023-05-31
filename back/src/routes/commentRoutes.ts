import{ Request, Response, Router } from 'express';


export const commentRoutes: Router = Router();
import { Post } from '../models/Post';
import MicroblogRepository from '../repositories/MicroblogRepository';
const microblog = new MicroblogRepository();

//import microblog from './Services/MicroBlog/MicroBlog';
import CommentRepository from '../repositories/CommentRepository';

const comment = new CommentRepository();
import { Comment } from '../models/Comment';


commentRoutes.get('/comments', async (req: Request, res: Response) => {
    const comments: Comment[] = await comment.retrieveAll();
    return res.status(200).json(comments);
});


commentRoutes.get('/comments/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const commentResponse: Comment| undefined = await comment.retrieve(Number(id));
        return res.status(200).json(commentResponse)
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
    
})

commentRoutes.delete('/comments/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await comment.delete(Number(id));
        return res.status(204).send()
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
    
})

commentRoutes.post('/posts/:id/comments/', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const { text } = req.body;
      console.log('text')
      const post: Post | undefined = await microblog.retrieve(Number(id));
  
      if (!text) {
        return res.status(400).json({ error: 'O texto do comentário é obrigatório' });
      }
     
  
      let newComment: Comment = new Comment(text, Number(id));
      newComment = await comment.create(newComment);

      console.log(newComment)

  
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Erro ao criar o comentário:', error);
      res.status(500).json({ error: 'Erro ao criar o comentário' });
    }
  });
  
commentRoutes.patch('/comments/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post: Comment | undefined = await comment.retrieve(Number(id));
        if (!post) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const { text, post_id } = req.body as { text?: string; post_id?: number };

        post.text = text ?? post.text;
        post.idPost = post_id ?? post.idPost;

        comment.update(post);
        return res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
});

commentRoutes.put('/comments/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const commentUpdated: Comment | undefined = await comment.retrieve(Number(id));

        if (!commentUpdated) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const { text, post_id } = req.body as { text?: string; post_id?: number };


        if(!text || !post_id){
            return res.status(405).send();
        }
        commentUpdated.text =  text;
        commentUpdated.idPost =  post_id;

        comment.update(commentUpdated);
        return res.status(200).json(commentUpdated);
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
});


commentRoutes.get('/posts/:id/comments/', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const { text } = req.body;
      const post: Post | undefined = await microblog.retrieve(Number(id));
  
      if (!text) {
        return res.status(400).json({ error: 'O texto do comentário é obrigatório' });
      }
     
      const comments: Comment[] = await comment.retrieveAllCommentsByPostId(Number(id));

      return res.status(201).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao visualizar comentário' });
    }
  });


