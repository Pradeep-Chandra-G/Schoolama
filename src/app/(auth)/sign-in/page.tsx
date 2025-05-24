// app/(auth)/sign-in/page.tsx
"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignInPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Check both publicMetadata and unsafeMetadata for role
      const roleFromPublic = user?.publicMetadata?.role as string;
      const roleFromUnsafe = user?.unsafeMetadata?.role as string;
      const role = roleFromPublic || roleFromUnsafe;
      
      console.log("User publicMetadata:", user?.publicMetadata);
      console.log("User unsafeMetadata:", user?.unsafeMetadata);
      console.log("Detected role:", role);

      if (role) {
        console.log(`Redirecting to /${role}`);
        router.push(`/${role}`);
      } else {
        console.log("No role found, redirecting to home");
        // If no role is set, redirect to a default page or role selection
        router.push("/");
      }
    }
  }, [user, router, isLoaded, isSignedIn]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-2 my-4">
            <Clerk.Connection name="google" className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Clerk.Connection>
            
            <Clerk.Connection name="github" className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </Clerk.Connection>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username or Email
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <div className="flex justify-between items-center my-2">
            <Link
              href="/forgot-password"
              className="text-xs text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
          >
            Sign In
          </SignIn.Action>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </span>
          </div>
        </SignIn.Step>
        
        <SignIn.Step 
          name="choose-strategy"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Use another method</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          
          <SignIn.SupportedStrategy name="email_code" asChild>
            <button className="p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors text-left">
              Email code
            </button>
          </SignIn.SupportedStrategy>
          
          <SignIn.Action navigate="previous" className="text-blue-500 text-sm hover:underline mt-2">
            Go back
          </SignIn.Action>
        </SignIn.Step>
        
        <SignIn.Step 
          name="verifications"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
        >
          <SignIn.Strategy name="email_code">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.png" alt="" width={24} height={24} />
              SchooLama
            </h1>
            <h2 className="text-gray-400">Check your email</h2>
            <Clerk.GlobalError className="text-sm text-red-400" />
            
            <p className="text-sm text-gray-600 mb-4">
              We sent a verification code to your email address.
            </p>
            
            <Clerk.Field name="code" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Email code
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter verification code"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            
            <SignIn.Action
              submit
              className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
            >
              Continue
            </SignIn.Action>
            
            <SignIn.Action
              resend
              className="text-blue-500 text-sm hover:underline"
              fallback={({ resendableAfter }) => (
                <span className="text-sm text-gray-500">
                  Resend code in {resendableAfter} seconds
                </span>
              )}
            >
              Resend code
            </SignIn.Action>
          </SignIn.Strategy>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default SignInPage;
