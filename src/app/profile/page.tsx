"use client";

import { UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
    const router = useRouter();

    // Handle modal close
    const handleClose = () => {
        router.back(); // Go back to previous page
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full mx-4">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <UserProfile
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "w-full max-h-[80vh] overflow-auto"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ProfilePage;