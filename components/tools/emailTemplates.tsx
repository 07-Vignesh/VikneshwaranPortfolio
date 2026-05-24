export interface EmailTemplate {
  title: string;
  icon: string;
  description: string;
  prompt: string;
  tags: string[];
}

export const emailTemplates: EmailTemplate[] = [
  {
    title: "Professional Introduction",
    icon: "👔",
    description: "Introduce yourself to Viknesh professionally.",
    prompt:
      "Write a professional email to Viknesh introducing myself as a developer/professional. Mention that I came across his portfolio and was impressed by his projects like SkillConnect and Learnify Careers AI. Express interest in networking, collaboration, and future opportunities.",
    tags: ["Business", "Networking"],
  },

  {
    title: "Project Proposal",
    icon: "📊",
    description: "Send a project proposal to Viknesh.",
    prompt:
      "Write a professional project proposal email to Viknesh. I have a web or AI-based project regarding [Project Topic] and I am looking for a skilled Full Stack Developer. Ask about his availability, development process, estimated timeline, and interest in discussing the project further.",
    tags: ["Proposal", "Business"],
  },

  {
    title: "Collaboration Opportunity",
    icon: "🤝",
    description: "Invite Viknesh for collaboration.",
    prompt:
      "Write an email to Viknesh proposing a collaboration opportunity. Mention that I am working on an innovative startup/open-source project and believe his experience in React.js, Next.js, MERN Stack, and AI integration would be valuable. Ask if he is open to discussing the collaboration in a quick meeting.",
    tags: ["Collaboration", "Startup"],
  },

  {
    title: "Internship / Job Opportunity",
    icon: "💼",
    description: "Recruit Viknesh for a role.",
    prompt: `Write a professional recruitment email to Viknesh for a software development opportunity.

Include these details:

My Name: [Your Name]
Company: [Company Name]
Role: Full Stack Developer / Frontend Developer
Location: [Remote/Hybrid/Onsite]
Tech Stack: React.js, Next.js, Node.js, MongoDB
Salary/Stipend: [Amount]

Mention that I reviewed his portfolio projects including SkillConnect, Learnify Careers AI, and Smart Bus Tracking System, and I was impressed by his AI integration and full-stack development skills. Invite him for an interview or discussion regarding the opportunity.`,
    tags: ["Recruitment", "Career"],
  },

  {
    title: "Hackathon Invitation",
    icon: "🚀",
    description: "Invite Viknesh to a hackathon or tech event.",
    prompt:
      "Write a professional email inviting Viknesh to participate in a hackathon or technical event. Mention that his experience in AI projects, full-stack development, and event management makes him a strong candidate for the competition.",
    tags: ["Hackathon", "Event"],
  },

  {
    title: "Freelance Project Inquiry",
    icon: "🧠",
    description: "Ask Viknesh for freelance development work.",
    prompt:
      "Write a freelance inquiry email to Viknesh asking if he is available for a freelance web development project. Mention requirements related to React.js, Next.js, AI integration, or dashboard development and ask for pricing and estimated delivery timeline.",
    tags: ["Freelance", "Business"],
  },

  {
    title: "General Inquiry",
    icon: "💡",
    description: "Ask Viknesh a general question.",
    prompt:
      "Write a friendly and professional email to Viknesh asking about one of his projects, technology stack, or development experience. Keep the email concise, respectful, and engaging.",
    tags: ["Inquiry", "General"],
  },
];