import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface IProps {
  content: string;
}

const Markdown = (props: IProps) => {
  return (
    <ReactMarkdown
      className="chat-bubble"
      children={props.content}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code className={className ? className : ""} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Markdown;
