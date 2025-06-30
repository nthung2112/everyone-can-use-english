// This file exports TypeScript types and interfaces used throughout the application, ensuring type safety.

export type UserType = {
  id: string;
  name: string;
  email: string;
  // Add other user-related fields as necessary
};

export type PostType = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other post-related fields as necessary
};

export type TranscriptionType = {
  id: string;
  content: string;
  metadata?: any; // Define more specific type if necessary
  // Add other transcription-related fields as necessary
};

export type AudioType = {
  id: string;
  userId: string;
  filePath: string;
  metadata?: any; // Define more specific type if necessary
  // Add other audio-related fields as necessary
};

export type VideoType = {
  id: string;
  userId: string;
  filePath: string;
  metadata?: any; // Define more specific type if necessary
  // Add other video-related fields as necessary
};

export type RecordingType = {
  id: string;
  userId: string;
  filePath: string;
  metadata?: any; // Define more specific type if necessary
  // Add other recording-related fields as necessary
};

export type SegmentType = {
  id: string;
  transcriptionId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other segment-related fields as necessary
};

export type NoteType = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other note-related fields as necessary
};

export type PronunciationAssessmentType = {
  id: string;
  userId: string;
  assessmentData: any; // Define more specific type if necessary
  createdAt: Date;
  updatedAt: Date;
  // Add other pronunciation assessment-related fields as necessary
};

export type LookupType = {
  id: string;
  word: string;
  context: string;
  metadata?: any; // Define more specific type if necessary
  // Add other lookup-related fields as necessary
};

export type MeaningType = {
  id: string;
  wordId: string;
  meaning: string;
  metadata?: any; // Define more specific type if necessary
  // Add other meaning-related fields as necessary
};

export type StoryType = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other story-related fields as necessary
};

export type PaymentType = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  // Add other payment-related fields as necessary
};

export type CourseType = {
  id: string;
  title: string;
  description: string;
  metadata?: any; // Define more specific type if necessary
  // Add other course-related fields as necessary
};

export type ChapterType = {
  id: string;
  courseId: string;
  title: string;
  content: string;
  // Add other chapter-related fields as necessary
};

export type EnrollmentType = {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  // Add other enrollment-related fields as necessary
};

export type ChatType = {
  id: string;
  userId: string;
  metadata?: any; // Define more specific type if necessary
  // Add other chat-related fields as necessary
};

export type LlmMessageType = {
  id: string;
  chatId: string;
  content: string;
  createdAt: Date;
  // Add other message-related fields as necessary
};

export type DocumentEType = {
  id: string;
  userId: string;
  filePath: string;
  metadata?: any; // Define more specific type if necessary
  // Add other document-related fields as necessary
};

export type TranslationType = {
  id: string;
  content: string;
  translatedContent: string;
  language: string;
  translatedLanguage: string;
  engine: string;
  // Add other translation-related fields as necessary
};