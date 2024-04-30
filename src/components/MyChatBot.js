// MyChatBot.js
import React from "react";
import ChatBot from "react-chatbotify";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

const MyChatBot = () => {
  const genAI = new GoogleGenerativeAI(apiKey);
  async function run(prompt, streamMessage) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  }

  const flow = {
    start: {
      message: "Hello, I am sentient now, talk to me!",
      path: "model_loop",
    },
    model_loop: {
      message: async (params) => {
        return await run(params.userInput);
      },
      path: "model_loop"
    },
  }
return (
    <ChatBot flow={flow}/>
  );
};
export default MyChatBot;