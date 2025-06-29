export const dynamic = "force-dynamic";

import { getAllPosts } from "@/actions/blog.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import PostCard from "@/components/shared/PostCurd";
import Wrapper from "@/components/shared/Wrapper";
import { BlogPost } from "@/types/post.type";
import { notFound } from "next/navigation";

export default async function PostsPage() {
  const posts: BlogPost[] = await getAllPosts();

  if (!posts) {
    return notFound();
  }

  return (
    <>
      <section>
        <Container>
          <Wrapper className="pb-20">
            <div className="mb-4">
              <BackBtn />
            </div>
            <h1>Мої публікації</h1>

            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts
                  .sort((a, b) => (b.sorting ?? 0) - (a.sorting ?? 0))
                  .map((el) => (
                    <li key={el.id}>
                      <PostCard post={el} />
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Ще немає публікацій</p>
            )}
          </Wrapper>
        </Container>
      </section>
    </>
  );
}
