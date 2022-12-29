import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const reminderRouter = router({
  createReminder: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        priority: z.string(),
        remindOn: z.date(),
      })
    ) /* Creating a new reminder and connecting it to the user. */
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
});
