import { Hono } from "hono";
import { db } from "../db/index";
import {
  transcriptionsTable,
  audiosTable,
  videosTable,
  segmentsTable,
  notesTable,
} from "../db/schema";
import { eq, and, desc } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

const transcriptionsRoute = new Hono();

// Get transcriptions
transcriptionsRoute.get("/", async (c) => {
  try {
    const { page = "1", items = "20", target_id, target_type, target_md5 } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const whereConditions = [];
    if (target_id) {
      whereConditions.push(eq(transcriptionsTable.targetId, target_id));
    }
    if (target_type) {
      whereConditions.push(eq(transcriptionsTable.targetType, target_type));
    }
    if (target_md5) {
      whereConditions.push(eq(transcriptionsTable.targetMd5, target_md5));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const transcriptions = await db
      .select()
      .from(transcriptionsTable)
      .where(whereClause)
      .orderBy(desc(transcriptionsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      transcriptions,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: transcriptions.length === limit,
      },
    });
  } catch (error) {
    console.error("Get transcriptions error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create/sync transcription
transcriptionsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { target_id, target_type, target_md5, content, language, engine, status, result } = body;

    // TODO: Extract user ID from JWT token
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      const newTranscription = await db
        .insert(transcriptionsTable)
        .values({
          id: crypto.randomUUID(),
          userId,
          targetId: target_id,
          targetType: target_type,
          targetMd5: target_md5,
          content,
          language,
          engine,
          status: status || "pending",
          result: result ? JSON.stringify(result) : null,
        })
        .returning();
      return c.json(newTranscription[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Create transcription error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default transcriptionsRoute;
