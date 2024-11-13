import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "./auth";
import controller from "./controller";
import customers from "./customers";
import deviceBrands from "./deviceBrands";
import devices from "./devices";
import deviceTypes from "./deviceTypes";
import groups from "./groups";
import locations from "./locations";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/customers", customers)
  .route("/controller", controller)
  .route("/devices", devices)
  .route("/deviceBrands", deviceBrands)
  .route("/deviceTypes", deviceTypes)
  .route("/locations", locations)
  .route("/groups", groups);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
