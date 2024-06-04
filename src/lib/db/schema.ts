import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

type Post = typeof postsTable.$inferSelect;

export { postsTable };
export type { Post };
