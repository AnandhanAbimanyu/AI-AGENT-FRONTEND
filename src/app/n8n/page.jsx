// pages/index.jsx
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.result.choices?.[0]?.text || "No response from OpenAI");
    } catch (err) {
      console.error(err);
      setResponse("Failed to get response.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Ask OpenAI via n8n</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Prompt"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
