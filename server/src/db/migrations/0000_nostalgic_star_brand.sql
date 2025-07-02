CREATE TABLE `audios` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`filename` text NOT NULL,
	`originalFilename` text,
	`filesize` integer,
	`duration` real,
	`format` text,
	`md5` text,
	`url` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_audios_idx` ON `audios` (`userId`);--> statement-breakpoint
CREATE INDEX `audio_md5_idx` ON `audios` (`md5`);--> statement-breakpoint
CREATE TABLE `chapter_completions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`enrollmentId` text NOT NULL,
	`chapterId` text NOT NULL,
	`completedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`enrollmentId`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`chapterId`) REFERENCES `chapters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enrollment_chapter_completion_idx` ON `chapter_completions` (`enrollmentId`,`chapterId`);--> statement-breakpoint
CREATE INDEX `enrollment_completions_idx` ON `chapter_completions` (`enrollmentId`);--> statement-breakpoint
CREATE INDEX `chapter_completions_idx` ON `chapter_completions` (`chapterId`);--> statement-breakpoint
CREATE TABLE `chapters` (
	`id` text PRIMARY KEY NOT NULL,
	`courseId` text NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`order` integer NOT NULL,
	`duration` integer,
	`videoUrl` text,
	`audioUrl` text,
	`transcript` text,
	`metadata` text,
	`published` integer DEFAULT 0,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `course_chapters_idx` ON `chapters` (`courseId`);--> statement-breakpoint
CREATE INDEX `chapter_order_idx` ON `chapters` (`courseId`,`order`);--> statement-breakpoint
CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text,
	`description` text,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`language` text,
	`level` text,
	`category` text,
	`imageUrl` text,
	`price` real DEFAULT 0,
	`currency` text DEFAULT 'USD',
	`duration` integer,
	`lessonsCount` integer DEFAULT 0,
	`published` integer DEFAULT 0,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `language_courses_idx` ON `courses` (`language`);--> statement-breakpoint
CREATE INDEX `level_courses_idx` ON `courses` (`level`);--> statement-breakpoint
CREATE INDEX `published_courses_idx` ON `courses` (`published`);--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text,
	`content` text,
	`type` text,
	`url` text,
	`filename` text,
	`filesize` integer,
	`md5` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_documents_idx` ON `documents` (`userId`);--> statement-breakpoint
CREATE INDEX `document_type_idx` ON `documents` (`type`);--> statement-breakpoint
CREATE INDEX `document_md5_idx` ON `documents` (`md5`);--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`courseId` text NOT NULL,
	`currentChapterId` text,
	`progress` real DEFAULT 0,
	`completedAt` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`currentChapterId`) REFERENCES `chapters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_course_enrollment_idx` ON `enrollments` (`userId`,`courseId`);--> statement-breakpoint
CREATE INDEX `user_enrollments_idx` ON `enrollments` (`userId`);--> statement-breakpoint
CREATE INDEX `course_enrollments_idx` ON `enrollments` (`courseId`);--> statement-breakpoint
CREATE TABLE `follows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`followerId` text NOT NULL,
	`followingId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `follower_following_idx` ON `follows` (`followerId`,`followingId`);--> statement-breakpoint
CREATE INDEX `follower_idx` ON `follows` (`followerId`);--> statement-breakpoint
CREATE INDEX `following_idx` ON `follows` (`followingId`);--> statement-breakpoint
CREATE TABLE `llm_chats` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`agentId` text NOT NULL,
	`agentType` text NOT NULL,
	`title` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_chats_idx` ON `llm_chats` (`userId`);--> statement-breakpoint
CREATE INDEX `agent_chats_idx` ON `llm_chats` (`agentType`,`agentId`);--> statement-breakpoint
CREATE TABLE `llm_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`chatId` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`agentId` text,
	`agentType` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `llm_chats`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `chat_messages_idx` ON `llm_messages` (`chatId`);--> statement-breakpoint
