import { serve } from "@hono/node-server";
import { Hono } from "hono";
import usersRoute from "./routes/users-route";
import sessionRouter from "./routes/sessions-route";
import commonRoute from "./routes/common-route";
import postsRoute from "./routes/posts-route";
import transcriptionsRoute from "./routes/transcriptions-route";
import mineRoute from "./routes/mine-route";
import speechRoute from "./routes/speech-route";
import lookupsRoute from "./routes/lookups-route";
import storiesRoute from "./routes/stories-route";
import coursesRoute from "./routes/courses-route";
import enrollmentsRoute from "./routes/enrollments-route";
import chatRoute from "./routes/chat-route";
import paymentsRoute from "./routes/payments-route";
import segmentsRoute from "./routes/segments-route";
import notesRoute from "./routes/notes-route";
import translationsRoute from "./routes/translations-route";

const app = new Hono();

// Add common route
app.route("/", commonRoute);

// Authentication routes
app.route("/api/sessions", sessionRouter);

// User-related routes
app.route("/api/users", usersRoute);

// Content routes
app.route("/api/posts", postsRoute);
app.route("/api/transcriptions", transcriptionsRoute);
app.route("/api/stories", storiesRoute);

// Learning routes
app.route("/api/courses", coursesRoute);
app.route("/api/enrollments", enrollmentsRoute);
app.route("/api/lookups", lookupsRoute);
app.route("/api/translations", translationsRoute);

// AI/Chat routes
app.route("/api/chats", chatRoute);

// Media routes
app.route("/api/segments", segmentsRoute);
app.route("/api/notes", notesRoute);

// Speech routes
app.route("/api/speech", speechRoute);

// User data routes
app.route("/api/mine", mineRoute);

// Payment routes
app.route("/api/payments", paymentsRoute);

// set port
const port = process.env.PORT ? Number(process.env.PORT) : 9000;
console.log(`Server is running on http://localhost:${port}`);

// serve app
serve({
  fetch: app.fetch,
  port,
});
