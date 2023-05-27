import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function createDatabase() {
  const db = await open({
    filename: './microblog.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      likes INTEGER
    )
  `);

  await db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES posts (id)
  ) 
  `);

  return db;
}

createDatabase()
  .then(db => {
    console.log('Banco de dados criado com sucesso');
    // Você pode executar outras operações no banco de dados aqui, se necessário
  })
  .catch(error => {
    console.error('Erro ao criar o banco de dados:', error);
  });


  
