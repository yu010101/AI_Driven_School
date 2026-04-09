import { pgTable, serial, text, integer, timestamp, boolean, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  company: text("company"),
  role: text("role").notNull().default("free"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  plan: text("plan").notNull().default("free"),
  status: text("status").notNull().default("inactive"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerUserId: integer("owner_user_id")
    .references(() => users.id)
    .notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  maxMembers: integer("max_members").notNull().default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orgMembers = pgTable(
  "org_members",
  {
    id: serial("id").primaryKey(),
    orgId: integer("org_id")
      .references(() => organizations.id, { onDelete: "cascade" })
      .notNull(),
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    role: text("role").notNull().default("member"),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => ({
    orgUserIdx: uniqueIndex("org_user_idx").on(table.orgId, table.userId),
  })
);

export const stripeEvents = pgTable("stripe_events", {
  id: serial("id").primaryKey(),
  eventId: text("event_id").notNull().unique(),
  eventType: text("event_type").notNull(),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
});

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    courseId: text("course_id").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    completed: boolean("completed").default(false).notNull(),
    xpEarned: integer("xp_earned").default(0).notNull(),
    completedAt: timestamp("completed_at").defaultNow(),
  },
  (table) => ({
    userLessonIdx: uniqueIndex("user_lesson_idx").on(
      table.userId,
      table.courseId,
      table.lessonSlug
    ),
  })
);

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  examId: text("exam_id").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});
