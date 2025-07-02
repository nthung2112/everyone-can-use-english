import { Hono } from "hono";
import { db } from "../db/index";
import { lookupsTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

const lookupsRoute = new Hono();

// Create lookup
lookupsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { word, context, source_id, source_type, native_language } = body;

    if (!word || !context) {
      return c.json({ error: "Word and context are required" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      const newLookup = await db
        .insert(lookupsTable)
        .values({
          id: crypto.randomUUID(),
          userId,
          word,
          context,
          sourceId: source_id,
          sourceType: source_type,
          nativeLanguage: native_language || "zh-CN",
        })
        .returning();

      return c.json(newLookup[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
    // return c.json(newLookup[0]);
  } catch (error) {
    console.error("Create lookup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update lookup
lookupsRoute.put("/:id", async (c) => {
  try {
    const lookupId = c.req.param("id");
    const body = await c.req.json();
    const { meaning, source_id, source_type } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      // Update lookup
      const updatedLookup = await db
        .update(lookupsTable)
        .set({
          sourceId: source_id,
          sourceType: source_type,
        })
        .where(and(eq(lookupsTable.id, lookupId), eq(lookupsTable.userId, userId)))
        .returning();

      if (updatedLookup.length === 0) {
        return c.json({ error: "Lookup not found or access denied" }, 404);
      }

      return c.json(updatedLookup[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Update lookup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Batch lookup
lookupsRoute.post("/batch", async (c) => {
  try {
    const body = await c.req.json();
    const { lookups } = body;

    if (!Array.isArray(lookups) || lookups.length === 0) {
      return c.json({ error: "Lookups array is required" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      // Process batch lookups
      let successCount = 0;
      const errors: string[] = [];

      for (const lookup of lookups) {
        try {
          await db.insert(lookupsTable).values({
            id: crypto.randomUUID(),
            userId,
            word: lookup.word,
            context: lookup.context,
            sourceId: lookup.source_id,
            sourceType: lookup.source_type,
          });
          successCount++;
        } catch (error) {
          errors.push(`Failed to create lookup for word: ${lookup.word}`);
        }
      }

      return c.json({
        successCount,
        errors,
        total: lookups.length,
      });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Batch lookup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default lookupsRoute;
