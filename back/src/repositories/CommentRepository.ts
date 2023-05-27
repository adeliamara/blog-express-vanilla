import sqlite3, { Database, RunResult } from "sqlite3";
import { Comment } from "../models/Comment";

class CommentRepository {
  private db: Database;

  constructor() {
    this.db = new sqlite3.Database("microblog.db");
    this.initializeDatabase();
  }

  private initializeDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            post_id INTEGER,
            FOREIGN KEY (post_id) REFERENCES posts (id)
          )`,
        (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

create(comment: Comment): Promise<Comment> {
    return new Promise<Comment>((resolve, reject) => {
      this.db.run(
        "INSERT INTO comments (text, post_id) VALUES (?, ?)",
        [comment.text, comment.idPost],
        function (err: Error | null) {
          if (err) {
            reject(err);
          } else {
            const createdPost = new Comment(comment.text, comment.idPost, this.lastID);
            resolve(createdPost);
          }
        }
      );
    });
  }
  

  retrieve(id: number): Promise<Comment> {
    return new Promise<Comment>((resolve, reject) => {
      this.db.get(
        "SELECT * FROM comments WHERE id = ?",
        [id],
        (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          } else if (row) {
            const post: Comment = new Comment(row.text, row.post_id, row.id);
            resolve(post);
          } else {
            reject(new Error("Comment not found"));
          }
        }
      );
    });
  }

  update(updatedComment: Comment): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        "UPDATE comments SET text = ?, post_id = ? WHERE id = ?",
        [updatedComment.text, updatedComment.idPost, updatedComment.id],
        (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  delete(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run("DELETE FROM comments WHERE id = ?", [id], (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  retrieveAll(): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve, reject) => {
      this.db.all("SELECT * FROM comments", (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const posts: Comment[] = rows.map((row) => new Comment(row.text, row.post_id, row.id));
          resolve(posts);
        }
      });
    });
  }

  retrieveAllCommentsByPostId(post_id: number): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve, reject) => {
      this.db.all("SELECT * FROM comments where post_id = ?", [post_id], (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const posts: Comment[] = rows.map((row) => new Comment(row.text, row.post_id, row.id));
          resolve(posts);
        }
      });
    });
  }

  close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default CommentRepository;
