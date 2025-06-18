export const dynamic = "force-dynamic";
import { getAllPosts } from "@/actions/blog.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import PostCard from "@/components/shared/PostCurd";
import Wrapper from "@/components/shared/Wrapper";
import { BlogPost } from "@/types/post.type";

export default async function PostsPage() {
  const posts: BlogPost[] = await getAllPosts();

  return (
    <section>
      <Container>
        <Wrapper className="py-5 md:py-10">
          <div className="mb-4">
            <BackBtn />
          </div>
          <h1>Мої публікації</h1>
          <ul className="space-y-4">
            {posts.map((el) => (
              <li key={el.id}>
                <PostCard post={el} key={el.id} />
              </li>
            ))}
          </ul>
        </Wrapper>
      </Container>
    </section>
  );
}
