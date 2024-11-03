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
          content: "你是一个专业的个人理财助手，帮助用户记录和管理他们的支出。当用户告诉你他们的支出时，你需要确认并记录下这笔支出，并给出合适的建议。"
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "抱歉，我现在无法处理您的请求。";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "抱歉，发生了一些错误。请稍后再试。";
  }
}; 