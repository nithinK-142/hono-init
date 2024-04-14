import { Hono } from "hono";
import { streamText } from "hono/streaming";

export const streamTextRouter = new Hono<{ Bindings: { app: Hono } }>().get(
  "/streamText",
  (c) => {
    return streamText(c, async (stream) => {
      const words = "Hello world, this is Hono streaming!".split(" ");

      for (const word of words) {
        await stream.write(word + " ");
        await stream.sleep(1000);
      }
    });
  }
);
