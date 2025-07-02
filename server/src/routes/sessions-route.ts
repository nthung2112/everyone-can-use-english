import { Hono } from "hono";
import { db } from "../db/index";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateJWT } from "../utils/jwt";

// Define user type for authentication
interface UserType {
  id: string;
  name: string;
  email: string;
}

// create common route for authentication and user management
const sessionRouter = new Hono();

// Authentication endpoint - supports multiple providers
sessionRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { provider, code, device_code, phone_number, email, mixin_id } = body;

    // Validate required fields
    if (!provider || !["mixin", "github", "bandu", "email"].includes(provider)) {
      return c.json({ error: "Invalid or missing provider" }, 400);
    }

    // Handle different authentication providers
    let user: UserType | null = null;

    switch (provider) {
      case "email":
        if (!email) {
          return c.json({ error: "Email is required for email authentication" }, 400);
        }
        // Check if user exists or create new one
        const existingUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);
        if (existingUser.length > 0) {
          user = {
            id: existingUser[0].id.toString(),
            name: existingUser[0].name,
            email: existingUser[0].email!,
          };
        } else {
          // Create new user for email auth
          const newUser = await db
            .insert(usersTable)
            .values({
              id: crypto.randomUUID(), // Generate a UUID for the new user
              name: email.split("@")[0], // Use email prefix as default name
              email: email,
            })
            .returning();
          user = {
            id: newUser[0].id.toString(),
            name: newUser[0].name!,
            email: newUser[0].email!,
          };
        }
        break;

      case "github":
        if (!code && !device_code) {
          return c.json(
            { error: "Code or device_code is required for GitHub authentication" },
            400
          );
        }
        // TODO: Implement GitHub OAuth flow
        // For now, return a placeholder response
        return c.json({ message: "GitHub authentication not implemented yet" }, 501);

      case "mixin":
        if (!mixin_id) {
          return c.json({ error: "Mixin ID is required for Mixin authentication" }, 400);
        }
        // TODO: Implement Mixin authentication
        return c.json({ message: "Mixin authentication not implemented yet" }, 501);

      case "bandu":
        // TODO: Implement Bandu authentication
        return c.json({ message: "Bandu authentication not implemented yet" }, 501);

      default:
        return c.json({ error: "Unsupported provider" }, 400);
    }

    if (user) {
      // Generate JWT token
      const token = generateJWT({
        userId: user.id,
        email: user.email,
      });

      return c.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
        tokenType: "Bearer",
        expiresIn: "7d",
      });
    }

    return c.json({ error: "Authentication failed" }, 401);
  } catch (error) {
    console.error("Authentication error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// OAuth state validation
sessionRouter.post("/oauth_state", async (c) => {
  try {
    const body = await c.req.json();
    const { state } = body;

    if (!state) {
      return c.json({ error: "State parameter is required" }, 400);
    }

    // TODO: Implement OAuth state validation logic
    // This should verify the state parameter against stored values
    // and return user information if valid

    return c.json({ message: "OAuth state validation not implemented yet" }, 501);
  } catch (error) {
    console.error("OAuth state validation error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Generate device code for OAuth
sessionRouter.post("/device_code", async (c) => {
  try {
    const body = await c.req.json();
    const { provider = "github" } = body;

    if (!["github", "mixin"].includes(provider)) {
      return c.json({ error: "Unsupported provider for device code" }, 400);
    }

    // TODO: Implement device code generation for OAuth providers
    // This should generate a device code and return the necessary URLs and codes

    // Placeholder response structure
    const deviceCodeResponse = {
      device_code: `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_code: Math.random().toString(36).substr(2, 8).toUpperCase(),
      verification_uri:
        provider === "github" ? "https://github.com/login/device" : "https://mixin.one/device",
      expires_in: 900, // 15 minutes
      interval: 5, // Poll every 5 seconds
    };

    return c.json(deviceCodeResponse);
  } catch (error) {
    console.error("Device code generation error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get current user profile
sessionRouter.get("/api/me", async (c) => {
  try {
    const { userId } = c.get("jwtPayload");

    const user = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        avatar: usersTable.avatar,
        points: usersTable.points,
        balance: usersTable.balance,
        locale: usersTable.locale,
        settings: usersTable.settings,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user[0]);
  } catch (error) {
    console.error("Get current user error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Send login code via phone/email
sessionRouter.post("/login_code", async (c) => {
  try {
    const body = await c.req.json();
    const { phone_number, email, mixin_id } = body;

    if (!phone_number && !email && !mixin_id) {
      return c.json({ error: "Phone number, email, or Mixin ID is required" }, 400);
    }

    // TODO: Implement login code generation and sending
    // This should:
    // 1. Generate a random code
    // 2. Store it temporarily (with expiration)
    // 3. Send via SMS (for phone) or email
    // 4. Return success response

    if (email) {
      // TODO: Send email with login code
      console.log(`Sending login code to email: ${email}`);
    }

    if (phone_number) {
      // TODO: Send SMS with login code
      console.log(`Sending login code to phone: ${phone_number}`);
    }

    if (mixin_id) {
      // TODO: Send Mixin message with login code
      console.log(`Sending login code to Mixin ID: ${mixin_id}`);
    }

    return c.json({ message: "Login code sent successfully" });
  } catch (error) {
    console.error("Send login code error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default sessionRouter;
