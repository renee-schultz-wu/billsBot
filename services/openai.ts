import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key-here', // 建议使用环境变量
//   apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // 如果在客户端使用的话需要添加这个
});

export const chatWithAI = async (message: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional personal finance assistant, helping users record and manage their expenses. When users inform you of their spending, you need to confirm and log the expense, providing appropriate advice."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "Sorry, I’m unable to process your request right now.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "Sorry, something went wrong. Please try again later.";
  }
}; 