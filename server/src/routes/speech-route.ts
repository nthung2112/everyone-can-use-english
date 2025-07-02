import { Hono } from "hono";
import { db } from "../db/index";
import { speechTokensTable } from "../db/schema";
import { eq } from "drizzle-orm";

const speechRoute = new Hono();

// Generate speech token
speechRoute.post("/tokens", async (c) => {
  try {
    const body = await c.req.json();
    const { purpose, target_type, target_id, input } = body;

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const newToken = await db
    //   .insert(speechTokensTable)
    //   .values({
    //     id: Math.floor(Math.random() * 1000000), // Generate random ID
    //     userId,
    //     purpose: purpose || "speech",
    //     targetType: target_type,
    //     targetId: target_id,
    //     input,
    //     token: crypto.randomUUID(),
    //     region: "us-east-1", // Default region
    //     state: "active",
    //   })
    //   .returning();
    // return c.json({
    //   id: newToken[0].id,
    //   token: newToken[0].token,
    //   region: newToken[0].region,
    // });
  } catch (error) {
    console.error("Generate speech token error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update speech token state
speechRoute.put("/tokens/:id", async (c) => {
  try {
    const tokenId = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const { state } = body;

    if (!["consumed", "revoked"].includes(state)) {
      return c.json({ error: "Invalid state. Must be 'consumed' or 'revoked'" }, 400);
    }

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented:
    // const userId = extractUserIdFromToken(authHeader);
    // const updatedToken = await db
    //   .update(speechTokensTable)
    //   .set({ state })
    //   .where(and(eq(speechTokensTable.id, tokenId), eq(speechTokensTable.userId, userId)))
    //   .returning();
    //
    // if (updatedToken.length === 0) {
    //   return c.json({ error: "Token not found or access denied" }, 404);
    // }
    //
    // return c.json(updatedToken[0]);
  } catch (error) {
    console.error("Update speech token error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default speechRoute;
