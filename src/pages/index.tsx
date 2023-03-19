import React from "react";
import type { NextPage } from "next";

interface IMessage {
  role: string;
  content: string;
}

interface ISettings {
  apiKey: string;
  model: string;
  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
}

const Home: NextPage = () => {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Array<IMessage>>([]);

  const [settings, setSettings] = React.useState<ISettings>({
    apiKey: "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",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });

  const settingsHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(settings);
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    let messagesCopy = Object.assign([], messages);
    messagesCopy.push({ role: "user", content: message });
    console.log(messagesCopy);
    setMessages(messagesCopy);
    setMessage("");

    const response = await fetch("/api/sendMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settings: settings, messages: messagesCopy }),
    });

    const data = await response.json();
    messagesCopy.push(data.result.choices[0].message);
    setMessages(messagesCopy);
    console.log(messages);
  };

  return (
    <div className="p-[20px] h-full w-full flex lg:flex-row-reverse flex-col justify-center items-center gap-16">
      <form
        onChange={(e: React.FormEvent) => settingsHandler(e)}
        className="form-control w-full max-w-xl flex flex-col gap-4"
      >
        <h3 className="text-center text-xl font-bold">GPT Settings</h3>
        <div>
          <label className="label">
            <span className="label-text">Enter the api key</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={settings.apiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({ ...settings, ...{ apiKey: e.target.value } })
            }
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Enter the model</span>
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
            <option>gpt-4</option>
            <option>gpt-4-0314</option>
            <option>gpt-4-32k</option>
            <option>gpt-4-32k-0314</option>
            <option>gpt-3.5-turbo</option>
            <option>gpt-3.5-turbo</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Enter the temperature</span>
          </label>
          <input
            type="range"
            className="range"
            min={0}
            max={2}
            value={settings.temperature}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({
                ...settings,
                ...{ temperature: parseInt(e.target.value, 10) },
              })
            }
          />
          <label className="label">
            <span className="label-text-alt">{settings.temperature}</span>
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Enter the frequency_penalty</span>
          </label>
          <input
            type="range"
            className="range"
            min={-2}
            max={2}
            value={settings.frequency_penalty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({
                ...settings,
                ...{ frequency_penalty: parseInt(e.target.value, 10) },
              })
            }
          />
          <label className="label">
            <span className="label-text-alt">{settings.frequency_penalty}</span>
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Enter the presence_penalty</span>
          </label>
          <input
            type="range"
            className="range"
            min={-2}
            max={2}
            value={settings.presence_penalty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({
                ...settings,
                ...{ presence_penalty: parseInt(e.target.value, 10) },
              })
            }
          />
          <label className="label">
            <span className="label-text-alt">{settings.presence_penalty}</span>
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Enter the max_tokens</span>
          </label>
          <input
            type="range"
            className="range"
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
      </form>

      <div className="w-full max-w-xl mt-auto h-full">
        <div className="mb-6">
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
                <div className="chat-bubble">{item.content}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="flex flex-col w-full h-[80px] flex-grow relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
          onSubmit={(e: React.FormEvent) => formHandler(e)}
        >
          <textarea
            tabIndex={0}
            data-id="root"
            rows={1}
            className="m-0 p-3 w-full h-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none"
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
          <button
            type="submit"
            className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
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
      </div>
    </div>
  );
};

export default Home;
