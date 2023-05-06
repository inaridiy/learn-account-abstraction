// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
var Topic = defineDocumentType(() => ({
  name: "Topic",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "contents",
  documentTypes: [Topic],
  mdx: {
    remarkPlugins: [codeImport, remarkGfm]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FKKQXNZZ.mjs.map
