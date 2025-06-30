Here are all the client API methods defined in this file:

## Authentication & User Management

- `up()` - Health check endpoint
- `auth()` - Authenticate user with various providers (mixin, github, bandu, email)
- `oauthState()` - OAuth state validation
- `deviceCode()` - Generate device code for OAuth
- `me()` - Get current user profile
- `updateProfile()` - Update user profile
- `loginCode()` - Send login code via phone/email

## User Interactions

- `rankings()` - Get user rankings by time range
- `users()` - Get users list (following/followers)
- `user()` - Get specific user by ID
- `userFollowing()` - Get user's following list
- `userFollowers()` - Get user's followers list
- `follow()` - Follow a user
- `unfollow()` - Unfollow a user

## Posts & Content

- `posts()` - Get posts with various filters
- `post()` - Get specific post by ID
- `createPost()` - Create new post
- `updatePost()` - Update existing post
- `deletePost()` - Delete post
- `likePost()` - Like a post
- `unlikePost()` - Unlike a post

## Audio/Video & Transcriptions

- `transcriptions()` - Get transcriptions
- `syncAudio()` - Sync audio data
- `deleteAudio()` - Delete audio
- `syncVideo()` - Sync video data
- `deleteVideo()` - Delete video
- `syncTranscription()` - Sync transcription data
- `syncSegment()` - Sync segment data
- `syncRecording()` - Sync recording data
- `deleteRecording()` - Delete recording

## Speech & Assessment

- `generateSpeechToken()` - Generate speech token
- `consumeSpeechToken()` - Consume speech token
- `revokeSpeechToken()` - Revoke speech token
- `syncPronunciationAssessment()` - Sync pronunciation assessment
- `recordingAssessment()` - Get recording assessment

## Language Learning & Vocabulary

- `lookup()` - Look up word meaning
- `updateLookup()` - Update lookup result
- `lookupInBatch()` - Batch lookup words
- `extractVocabularyFromStory()` - Extract vocabulary from story
- `storyMeanings()` - Get story meanings
- `mineMeanings()` - Get user's meanings

## Stories

- `createStory()` - Create new story
- `story()` - Get specific story
- `stories()` - Get stories list
- `mineStories()` - Get user's stories
- `starStory()` - Star a story
- `unstarStory()` - Unstar a story

## Courses & Learning

- `courses()` - Get courses list
- `course()` - Get specific course
- `createEnrollment()` - Enroll in course
- `courseChapters()` - Get course chapters
- `coursechapter()` - Get specific chapter
- `finishCourseChapter()` - Mark chapter as finished
- `enrollments()` - Get user enrollments
- `updateEnrollment()` - Update enrollment

## AI Chat & LLM

- `createLlmChat()` - Create LLM chat session
- `llmChat()` - Get LLM chat
- `createLlmMessage()` - Send message to LLM
- `llmMessages()` - Get chat messages

## Documents & Translations

- `syncDocument()` - Sync document data
- `deleteDocument()` - Delete document
- `translations()` - Get translations
- `createTranslation()` - Create new translation

## Payments & Billing

- `createPayment()` - Create payment
- `payments()` - Get payments list
- `payment()` - Get specific payment

## Analytics & Data

- `usages()` - Get usage statistics
- `segments()` - Get segments data
- `syncNote()` - Sync note data
- `deleteNote()` - Delete note
- `config()` - Get configuration

**Total: 58 API methods**
