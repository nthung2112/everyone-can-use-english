import { sql } from "drizzle-orm";
import { int, sqliteTable, text, real, blob, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// Users table - Core user management
export const usersTable = sqliteTable(
  "users",
  {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().unique(),
    phoneNumber: text(),
    mixinId: text(),
    githubId: text(),
    avatar: text(),
    locale: text().default("en"),
    points: int().default(0),
    balance: real().default(0),
    settings: text(), // JSON string for user settings
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email),
    uniqueIndex("phone_idx").on(table.phoneNumber),
    uniqueIndex("mixin_idx").on(table.mixinId),
    uniqueIndex("github_idx").on(table.githubId),
  ]
);

// User follows/relationships
export const followsTable = sqliteTable(
  "follows",
  {
    id: int().primaryKey({ autoIncrement: true }),
    followerId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    followingId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("follower_following_idx").on(table.followerId, table.followingId),
    index("follower_idx").on(table.followerId),
    index("following_idx").on(table.followingId),
  ]
);

// Posts table - User posts and content
export const postsTable = sqliteTable(
  "posts",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    content: text(),
    type: text().notNull(), // recording, medium, story, prompt, text, gpt, note
    metadata: text(), // JSON string for post metadata
    targetType: text(),
    targetId: text(),
    likesCount: int().default(0),
    commentsCount: int().default(0),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_posts_idx").on(table.userId),
    index("post_type_idx").on(table.type),
    index("target_idx").on(table.targetType, table.targetId),
    index("created_at_idx").on(table.createdAt),
  ]
);

// Post likes
export const postLikesTable = sqliteTable(
  "post_likes",
  {
    id: int().primaryKey({ autoIncrement: true }),
    postId: text()
      .notNull()
      .references(() => postsTable.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("post_user_like_idx").on(table.postId, table.userId),
    index("post_likes_idx").on(table.postId),
    index("user_likes_idx").on(table.userId),
  ]
);

// Audio files
export const audiosTable = sqliteTable(
  "audios",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    filename: text().notNull(),
    originalFilename: text(),
    filesize: int(),
    duration: real(),
    format: text(),
    md5: text(),
    url: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("user_audios_idx").on(table.userId), index("audio_md5_idx").on(table.md5)]
);

// Video files
export const videosTable = sqliteTable(
  "videos",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    filename: text().notNull(),
    originalFilename: text(),
    filesize: int(),
    duration: real(),
    format: text(),
    md5: text(),
    url: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("user_videos_idx").on(table.userId), index("video_md5_idx").on(table.md5)]
);

// Transcriptions
export const transcriptionsTable = sqliteTable(
  "transcriptions",
  {
    id: text().primaryKey(),
    userId: text().references(() => usersTable.id, { onDelete: "cascade" }),
    targetId: text(),
    targetType: text(),
    targetMd5: text(),
    content: text(),
    language: text(),
    engine: text(),
    status: text().default("pending"),
    result: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("target_idx").on(table.targetType, table.targetId),
    index("target_md5_idx").on(table.targetMd5),
    index("user_transcriptions_idx").on(table.userId),
  ]
);

// Segments (audio/video segments)
export const segmentsTable = sqliteTable(
  "segments",
  {
    id: text().primaryKey(),
    targetId: text(),
    targetType: text(),
    segmentIndex: int(),
    startTime: real(),
    endTime: real(),
    text: text(),
    translation: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("target_segments_idx").on(table.targetType, table.targetId),
    index("segment_index_idx").on(table.segmentIndex),
  ]
);

// Notes
export const notesTable = sqliteTable(
  "notes",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    segmentId: text().references(() => segmentsTable.id, { onDelete: "cascade" }),
    content: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_notes_idx").on(table.userId),
    index("segment_notes_idx").on(table.segmentId),
  ]
);

// Recordings
export const recordingsTable = sqliteTable(
  "recordings",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    filename: text().notNull(),
    originalFilename: text(),
    filesize: int(),
    duration: real(),
    format: text(),
    md5: text(),
    url: text(),
    targetId: text(),
    targetType: text(),
    referenceText: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_recordings_idx").on(table.userId),
    index("target_recordings_idx").on(table.targetType, table.targetId),
  ]
);

