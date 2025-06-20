export const dynamic = "force-dynamic";

import { getPostById } from "@/actions/blog.actions";
import BackBtn from "@/components/shared/BackBtn";
import BlogForm from "@/components/modules/blog-form/BlogForm";
import Container from "@/components/shared/Container";
import { notFound } from "next/navigation";

export default async function BlogPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <Container>
      <div className="py-10">
        <div className="mb-4">
          <BackBtn />
        </div>
        <BlogForm
          id={id}
          initialData={post}
          typSubmit="update"
          buttonText="Зберегти зміни"
        />
      </div>
    </Container>
  );
}
