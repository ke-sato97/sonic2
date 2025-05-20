// app/files/[id]/page.tsx
import prisma from '@/app/prisma';

interface FilePageProps {
  params: {
    id: string;
  };
}

export default async function FilePage({ params }: FilePageProps) {
  const file = await prisma.file.findUnique({
    where: { id: params.id },
    include: {
      comments: true,
    },
  });

  if (!file) {
    return <div>File not found</div>;
  }

  return (
    <div>
      <h1>ファイル詳細</h1>
      <p>ファイルID: {file.id}</p>
      <p>ユーザーID: {file.userId}</p>
      <p>ファイル名: {file.filenameSmall}</p>
      <p>作成日: {new Date(Number(file.createdAt)).toLocaleString()}</p>

      <h2>コメント一覧</h2>
      <ul>
        {file.comments.map((comment) => (
          <li key={comment.id}>
            {comment.nickname}: {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