// Speech tokens
export const speechTokensTable = sqliteTable(
  "speech_tokens",
  {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    token: text().notNull(),
    region: text(),
    purpose: text(),
    targetType: text(),
    targetId: text(),
    input: text(),
    state: text().default("active"), // active, consumed, revoked
    expiresAt: text(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_tokens_idx").on(table.userId),
    index("token_idx").on(table.token),
    index("token_state_idx").on(table.state),
  ]
);

// Pronunciation assessments
export const pronunciationAssessmentsTable = sqliteTable(
  "pronunciation_assessments",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    recordingId: text().references(() => recordingsTable.id, { onDelete: "cascade" }),
    targetText: text(),
    result: text(), // JSON string with assessment results
    accuracy: real(),
    fluency: real(),
    completeness: real(),
    pronunciation: real(),
    prosody: real(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_assessments_idx").on(table.userId),
    index("recording_assessment_idx").on(table.recordingId),
  ]
);

// Lookups (word definitions)
export const lookupsTable = sqliteTable(
  "lookups",
  {
    id: text().primaryKey(),
    userId: text().references(() => usersTable.id, { onDelete: "cascade" }),
    word: text().notNull(),
    context: text(),
    sourceId: text(),
    sourceType: text(),
    nativeLanguage: text(),
    lookupCount: int().default(1),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_lookups_idx").on(table.userId),
    index("word_idx").on(table.word),
    index("source_idx").on(table.sourceType, table.sourceId),
  ]
);

// Meanings (word meanings and definitions)
export const meaningsTable = sqliteTable(
  "meanings",
  {
    id: text().primaryKey(),
    userId: text().references(() => usersTable.id, { onDelete: "cascade" }),
    lookupId: text().references(() => lookupsTable.id, { onDelete: "cascade" }),
    word: text().notNull(),
    definition: text(),
    pronunciation: text(),
    partOfSpeech: text(),
    example: text(),
    translation: text(),
    sourceId: text(),
    sourceType: text(),
    status: text().default("active"), // active, archived
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_meanings_idx").on(table.userId),
    index("word_meanings_idx").on(table.word),
    index("lookup_meaning_idx").on(table.lookupId),
    index("source_meanings_idx").on(table.sourceType, table.sourceId),
    index("status_idx").on(table.status),
  ]
);

// Stories
export const storiesTable = sqliteTable(
  "stories",
  {
    id: text().primaryKey(),
    userId: text().references(() => usersTable.id, { onDelete: "cascade" }),
    title: text().notNull(),
    content: text(),
    language: text(),
    level: text(),
    genre: text(),
    tags: text(), // JSON array
    audioUrl: text(),
    imageUrl: text(),
    metadata: text(), // JSON string
    published: int().default(0), // boolean as integer
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_stories_idx").on(table.userId),
    index("language_idx").on(table.language),
    index("level_idx").on(table.level),
    index("published_idx").on(table.published),
  ]
);

// User starred stories
export const starredStoriesTable = sqliteTable(
  "starred_stories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    storyId: text()
      .notNull()
      .references(() => storiesTable.id, { onDelete: "cascade" }),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("user_story_star_idx").on(table.userId, table.storyId),
    index("user_starred_idx").on(table.userId),
    index("story_starred_idx").on(table.storyId),
  ]
);

// Courses
export const coursesTable = sqliteTable(
  "courses",
  {
    id: text().primaryKey(),
    title: text().notNull(),
    description: text(),
    language: text(),
    level: text(),
    category: text(),
    imageUrl: text(),
    price: real().default(0),
    currency: text().default("USD"),
    duration: int(), // in minutes
    lessonsCount: int().default(0),
    published: int().default(0), // boolean as integer
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("language_courses_idx").on(table.language),
    index("level_courses_idx").on(table.level),
    index("published_courses_idx").on(table.published),
  ]
);

