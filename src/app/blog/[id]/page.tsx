import { getPostById } from "@/actions/blog.actions";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostById(slug);

  return (
    <div>
      <div className="py-10">
        <div className="mb-4">{/* <BackBtn /> */}</div>
        {post?.title}
      </div>
    </div>
  );
}
