"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/post.type";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { deletePost } from "@/actions/blog.actions";
import { useState } from "react";

type PostCardProps = {
  post: BlogPost;
  admin?: boolean;
};

export default function PostCard({ post, admin }: PostCardProps) {
  const router = useRouter();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const handleEdit = () => {
    router.push(`blog/${post.slug}`);
  };
  const handleDelete = async () => {
    setDeleteLoading(true);
    await deletePost(post.id);

    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2">
        <p className="text-xs text-gray-300">
          {post.createdAt
            ? dayjs(post.createdAt).format("DD.MM.YYYY HH:mm")
            : ""}
        </p>

        <div>
          {admin ? (
            <div className="flex items-center gap-2">
              <Button onClick={handleDelete} variant="destructive">
                {deleteLoading ? "Видалити..." : "Видалити"}
              </Button>
              <Button
                onClick={() => {
                  setEditLoading(true);

                  router.push(`/admin/blog-edit/edit/${post.id}`);
                }}
                variant="outline"
              >
                {editLoading ? "Редагувати..." : "Редагувати"}
              </Button>
            </div>
          ) : (
            <Button onClick={handleEdit} variant="outline">
              Читати
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
