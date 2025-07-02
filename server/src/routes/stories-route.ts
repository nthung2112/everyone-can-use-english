import { Hono } from "hono";
import { db } from "../db/index";
import { storiesTable, usersTable } from "../db/schema";
import { eq, desc } from "drizzle-orm";

const storiesRoute = new Hono();

// Get stories
storiesRoute.get("/", async (c) => {
  try {
    const { page = "1" } = c.req.query();
    const offset = (parseInt(page) - 1) * 20;
    const limit = 20;

    const stories = await db
      .select({
        id: storiesTable.id,
        title: storiesTable.title,
        content: storiesTable.content,
        language: storiesTable.language,
        level: storiesTable.level,
        genre: storiesTable.genre,
        tags: storiesTable.tags,
        audioUrl: storiesTable.audioUrl,
        imageUrl: storiesTable.imageUrl,
        metadata: storiesTable.metadata,
        published: storiesTable.published,
        createdAt: storiesTable.createdAt,
        updatedAt: storiesTable.updatedAt,
        authorName: usersTable.name,
      })
      .from(storiesTable)
      .leftJoin(usersTable, eq(storiesTable.userId, usersTable.id))
      .orderBy(desc(storiesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({
      stories,
      pagination: {
        page: parseInt(page),
        items: 20,
        hasNext: stories.length === limit,
      },
    });
  } catch (error) {
    console.error("Get stories error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific story
storiesRoute.get("/:id", async (c) => {
  try {
    const storyId = c.req.param("id");

    const story = await db
      .select({
        id: storiesTable.id,
        title: storiesTable.title,
        content: storiesTable.content,
        language: storiesTable.language,
        level: storiesTable.level,
        genre: storiesTable.genre,
        tags: storiesTable.tags,
        audioUrl: storiesTable.audioUrl,
        imageUrl: storiesTable.imageUrl,
        metadata: storiesTable.metadata,
        published: storiesTable.published,
        createdAt: storiesTable.createdAt,
        updatedAt: storiesTable.updatedAt,
        authorName: usersTable.name,
      })
      .from(storiesTable)
      .leftJoin(usersTable, eq(storiesTable.userId, usersTable.id))
      .where(eq(storiesTable.id, storyId))
      .limit(1);

    if (story.length === 0) {
      return c.json({ error: "Story not found" }, 404);
    }

    return c.json(story[0]);
  } catch (error) {
    console.error("Get story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create story
storiesRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, summary, language, level, words_count, metadata } = body;

    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");
    const newStory = await db
      .insert(storiesTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        title,
        content,
        language: language || "en",
        level: level || "intermediate",
        metadata: metadata ? JSON.stringify(metadata) : null,
      })
      .returning();
    return c.json(newStory[0]);
  } catch (error) {
    console.error("Create story error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Extract vocabulary from story
storiesRoute.post("/:id/extract_vocabulary", async (c) => {
  try {
    const storyId = c.req.param("id");
    const body = await c.req.json();
    const { extraction } = body;

    // Extract vocabulary logic would go here
    // This would typically involve NLP processing of the story content
    // For now, return a placeholder response
    return c.json(["example", "vocabulary", "words"]);
  } catch (error) {
    console.error("Extract vocabulary error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get story meanings
storiesRoute.get("/:id/meanings", async (c) => {
  try {
    const storyId = c.req.param("id");
    const { page = "1", items = "20" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    // Get meanings related to this story
    // For now, return a placeholder response since meaningsTable isn't imported
    return c.json({
      meanings: [],
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: false,
      },
    });
  } catch (error) {
    console.error("Get story meanings error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default storiesRoute;
