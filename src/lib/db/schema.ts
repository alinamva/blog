import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  author: text("author"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 32 }).notNull().unique(),
  password_hash: text("password_hash"),
});

const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at").notNull(),
});

type Post = typeof postsTable.$inferSelect;
type User = typeof usersTable.$inferSelect;
type Session = typeof sessionTable.$inferSelect;

export { postsTable, usersTable, sessionTable };
export type { Post, User, Session };
