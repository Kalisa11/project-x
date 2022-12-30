import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BsDiscord } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

// import Navbar from "@/components/Layout/Navbar";
// import Meta from "@/components/Shared/Meta";

import { authOptions } from "./api/auth/[...nextauth]";

const SignIn: NextPage = () => {
  const router = useRouter();
  const error = router.query.error as string;

  useEffect(() => {
    if (error) {
      const errors: { [key: string]: string } = {
        Signin: "Try signing with a different account",
        OAuthSignin: "Try signing with a different account",
        OAuthCallback: "Try signing with a different account",
        OAuthCreateAccount: "Try signing with a different account",
        EmailCreateAccount: "Try signing with a different account",
        Callback: "Try signing with a different account",
        OAuthAccountNotLinked: "Email is connected with another provider",
        EmailSignin: "Check your email address",
        CredentialsSignin: "Sign in failed. The credentials are incorrect",
      };

      toast.error(error || "Unable to sign in", {
        position: "bottom-right",
      });
    }
  }, [error]);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" }).catch((err) => {
      console.log(err);
      toast.error(`Unable to sign in with ${provider}`, {
        position: "bottom-right",
      });
    });
  };

  return (
    <>
      {/* <Meta title="Log in | TopTop" description="Log in" image="/favicon.png" /> */}
      <div className="flex min-h-screen flex-col items-stretch">
        {/* <Navbar /> */}
        <div className="flex flex-grow flex-col items-center justify-center gap-3">
          <h1 className="text-center text-3xl font-semibold">
            Log in to Project X
          </h1>
          <p className="w-[95vw] max-w-[375px] text-center text-sm text-gray-500">
            Manage your account, check notifications, interact with fellow
            users, and more.
          </p>
          <button
            onClick={() => handleSignIn("google")}
            className="relative flex h-11 w-[95vw] max-w-[375px] items-center justify-center border border-gray-200 transition hover:border-gray-400"
          >
            <span>Continue with Google</span>
            <FcGoogle className="absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />
          </button>
          <button
            onClick={() => handleSignIn("facebook")}
            className="relative flex h-11 w-[95vw] max-w-[375px] items-center justify-center border border-gray-200 transition hover:border-gray-400"
          >
            <span>Continue with Discord</span>
            <BsDiscord className="absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2 fill-[#220ca0]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
};
