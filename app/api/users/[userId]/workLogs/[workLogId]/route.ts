import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type WorkLogRequestBody = {
  projectName: string;
  projectPart: string;
  hoursWorked: number;
  description: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string, workLogId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const workLogId = parseInt(params.workLogId, 10);

    if (isNaN(userId) || isNaN(workLogId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or work log ID' }, { status: 400 });
    }

    await prisma.workLog.deleteMany({
      where: {
        id: workLogId,
        userId: userId,
      },
    });

    return NextResponse.json({ success: true, message: 'Work log deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting work log:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string; workLogId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const workLogId = parseInt(params.workLogId, 10);

    if (isNaN(userId) || isNaN(workLogId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or work log ID' }, { status: 400 });
    }

    const body: WorkLogRequestBody = await request.json();

    const { projectName, projectPart, hoursWorked, description } = body;
    if (!projectName || !projectPart || isNaN(hoursWorked) || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields or incorrect format' }, { status: 400 });
    }

    const updatedWorkLog = await prisma.workLog.updateMany({
      where: { id: workLogId, userId },
      data: {
        projectName,
        projectPart,
        hoursWorked,
        description,
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedWorkLog.count === 0) {
      return NextResponse.json({ success: false, message: 'Work log not found or no changes made' }, { status: 404 });
    }

    const workLog = await prisma.workLog.findFirst({
      where: { id: workLogId, userId },
    });

    return NextResponse.json({
      success: true,
      message: 'Work log updated successfully',
      data: workLog,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating work log:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}