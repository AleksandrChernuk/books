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

type PostCardProps = {
  post: BlogPost;
};

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`blog/post/${post.id}`);
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

        <Button onClick={handleEdit} variant="outline">
          Читати
        </Button>
      </CardFooter>
    </Card>
  );
}
