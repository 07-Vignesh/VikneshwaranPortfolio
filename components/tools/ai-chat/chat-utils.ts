import { useState, useCallback, useEffect, useRef } from "react";
import { Message, StructuredContent, ThemeChange } from "./types";

const useJWTAuth = () => {
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  const generateNewToken = useCallback(async (): Promise<string | null> => {
    if (isTokenLoading) return null;
    setIsTokenLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "anonymous",
          sessionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }),
      });
      if (response.ok) {
        const { token: newToken } = await response.json();
        return newToken;
      }
    } catch (error) {
      console.error("Failed to get authentication token:", error);
    } finally {
      setIsTokenLoading(false);
    }
    return null;
  }, [isTokenLoading]);

  const clearToken = useCallback(() => {
    sessionStorage.removeItem("jwt_token");
  }, []);

  return { generateNewToken, clearToken, isTokenLoading };
};

/* ─────────────────────────────────────────
   THEME HANDLER
───────────────────────────────────────── */
export const useThemeHandler = () => {
  const [isThemeMode, setIsThemeMode] = useState(false);
  const [themeChangeHistory, setThemeChangeHistory] = useState<string[]>([]);

  const applyThemeChanges = useCallback((changes: ThemeChange[]) => {
    if (!changes || !Array.isArray(changes)) return;
    changes.forEach((change) => {
      try {
        switch (change.type) {
          case "style":
            document.querySelectorAll(change.selector).forEach((el) => {
              (el as HTMLElement).style.setProperty(change.property!, change.value!);
            });
            break;
          case "visibility":
            document.querySelectorAll(change.selector).forEach((el) => {
              if (change.action === "hide") {
                (el as HTMLElement).style.setProperty("display", "none");
              } else if (change.action === "show") {
                (el as HTMLElement).style.removeProperty("display");
              }
            });
            break;
          case "attribute":
            document.querySelectorAll(change.selector).forEach((el) => {
              el.setAttribute(change.attribute!, change.value!);
            });
            break;
          case "class":
            document.querySelectorAll(change.selector).forEach((el) => {
              if (change.action === "add") el.classList.add(change.class!);
              else if (change.action === "remove") el.classList.remove(change.class!);
            });
            break;
          case "move":
            const elToMove = document.querySelector(change.selector);
            const destination = document.querySelector(change.destination!);
            if (elToMove && destination) {
              destination.insertAdjacentElement(change.position as InsertPosition, elToMove);
            }
            break;
          case "reorder":
            const parent = document.querySelector(change.parent!);
            if (parent && Array.isArray(change.order)) {
              const orderedElements: Element[] = [];
              change.order.forEach((selector) => {
                const child = parent.querySelector(selector);
                if (child) { orderedElements.push(child); parent.removeChild(child); }
              });
              orderedElements.forEach((el) => parent.appendChild(el));
            }
            break;
          default:
            if (change.selector && change.property && change.value) {
              document.querySelectorAll(change.selector).forEach((el) => {
                (el as HTMLElement).style.setProperty(change.property!, change.value!);
              });
            }
        }
      } catch (error) {
        console.error("Error applying change:", change, error);
      }
    });
  }, []);

  useEffect(() => {
    const savedThemeChanges = localStorage.getItem("websiteThemeChanges");
    if (savedThemeChanges) {
      try {
        const changes = JSON.parse(savedThemeChanges);
        setThemeChangeHistory(changes);
        setTimeout(() => applyThemeChanges(changes), 500);
      } catch (error) {
        console.error("Error loading saved theme:", error);
      }
    }
  }, [applyThemeChanges]);

  useEffect(() => {
    const hasChanges = localStorage.getItem("hasThemeChanges") === "true";
    if (hasChanges) setThemeChangeHistory(["Previously applied theme changes are active"]);
  }, []);

  const resetThemeChanges = useCallback(() => {
    localStorage.removeItem("hasThemeChanges");
    localStorage.removeItem("websiteThemeChanges");
    setTimeout(() => window.location.reload(), 1500);
  }, []);

  const formatChangeForDisplay = useCallback((change: ThemeChange): string => {
    switch (change.type) {
      case "style":      return `Changed \`${change.property}\` to \`${change.value}\` for \`${change.selector}\``;
      case "visibility": return `${change.action === "hide" ? "Hidden" : "Showed"} \`${change.selector}\``;
      case "attribute":  return `Set attribute \`${change.attribute}=${change.value}\` on \`${change.selector}\``;
      case "class":      return `${change.action === "add" ? "Added" : "Removed"} class \`${change.class}\` ${change.action === "add" ? "to" : "from"} \`${change.selector}\``;
      case "move":       return `Moved \`${change.selector}\` to ${change.position} of \`${change.destination}\``;
      case "reorder":    return `Reordered children within \`${change.parent}\``;
      default:           return `Applied change to \`${change.selector}\``;
    }
  }, []);

  return {
    isThemeMode, setIsThemeMode,
    themeChangeHistory, setThemeChangeHistory,
    applyThemeChanges, resetThemeChanges, formatChangeForDisplay,
  };
};

