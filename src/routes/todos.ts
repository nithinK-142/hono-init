import { Hono } from "hono";
import { streamText } from "hono/streaming";
import TodoModel from "../models/todo";

export const todosRouter = new Hono<{ Bindings: { app: Hono } }>().get(
  "/",
  async (c) => {
    const isCompletedParam = c.req.query("isCompleted");
    const isCompleted = isCompletedParam === "true";

    return streamText(c, async (stream) => {
      try {
        const todos = await TodoModel.find(
          isCompletedParam !== undefined ? { isCompleted } : {},
          { task: 1, _id: 0 }
        );

        for (const { task } of todos) {
          await stream.writeln(task);
          await stream.sleep(1000);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    });
  }
);
