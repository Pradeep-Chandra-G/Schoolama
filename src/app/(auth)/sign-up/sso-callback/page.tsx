// app/sign-up/sso-callback/page.tsx
"use client";

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpSSOCallback() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user || isRedirecting) return;

        setIsRedirecting(true);

        // For new sign-ups via SSO, always redirect to role selection
        // since they haven't chosen a role yet
        const userRole = user.unsafeMetadata?.role as string;

        if (userRole && ['student', 'teacher', 'parent', 'admin'].includes(userRole)) {
            // User already has a role (shouldn't happen for sign-up, but just in case)
            router.push(`/${userRole}`);
        } else {
            // New SSO sign-up user, redirect to role selection
            router.push('/select-role');
        }
    }, [isLoaded, isSignedIn, user, router, isRedirecting]);

    return (
        <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
            <div className="bg-white p-8 rounded-md shadow-lg">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Setting up your account...</span>
                </div>
            </div>
            <AuthenticateWithRedirectCallback />
        </div>
    );
}