import { Layout } from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ReminderPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, error } = trpc.reminder.getSingleReminder.useQuery({
    id,
  });
  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>;
  }
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>;
  }
  return (
    <div>
      <Layout title="Reminder Details">
        <p className="mb-3 text-xl font-bold text-blue-600">{data?.title}</p>
        <p>{data?.description}</p>
        <p className="my-1 text-sm">
          Created On: {data && new Date(data.createdAt).toDateString()}
        </p>
        <p className="my-1 text-sm">
          Updated On: {data && new Date(data.updatedAt).toDateString()}
        </p>
        <Link href={`/`}>
          <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
        </Link>
      </Layout>
    </div>
  );
};

export default ReminderPage;

/* The getServerSideProps method also works... was just too lazy to figure out how to return serialized dates */

// export const getServerSideProps = async ({
//   params,
//   req,
//   res,
// }: GetServerSidePropsContext) => {
//   try {
//     const id = params?.id as string;

//     const session = (await unstable_getServerSession(
//       req,
//       res,
//       authOptions
//     )) as any;

//     const [data] = await Promise.all([
//       prisma.reminder.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           createdAt: true,
//           description: true,
//           title: true,
//           updatedAt: true,
//           id: true,
//           priority: true,
//           remindOn: true,
//           user: true,
//         },
//       }),
//     ]);

//     return {
//       props: {
//         session,
//         data: {
//           ...data,
//         },
//       },
//     };
//   } catch (error) {
//     return { props: {}, notFound: true };
//   }
// };
