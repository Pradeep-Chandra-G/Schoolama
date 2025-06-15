// app/sign-in/sso-callback/page.tsx
"use client";

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SSOCallback() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user || isRedirecting) return;

        setIsRedirecting(true);

        // Check if user has a role in metadata
        const userRole = user.publicMetadata?.role as string;

        if (userRole && ['student', 'teacher', 'parent', 'admin'].includes(userRole)) {
            // User has a role, redirect to their dashboard
            router.push(`/${userRole}`);
        } else {
            // New user from SSO, redirect to role selection
            router.push('/select-role');
        }
    }, [isLoaded, isSignedIn, user, router, isRedirecting]);

    return (
        <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
            <div className="bg-white p-8 rounded-md shadow-lg">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Completing sign in...</span>
                </div>
            </div>
            <AuthenticateWithRedirectCallback />
        </div>
    );
}