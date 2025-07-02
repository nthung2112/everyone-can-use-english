import { Hono } from "hono";
import { db } from "../db/index";
import { notesTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

const notesRoute = new Hono();

// Create/sync note
notesRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { segment_id, content, metadata } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      const newNote = await db
        .insert(notesTable)
        .values({
          id: crypto.randomUUID(),
          userId,
          segmentId: segment_id,
          content,
          metadata: metadata ? JSON.stringify(metadata) : null,
        })
        .returning();
      return c.json(newNote[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Create note error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete note
notesRoute.delete("/:id", async (c) => {
  try {
    const noteId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      const deletedNote = await db
        .delete(notesTable)
        .where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
        .returning();

      if (deletedNote.length === 0) {
        return c.json({ error: "Note not found or access denied" }, 404);
      }

      return c.json({ message: "Note deleted successfully" });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Delete note error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default notesRoute;
