export const dynamic = "force-dynamic";

import BackBtn from "@/components/shared/BackBtn";
import BlogForm from "@/components/modules/blog-form/BlogForm";
import Container from "@/components/shared/Container";

export default async function CreatePostPage() {
  return (
    <Container>
      <div className="py-10">
        <div className="mb-4">
          <BackBtn />
        </div>
        <BlogForm typSubmit="create" buttonText="Створити" />
      </div>
    </Container>
  );
}
