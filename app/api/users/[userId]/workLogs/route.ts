import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the request body
type WorkLogRequestBody = {
  projectName: string;
  projectPart: string;
  hoursWorked: number;
  description: string;
};

// Define the POST method handler for work log creation
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Validate and parse the userId parameter
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    // Parse the request body
    const body: WorkLogRequestBody = await request.json();

    // Validate required fields
    const { projectName, projectPart, hoursWorked, description } = body;
    if (!projectName || !projectPart || !hoursWorked || !description) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user exists
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Create the work log
    const workLog = await prisma.workLog.create({
      data: {
        projectName,
        projectPart,
        hoursWorked,
        description,
        userId,
      },
    });

    // Send a success response with the work log details
    return NextResponse.json({
      success: true,
      message: 'Work log created successfully',
      data: {
        id: workLog.id,
        projectName: workLog.projectName,
        projectPart: workLog.projectPart,
        hoursWorked: workLog.hoursWorked,
        description: workLog.description,
        userId: workLog.userId,
        createdAt: workLog.createdAt.toISOString(),
        updatedAt: workLog.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating work log:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}