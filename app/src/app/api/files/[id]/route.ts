import { NextResponse } from 'next/server';
import prisma from '@/app/prisma';

export async function GET(request: Request, context: { params: { id: string } }) {
  const id = context.params.id;

  try {
    const file = await prisma.file.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });

    if (!file) {
      return new NextResponse('File not found', { status: 404 });
    }

    return NextResponse.json({ data: file });
  } catch (error) {
    console.error('[FILE_GET_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}