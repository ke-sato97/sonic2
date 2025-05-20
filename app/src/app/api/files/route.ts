import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';

export async function GET() {
  try {
    const files = await prisma.file.findMany({
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ data: files });
  } catch (error) {
    console.error('[FILES_GET_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
