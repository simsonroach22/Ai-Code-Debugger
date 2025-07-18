import React, { useState } from "react";
import { useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { debugCode } from './utils/debugger';


function App() {
  const [code, setCode] = useState("// Type your code...");
  const [language, setLanguage] = useState("javascript");
  const [debugOutput, setDebugOutput] = useState("");

  useEffect(() => {
    const testDebug = async () => {
      const result = await debugCode("a=10\nb=20\nc=a+b\nprint(c)", "Python");
      console.log("Loaded API Key:", import.meta.env.VITE_OPENAI_KEY);

    };

    testDebug();
  }, []);

  const handleDebug = async () => {
  setDebugOutput("⏳ Debugging...");
  try {
    const result = await debugCode(code, language);
    setDebugOutput(result);
  } catch (err) {
    setDebugOutput("❌ Error: " + err.message);
  }
};


  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">

      <div className="p-4 text-xl font-bold bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <div>AI Code Debugger</div>
        {/* 🔁 Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              automaticLayout: true
            }}
          />
        </div>

        <div className="w-full md:w-1/3 bg-gray-800 p-4 border-l border-gray-700 overflow-auto">
          <div className="mb-2 font-semibold text-lg">🧠 Debug Output</div>
          <pre className="text-green-400 whitespace-pre-wrap">{debugOutput}</pre>
        </div>
      </div>


      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <button
          onClick={handleDebug}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          🔍 Debug Code
        </button>
      </div>
    </div>
  );
}

export default App;
