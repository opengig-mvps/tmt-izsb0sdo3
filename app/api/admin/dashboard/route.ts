import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const workLogs = await prisma.workLog.findMany({
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
      message: "All users' work logs retrieved successfully",
      data: workLogs,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error retrieving work logs:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}