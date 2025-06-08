import { getPostById } from "@/actions/blog.actions";
import BackBtn from "@/components/shared/BackBtn";
import Container from "@/components/shared/Container";
import Wrapper from "@/components/shared/Wrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <section>
      <Container>
        <Wrapper>
          <div className="mb-4">
            <BackBtn />
          </div>
          <div>
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
