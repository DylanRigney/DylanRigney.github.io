import OpenAI from "openai";
import { personas } from "./data";

export const agentTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "start_guided_tour",
      description: "Navigates the user to a specific section of the portfolio during a guided tour. Use this when you are conducting a step-by-step tour and want to move to the next section.",
      parameters: {
        type: "object",
        properties: {
          section: {
            type: "string",
            description: "The section of the portfolio to navigate to.",
            enum: ["home", "about", "projects", "skills", "experience"],
          },
        },
        required: ["section"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "set_ambient_mood",
      description: "Changes the WebGL ambient lighting color of the website based on the topic being discussed. Use this to create a visually impressive experience.",
      parameters: {
        type: "object",
        properties: {
          color: {
            type: "string",
            description: "The hex color code for the ambient light (e.g. #00ffff for AI Engineer/Cyber Cyan, #8b5cf6 for Product Manager/Deep Violet, #10b981 for Teaching/Emerald Green, #3b82f6 for SWE/Azure Blue, #fbbf24 for Gold).",
          },
        },
        required: ["color"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "request_recruiter_connect",
      description: "Generates an interactive form for recruiters/visitors to enter their information (Name, Company, Role). Once submitted, it will provide a tailored pitch and email Dylan. Use this when a user expresses interest in hiring, connecting, or evaluating fit.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "spotlight_project_architecture",
      description: "Renders an interactive Generative UI Architecture Card inside the chat stream. It shows system architecture workflow loops, tech stack badges, and key metrics. Use this when asked about project details, how something was built, or technical architecture.",
      parameters: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
            description: "The ID of the project to spotlight (e.g., 'adaptive-fitness', 'prediction-copilot', 'autonomous-task'). If not specific, pick 'prediction-copilot'.",
            enum: ["adaptive-fitness", "prediction-copilot", "autonomous-task"],
          },
        },
        required: ["projectId"],
      },
    },
  }
];
