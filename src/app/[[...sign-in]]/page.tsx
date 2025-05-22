"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    console.log(role);

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
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
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;


// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import * as SignUp from "@clerk/elements/sign-up";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const role = user?.publicMetadata.role;
//     console.log(role);

//     if (role) {
//       router.push(`/${role}`);
//     }
//   }, [user, router]);

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       {!isSignUp ? (
//         <SignIn.Root>
//           <SignIn.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Sign in to your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign In Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="identifier" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Username
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <SignIn.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Sign In
//             </SignIn.Action>

//             {/* Toggle to Sign Up */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </span>
//             </div>
//           </SignIn.Step>
//         </SignIn.Root>
//       ) : (
//         <SignUp.Root>
//           <SignUp.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Create your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign Up Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="firstName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 First Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="lastName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Last Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Email Address
//               </Clerk.Label>
//               <Clerk.Input
//                 type="email"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Sign Up
//             </SignUp.Action>

//             {/* Toggle to Sign In */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </span>
//             </div>
//           </SignUp.Step>

//           {/* Verification Step */}
//           <SignUp.Step
//             name="verifications"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Verify your email</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Strategy name="email_code">
//               <Clerk.Field name="code" className="flex flex-col gap-2">
//                 <Clerk.Label className="text-xs text-gray-500">
//                   Verification Code
//                 </Clerk.Label>
//                 <Clerk.Input
//                   type="text"
//                   required
//                   className="p-2 rounded-md ring-1 ring-gray-300"
//                 />
//                 <Clerk.FieldError className="text-xs text-red-400" />
//               </Clerk.Field>
//               <SignUp.Action
//                 submit
//                 className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               >
//                 Verify Email
//               </SignUp.Action>
//             </SignUp.Strategy>

//             <SignUp.Action
//               resend
//               className="text-blue-500 text-xs hover:underline"
//               fallback={({ resendableAfter }) => (
//                 <span className="text-xs text-gray-500">
//                   Resend code in {resendableAfter} seconds
//                 </span>
//               )}
//             >
//               Didn't receive a code? Resend
//             </SignUp.Action>
//           </SignUp.Step>
//         </SignUp.Root>
//       )}
//     </div>
//   );
// };

// export default LoginPage;


// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import * as SignUp from "@clerk/elements/sign-up";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       const role = user?.publicMetadata.role;
//       console.log(role);

//       if (role) {
//         router.push(`/${role}`);
//       }
//     }
//   }, [isLoaded, isSignedIn, user, router]);

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       {!isSignUp ? (
//         <SignIn.Root>
//           <SignIn.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Sign in to your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign In Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="identifier" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Username
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <SignIn.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Sign In
//             </SignIn.Action>

//             {/* Toggle to Sign Up */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </span>
//             </div>
//           </SignIn.Step>
//         </SignIn.Root>
//       ) : (
//         <SignUp.Root>
//           <SignUp.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Create your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign Up Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="firstName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 First Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="lastName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Last Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Email Address
//               </Clerk.Label>
//               <Clerk.Input
//                 type="email"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>

//             {/* Role Selection */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs text-gray-500">Role</label>
//               <select
//                 name="role"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300 bg-white"
//                 onChange={(e) => {
//                   // This will be handled by Clerk's metadata system
//                   const form = e.target.closest('form');
//                   if (form) {
//                     form.setAttribute('data-role', e.target.value);
//                   }
//                 }}
//               >
//                 <option value="">Select your role</option>
//                 <option value="admin">Admin</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="student">Student</option>
//                 <option value="parent">Parent</option>
//               </select>
//             </div>

//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={(e) => {
//                 // Get the selected role and store it for metadata
//                 const form = e.target.closest('form');
//                 const roleSelect = form?.querySelector('select[name="role"]');
//                 const selectedRole = roleSelect?.value;
                
//                 if (!selectedRole) {
//                   e.preventDefault();
//                   alert('Please select a role');
//                   return;
//                 }
                
//                 // Store role in a way that can be accessed during sign-up completion
//                 window.selectedRole = selectedRole;
//               }}
//             >
//               Sign Up
//             </SignUp.Action>

//             {/* Toggle to Sign In */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </span>
//             </div>
//           </SignUp.Step>

//           {/* Verification Step */}
//           <SignUp.Step
//             name="verifications"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Verify your email</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Strategy name="email_code">
//               <Clerk.Field name="code" className="flex flex-col gap-2">
//                 <Clerk.Label className="text-xs text-gray-500">
//                   Verification Code
//                 </Clerk.Label>
//                 <Clerk.Input
//                   type="text"
//                   required
//                   className="p-2 rounded-md ring-1 ring-gray-300"
//                 />
//                 <Clerk.FieldError className="text-xs text-red-400" />
//               </Clerk.Field>
//               <SignUp.Action
//                 submit
//                 className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//                 onClick={async (e) => {
//                   // After verification, set the role in user metadata
//                   const selectedRole = window.selectedRole;
//                   if (selectedRole && user) {
//                     try {
//                       await user.update({
//                         publicMetadata: {
//                           role: selectedRole
//                         }
//                       });
//                     } catch (error) {
//                       console.error('Error setting role:', error);
//                     }
//                   }
//                 }}
//               >
//                 Verify Email
//               </SignUp.Action>
//             </SignUp.Strategy>

//             <SignUp.Action
//               resend
//               className="text-blue-500 text-xs hover:underline"
//               fallback={({ resendableAfter }) => (
//                 <span className="text-xs text-gray-500">
//                   Resend code in {resendableAfter} seconds
//                 </span>
//               )}
//             >
//               Didn't receive a code? Resend
//             </SignUp.Action>
//           </SignUp.Step>

//           {/* Continue Step - This handles role assignment after sign-up */}
//           <SignUp.Step
//             name="continue"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Complete your profile</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={async () => {
//                 // Set role metadata when completing sign-up
//                 const selectedRole = window.selectedRole;
//                 if (selectedRole) {
//                   try {
//                     await fetch('/api/set-role', {
//                       method: 'POST',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify({ role: selectedRole })
//                     });
//                   } catch (error) {
//                     console.error('Error setting role:', error);
//                   }
//                 }
//               }}
//             >
//               Complete Sign Up
//             </SignUp.Action>
//           </SignUp.Step>
//         </SignUp.Root>
//       )}
//     </div>
//   );
// };

// export default LoginPage;


// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import * as SignUp from "@clerk/elements/sign-up";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // Extend Window interface for TypeScript
// declare global {
//   interface Window {
//     selectedRole?: string;
//   }
// }

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [selectedRole, setSelectedRole] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       const role = user?.publicMetadata?.role as string;
//       console.log(role);

//       if (role) {
//         router.push(`/${role}`);
//       }
//     }
//   }, [isLoaded, isSignedIn, user, router]);

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     setSelectedRole(""); // Reset role selection when switching modes
//   };

//   const handleRoleSubmit = async (role: string) => {
//     try {
//       const response = await fetch('/api/set-role', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ role })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to set role');
//       }

//       // Role has been set, user will be redirected by useEffect
//       return true;
//     } catch (error) {
//       console.error('Error setting role:', error);
//       return false;
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       {!isSignUp ? (
//         <SignIn.Root>
//           <SignIn.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Sign in to your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign In Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="identifier" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Username
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <SignIn.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Sign In
//             </SignIn.Action>

//             {/* Toggle to Sign Up */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </span>
//             </div>
//           </SignIn.Step>
//         </SignIn.Root>
//       ) : (
//         <SignUp.Root>
//           <SignUp.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Create your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign Up Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="firstName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 First Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="lastName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Last Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Email Address
//               </Clerk.Label>
//               <Clerk.Input
//                 type="email"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>

//             {/* Role Selection */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs text-gray-500">Role</label>
//               <select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300 bg-white"
//               >
//                 <option value="">Select your role</option>
//                 <option value="admin">Admin</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="student">Student</option>
//                 <option value="parent">Parent</option>
//               </select>
//               {!selectedRole && (
//                 <span className="text-xs text-red-400">Please select a role</span>
//               )}
//             </div>

//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={(e) => {
//                 if (!selectedRole) {
//                   e.preventDefault();
//                   return;
//                 }
//                 // Store role for later use
//                 if (typeof window !== 'undefined') {
//                   window.selectedRole = selectedRole;
//                 }
//               }}
//             >
//               Sign Up
//             </SignUp.Action>

//             {/* Toggle to Sign In */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </span>
//             </div>
//           </SignUp.Step>

//           {/* Verification Step */}
//           <SignUp.Step
//             name="verifications"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Verify your email</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Strategy name="email_code">
//               <Clerk.Field name="code" className="flex flex-col gap-2">
//                 <Clerk.Label className="text-xs text-gray-500">
//                   Verification Code
//                 </Clerk.Label>
//                 <Clerk.Input
//                   type="text"
//                   required
//                   className="p-2 rounded-md ring-1 ring-gray-300"
//                 />
//                 <Clerk.FieldError className="text-xs text-red-400" />
//               </Clerk.Field>
//               <SignUp.Action
//                 submit
//                 className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               >
//                 Verify Email
//               </SignUp.Action>
//             </SignUp.Strategy>

//             <SignUp.Action
//               resend
//               className="text-blue-500 text-xs hover:underline"
//               fallback={({ resendableAfter }) => (
//                 <span className="text-xs text-gray-500">
//                   Resend code in {resendableAfter} seconds
//                 </span>
//               )}
//             >
//               Didn't receive a code? Resend
//             </SignUp.Action>
//           </SignUp.Step>

//           {/* Continue Step - This handles role assignment after sign-up */}
//           <SignUp.Step
//             name="continue"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Complete your profile</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={async () => {
//                 const roleToSet = selectedRole || (typeof window !== 'undefined' ? window.selectedRole : '');
//                 if (roleToSet) {
//                   await handleRoleSubmit(roleToSet);
//                 }
//               }}
//             >
//               Complete Sign Up
//             </SignUp.Action>
//           </SignUp.Step>
//         </SignUp.Root>
//       )}
//     </div>
//   );
// };

// export default LoginPage;


// "use client";

// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import * as SignUp from "@clerk/elements/sign-up";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // Extend Window interface for TypeScript
// declare global {
//   interface Window {
//     selectedRole?: string;
//   }
// }

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [selectedRole, setSelectedRole] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       const role = user?.publicMetadata?.role as string;
//       console.log(role);

//       if (role) {
//         router.push(`/${role}`);
//       }
//     }
//   }, [isLoaded, isSignedIn, user, router]);

//   const toggleMode = () => {
//     setIsSignUp(!isSignUp);
//     setSelectedRole(""); // Reset role selection when switching modes
//   };

//   const handleRoleSubmit = async (role: string) => {
//     try {
//       // Use Clerk's user.update method directly
//       if (user) {
//         await user.update({
//           unsafeMetadata: { role }
//         });
//         // Force a reload to get updated user data
//         window.location.reload();
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Error setting role:', error);
//       return false;
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       {!isSignUp ? (
//         <SignIn.Root>
//           <SignIn.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Sign in to your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign In Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="identifier" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Username
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <SignIn.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//             >
//               Sign In
//             </SignIn.Action>

//             {/* Toggle to Sign Up */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </span>
//             </div>
//           </SignIn.Step>
//         </SignIn.Root>
//       ) : (
//         <SignUp.Root>
//           <SignUp.Step
//             name="start"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Create your account</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             {/* Google Sign Up Button */}
//             <Clerk.Connection
//               name="google"
//               className="flex items-center justify-center gap-2 p-2 rounded-md ring-1 ring-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Image 
//                 src="https://developers.google.com/identity/images/g-logo.png" 
//                 alt="Google" 
//                 width={18} 
//                 height={18} 
//               />
//               <span className="text-sm">Continue with Google</span>
//             </Clerk.Connection>

//             {/* Divider */}
//             <div className="flex items-center gap-3 my-4">
//               <div className="flex-1 h-px bg-gray-300"></div>
//               <span className="text-xs text-gray-500">or</span>
//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <Clerk.Field name="firstName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 First Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="lastName" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Last Name
//               </Clerk.Label>
//               <Clerk.Input
//                 type="text"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Email Address
//               </Clerk.Label>
//               <Clerk.Input
//                 type="email"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>
//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />
//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>

//             {/* Role Selection */}
//             <div className="flex flex-col gap-2">
//               <label className="text-xs text-gray-500">Role</label>
//               <select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300 bg-white"
//               >
//                 <option value="">Select your role</option>
//                 <option value="admin">Admin</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="student">Student</option>
//                 <option value="parent">Parent</option>
//               </select>
//               {!selectedRole && (
//                 <span className="text-xs text-red-400">Please select a role</span>
//               )}
//             </div>

//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={(e) => {
//                 if (!selectedRole) {
//                   e.preventDefault();
//                   return;
//                 }
//                 // Store role for later use
//                 if (typeof window !== 'undefined') {
//                   window.selectedRole = selectedRole;
//                 }
//               }}
//             >
//               Sign Up
//             </SignUp.Action>

//             {/* Toggle to Sign In */}
//             <div className="text-center mt-4">
//               <span className="text-xs text-gray-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={toggleMode}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Sign in
//                 </button>
//               </span>
//             </div>
//           </SignUp.Step>

//           {/* Verification Step */}
//           <SignUp.Step
//             name="verifications"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Verify your email</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Strategy name="email_code">
//               <Clerk.Field name="code" className="flex flex-col gap-2">
//                 <Clerk.Label className="text-xs text-gray-500">
//                   Verification Code
//                 </Clerk.Label>
//                 <Clerk.Input
//                   type="text"
//                   required
//                   className="p-2 rounded-md ring-1 ring-gray-300"
//                 />
//                 <Clerk.FieldError className="text-xs text-red-400" />
//               </Clerk.Field>
//               <SignUp.Action
//                 submit
//                 className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               >
//                 Verify Email
//               </SignUp.Action>
//             </SignUp.Strategy>

//             <SignUp.Action
//               resend
//               className="text-blue-500 text-xs hover:underline"
//               fallback={({ resendableAfter }) => (
//                 <span className="text-xs text-gray-500">
//                   Resend code in {resendableAfter} seconds
//                 </span>
//               )}
//             >
//               Didn't receive a code? Resend
//             </SignUp.Action>
//           </SignUp.Step>

//           {/* Continue Step - This handles role assignment after sign-up */}
//           <SignUp.Step
//             name="continue"
//             className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//           >
//             <h1 className="text-xl font-bold flex items-center gap-2">
//               <Image src="/logo.png" alt="" width={24} height={24} />
//               SchooLama
//             </h1>
//             <h2 className="text-gray-400">Complete your profile</h2>
//             <Clerk.GlobalError className="text-sm text-red-400" />
            
//             <SignUp.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] hover:bg-blue-600 transition-colors"
//               onClick={async () => {
//                 const roleToSet = selectedRole || (typeof window !== 'undefined' ? window.selectedRole : '');
//                 if (roleToSet) {
//                   await handleRoleSubmit(roleToSet);
//                 }
//               }}
//             >
//               Complete Sign Up
//             </SignUp.Action>
//           </SignUp.Step>
//         </SignUp.Root>
//       )}
//     </div>
//   );
// };

// export default LoginPage;
