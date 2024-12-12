import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const workLogs = await prisma.workLog.findMany({
      where: { userId: userId },
      select: {
        id: true,
        projectName: true,
        projectPart: true,
        hoursWorked: true,
        description: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Work logs retrieved successfully',
      data: workLogs,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error retrieving work logs:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}