CREATE INDEX `message_role_idx` ON `llm_messages` (`role`);--> statement-breakpoint
CREATE TABLE `lookups` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`word` text NOT NULL,
	`context` text,
	`sourceId` text,
	`sourceType` text,
	`nativeLanguage` text,
	`lookupCount` integer DEFAULT 1,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_lookups_idx` ON `lookups` (`userId`);--> statement-breakpoint
CREATE INDEX `word_idx` ON `lookups` (`word`);--> statement-breakpoint
CREATE INDEX `source_idx` ON `lookups` (`sourceType`,`sourceId`);--> statement-breakpoint
CREATE TABLE `meanings` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`lookupId` text,
	`word` text NOT NULL,
	`definition` text,
	`pronunciation` text,
	`partOfSpeech` text,
	`example` text,
	`translation` text,
	`sourceId` text,
	`sourceType` text,
	`status` text DEFAULT 'active',
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`lookupId`) REFERENCES `lookups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_meanings_idx` ON `meanings` (`userId`);--> statement-breakpoint
CREATE INDEX `word_meanings_idx` ON `meanings` (`word`);--> statement-breakpoint
CREATE INDEX `lookup_meaning_idx` ON `meanings` (`lookupId`);--> statement-breakpoint
CREATE INDEX `source_meanings_idx` ON `meanings` (`sourceType`,`sourceId`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `meanings` (`status`);--> statement-breakpoint
CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`segmentId` text,
	`content` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`segmentId`) REFERENCES `segments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_notes_idx` ON `notes` (`userId`);--> statement-breakpoint
CREATE INDEX `segment_notes_idx` ON `notes` (`segmentId`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'USD',
	`reconciledCurrency` text,
	`processor` text NOT NULL,
	`paymentType` text NOT NULL,
	`status` text DEFAULT 'pending',
	`externalId` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_payments_idx` ON `payments` (`userId`);--> statement-breakpoint
