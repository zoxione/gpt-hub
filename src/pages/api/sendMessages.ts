import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    // apiKey: "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",
    apiKey: req.body.settings.apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: req.body.settings.model,
    messages: req.body.messages,
    temperature: req.body.settings.temperature,
    max_tokens: req.body.settings.max_tokens,
    top_p: req.body.settings.top_p,
    frequency_penalty: req.body.settings.frequency_penalty,
    presence_penalty: req.body.settings.presence_penalty,
  });
  res.status(200).json({ result: completion.data });
}
