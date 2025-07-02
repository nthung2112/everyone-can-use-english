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

// Get configuration
commonRoute.get("/api/config", async (c) => {
  try {
    // Return basic app configuration
    const config = {
      version: "1.0.0",
      features: {
        speechToText: true,
        translation: true,
        courses: true,
        chat: true,
        payments: true,
      },
      limits: {
        maxFileSize: 50 * 1024 * 1024, // 50MB
        maxTranscriptionLength: 3600, // 1 hour
        maxChatMessages: 100,
      },
      supportedLanguages: ["en", "zh-CN", "es", "fr", "de", "ja", "ko"],
      speechRegions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
    };

    return c.json(config);
  } catch (error) {
    console.error("Get config error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Add OAuth state endpoint for authentication flow
commonRoute.get("/api/oauth/state", async (c) => {
  try {
    const { provider } = c.req.query();

    if (!provider || !["github", "google", "microsoft"].includes(provider)) {
      return c.json({ error: "Invalid provider" }, 400);
    }

    // Generate OAuth state token
    const state = crypto.randomUUID();

    // TODO: Store state in cache/database for validation
    // For now, just return the state
    return c.json({ state, provider });
  } catch (error) {
    console.error("OAuth state error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Device code endpoint for device flow authentication
commonRoute.post("/api/device/code", async (c) => {
  try {
    const body = await c.req.json();
    const { client_id } = body;

    if (!client_id) {
      return c.json({ error: "Client ID is required" }, 400);
    }

    // Generate device code and user code
    const deviceCode = crypto.randomUUID();
    const userCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // TODO: Store codes in cache/database with expiration
    return c.json({
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: "https://example.com/device",
      verification_uri_complete: `https://example.com/device?user_code=${userCode}`,
      expires_in: 1800, // 30 minutes
      interval: 5, // Poll every 5 seconds
    });
  } catch (error) {
    console.error("Device code error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Send login code via phone/email
commonRoute.post("/api/login/code", async (c) => {
  try {
    const body = await c.req.json();
    const { phone_number, email } = body;

    if (!phone_number && !email) {
      return c.json({ error: "Phone number or email is required" }, 400);
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: Send code via SMS or email service
    // TODO: Store code in cache/database with expiration

    console.log(`Verification code for ${phone_number || email}: ${code}`);

    return c.json({
      message: "Verification code sent",
      expires_in: 300, // 5 minutes
    });
  } catch (error) {
    console.error("Send login code error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default commonRoute;
