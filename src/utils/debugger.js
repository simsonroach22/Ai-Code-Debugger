export const debugCode = async (code, language) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are an expert ${language} code debugger.` },
          { role: "user", content: `Debug this code:\n\n${code}` },
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    console.log("✅ Full API response:", data);


    // ✅ Safety check
    if (data?.choices?.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.error("❌ Unexpected API response:", data);
      return "⚠️ Oops! Couldn't get a valid response from the AI.";
    }
  } catch (error) {
    console.error("❌ API call failed:", error);
    return "🚨 Error while contacting OpenAI API.";
  }
};
