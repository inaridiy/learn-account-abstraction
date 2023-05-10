import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";

const Step = defineNestedType(() => ({
  name: "Step",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the post",
    },
  },
}));

const Topic = defineDocumentType(() => ({
  name: "Topic",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    id: {
      type: "string",
      description: "The id of the post",
      required: true,
    },
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true,
    },
    steps: {
      type: "list",
      description: "The steps of the post",
      required: true,
      of: Step,
    },
    startBtnText: {
      type: "string",
      description: "The text of the start button",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "contents",
  documentTypes: [Topic],
  mdx: {
    remarkPlugins: [codeImport, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypePrettyCode,
        {
          theme: "github-light",
        },
      ],
    ],
  },
});
