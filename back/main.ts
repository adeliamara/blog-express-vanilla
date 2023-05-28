import 'express-async-errors'
import express, { Request, Response } from 'express';
import { commentRoutes } from './src/routes/commentRoutes';
import { microblogRoutes } from './src/routes/microblogRoutes';
import { errorMiddleware } from './src/middleware/errorMiddleware';

const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(commentRoutes);
app.use(microblogRoutes)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Aplicação escutando na porta ${port}`);
});
