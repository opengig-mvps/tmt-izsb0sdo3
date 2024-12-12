import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type UserRequestBody = {
  email: string;
  username: string;
  name: string;
  role: string;
};

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: UserRequestBody = await request.json();
    const { email, username, name, role } = body;

    if (!email || !username || !name || !role) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: String(email),
        username: String(username),
        name: String(name),
        role: String(role),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        name: updatedUser.name,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}