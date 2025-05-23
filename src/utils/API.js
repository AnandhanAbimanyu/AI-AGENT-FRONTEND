const mode = process.env.NEXT_PUBLIC_API_MODE || "LOCAL";

const API = {
  BASE_URL: "",
};

if (mode === "LOCAL") API["BASE_URL"] = "http://localhost:3002";
if (mode === "DEV") API["BASE_URL"] = "https://ai-agent-backend-two.vercel.app";

export default API;
