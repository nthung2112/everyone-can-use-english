import { Hono } from "hono";
import { db } from "../db/index";
import { segmentsTable } from "../db/schema";
import { eq, and } from "drizzle-orm";

const segmentsRoute = new Hono();

// Get segments
segmentsRoute.get("/", async (c) => {
  try {
    const { page = "1", segment_index, target_id, target_type } = c.req.query();
    const offset = (parseInt(page) - 1) * 20;
    const limit = 20;

    const whereConditions = [];
    if (segment_index) {
      whereConditions.push(eq(segmentsTable.segmentIndex, parseInt(segment_index)));
    }
    if (target_id) {
      whereConditions.push(eq(segmentsTable.targetId, target_id));
    }
    if (target_type) {
      whereConditions.push(eq(segmentsTable.targetType, target_type));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const segments = await db
      .select()
      .from(segmentsTable)
      .where(whereClause)
      .orderBy(segmentsTable.segmentIndex)
      .limit(limit)
      .offset(offset);

    return c.json({
      segments,
      pagination: {
        page: parseInt(page),
        items: 20,
        hasNext: segments.length === limit,
      },
    });
  } catch (error) {
    console.error("Get segments error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create/sync segment
segmentsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const {
      target_id,
      target_type,
      segment_index,
      start_time,
      end_time,
      text,
      translation,
      metadata,
    } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const newSegment = await db
      .insert(segmentsTable)
      .values({
        id: crypto.randomUUID(),
        targetId: target_id,
        targetType: target_type,
        segmentIndex: segment_index,
        startTime: start_time,
        endTime: end_time,
        text,
        translation,
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();
    return c.json(newSegment[0]);
  } catch (error) {
    console.error("Create segment error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default segmentsRoute;
