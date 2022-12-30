import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const reminderRouter = router({
  /* Creating a new reminder and connecting it to the user. */
  createReminder: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        priority: z.string(),
        remindOn: z.date(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      console.log(session);
      try {
        const reminder = await prisma.reminder.create({
          data: {
            ...input,
            user: {
              connect: {
                id: session.user?.id,
              },
            },
          },
        });
        return reminder;
      } catch (error: any) {
        throw new Error(error);
      }
    }),

  /* A query that is returning all the reminders that are connected to the user. */
  getReminders: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      return await prisma.reminder.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  ),

  /* A query that is returning a single reminder based on the id. */
  getSingleReminder: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.reminder.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  /* Deleting a reminder based on the id. */
  deleteReminder: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      await prisma.reminder.delete({
        where: {
          id: input.id,
        },
      });
    }),

  /* Updating the reminder based on the id. */
  updateReminder: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        title: z.string(),
        description: z.string(),
        priority: z.string(),
        remindOn: z.date(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const reminder = await prisma.reminder.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return reminder;
    }),
});
