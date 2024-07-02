import {
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  description: text("description"),
  author: text("author"),
  authorId: text("author_id").references(() => usersTable.id),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
const likesTable = pgTable(
  "likes",
  {
    userId: text("user_id").references(() => usersTable.id, {
      onDelete: "cascade",
    }),
    postId: serial("post_id").references(() => postsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({ pk: primaryKey({ columns: [table.postId, table.userId] }) })
);

type Post = typeof postsTable.$inferSelect;
type User = typeof usersTable.$inferSelect;
type Session = typeof sessionTable.$inferSelect;
type Likes = typeof likesTable.$inferSelect;

export { postsTable, usersTable, sessionTable, likesTable };
export type { Post, User, Session, Likes };
