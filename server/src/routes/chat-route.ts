import { Hono } from "hono";
import { db } from "../db/index";
import { llmChatsTable, llmMessagesTable } from "../db/schema";
import { eq, and } from "drizzle-orm";

const chatRoute = new Hono();

// Create LLM chat session
chatRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { type, topic, config } = body;

    const { userId } = c.get("jwtPayload");
    const newChat = await db
      .insert(llmChatsTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        agentId: "default",
        agentType: type || "general",
        title: topic,
        metadata: config ? JSON.stringify(config) : null,
      })
      .returning();
    return c.json(newChat[0]);
  } catch (error) {
    console.error("Create LLM chat error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get LLM chat
chatRoute.get("/:id", async (c) => {
  try {
    const chatId = c.req.param("id");

    const { userId } = c.get("jwtPayload");

    const chat = await db
      .select()
      .from(llmChatsTable)
      .where(and(eq(llmChatsTable.id, chatId), eq(llmChatsTable.userId, userId)))
      .limit(1);

    if (chat.length === 0) {
      return c.json({ error: "Chat not found or access denied" }, 404);
    }

    return c.json(chat[0]);
  } catch (error) {
    console.error("Get LLM chat error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create LLM message
chatRoute.post("/:id/messages", async (c) => {
  try {
    const chatId = c.req.param("id");
    const body = await c.req.json();
    const { content, role } = body;

    if (!content || !role) {
      return c.json({ error: "Content and role are required" }, 400);
    }

    const { userId } = c.get("jwtPayload");

    // Verify chat belongs to user
    const chat = await db
      .select()
      .from(llmChatsTable)
      .where(and(eq(llmChatsTable.id, chatId), eq(llmChatsTable.userId, userId)))
      .limit(1);

    if (chat.length === 0) {
      return c.json({ error: "Chat not found or access denied" }, 404);
    }

    const newMessage = await db
      .insert(llmMessagesTable)
      .values({
        id: crypto.randomUUID(),
        chatId,
        role,
        content,
      })
      .returning();

    return c.json(newMessage[0]);
  } catch (error) {
    console.error("Create LLM message error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get chat messages
chatRoute.get("/:id/messages", async (c) => {
  try {
    const chatId = c.req.param("id");
    const { page = "1", items = "50" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(items);
    const limit = parseInt(items);

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const { userId } = c.get("jwtPayload");

    // Verify chat belongs to user
    const chat = await db
      .select()
      .from(llmChatsTable)
      .where(and(eq(llmChatsTable.id, chatId), eq(llmChatsTable.userId, userId)))
      .limit(1);

    if (chat.length === 0) {
      return c.json({ error: "Chat not found or access denied" }, 404);
    }

    const messages = await db
      .select()
      .from(llmMessagesTable)
      .where(eq(llmMessagesTable.chatId, chatId))
      .orderBy(llmMessagesTable.createdAt)
      .limit(limit)
      .offset(offset);

    return c.json({
      messages,
      pagination: {
        page: parseInt(page),
        items: parseInt(items),
        hasNext: messages.length === limit,
      },
    });
  } catch (error) {
    console.error("Get chat messages error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default chatRoute;
