import { Review, ReviewInput } from '@/types/reviews';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'reviews.db');

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id)
`);

interface ReviewRow {
  id: number;
  product_id: string;
  first_name: string;
  last_name: string;
  email: string;
  content: string;
  rating: number;
  created_at: string;
}

function getRandomDate(): string {
  const now = new Date();
  const tenDaysAgo = new Date(now.getTime() - (10 * 24 * 60 * 60 * 1000));
  const randomTime = tenDaysAgo.getTime() + Math.random() * (now.getTime() - tenDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

export function addReview(review: ReviewInput): Review {
  let stmt;
  let params;

  if (process.env.NODE_ENV === 'development' && process.env.RANDOM_REVIEW_DATES === 'true') {
    stmt = db.prepare(`
      INSERT INTO reviews (product_id, first_name, last_name, email, content, rating, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    params = [
      review.productId,
      review.firstName,
      review.lastName,
      review.email,
      review.content,
      review.rating,
      getRandomDate()
    ];
  } else {
    stmt = db.prepare(`
      INSERT INTO reviews (product_id, first_name, last_name, email, content, rating)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    params = [
      review.productId,
      review.firstName,
      review.lastName,
      review.email,
      review.content,
      review.rating
    ];
  }
  
  const info = stmt.run(...params);
  const insertedId = info.lastInsertRowid as number;
  
  return getReviewById(insertedId);
}

export function getReviewById(id: number): Review {
  const stmt = db.prepare('SELECT * FROM reviews WHERE id = ?');
  const row = stmt.get(id) as ReviewRow;
  
  if (!row) {
    throw new Error(`Review with ID ${id} not found`);
  }
  
  return {
    id: row.id,
    productId: row.product_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    content: row.content,
    rating: row.rating,
    createdAt: row.created_at
  };
}

export function getReviewsByProductId(productId: string): Review[] {
  const stmt = db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC');
  const rows = stmt.all(productId) as ReviewRow[];
  
  return rows.map(row => ({
    id: row.id,
    productId: row.product_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    content: row.content,
    rating: row.rating,
    createdAt: row.created_at
  }));
}

export function getProductRating(productId: string): number | undefined {
  const stmt = db.prepare(`
    SELECT AVG(rating) as average_rating, COUNT(*) as review_count
    FROM reviews 
    WHERE product_id = ?
  `);
  
  const result = stmt.get(productId) as { average_rating: number | null, review_count: number };
  
  if (result.review_count === 0) {
    return undefined;
  }
  
  return result.average_rating ? parseFloat(result.average_rating.toFixed(1)) : undefined;
} 