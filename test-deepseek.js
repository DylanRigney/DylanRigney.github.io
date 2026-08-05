const { OpenAI } = require("openai");

const apiKey = "sk-b52129a85a81498696e9a11167d430a4";
const baseURL = "https://api.deepseek.com/v1";

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "Hello" }],
      model: "deepseek-chat",
    });

    console.log("Success:");
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
