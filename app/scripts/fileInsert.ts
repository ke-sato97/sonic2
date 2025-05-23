import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const json = JSON.parse(fs.readFileSync('./scripts/json/files.json', 'utf8'));

  const files = json.files;

  for (const fileId in files) {
    const file = files[fileId];

    if (file.fileId === undefined) {
      console.log('すきっぷ');
      continue;
    }

    const castCreated: string = String(file.created);

    await prisma.file.upsert({
      where: { id: file.fileId },
      update: {}, // ここに更新内容を書く（必要なら）
      create: {
        id: file.fileId,
        userId: file.user,
        createdAt: castCreated,
        commentCount: file.comment_count || 0,
        likeCount: file.like_count || 0,
        filenameSmall: file.filename_small || '',
        filesize: file.filesize || 0,
        type: file.type || '',
        url: file.url || '',
        videoDuration: file.videoDuration || 0,
        videoURL: file.videoURL || '',
        ref: file.ref || '',
        thumbnailRef: file.thumbnail_ref || '',
        thumbnailUrl: file.thumbnail_url || '',
        thumbnailMurl: file.thumbnail_murl || '',
        thumbnailSurl: file.thumbnail_surl || '',
        comments: {
          create: file.comments
            ? Object.entries(file.comments).map(([commentId, comment]) => {
                const c = comment as {
                  comment: string;
                  created: number;
                  // fileId: string;
                  idComment: string;
                  nickname: string;
                  user: string;
                };

                return {
                  id: commentId,
                  // fileId: file.fileId,
                  userId: c.user,
                  nickname: c.nickname,
                  comment: c.comment,
                  createdAt: String(c.created),
                };
              })
            : [],
        },
      },
    });


    console.log(`Imported file: ${fileId}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });