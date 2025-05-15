import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // BigInt を数値に変換
    const serialized = files.map(file => ({
      ...file,
      createdAt: Number(file.createdAt),
      comments: file.comments.map(comment => ({
        ...comment,
        createdAt: Number(comment.createdAt),
      })),
    }));

    return NextResponse.json({ data: serialized });
  } catch (error) {
    console.error('[FILES_GET_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
