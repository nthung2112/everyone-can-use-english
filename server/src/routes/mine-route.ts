import { Hono } from "hono";
import { db } from "../db/index";
import {
  audiosTable,
  videosTable,
  recordingsTable,
  pronunciationAssessmentsTable,
  storiesTable,
  starredStoriesTable,
  documentsTable,
  meaningsTable,
} from "../db/schema";
import { eq, desc, and } from "drizzle-orm";

const mineRoute = new Hono();

// Get usage statistics
mineRoute.get("/usages", async (c) => {
  try {
    // Return usage statistics for the user
    const usageData = [
      { label: "Recordings", data: [10, 15, 20, 25, 30] },
      { label: "Transcriptions", data: [5, 8, 12, 18, 22] },
      { label: "Pronunciations", data: [3, 6, 9, 12, 15] },
    ];
    return c.json(usageData);
  } catch (error) {
    console.error("Get usages error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync audio
mineRoute.post("/audios", async (c) => {
  try {
    const body = await c.req.json();
    const { filename, original_filename, filesize, duration, format, md5, url, metadata } = body;

    if (!filename || !original_filename) {
      return c.json({ error: "Filename and original_filename are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    const newAudio = await db
      .insert(audiosTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        filename,
        originalFilename: original_filename,
        filesize: filesize || null,
        duration: duration || null,
        format: format || null,
        md5: md5 || null,
        url: url || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();

    return c.json(newAudio[0]);
  } catch (error) {
    console.error("Sync audio error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete audio
mineRoute.delete("/audios/:id", async (c) => {
  try {
    const audioId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Verify user owns the audio
    const existingAudio = await db
      .select()
      .from(audiosTable)
      .where(and(eq(audiosTable.id, audioId), eq(audiosTable.userId, userId)))
      .limit(1);

    if (existingAudio.length === 0) {
      return c.json({ error: "Audio not found or you don't have permission to delete it" }, 404);
    }

    await db.delete(audiosTable).where(eq(audiosTable.id, audioId));

    return c.json({ message: "Audio deleted successfully", id: audioId });
  } catch (error) {
    console.error("Delete audio error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync video
mineRoute.post("/videos", async (c) => {
  try {
    const body = await c.req.json();
    const { filename, original_filename, filesize, duration, format, md5, url, metadata } = body;

    if (!filename || !original_filename) {
      return c.json({ error: "Filename and original_filename are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    const newVideo = await db
      .insert(videosTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        filename,
        originalFilename: original_filename,
        filesize: filesize || null,
        duration: duration || null,
        format: format || null,
        md5: md5 || null,
        url: url || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();

    return c.json(newVideo[0]);
  } catch (error) {
    console.error("Sync video error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete video
mineRoute.delete("/videos/:id", async (c) => {
  try {
    const videoId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Verify user owns the video
    const existingVideo = await db
      .select()
      .from(videosTable)
      .where(and(eq(videosTable.id, videoId), eq(videosTable.userId, userId)))
      .limit(1);

    if (existingVideo.length === 0) {
      return c.json({ error: "Video not found or you don't have permission to delete it" }, 404);
    }

    await db.delete(videosTable).where(eq(videosTable.id, videoId));

    return c.json({ message: "Video deleted successfully", id: videoId });
  } catch (error) {
    console.error("Delete video error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync recording
mineRoute.post("/recordings", async (c) => {
  try {
    const body = await c.req.json();
    const { filename, duration, metadata, target_type, target_id } = body;

    if (!filename) {
      return c.json({ error: "Filename is required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    const newRecording = await db
      .insert(recordingsTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        filename,
        duration: duration || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
        targetType: target_type || null,
        targetId: target_id || null,
      })
      .returning();

    return c.json(newRecording[0]);
  } catch (error) {
    console.error("Sync recording error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete recording
mineRoute.delete("/recordings/:id", async (c) => {
  try {
    const recordingId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Verify user owns the recording
    const existingRecording = await db
      .select()
      .from(recordingsTable)
      .where(and(eq(recordingsTable.id, recordingId), eq(recordingsTable.userId, userId)))
      .limit(1);

    if (existingRecording.length === 0) {
      return c.json(
        { error: "Recording not found or you don't have permission to delete it" },
        404
      );
    }

    await db.delete(recordingsTable).where(eq(recordingsTable.id, recordingId));

    return c.json({ message: "Recording deleted successfully", id: recordingId });
  } catch (error) {
    console.error("Delete recording error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get recording assessment
mineRoute.get("/recordings/:id/assessment", async (c) => {
  try {
    const recordingId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Get assessment for the recording
    const assessment = await db
      .select()
      .from(pronunciationAssessmentsTable)
      .where(
        and(
          eq(pronunciationAssessmentsTable.recordingId, recordingId),
          eq(pronunciationAssessmentsTable.userId, userId)
        )
      )
      .limit(1);

    if (assessment.length === 0) {
      return c.json({ error: "Assessment not found" }, 404);
    }

    return c.json(assessment[0]);
  } catch (error) {
    console.error("Get recording assessment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync pronunciation assessment
mineRoute.post("/pronunciation_assessments", async (c) => {
  try {
    const body = await c.req.json();
    const {
      recording_id,
      target_text,
      result,
      accuracy,
      fluency,
      completeness,
      pronunciation,
      prosody,
    } = body;

    if (!recording_id || !result) {
      return c.json({ error: "Recording ID and result are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    const newAssessment = await db
      .insert(pronunciationAssessmentsTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        recordingId: recording_id,
        targetText: target_text || null,
        result: typeof result === "string" ? result : JSON.stringify(result),
        accuracy: accuracy || null,
        fluency: fluency || null,
        completeness: completeness || null,
        pronunciation: pronunciation || null,
        prosody: prosody || null,
      })
      .returning();

    return c.json(newAssessment[0]);
  } catch (error) {
    console.error("Sync pronunciation assessment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user stories
mineRoute.get("/stories", async (c) => {
  try {
    const { page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const { userId } = c.get("jwtPayload");

    const stories = await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.userId, userId))
      .orderBy(desc(storiesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      stories,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: stories.length === limit,
      },
    });
  } catch (error) {
    console.error("Get user stories error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Star story
mineRoute.post("/stories", async (c) => {
  try {
    const body = await c.req.json();
    const { story_id } = body;

    if (!story_id) {
      return c.json({ error: "Story ID is required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    // Create a starred story record
    const starredStory = await db
      .insert(starredStoriesTable)
      .values({
        userId,
        storyId: story_id,
      })
      .returning();

    return c.json(starredStory[0]);
  } catch (error) {
    console.error("Star story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Unstar story
mineRoute.delete("/stories/:id", async (c) => {
  try {
    const storyId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Delete the starred story record
    const deleted = await db
      .delete(starredStoriesTable)
      .where(and(eq(starredStoriesTable.userId, userId), eq(starredStoriesTable.storyId, storyId)));

    return c.json({ message: "Story unstarred successfully", id: storyId });
  } catch (error) {
    console.error("Unstar story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync document
mineRoute.post("/documents", async (c) => {
  try {
    const body = await c.req.json();
    const { filename, type, md5, url, metadata } = body;

    if (!filename || !type || !md5) {
      return c.json({ error: "Filename, type, and md5 are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    const newDocument = await db
      .insert(documentsTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        filename,
        type,
        md5,
        url: url || null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();

    return c.json(newDocument[0]);
  } catch (error) {
    console.error("Sync document error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete document
mineRoute.delete("/documents/:id", async (c) => {
  try {
    const documentId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    // Verify user owns the document
    const existingDocument = await db
      .select()
      .from(documentsTable)
      .where(and(eq(documentsTable.id, documentId), eq(documentsTable.userId, userId)))
      .limit(1);

    if (existingDocument.length === 0) {
      return c.json({ error: "Document not found or you don't have permission to delete it" }, 404);
    }

    await db.delete(documentsTable).where(eq(documentsTable.id, documentId));

    return c.json({ message: "Document deleted successfully", id: documentId });
  } catch (error) {
    console.error("Delete document error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user meanings
mineRoute.get("/meanings", async (c) => {
  try {
    const { page = "1", items = "20", source_id, source_type, status } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const { userId } = c.get("jwtPayload");

    // Build where conditions
    let whereConditions = [eq(meaningsTable.userId, userId)];
    if (source_id) {
      whereConditions.push(eq(meaningsTable.sourceId, source_id));
    }
    if (source_type) {
      whereConditions.push(eq(meaningsTable.sourceType, source_type));
    }
    if (status) {
      whereConditions.push(eq(meaningsTable.status, status));
    }

    const meanings = await db
      .select()
      .from(meaningsTable)
      .where(and(...whereConditions))
      .orderBy(desc(meaningsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      meanings,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: meanings.length === limit,
      },
    });
  } catch (error) {
    console.error("Get user meanings error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default mineRoute;
