import { MDX } from "@/components/MDX";
import { TopicHeader } from "@/components/topic/topic-header";
import { Topic, allTopics } from "contentlayer/generated";

const findTopic = (lang: string, slug: string) =>
  allTopics.find((topic) => topic.id === slug && topic._raw.sourceFileDir === lang);

export const generateStaticParams = async () =>
  allTopics.map((topic) => ({ lang: topic._raw.sourceFileDir, slug: topic.id }));

export const generateMetadata = ({ params }: any) => {
  const topic = findTopic(params.lang, params.slug);
  if (!topic) throw new Error(`Failed to find topic for slug: ${params.slug}`);
  return { title: topic.title };
};

export default function Topic({ params }: { params: { slug: string; lang: string } }) {
  const topic: Topic = findTopic(params.lang, params.slug) as Topic;

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
