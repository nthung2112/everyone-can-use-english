import { Hono } from "hono";
import { db } from "../db/index";
import { postsTable, usersTable } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { extractUserIdFromToken } from "../utils/jwt";

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
    const { content, metadata, target_type, target_id } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      
      const newPost = await db
        .insert(postsTable)
        .values({
          id: crypto.randomUUID(),
          userId,
          content: content || null,
          metadata: metadata ? JSON.stringify(metadata) : null,
          targetType: target_type || null,
          targetId: target_id || null,
          type: metadata?.type || "text",
        })
        .returning();
      
      return c.json(newPost[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
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
    const { content, metadata } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      
      // Verify user owns the post
      const existingPost = await db
        .select()
        .from(postsTable)
        .where(and(eq(postsTable.id, postId), eq(postsTable.userId, userId)))
        .limit(1);

      if (existingPost.length === 0) {
        return c.json({ error: "Post not found or you don't have permission to update it" }, 404);
      }

      const updatedPost = await db
        .update(postsTable)
        .set({
          content: content !== undefined ? content : existingPost[0].content,
          metadata: metadata !== undefined ? JSON.stringify(metadata) : existingPost[0].metadata,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(postsTable.id, postId))
        .returning();

      return c.json(updatedPost[0]);
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Update post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete post
postsRoute.delete("/:id", async (c) => {
  try {
    const postId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      
      // Verify user owns the post
      const existingPost = await db
        .select()
        .from(postsTable)
        .where(and(eq(postsTable.id, postId), eq(postsTable.userId, userId)))
        .limit(1);

      if (existingPost.length === 0) {
        return c.json({ error: "Post not found or you don't have permission to delete it" }, 404);
      }

      await db
        .delete(postsTable)
        .where(eq(postsTable.id, postId));

      return c.json({ message: "Post deleted successfully", id: postId });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Delete post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Like post
postsRoute.post("/:id/like", async (c) => {
  try {
    const postId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      
      // Check if post exists
      const post = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, postId))
        .limit(1);

      if (post.length === 0) {
        return c.json({ error: "Post not found" }, 404);
      }

      // Update likes count
      const updatedPost = await db
        .update(postsTable)
        .set({
          likesCount: (post[0].likesCount || 0) + 1,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(postsTable.id, postId))
        .returning();

      return c.json({ message: "Post liked successfully", post: updatedPost[0] });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Like post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Unlike post
postsRoute.delete("/:id/unlike", async (c) => {
  try {
    const postId = c.req.param("id");

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    try {
      const userId = extractUserIdFromToken(authHeader);
      
      // Check if post exists
      const post = await db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, postId))
        .limit(1);

      if (post.length === 0) {
        return c.json({ error: "Post not found" }, 404);
      }

      // Update likes count (ensure it doesn't go below 0)
      const newLikesCount = Math.max((post[0].likesCount || 0) - 1, 0);
      const updatedPost = await db
        .update(postsTable)
        .set({
          likesCount: newLikesCount,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(postsTable.id, postId))
        .returning();

      return c.json({ message: "Post unliked successfully", post: updatedPost[0] });
    } catch (jwtError) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }
  } catch (error) {
    console.error("Unlike post error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default postsRoute;
