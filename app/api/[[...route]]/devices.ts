import { Hono } from "hono";

import { createDevice, updateDevice } from "@/lib/apiSchema";
import { validateRequest } from "@/lib/auth/validate-request";
import prisma from "@/lib/prisma";
import { notifyRaspberryPi } from "@/lib/rabbitmq";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { Device } from "@prisma/client";
import { z } from "zod";

const sendUpdateConfigMessage = async (groupId: string | null | undefined) => {
  if (groupId) {
    const groupDevices = await prisma.group.findFirst({
      where: { id: groupId },
      include: { devices: true },
    });

    let controller: Device | undefined;
    let nvr: Device | undefined = undefined;
    const cctv: Device[] = [];
    const detectors: Device[] = [];

    if (groupDevices) {
      groupDevices.devices.forEach((device) => {
        switch (device.deviceType) {
          case "Controller":
            controller = device;
          case "CCTV_Camera":
            cctv.push(device);
            break;
          case "Detector":
            detectors.push(device);
            break;
          case "NVR":
            nvr = device;
        }
      });
    }

    const devices = {
      controller: controller,
      nvr: nvr,
      cctv: cctv,
      detectors: detectors,
    };

    if (controller?.mac) {
      await notifyRaspberryPi(
        controller.mac,
        "update-configuration",
        JSON.stringify(devices)
      );
    }
  }
};

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        locationId: z.string().optional(),
      })
    ),
    async (c) => {
      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { locationId } = c.req.valid("query");

      const data = await prisma.device.findMany({
        where: {
          locationId: locationId ? locationId : undefined,
        },
      });

      return c.json(data);
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.device.findUnique({
        where: { id: id },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  )
  .post("/", zValidator("json", createDevice), async (c) => {
    const values = c.req.valid("json");

    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await prisma.device.create({
      data: {
        ...values,
        id: createId(),
      },
    });

    sendUpdateConfigMessage(values.groupId);

    return c.json(data);
  })
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator("json", updateDevice),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.device.update({
        where: { id: id },
        data: { ...values },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      sendUpdateConfigMessage(values.groupId);

      return c.json(data);
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.device.delete({
        where: { id: id },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      sendUpdateConfigMessage(data.groupId);

      return c.json(data);
    }
  );

export default app;
