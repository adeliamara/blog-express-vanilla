import { Post } from "../models/Post";
import sqlite3, { Database, RunResult } from "sqlite3";
import { NotFoundError } from "../utils/api-error";

class MicroblogPersistente {
  private db: Database;

  constructor() {
    this.db = new sqlite3.Database("microblog.db");
    this.initializeDatabase();
  }

  private initializeDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(40),
          text TEXT,
          likes int,
          created_at timestamp default current_timestamp
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

create(post: Post): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      this.db.run(
        "INSERT INTO posts (text, title, likes) VALUES (?, ?, ?)",
        [post.text, post.title, post.likes],
        function (err: Error | null) {
          if (err) {
            reject(err);
          } else {
            const createdPost = new Post(post.text, post.title,  post.likes, this.lastID);
            resolve(createdPost);
          }
        }
      );
    });
  }
  

  retrieve(id: number): Promise<Post | undefined> {
    return new Promise<Post>((resolve, reject) => {
      this.db.get(
        "SELECT * FROM posts WHERE id = ?",
        [id],
        (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          }else{
            if(row){
              const post: Post = new Post(row.text, row.title, row.likes, row.id, row.created_at);
              resolve(post);
            }else {
              resolve(row);
            }
            
        }
      }
      );
    });
  }

  update(updatedPost: Post): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        "UPDATE posts SET title = ?, text = ?, likes = ? WHERE id = ?",
        [updatedPost.text, updatedPost.title, updatedPost.likes, updatedPost.id],
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
      this.db.run("DELETE FROM posts WHERE id = ?", [id], (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  retrieveAll(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      this.db.all("SELECT * FROM posts", (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const posts: Post[] = rows.map((row) => new Post(row.text, row.title, row.likes, row.id, row.created_at));
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

export default MicroblogPersistente;
