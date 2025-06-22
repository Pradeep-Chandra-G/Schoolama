"use client";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LogoutPage() {
    const { signOut } = useClerk();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        // Show spinner for 5 seconds before signing out
        const timer = setTimeout(() => {
            signOut(() => {
                // Redirect after sign out
                window.location.href = "/";
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [signOut]);

    if (isLoggingOut) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    {/* Custom Spinner */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* Outer ring */}
                            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
                            {/* Inner ring */}
                            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-100 rounded-full animate-spin border-t-indigo-400 animate-reverse"></div>
                            {/* Center dot */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Logging out of Schoolama LMS
                        </h2>
                        <p className="text-gray-600">
                            Please wait while we securely sign you out...
                        </p>

                        {/* Progress dots */}
                        <div className="flex justify-center space-x-1 mt-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>

                    {/* Optional: Progress bar */}
                    <div className="mt-6">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '100%', animation: 'progress 5s ease-in-out' }}></div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          
          .animate-reverse {
            animation-direction: reverse;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0);
            }
            40%, 43% {
              transform: translateY(-8px);
            }
            70% {
              transform: translateY(-4px);
            }
            90% {
              transform: translateY(-2px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
            </div>
        );
    }

    return null;
}