CREATE INDEX `payment_status_idx` ON `payments` (`status`);--> statement-breakpoint
CREATE INDEX `payment_type_idx` ON `payments` (`paymentType`);--> statement-breakpoint
CREATE INDEX `external_payment_idx` ON `payments` (`externalId`);--> statement-breakpoint
CREATE TABLE `post_likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postId` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `post_user_like_idx` ON `post_likes` (`postId`,`userId`);--> statement-breakpoint
CREATE INDEX `post_likes_idx` ON `post_likes` (`postId`);--> statement-breakpoint
CREATE INDEX `user_likes_idx` ON `post_likes` (`userId`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`content` text,
	`type` text NOT NULL,
	`metadata` text,
	`targetType` text,
	`targetId` text,
	`likesCount` integer DEFAULT 0,
	`commentsCount` integer DEFAULT 0,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_posts_idx` ON `posts` (`userId`);--> statement-breakpoint
CREATE INDEX `post_type_idx` ON `posts` (`type`);--> statement-breakpoint
CREATE INDEX `target_idx` ON `posts` (`targetType`,`targetId`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `posts` (`createdAt`);--> statement-breakpoint
CREATE TABLE `pronunciation_assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`recordingId` text,
	`targetText` text,
	`result` text,
	`accuracy` real,
	`fluency` real,
	`completeness` real,
	`pronunciation` real,
	`prosody` real,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recordingId`) REFERENCES `recordings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_assessments_idx` ON `pronunciation_assessments` (`userId`);--> statement-breakpoint
CREATE INDEX `recording_assessment_idx` ON `pronunciation_assessments` (`recordingId`);--> statement-breakpoint
CREATE TABLE `recordings` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`filename` text NOT NULL,
	`originalFilename` text,
	`filesize` integer,
	`duration` real,
	`format` text,
	`md5` text,
	`url` text,
	`targetId` text,
	`targetType` text,
	`referenceText` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_recordings_idx` ON `recordings` (`userId`);--> statement-breakpoint
CREATE INDEX `target_recordings_idx` ON `recordings` (`targetType`,`targetId`);--> statement-breakpoint
CREATE TABLE `segments` (
	`id` text PRIMARY KEY NOT NULL,
	`targetId` text,
	`targetType` text,
	`segmentIndex` integer,
	`startTime` real,
	`endTime` real,
	`text` text,
	`translation` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `target_segments_idx` ON `segments` (`targetType`,`targetId`);--> statement-breakpoint
CREATE INDEX `segment_index_idx` ON `segments` (`segmentIndex`);--> statement-breakpoint
CREATE TABLE `speech_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`token` text NOT NULL,
	`region` text,
	`purpose` text,
	`targetType` text,
	`targetId` text,
	`input` text,
	`state` text DEFAULT 'active',
	`expiresAt` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_tokens_idx` ON `speech_tokens` (`userId`);--> statement-breakpoint
CREATE INDEX `token_idx` ON `speech_tokens` (`token`);--> statement-breakpoint
CREATE INDEX `token_state_idx` ON `speech_tokens` (`state`);--> statement-breakpoint
CREATE TABLE `starred_stories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`storyId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`storyId`) REFERENCES `stories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_story_star_idx` ON `starred_stories` (`userId`,`storyId`);--> statement-breakpoint
CREATE INDEX `user_starred_idx` ON `starred_stories` (`userId`);--> statement-breakpoint
CREATE INDEX `story_starred_idx` ON `starred_stories` (`storyId`);--> statement-breakpoint
CREATE TABLE `stories` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`title` text NOT NULL,
	`content` text,
	`language` text,
	`level` text,
	`genre` text,
	`tags` text,
	`audioUrl` text,
	`imageUrl` text,
	`metadata` text,
	`published` integer DEFAULT 0,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_stories_idx` ON `stories` (`userId`);--> statement-breakpoint
CREATE INDEX `language_idx` ON `stories` (`language`);--> statement-breakpoint
CREATE INDEX `level_idx` ON `stories` (`level`);--> statement-breakpoint
CREATE INDEX `published_idx` ON `stories` (`published`);--> statement-breakpoint
CREATE TABLE `transcriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`targetId` text,
	`targetType` text,
	`targetMd5` text,
	`content` text,
	`language` text,
	`engine` text,
	`status` text DEFAULT 'pending',
	`result` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `target_idx` ON `transcriptions` (`targetType`,`targetId`);--> statement-breakpoint
CREATE INDEX `target_md5_idx` ON `transcriptions` (`targetMd5`);--> statement-breakpoint
CREATE INDEX `user_transcriptions_idx` ON `transcriptions` (`userId`);--> statement-breakpoint
CREATE TABLE `translations` (
	`id` text PRIMARY KEY NOT NULL,
	`md5` text NOT NULL,
	`content` text NOT NULL,
	`translatedContent` text NOT NULL,
	`language` text NOT NULL,
	`translatedLanguage` text NOT NULL,
	`engine` text NOT NULL,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translation_unique_idx` ON `translations` (`md5`,`language`,`translatedLanguage`,`engine`);--> statement-breakpoint
CREATE INDEX `translation_md5_idx` ON `translations` (`md5`);--> statement-breakpoint
CREATE INDEX `translation_languages_idx` ON `translations` (`language`,`translatedLanguage`);--> statement-breakpoint
CREATE TABLE `usages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`action` text NOT NULL,
	`resource` text,
	`amount` real DEFAULT 1,
	`metadata` text,
	`date` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_usage_idx` ON `usages` (`userId`);--> statement-breakpoint
CREATE INDEX `usage_date_idx` ON `usages` (`date`);--> statement-breakpoint
CREATE INDEX `usage_action_idx` ON `usages` (`action`);--> statement-breakpoint
CREATE INDEX `user_date_action_idx` ON `usages` (`userId`,`date`,`action`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phoneNumber` text,
	`mixinId` text,
	`githubId` text,
	`avatar` text,
	`locale` text DEFAULT 'en',
	`points` integer DEFAULT 0,
	`balance` real DEFAULT 0,
	`settings` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `phone_idx` ON `users` (`phoneNumber`);--> statement-breakpoint
CREATE UNIQUE INDEX `mixin_idx` ON `users` (`mixinId`);--> statement-breakpoint
CREATE UNIQUE INDEX `github_idx` ON `users` (`githubId`);--> statement-breakpoint
CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`filename` text NOT NULL,
	`originalFilename` text,
	`filesize` integer,
	`duration` real,
	`format` text,
	`md5` text,
	`url` text,
	`metadata` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_videos_idx` ON `videos` (`userId`);--> statement-breakpoint
CREATE INDEX `video_md5_idx` ON `videos` (`md5`);