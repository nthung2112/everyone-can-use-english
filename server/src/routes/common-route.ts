import { Hono } from "hono";
import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

// create common route for authentication and user management
const commonRoute = new Hono();

commonRoute.get("/", (c) => {
  return c.text("Hello Hono!");
});

commonRoute.get("/up", async (c) => {
  return c.json({ message: "Server is up and running" });
});

// Get current user profile
commonRoute.get("/api/me", async (c) => {
  try {
    // TODO: Extract user ID from JWT token or session
    // For now, we'll use a placeholder approach

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    // TODO: Decode JWT token to get user ID
    // For now, return error since JWT implementation is needed
    return c.json({ error: "JWT token validation not implemented yet" }, 501);

    // When JWT is implemented, the code would look like:
    // const token = authHeader.substring(7);
    // const decoded = verifyJWT(token);
    // const userId = decoded.userId;
    //
    // const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    // if (user.length === 0) {
    //   return c.json({ error: "User not found" }, 404);
    // }
    // return c.json(user[0]);
  } catch (error) {
    console.error("Get current user error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default commonRoute;
