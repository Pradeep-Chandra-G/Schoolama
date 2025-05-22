const { currentUser, clerkClient } = require("@clerk/nextjs");
const { NextResponse } = require("next/server");

async function POST(request) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await request.json();

    if (!role || !['admin', 'teacher', 'student', 'parent'].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: { role }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting role:", error);
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}

module.exports = { POST };