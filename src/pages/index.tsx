import React from "react";
import type { NextPage } from "next";
import { MdErrorOutline } from "react-icons/md";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

import Layout from "@/components/Layout";
import Markdown from "@/components/Markdown";
import AppHead from "@/components/AppHead";

interface IMessage {
  role: string;
  content: string;
}

interface ISettings {
  apiKey: string;
  model: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

const Home: NextPage = () => {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Array<IMessage>>([]);
  const [isErrorSendMessages, setIsErrorSendMessages] =
    React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Дефолтные настройки
  const [settings, setSettings] = React.useState<ISettings>({
    apiKey: "",
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // Смена настроек
  const settingsHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Отправка сообщения
  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let messagesCopy = Object.assign([], messages);
    messagesCopy.push({ role: "user", content: message });
    setMessages(messagesCopy);
    setMessage("");

    const response = await fetch("/api/sendMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settings: settings, messages: messagesCopy }),
    });

    if (response.ok) {
      const data = await response.json();
      messagesCopy.push(data.result.choices[0].message);
      setMessages(messagesCopy);
    } else {
      setIsErrorSendMessages(true);
      let timeout = setTimeout(() => {
        setIsErrorSendMessages(false);
        clearTimeout(timeout);
      }, 3000);
    }

    setIsSubmitting(false);
  };

  // Форма
  const FormSettings = (
    <form
      onChange={(e: React.FormEvent) => settingsHandler(e)}
      className="form-control flex flex-col gap-4"
    >
      <div>
        <label className="label">
          <span className="label-text">
            Enter the{" "}
            <Link className="link link-info" href={"/help"}>
              api key (?)
            </Link>
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={settings.apiKey}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ apiKey: e.target.value },
            })
          }
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Model</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={settings.model}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSettings({
              ...settings,
              ...{ model: e.target.value },
            })
          }
        >
          <option disabled className="text-base-300">
            gpt-4
          </option>
          <option disabled className="text-base-300">
            gpt-4-0314
          </option>
          <option disabled className="text-base-300">
            gpt-4-32k
          </option>
          <option disabled className="text-base-300">
            gpt-4-32k-0314
          </option>
          <option>gpt-3.5-turbo</option>
          <option>gpt-3.5-turbo-0301</option>
        </select>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Temperature</span>
        </label>
        <input
          type="range"
          className="range range-primary"
          min={0}
          max={1}
          step={0.01}
          value={settings.temperature}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ temperature: parseFloat(e.target.value) },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">{settings.temperature}</span>
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Max tokens</span>
        </label>
        <input
          type="range"
          className="range range-primary"
          min={1}
          max={2048}
          value={settings.max_tokens}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ max_tokens: parseInt(e.target.value, 10) },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">{settings.max_tokens}</span>
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Top P</span>
        </label>
        <input
          type="range"
          className="range range-primary"
          min={0}
          max={1}
          step={0.01}
          value={settings.top_p}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ top_p: parseFloat(e.target.value) },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">{settings.top_p}</span>
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Frequency penalty</span>
        </label>
        <input
          type="range"
          className="range range-primary"
          min={0}
          max={2}
          step={0.01}
          value={settings.frequency_penalty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ frequency_penalty: parseFloat(e.target.value) },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">{settings.frequency_penalty}</span>
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Presence penalty</span>
        </label>
        <input
          type="range"
          className="range range-primary"
          min={0}
          max={2}
          step={0.01}
          value={settings.presence_penalty}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({
              ...settings,
              ...{ presence_penalty: parseFloat(e.target.value) },
            })
          }
        />
        <label className="label">
          <span className="label-text-alt">{settings.presence_penalty}</span>
        </label>
      </div>
    </form>
  );

  return (
    <>
      <AppHead />

      <div className="h-full w-full grid gap-4 grid-cols-1 lg:grid-cols-2 justify-items-center">
        <div className="lg:hidden flex flex-row items-center justify-between w-full max-w-xl gap-2 mb-12">
          <h1 className="text-3xl font-bold">GPT HUB</h1>
          <label htmlFor="modal-settings" className="btn gap-2">
            <IoMdSettings size={18} />
            Open settings
          </label>
        </div>

        <input type="checkbox" id="modal-settings" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="modal-settings"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-xl font-bold">GPT Settings</h3>
            <p className="py-4">{FormSettings}</p>
          </div>
        </div>

        <div className="hidden lg:block w-full max-w-xl">
          <h3 className="text-xl font-bold text-center">GPT Settings</h3>
          {FormSettings}
        </div>

        <div className="w-full max-w-xl mt-auto">
          <div className="max-h-[calc(100vh_-_220px)] w-full overflow-y-auto">
            {/* <div className="chat chat-start">
              <div className="chat-header">You</div>
              <div className="chat-bubble overflow-y-auto">
                <Markdown content={"dasda"} />
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-header">You</div>
              <div className="chat-bubble overflow-y-auto">
                <Markdown content={"dasda"} />
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-header">You</div>
              <div className="chat-bubble overflow-y-auto">
                <Markdown
                  content={
                    '\n\nКонечно, вот пример кода на Python:\n\n```\n# Программа для вычисления среднего арифметического двух чисел\n\nnum1 = float(input("Введите первое число: "))\nnum2 = float(input("Введите второе число: "))\n\naverage = (num1 + num2) / 2\n\nprint("Среднее арифметическое чисел", num1, "и", num2, "равно", average)\n```\n\n Эта программа запрашивает у пользователя два числа, вычисляет их среднее арифметичес'
                  }
                />
              </div>
            </div> */}
            {messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`chat chat-${
                    item.role === "assistant" ? "start" : "end"
                  }`}
                >
                  <div className="chat-header">
                    {item.role === "assistant" ? "GPT" : "You"}
                  </div>
                  <div className="chat-bubble overflow-y-auto">
                    <Markdown content={item.content} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isSubmitting ? (
            <progress className="progress w-full h-[80px] my-6"></progress>
          ) : (
            <form
              className="my-6 flex flex-col w-full h-[80px] flex-grow relative border border-gray-900/50 :text-white bg-gray-700 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]"
              onSubmit={(e: React.FormEvent) => formHandler(e)}
            >
              <textarea
                tabIndex={0}
                data-id="root"
                rows={1}
                className="m-0 p-3 w-full h-full resize-none border-0 focus:ring-0 focus-visible:ring-0 bg-transparent outline-none"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    formHandler(e);
                  }
                }}
              />
              <button
                type="submit"
                className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:text-gray-400 hover:bg-gray-900 disabled:hover:bg-transparent"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      {isErrorSendMessages && (
        <div className="alert alert-error shadow-lg fixed right-0 bottom-0 w-fit m-[26px] text-white">
          <span className="">
            <MdErrorOutline size={28} />
            Возникла ошибка на сервере chat.openai.com
          </span>
        </div>
      )}
    </>
  );
};

export default Home;
