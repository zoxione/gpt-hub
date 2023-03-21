import Head from "next/head";
import { FunctionComponent } from "react";

interface IProps {
  title?: string | null;
}

const AppHead: FunctionComponent<IProps> = ({ title }) => {
  return (
    <Head>
      <title>{title ? title : "GPTHUB"}</title>
      <meta
        name="description"
        content="Интерфейс для использования GPT API от openai"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHead;
