import { relations, sql } from "drizzle-orm";
import { serial, timestamp, varbinary, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { accounts } from "./auth";
import { posts, replies } from "./post";

export const users = mySqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  posts: many(posts),
  replies: many(replies),
}));
