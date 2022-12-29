import { router, t } from "../trpc";
import { authRouter } from "./auth";
import { reminderRouter } from "./reminders";

export const appRouter = t.router({
  reminder: reminderRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
