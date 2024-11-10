import { Hono } from "hono";

import { validateRequest } from "@/lib/auth/validate-request";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      customerId: z.string().optional(),
    })
  ),
  async (c) => {
    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const flaskStreamUrl = "http://127.0.0.1:5000/stream";

    const response = await fetch(flaskStreamUrl);

    // Proxy response directly from Flask
    return c.newResponse(response.body, {
      headers: { "Content-Type": "multipart/x-mixed-replace; boundary=frame" },
    });
  }
);

export default app;
