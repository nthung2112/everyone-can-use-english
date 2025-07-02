import { Hono } from "hono";
import { db } from "../db/index";
import { postsTable, postLikesTable, usersTable } from "../db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

const postsRoute = new Hono();

// Get posts with various filters
postsRoute.get("/", async (c) => {
  try {
    const { page = "1", items = "20", userId, type = "all", by = "all" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    // Build where conditions
    const whereConditions = [];
    if (userId) {
      whereConditions.push(eq(postsTable.userId, userId));
    }
    if (type !== "all") {
      whereConditions.push(eq(postsTable.type, type));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const posts = await db
      .select({
        id: postsTable.id,
        userId: postsTable.userId,
        content: postsTable.content,
        type: postsTable.type,
        metadata: postsTable.metadata,
        targetType: postsTable.targetType,
        targetId: postsTable.targetId,
        likesCount: postsTable.likesCount,
        commentsCount: postsTable.commentsCount,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        userName: usersTable.name,
        userAvatar: usersTable.avatar,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .where(whereClause)
      .orderBy(desc(postsTable.createdAt))
      .limit(limit)
      .offset(offset);

    // TODO: Handle "by" filter for following users when user authentication is implemented

    return c.json({
      posts,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: posts.length === limit,
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get specific post by ID
postsRoute.get("/:id", async (c) => {
  try {
    const postId = c.req.param("id");

    const post = await db
      .select({
        id: postsTable.id,
        userId: postsTable.userId,
        content: postsTable.content,
        type: postsTable.type,
        metadata: postsTable.metadata,
        targetType: postsTable.targetType,
        targetId: postsTable.targetId,
        likesCount: postsTable.likesCount,
        commentsCount: postsTable.commentsCount,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        userName: usersTable.name,
        userAvatar: usersTable.avatar,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .where(eq(postsTable.id, postId))
      .limit(1);

    if (post.length === 0) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post[0]);
  } catch (error) {
    console.error("Get post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create new post
postsRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { metadata, target_type, target_id } = body;

    // TODO: Extract user ID from JWT token
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    // For now, return error since JWT implementation is needed
    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const newPost = await db
    //   .insert(postsTable)
    //   .values({
    //     id: crypto.randomUUID(),
    //     userId,
    //     metadata: metadata ? JSON.stringify(metadata) : null,
    //     targetType: target_type,
    //     targetId: target_id,
    //     type: metadata?.type || "text",
    //   })
    //   .returning();
    // return c.json(newPost[0]);
  } catch (error) {
    console.error("Create post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update post
postsRoute.put("/:id", async (c) => {
  try {
    const postId = c.req.param("id");
    const body = await c.req.json();
    const { content } = body;

    // TODO: Verify user owns the post
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Update post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete post
postsRoute.delete("/:id", async (c) => {
  try {
    const postId = c.req.param("id");

    // TODO: Verify user owns the post
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Delete post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Like post
postsRoute.post("/:id/like", async (c) => {
  try {
    const postId = c.req.param("id");

    // TODO: Extract user ID from JWT token
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Like post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Unlike post
postsRoute.delete("/:id/unlike", async (c) => {
  try {
    const postId = c.req.param("id");

    // TODO: Extract user ID from JWT token
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);
  } catch (error) {
    console.error("Unlike post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default postsRoute;
