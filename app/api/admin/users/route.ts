import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

type UserRequestBody = {
  email: string;
  password: string;
  username: string;
  name: string;
  role: string;
};

export async function POST(request: Request) {
  try {
    const body: UserRequestBody = await request.json();

    const { email, password, username, name, role } = body;

    if (!email || !password || !username || !name || !role) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}