// Course chapters
export const chaptersTable = sqliteTable(
  "chapters",
  {
    id: text().primaryKey(),
    courseId: text()
      .notNull()
      .references(() => coursesTable.id, { onDelete: "cascade" }),
    title: text().notNull(),
    content: text(),
    order: int().notNull(),
    duration: int(), // in minutes
    videoUrl: text(),
    audioUrl: text(),
    transcript: text(),
    metadata: text(), // JSON string
    published: int().default(0), // boolean as integer
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("course_chapters_idx").on(table.courseId),
    index("chapter_order_idx").on(table.courseId, table.order),
  ]
);

// Course enrollments
export const enrollmentsTable = sqliteTable(
  "enrollments",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    courseId: text()
      .notNull()
      .references(() => coursesTable.id, { onDelete: "cascade" }),
    currentChapterId: text().references(() => chaptersTable.id),
    progress: real().default(0), // percentage 0-100
    completedAt: text(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("user_course_enrollment_idx").on(table.userId, table.courseId),
    index("user_enrollments_idx").on(table.userId),
    index("course_enrollments_idx").on(table.courseId),
  ]
);

// Chapter completions
export const chapterCompletionsTable = sqliteTable(
  "chapter_completions",
  {
    id: int().primaryKey({ autoIncrement: true }),
    enrollmentId: text()
      .notNull()
      .references(() => enrollmentsTable.id, { onDelete: "cascade" }),
    chapterId: text()
      .notNull()
      .references(() => chaptersTable.id, { onDelete: "cascade" }),
    completedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("enrollment_chapter_completion_idx").on(table.enrollmentId, table.chapterId),
    index("enrollment_completions_idx").on(table.enrollmentId),
    index("chapter_completions_idx").on(table.chapterId),
  ]
);

// LLM Chats
export const llmChatsTable = sqliteTable(
  "llm_chats",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    agentId: text().notNull(),
    agentType: text().notNull(),
    title: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_chats_idx").on(table.userId),
    index("agent_chats_idx").on(table.agentType, table.agentId),
  ]
);

// LLM Messages
export const llmMessagesTable = sqliteTable(
  "llm_messages",
  {
    id: text().primaryKey(),
    chatId: text()
      .notNull()
      .references(() => llmChatsTable.id, { onDelete: "cascade" }),
    role: text().notNull(), // user, assistant, system
    content: text().notNull(),
    agentId: text(),
    agentType: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("chat_messages_idx").on(table.chatId), index("message_role_idx").on(table.role)]
);

// Documents
export const documentsTable = sqliteTable(
  "documents",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    title: text(),
    content: text(),
    type: text(), // pdf, txt, md, etc.
    url: text(),
    filename: text(),
    filesize: int(),
    md5: text(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_documents_idx").on(table.userId),
    index("document_type_idx").on(table.type),
    index("document_md5_idx").on(table.md5),
  ]
);

// Translations
export const translationsTable = sqliteTable(
  "translations",
  {
    id: text().primaryKey(),
    md5: text().notNull(),
    content: text().notNull(),
    translatedContent: text().notNull(),
    language: text().notNull(),
    translatedLanguage: text().notNull(),
    engine: text().notNull(),
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("translation_unique_idx").on(
      table.md5,
      table.language,
      table.translatedLanguage,
      table.engine
    ),
    index("translation_md5_idx").on(table.md5),
    index("translation_languages_idx").on(table.language, table.translatedLanguage),
  ]
);

// Payments
export const paymentsTable = sqliteTable(
  "payments",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    amount: real().notNull(),
    currency: text().default("USD"),
    reconciledCurrency: text(),
    processor: text().notNull(), // stripe, paypal, etc.
    paymentType: text().notNull(),
    status: text().default("pending"), // pending, completed, failed, refunded
    externalId: text(), // external payment processor ID
    metadata: text(), // JSON string
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_payments_idx").on(table.userId),
    index("payment_status_idx").on(table.status),
    index("payment_type_idx").on(table.paymentType),
    index("external_payment_idx").on(table.externalId),
  ]
);

