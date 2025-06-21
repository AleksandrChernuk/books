export const dynamic = "force-dynamic";
import { getAllPosts } from "@/actions/blog.actions";
import Container from "@/components/shared/Container";
import PostCard from "@/components/shared/PostCurd";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/post.type";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostsPage() {
  const posts: BlogPost[] = await getAllPosts();

  if (!posts) {
    return notFound();
  }
  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="mb-0">Публікації блогу</h1>
          <Button asChild>
            <Link href="/admin/blog-edit/create">Додати</Link>
          </Button>
        </div>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} admin />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
