import React from "react";
import type { NextPage } from "next";
import { MdErrorOutline, MdArrowBack } from "react-icons/md";

import Layout from "@/components/Layout";
import AppHead from "@/components/AppHead";
import Link from "next/link";

const Help: NextPage = () => {
  return (
    <>
      <AppHead />

      <div className="flex flex-row items-center gap-2 mb-12">
        <Link href={"/"}>
          <button className="btn btn-square btn-sm btn-outline">
            <MdArrowBack size={18} />
          </button>
        </Link>
        <h1 className="text-3xl font-bold">Помощь</h1>
      </div>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Где взять api key?</h2>
            <ol className="list-decimal pl-[20px]">
              <li>
                Зарегистрируйтесь на{" "}
                <a
                  href="https://openai.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  OpenAI
                </a>
                .
              </li>
              <li>
                После регистрации, перейдите на страницу{" "}
                <a
                  href="https://platform.openai.com/account/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  api keys
                </a>
                .
              </li>
              <li>
                Нажмите на кнопку{" "}
                <span className="badge">Create new secret key</span>.
              </li>
              <li>Скопируйте ключ и вставьте его в поле.</li>
            </ol>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое model?</h2>
            <p>
              Model - это модель, которая будет использоваться для генерации
              текста. Выберите одну из моделей, которые представлены в списке.
            </p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое temperature?</h2>
            <p>
              Какая температура выборки будет использоваться, от 0 до 2. Более
              высокие значения, например 0,8, сделают вывод более случайным, а
              более низкие, например 0,2, сделают его более целенаправленным и
              детерминированным. Обычно мы рекомендуем изменять это значение или
              top_p, но не оба.
            </p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое max tokens?</h2>
            <p>
              Максимальное количество токенов для генерации при завершении чата.
              Общая длина входных и сгенерированных токенов ограничена длиной
              контекста модели.
            </p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое top p?</h2>
            <p>
              Альтернатива выборке с температурой, называемой выборкой ядра,
              когда модель рассматривает результаты токенов с массой вероятности
              top_p. Таким образом, 0,1 означает, что рассматриваются только
              лексемы, составляющие верхние 10% вероятностной массы. Обычно мы
              рекомендуем изменять этот параметр или температуру, но не оба.
            </p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое frequency penalty?</h2>
            <p>
              Число между -2,0 и 2,0. Положительные значения штрафуют новые
              лексемы на основе их существующей частоты в тексте, уменьшая
              вероятность того, что модель повторит ту же строку дословно.
            </p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Что такое presence penalty?</h2>
            <p>
              Число между -2,0 и 2,0. Положительные значения наказывают новые
              лексемы на основе того, появляются ли они в тексте до сих пор,
              увеличивая вероятность того, что модель будет говорить о новых
              темах.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