// Usage tracking
export const usagesTable = sqliteTable(
  "usages",
  {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    action: text().notNull(),
    resource: text(),
    amount: real().default(1),
    metadata: text(), // JSON string
    date: text().notNull(), // YYYY-MM-DD format for daily aggregation
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("user_usage_idx").on(table.userId),
    index("usage_date_idx").on(table.date),
    index("usage_action_idx").on(table.action),
    index("user_date_action_idx").on(table.userId, table.date, table.action),
  ]
);

// Configuration
export const configTable = sqliteTable("config", {
  key: text().primaryKey(),
  value: text(),
  description: text(),
  updatedAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Export all types for easy use
export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

export type Follow = typeof followsTable.$inferSelect;
export type InsertFollow = typeof followsTable.$inferInsert;

export type Post = typeof postsTable.$inferSelect;
export type InsertPost = typeof postsTable.$inferInsert;

export type PostLike = typeof postLikesTable.$inferSelect;
export type InsertPostLike = typeof postLikesTable.$inferInsert;

export type Audio = typeof audiosTable.$inferSelect;
export type InsertAudio = typeof audiosTable.$inferInsert;

export type Video = typeof videosTable.$inferSelect;
export type InsertVideo = typeof videosTable.$inferInsert;

export type Transcription = typeof transcriptionsTable.$inferSelect;
export type InsertTranscription = typeof transcriptionsTable.$inferInsert;

export type Segment = typeof segmentsTable.$inferSelect;
export type InsertSegment = typeof segmentsTable.$inferInsert;

export type Note = typeof notesTable.$inferSelect;
export type InsertNote = typeof notesTable.$inferInsert;

export type Recording = typeof recordingsTable.$inferSelect;
export type InsertRecording = typeof recordingsTable.$inferInsert;

export type SpeechToken = typeof speechTokensTable.$inferSelect;
export type InsertSpeechToken = typeof speechTokensTable.$inferInsert;

export type PronunciationAssessment = typeof pronunciationAssessmentsTable.$inferSelect;
export type InsertPronunciationAssessment = typeof pronunciationAssessmentsTable.$inferInsert;

export type Lookup = typeof lookupsTable.$inferSelect;
export type InsertLookup = typeof lookupsTable.$inferInsert;

export type Meaning = typeof meaningsTable.$inferSelect;
export type InsertMeaning = typeof meaningsTable.$inferInsert;

export type Story = typeof storiesTable.$inferSelect;
export type InsertStory = typeof storiesTable.$inferInsert;

export type StarredStory = typeof starredStoriesTable.$inferSelect;
export type InsertStarredStory = typeof starredStoriesTable.$inferInsert;

export type Course = typeof coursesTable.$inferSelect;
export type InsertCourse = typeof coursesTable.$inferInsert;

export type Chapter = typeof chaptersTable.$inferSelect;
export type InsertChapter = typeof chaptersTable.$inferInsert;

export type Enrollment = typeof enrollmentsTable.$inferSelect;
export type InsertEnrollment = typeof enrollmentsTable.$inferInsert;

export type ChapterCompletion = typeof chapterCompletionsTable.$inferSelect;
export type InsertChapterCompletion = typeof chapterCompletionsTable.$inferInsert;

export type LlmChat = typeof llmChatsTable.$inferSelect;
export type InsertLlmChat = typeof llmChatsTable.$inferInsert;

export type LlmMessage = typeof llmMessagesTable.$inferSelect;
export type InsertLlmMessage = typeof llmMessagesTable.$inferInsert;

export type Document = typeof documentsTable.$inferSelect;
export type InsertDocument = typeof documentsTable.$inferInsert;

export type Translation = typeof translationsTable.$inferSelect;
export type InsertTranslation = typeof translationsTable.$inferInsert;

export type Payment = typeof paymentsTable.$inferSelect;
export type InsertPayment = typeof paymentsTable.$inferInsert;

export type Usage = typeof usagesTable.$inferSelect;
export type InsertUsage = typeof usagesTable.$inferInsert;

export type Config = typeof configTable.$inferSelect;
export type InsertConfig = typeof configTable.$inferInsert;
