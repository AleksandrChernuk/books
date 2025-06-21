export const dynamic = "force-dynamic";

import { getAllPosts, getPostBySlug } from "@/actions/blog.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";
import { notFound } from "next/navigation";

export type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Params;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <section>
      <Container>
        <Wrapper>
          <div className="mb-4">
            <BackBtn />
          </div>
          <div>
            <h1 className="text-center">{post.title}</h1>
            <div
              className="prose space-y-4"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          </div>
        </Wrapper>
      </Container>
    </section>
  );
}
