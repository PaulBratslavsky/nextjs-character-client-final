import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  content: string;
}

export default function RichText(data : RichTextProps) {
  return (
    <section className="rich-text py-6">
      <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}