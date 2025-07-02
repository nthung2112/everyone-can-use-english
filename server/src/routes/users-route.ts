import { Hono } from "hono";
import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

// create common route for authentication and user management
const usersRoute = new Hono();

// Update user profile
usersRoute.put("/:id", async (c) => {
  try {
    const userId = c.req.param("id");
    const body = await c.req.json();
    const { name, email, code } = body;

    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }

    // TODO: Verify that the requesting user has permission to update this profile
    // This should check JWT token and ensure user can only update their own profile

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) {
      // Verify email ownership with code if provided
      if (code) {
        // TODO: Implement email verification logic
        // For now, we'll accept the email change
      }
      updateData.email = email;
    }

    if (Object.keys(updateData).length === 0) {
      return c.json({ error: "No valid fields to update" }, 400);
    }

    const updatedUser = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, parseInt(userId)))
      .returning();

    if (updatedUser.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(updatedUser[0]);
  } catch (error) {
    console.error("Update profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// export users route
export default usersRoute;
