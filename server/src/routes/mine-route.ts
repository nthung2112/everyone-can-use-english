import { Hono } from "hono";
import { db } from "../db/index";
import {
  audiosTable,
  videosTable,
  recordingsTable,
  pronunciationAssessmentsTable,
  notesTable,
  segmentsTable,
  storiesTable,
  documentsTable,
  meaningsTable,
} from "../db/schema";
import { eq, desc } from "drizzle-orm";

const mineRoute = new Hono();

// Get usage statistics
mineRoute.get("/usages", async (c) => {
  try {
    // TODO: Extract user ID from JWT token
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // // Return usage statistics for the user
    // const usageData = [
    //   { label: "Recordings", data: [10, 15, 20, 25, 30] },
    //   { label: "Transcriptions", data: [5, 8, 12, 18, 22] },
    //   { label: "Pronunciations", data: [3, 6, 9, 12, 15] },
    // ];
    // return c.json(usageData);
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

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Sync audio error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete audio
mineRoute.delete("/audios/:id", async (c) => {
  try {
    const audioId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
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

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Sync video error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete video
mineRoute.delete("/videos/:id", async (c) => {
  try {
    const videoId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Delete video error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync recording
mineRoute.post("/recordings", async (c) => {
  try {
    const body = await c.req.json();

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Sync recording error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete recording
mineRoute.delete("/recordings/:id", async (c) => {
  try {
    const recordingId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Delete recording error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get recording assessment
mineRoute.get("/recordings/:id/assessment", async (c) => {
  try {
    const recordingId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Get recording assessment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync pronunciation assessment
mineRoute.post("/pronunciation_assessments", async (c) => {
  try {
    const body = await c.req.json();

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Sync pronunciation assessment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user stories
mineRoute.get("/stories", async (c) => {
  try {
    const { page = "1" } = c.req.query();

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
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

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Star story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Unstar story
mineRoute.delete("/stories/:id", async (c) => {
  try {
    const storyId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Unstar story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Sync document
mineRoute.post("/documents", async (c) => {
  try {
    const body = await c.req.json();

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Sync document error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete document
mineRoute.delete("/documents/:id", async (c) => {
  try {
    const documentId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Delete document error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user meanings
mineRoute.get("/meanings", async (c) => {
  try {
    const { page = "1", items = "20", source_id, source_type, status } = c.req.query();

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Get user meanings error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default mineRoute;
