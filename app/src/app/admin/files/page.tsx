// app/files/page.tsx
import prisma from '@/app/prisma';

export default async function FilesPage() {
  const files = await prisma.file.findMany({
    include: {
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Files</h1>
      <ul className="space-y-6">
        {files.map((file) => (
          <li key={file.id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold">{file.id}</h2>
            <h2 className="text-lg font-semibold">{file.filenameSmall}</h2>
            <p>Uploaded by: {file.userId}</p>
            <img
              src={file.thumbnailUrl ?? file.url}
              alt={file.filenameSmall ?? 'thumbnail'}
              className="mt-2 max-w-xs rounded"
            />
            <p className="mt-2">Type: {file.type}</p>
            <p>Size: {file.filesize} bytes</p>
            <p>Likes: {file.likeCount}</p>
            <div className="mt-4">
              <h3 className="font-bold">Comments</h3>
              <ul className="list-disc pl-5">
                {file.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.nickname}</strong>: {comment.comment}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
