import { MDX } from "@/components/MDX";
import { TopicHeader } from "@/components/topic/topic-header";
import { Topic, allTopics } from "contentlayer/generated";

export const generateStaticParams = async () =>
  allTopics.map((topic) => ({ slug: topic._raw.flattenedPath }));

export const generateMetadata = ({ params }: any) => {
  const topic = allTopics.find((topic) => topic.id === params.slug);
  if (!topic) throw new Error(`Failed to find topic for slug: ${params.slug}`);
  return { title: topic.title };
};

export default function Topic({ params }: { params: { slug: string } }) {
  const topic: Topic = allTopics.find((topic) => topic._raw.flattenedPath === params.slug) as Topic;

  return (
    <>
      <TopicHeader title="Deploy Wallet Contract" />
      <main className="px-2 pt-12 w-full max-w-screen-lg mx-auto mb-36">
        <article className="flex flex-col gap-36">
          <MDX md={topic.body.code} />
        </article>
      </main>
    </>
  );
}
