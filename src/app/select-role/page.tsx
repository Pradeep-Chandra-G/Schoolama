// app/select-role/page.tsx
"use client";

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SelectRolePage() {
    const { user } = useUser();
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleRoleSubmit = async () => {
        if (!selectedRole || !user) return;

        setIsUpdating(true);

        try {
            await user.update({
                unsafeMetadata: { role: selectedRole },
            });

            console.log("User role updated successfully");
            router.push(`/${selectedRole}`);
        } catch (error) {
            console.error("Failed to update user role:", error);
            setIsUpdating(false);
        }
    };

    const roles = [
        { id: 'student', label: 'Student', icon: '🎓', description: 'Access courses and assignments' },
        { id: 'teacher', label: 'Teacher', icon: '👨‍🏫', description: 'Manage classes and students' },
        { id: 'parent', label: 'Parent', icon: '👪', description: 'Monitor child progress' },
        { id: 'admin', label: 'Admin', icon: '⚙️', description: 'System administration' }
    ];

    return (
        <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
            <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-6 w-96 max-h-[90vh] overflow-y-auto">
                <div className="text-center">
                    <h1 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
                        <Image src="/logo.png" alt="" width={24} height={24} />
                        SchooLama
                    </h1>
                    <h2 className="text-gray-400">Select your role to continue</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Welcome {user?.firstName}! Please choose your role to access the appropriate dashboard.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${selectedRole === role.id
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{role.icon}</span>
                                <div>
                                    <div className="font-medium text-gray-900">{role.label}</div>
                                    <div className="text-sm text-gray-500">{role.description}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleRoleSubmit}
                    disabled={!selectedRole || isUpdating}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${!selectedRole || isUpdating
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {isUpdating ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Setting up your account...
                        </span>
                    ) : (
                        `Continue as ${selectedRole ? roles.find(r => r.id === selectedRole)?.label : 'User'}`
                    )}
                </button>
            </div>
        </div>
    );
}