/* ─────────────────────────────────────────
   MESSAGE HANDLER
───────────────────────────────────────── */
export const useMessageHandler = (themeHandlers: ReturnType<typeof useThemeHandler>) => {
  const [messages,    setMessages]    = useState<Message[]>([]);
  const [isLoading,   setIsLoading]   = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error,       setError]       = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { generateNewToken } = useJWTAuth();
  const { setIsThemeMode, setThemeChangeHistory, applyThemeChanges } = themeHandlers;

  const isThemeRequest = useCallback((message: string) => {
    return message.toLowerCase().trim().startsWith("theme:");
  }, []);

  const extractCodeFromMarkdown = useCallback((markdown: string) => {
    const codeRegex = /```(?:js|javascript)([\s\S]*?)```/;
    const match = markdown.match(codeRegex);
    return match ? match[1].trim() : null;
  }, []);

  const executeThemeCode = useCallback(async (code: string) => {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const wrappedCode = `${code}\nreturn await applyThemeChanges();`;
      const executor = new AsyncFunction(wrappedCode);
      return await executor();
    } catch (error) {
      console.error("Error executing theme code:", error);
      throw new Error("Failed to execute theme changes");
    }
  }, []);

  const processThemeRequest = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    setIsThemeMode(true);
    try {
      const response = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });
      if (!response.ok) throw new Error("Failed to get theme response");
      const data = await response.json();
      const jsCode = extractCodeFromMarkdown(data.response);
      if (!jsCode) throw new Error("No valid JavaScript code found in the response");
      const changes = await executeThemeCode(jsCode);
      if (changes && Array.isArray(changes)) {
        applyThemeChanges(changes);
        const changeDescriptions = changes.map((change: ThemeChange) => {
          switch (change.type) {
            case "style":      return `Changed ${change.property} to ${change.value} for ${change.selector}`;
            case "visibility": return `${change.action === "hide" ? "Hidden" : "Showed"} ${change.selector}`;
            case "class":      return `${change.action === "add" ? "Added" : "Removed"} class ${change.class} ${change.action === "add" ? "to" : "from"} ${change.selector}`;
            default:           return `Applied change to ${change.selector}`;
          }
        });
        setThemeChangeHistory((prev) => [...prev, ...changeDescriptions]);
        localStorage.setItem("hasThemeChanges", "true");
        localStorage.setItem("websiteThemeChanges", JSON.stringify(changes));
        return {
          content: `**Theme Applied Successfully!**\n\nChanges made:\n${changeDescriptions.map((c) => `- ${c}`).join("\n")}`,
          structuredContent: null,
        };
      }
      return { content: "The theme was processed, but no changes were reported.", structuredContent: null };
    } catch (error) {
      console.error("Theme processing error:", error);
      return {
        content: `**Error applying theme**: ${error instanceof Error ? error.message : "Unknown error"}`,
        structuredContent: null,
      };
    } finally {
      setIsLoading(false);
      setIsThemeMode(false);
    }
  }, [extractCodeFromMarkdown, executeThemeCode, setIsThemeMode, setThemeChangeHistory, applyThemeChanges]);

  const parseStructuredContent = useCallback((content: string): StructuredContent | null => {
    try {
      if (!content) return null;
      if (content.includes("```json") && content.includes("```")) {
        const jsonMatch = content.match(/```json([\s\S]*?)```/);
        if (jsonMatch?.[1]) return JSON.parse(jsonMatch[1].trim());
      }
      return null;
    } catch (error) {
      console.error("Failed to parse structured content:", error);
      return null;
    }
  }, []);

  const processMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    setError("");
    try {
      const authToken = await generateNewToken();
      if (!authToken) throw new Error("Unable to authenticate. Please try again.");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ prompt: userMessage, messages, structuredResponse: true }),
      });
      if (!response.ok) {
        if (response.status === 401) throw new Error("Authentication failed. Please try again.");
        throw new Error("Failed to get response");
      }
      const data = await response.json();
      if (data.isSearchPerformed) {
        setIsSearching(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSearching(false);
      }
      return {
        content: data.response,
        structuredContent: data.structuredContent || null,
        hasStructuredData: data.hasStructuredData,
        structuredDataType: data.structuredDataType,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [messages, parseStructuredContent, generateNewToken]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return {
    messages, setMessages,
    isLoading, isSearching,
    error, setError,
    messagesEndRef,
    isThemeRequest,
    processThemeRequest,
    processMessage,
    parseStructuredContent,
  };
};

export const isTrustedClick = (e: React.MouseEvent): boolean => e.isTrusted;

/* ─────────────────────────────────────────
   INITIALIZE CHAT — updated welcome message
───────────────────────────────────────── */
export const initializeChat = async (
  setMessages: (messages: Message[]) => void,
  setError: (error: string) => void
) => {
  try {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;
    const mainContent = mainElement.cloneNode(true) as HTMLElement;
    ["[data-chat-modal]", "#contact", "[data-contact-section]", "form",
     ".contact-section", "script", "style", "noscript", "iframe"].forEach((selector) => {
      mainContent.querySelectorAll(selector).forEach((el) => el.remove());
    });

    setMessages([
      {
        type: "assistant",
        content:
          "Hi! I'm Vikneshwaran's AI assistant. I can tell you about his projects, skills, experience, and more. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    setError("Failed to initialize chat. Please try again.");
  }
};