// // app/(auth)/sign-up/page.tsx
// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignUp from "@clerk/elements/sign-up";
// import { useUser, useSignUp } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";


// const SignUpPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();
//   const [selectedRole, setSelectedRole] = useState("student");
//   const pathname = usePathname();
//   const [metadataUpdated, setMetadataUpdated] = useState(false);
//   // const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn || !user) return;
//     if (metadataUpdated) return;

//     const currentRole = user.publicMetadata.role;
//     console.log(user);
//     // const userId = user.userId;
//     // const response = await clerkClient.users.updateUserMetadata(userId, {
//     //   publicMetadata: {
//     //     example: 'metadata',
//     //   },
//     // });


//     if (currentRole !== selectedRole) {
//       user
//         .update({
//           unsafeMetadata: { role: selectedRole },
//         })
//         .then(() => {
//           console.log("User metadata updated successfully");
//           setMetadataUpdated(true);
//           router.push(`/${selectedRole}`);
//         })
//         .catch((error) => {
//           console.error("Failed to update user metadata:", error);
//         });
//     } else {
//       setMetadataUpdated(true);
//       if (pathname !== `/${selectedRole}`) {
//         router.push(`/${selectedRole}`);
//       }
//     }
//   }, [isLoaded, isSignedIn, user, selectedRole, router, pathname, metadataUpdated]);


//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       <SignUp.Root>
//         <SignUp.Step
//           name="start"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96 max-h-[90vh] overflow-y-auto"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="" width={24} height={24} />
//             SchooLama
//           </h1>
//           <h2 className="text-gray-400">Create your account</h2>
//           <Clerk.GlobalError className="text-sm text-red-400" />

//           {/* Social Sign Up Buttons */}
//           <div className="flex flex-col gap-2 my-4">
//             <Clerk.Connection name="google" className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               Continue with Google
//             </Clerk.Connection>

//             <Clerk.Connection name="github" className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               Continue with GitHub
//             </Clerk.Connection>
//           </div>

//           <div className="flex items-center gap-2 my-2">
//             <div className="flex-1 h-px bg-gray-300"></div>
//             <span className="text-xs text-gray-500">or</span>
//             <div className="flex-1 h-px bg-gray-300"></div>
//           </div>

//           {/* Role Selection */}
//           <div className="flex flex-col gap-2 mb-4">
//             <label className="text-xs text-gray-500">Select your role</label>
//             <div className="grid grid-cols-3 gap-2">
//               {["student", "teacher", "parent"].map((role) => (
//                 <button
//                   key={role}
//                   type="button"
//                   onClick={() => setSelectedRole(role)}
//                   className={`p-2 text-xs rounded-md border transition-colors ${
//                     selectedRole === role
//                       ? "bg-blue-500 text-white border-blue-500"
//                       : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
//                   }`}
//                 >
//                   {role.charAt(0).toUpperCase() + role.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <Clerk.Field name="firstName" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               First Name
//             </Clerk.Label>
//             <Clerk.Input
//               type="text"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <Clerk.Field name="lastName" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Last Name
//             </Clerk.Label>
//             <Clerk.Input
//               type="text"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Email Address
//             </Clerk.Label>
//             <Clerk.Input
//               type="email"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <Clerk.Field name="password" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Password
//             </Clerk.Label>
//             <Clerk.Input
//               type="password"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <SignUp.Action
//             submit
//             className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//           >
//             Create Account
//           </SignUp.Action>

//           <div className="text-center mt-4">
//             <span className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/sign-in"
//                 className="text-blue-500 hover:underline font-medium"
//               >
//                 Sign in
//               </Link>
//             </span>
//           </div>
//         </SignUp.Step>

//         <SignUp.Step
//           name="continue"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="" width={24} height={24} />
//             SchooLama
//           </h1>
//           <h2 className="text-gray-400">Continue registration</h2>
//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <Clerk.Field name="username" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Username
//             </Clerk.Label>
//             <Clerk.Input
//               type="text"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <SignUp.Action
//             submit
//             className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//           >
//             Continue
//           </SignUp.Action>
//         </SignUp.Step>

//         <SignUp.Step
//           name="verifications"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="" width={24} height={24} />
//             SchooLama
//           </h1>
//           <h2 className="text-gray-400">Verify your email</h2>
//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <SignUp.Strategy name="email_code">
//             <Clerk.Field name="code" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Verification Code
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Enter the code sent to your email"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>

