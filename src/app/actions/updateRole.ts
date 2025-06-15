// app/actions/updateRole.ts
'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(role: string) {
    try {
        const { userId } = auth()

        if (!userId) {
            throw new Error('User not authenticated')
        }

        // Validate role
        const validRoles = ['student', 'teacher', 'parent', 'admin']
        if (!validRoles.includes(role)) {
            throw new Error('Invalid role')
        }

        // Update user's public metadata
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role: role
            }
        })

        // Revalidate any cached paths
        revalidatePath('/')

        return { success: true }
    } catch (error) {
        console.error('Failed to update user role:', error)
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}