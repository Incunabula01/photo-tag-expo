import { relations, sql } from "drizzle-orm";
import { int, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { users } from "./user";

export const post = mySqlTable("post", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("name", { length: 256 }).notNull(),
  imageUrl: varchar("image", { length: 255 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  contentHint: varchar("contentHint", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const replies = mySqlTable("replies", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  postId: int("post_id").notNull(),
  content: varchar("content", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(users, {
    fields: [post.userId],
    references: [users.id],
  }),
  replies: many(replies),
}));

export const replyRelations = relations(replies, ({ one }) => ({
  user: one(users, {
    fields: [replies.userId],
    references: [users.id],
  }),
  post: one(post, {
    fields: [replies.postId],
    references: [post.id],
  }),
}));