//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Verify Email
//             </SignUp.Action>

//             <SignUp.Action
//               resend
//               className="text-blue-500 text-sm hover:underline mt-2"
//               fallback={({ resendableAfter }) => (
//                 <p className="text-sm text-gray-500 mt-2">
//                   Didn&apos;t receive a code? Resend in {resendableAfter} seconds
//                 </p>
//               )}
//             >
//               Resend code
//             </SignUp.Action>
//           </SignUp.Strategy>

//           <div className="text-center mt-4">
//             <span className="text-sm text-gray-600">
//               Need help?{" "}
//               <Link
//                 href="/contact"
//                 className="text-blue-500 hover:underline font-medium"
//               >
//                 Contact support
//               </Link>
//             </span>
//           </div>
//         </SignUp.Step>
//       </SignUp.Root>
//     </div>
//   );
// };

// export default SignUpPage;


// app/(auth)/sign-up/page.tsx
"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("student");
  const pathname = usePathname();
  const [metadataUpdated, setMetadataUpdated] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    if (metadataUpdated) return;

    // Check multiple indicators for SSO users
    const hasExternalAccount = user.externalAccounts && user.externalAccounts.length > 0;
    const isContinueFromSSO = window.location.hash === '#/continue' && hasExternalAccount;
    const isPasswordDisabled = user.passwordEnabled === false;

    // If any SSO indicators are true, redirect to role selection
    if (hasExternalAccount || isContinueFromSSO || isPasswordDisabled) {
      console.log('SSO user detected, redirecting to role selection');
      router.replace('/select-role');
      return;
    }

    // Your existing logic for regular email/password users
    const currentRole = user.unsafeMetadata?.role as string;

    if (currentRole !== selectedRole) {
      user
        .update({
          unsafeMetadata: { role: selectedRole },
        })
        .then(() => {
          console.log("User metadata updated successfully");
          setMetadataUpdated(true);
          router.push(`/${selectedRole}`);
        })
        .catch((error) => {
          console.error("Failed to update user metadata:", error);
        });
    } else {
      setMetadataUpdated(true);
      if (pathname !== `/${selectedRole}`) {
        router.push(`/${selectedRole}`);
      }
    }
  }, [isLoaded, isSignedIn, user, selectedRole, router, pathname, metadataUpdated]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96 max-h-[90vh] overflow-y-auto"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Create your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />

          {/* Social Sign Up Buttons */}
          <div className="flex flex-col gap-2 my-4">
            <Clerk.Connection
              name="google"
              className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Clerk.Connection>

            <Clerk.Connection
              name="github"
              className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Clerk.Connection>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Role Selection - Only for email/password signup */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs text-gray-500">Select your role</label>
            <div className="grid grid-cols-3 gap-2">
              {["student", "teacher", "parent"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-2 text-xs rounded-md border transition-colors ${selectedRole === role
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <Clerk.Field name="firstName" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              First Name
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="lastName" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Last Name
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Email Address
            </Clerk.Label>
            <Clerk.Input
              type="email"
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

          <SignUp.Action
            submit
            className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
          >
            Create Account
          </SignUp.Action>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign in
              </Link>
            </span>
          </div>
        </SignUp.Step>

        {/* Continue and Verification steps remain the same */}
        <SignUp.Step
          name="continue"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Continue registration</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />

          <Clerk.Field name="username" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignUp.Action
            submit
            className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
          >
            Continue
          </SignUp.Action>
        </SignUp.Step>

        <SignUp.Step
          name="verifications"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2 w-96"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Verify your email</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />

          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Verification Code
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter the code sent to your email"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            <SignUp.Action
              submit
              className="bg-blue-500 text-white my-2 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
            >
              Verify Email
            </SignUp.Action>

            <SignUp.Action
              resend
              className="text-blue-500 text-sm hover:underline mt-2"
              fallback={({ resendableAfter }) => (
                <p className="text-sm text-gray-500 mt-2">
                  Didn&apos;t receive a code? Resend in {resendableAfter} seconds
                </p>
              )}
            >
              Resend code
            </SignUp.Action>
          </SignUp.Strategy>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-blue-500 hover:underline font-medium"
              >
                Contact support
              </Link>
            </span>
          </div>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
};

export default SignUpPage;