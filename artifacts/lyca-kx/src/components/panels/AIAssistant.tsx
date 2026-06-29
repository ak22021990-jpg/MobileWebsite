import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, User, Phone, ExternalLink, MessageSquare, Star, Mail, CheckCircle2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getAIResponse, searchArticles, type Article } from "@/data/articles";
import { ArticleModal } from "@/components/shared/ArticleModal";
import { findArticleById } from "@/data/articles";
import { trackConversation, trackChatSurvey, type ConversationExchange } from "@/lib/analytics";
import jsPDF from "jspdf";

const suggestions = [
  "How do I activate my SIM?",
  "What are the APN settings?",
  "How do I port my number?",
  "How do I set up eSIM?",
  "How do I recharge my account?",
  "My data is not working",
];

const topics = ["Recharge", "APN Settings", "Port Number", "eSIM", "International Calls", "Balance Check"];

const AGENT_KEYWORDS = [
  "talk to someone", "talk to a person", "human", "agent", "representative", "live agent",
  "real person", "customer service", "customer support", "speak to", "speak with",
  "need a human", "no ai", "not helpful",
];

function isAgentRequest(text: string): boolean {
  return AGENT_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
}

function getAgentResponse(text: string): string {
  const lower = text.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy|hiya|yo)\b[\s!?.]*$/.test(lower))
    return "Hello there! 😊 Thank you for reaching out to Lyca Mobile Support. I'm Sarah, and it's wonderful to connect with you today. I'm here to make sure your issue is resolved as quickly as possible — what can I help you with?";

  if (/^good\s*(morning|afternoon|evening|day)/i.test(lower))
    return "Good day to you! 🌟 Welcome to Lyca Mobile Customer Support. I'm Sarah. It's great to hear from you! What can I assist you with today?";

  if (/how are you/i.test(lower))
    return "I'm doing really well, thank you so much for asking! I'm here, fully focused, and ready to help you. What's on your mind today?";

  if (/thank\s*(you|s)/i.test(lower))
    return "You're absolutely welcome! 😊 It's been a pleasure assisting you. Is there anything else I can help you with today? I'm happy to stay here until everything is sorted.";

  if (/\b(bye|goodbye|good\s*night|that'?s all|nothing else|no thanks|no thank you)\b/i.test(lower))
    return "It was truly a pleasure helping you today! 🌟 I hope everything gets resolved smoothly. Don't ever hesitate to reach back out — we're always here for you. Take care and have a wonderful day! 😊";

  if (/\b(ok|okay|got it|understood|makes sense|sounds good|alright|great)\b$/i.test(lower))
    return "Wonderful! I'm glad that's clear. 😊 Is there anything else I can assist you with today?";

  if (/\b(not working|doesn'?t work|broken|issue|problem|trouble|difficulty|error|fail)/i.test(lower)) {
    const aiAnswer = getAIResponse(text);
    return `I completely understand your frustration, and I sincerely apologize for the inconvenience you're experiencing. 🙏 Let me look into this for you right away!\n\nBased on what I'm seeing in our knowledge base, here's what should help:\n\n${aiAnswer}\n\nPlease try these steps and let me know if the issue persists — I'll personally make sure we get this sorted for you!`;
  }

  if (/\b(charge|bill|payment|refund|credit|balance|recharge)/i.test(lower)) {
    const aiAnswer = getAIResponse(text);
    return `I understand how important billing matters are, and I want to make sure this is resolved for you. 💙\n\n${aiAnswer}\n\nIf you've already tried this and are still experiencing issues, please don't worry — I can escalate this to our billing team directly. Just let me know!`;
  }

  if (/\b(data|internet|signal|apn|network|connectivity|slow)/i.test(lower)) {
    const aiAnswer = getAIResponse(text);
    return `I'm sorry you're experiencing connectivity issues — I know how frustrating that can be! Let me help you get back online. 📶\n\n${aiAnswer}\n\nThese steps resolve most connectivity issues. If you're still having trouble after trying them, please let me know your device model and I'll provide more targeted support!`;
  }

  if (/\b(port|transfer|switch|number|sim|esim|activate)/i.test(lower)) {
    const aiAnswer = getAIResponse(text);
    return `I'd be happy to walk you through this! 😊 Here's what you need to know:\n\n${aiAnswer}\n\nThis process usually takes just a few minutes. Is there a specific step where you're getting stuck? I'll guide you through it step by step!`;
  }

  if (/\b(international|abroad|roaming|call|country|rate)/i.test(lower)) {
    const aiAnswer = getAIResponse(text);
    return `Great question about international services! 🌍 Lyca Mobile is built for exactly this. Here's what I can tell you:\n\n${aiAnswer}\n\nIs there a specific country you're looking to call or travel to? I can provide more precise information!`;
  }

  const aiAnswer = getAIResponse(text);
  return `Thank you for sharing that with me! I want to make sure I give you the most helpful response possible. 💙\n\n${aiAnswer}\n\nI hope this helps! Please don't hesitate to ask if you need any clarification or have more questions — I'm right here for you.`;
}

type MessageType = "normal" | "agentOptions" | "agentConnecting" | "agentConnected";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
  isTyping?: boolean;
  articleIds?: string[];
  type?: MessageType;
};

function TypingMessage({ content, onDone }: { content: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(content.slice(0, i + 1));
      i++;
      if (i >= content.length) { clearInterval(interval); onDone?.(); }
    }, 10);
    return () => clearInterval(interval);
  }, [content]);
  return <span style={{ whiteSpace: "pre-line" }}>{displayed}</span>;
}

const WELCOME = "Hello! 👋 Welcome to Lyca Mobile Support.\n\nI'm LIA, your AI assistant. How may I help you today? I can answer questions about your plan, activation, APN settings, international calls, recharge, and more.";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function generateTranscriptPDF(msgs: Message[], agentMode: boolean): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentW = pageW - margin * 2;

  // Header background
  doc.setFillColor(14, 31, 92);
  doc.rect(0, 0, pageW, 32, "F");

  // Logo area
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Lyca Mobile", margin, 13);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 200, 255);
  doc.text("Customer Support Chat Transcript", margin, 20);

  // From / Date info
  doc.setTextColor(200, 220, 255);
  doc.setFontSize(8);
  doc.text(`From: Lyca Mobile Support <support@lycamobile.us>`, margin, 27);

  const now = new Date();
  doc.text(`Generated: ${now.toLocaleString()}`, pageW - margin, 27, { align: "right" });

  // Divider
  doc.setDrawColor(0, 102, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, 35, pageW - margin, 35);

  // Summary box
  doc.setFillColor(248, 250, 255);
  doc.roundedRect(margin, 38, contentW, 14, 2, 2, "F");
  doc.setDrawColor(220, 230, 255);
  doc.roundedRect(margin, 38, contentW, 14, 2, 2, "S");
  doc.setTextColor(14, 31, 92);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  const userMsgs = msgs.filter(m => m.role === "user").length;
  doc.text(`Session Type: ${agentMode ? "AI + Live Agent" : "AI Assistant"}  ·  Messages: ${userMsgs} customer queries  ·  Status: Resolved`, margin + 4, 46);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 120, 160);
  doc.text("This transcript is auto-generated by Lyca Mobile's Customer Support System.", margin + 4, 50);

  // Conversation
  let y = 58;
  const filteredMsgs = msgs.filter(m => m.type !== "agentConnecting" && m.id !== "init");

  for (const msg of filteredMsgs) {
    if (msg.role === "user") {
      // User bubble label
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 102, 255);
      doc.text("CUSTOMER", margin, y);
      y += 4;

      // User bubble
      const lines = doc.splitTextToSize(msg.content, contentW - 20);
      const boxH = lines.length * 4.5 + 6;
      doc.setFillColor(0, 102, 255);
      doc.roundedRect(margin + 20, y, contentW - 20, boxH, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(lines, margin + 23, y + 5);
      y += boxH + 5;
    } else if (msg.type !== "agentOptions") {
      const isAgent = msg.type === "agentConnected" || agentMode;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(isAgent ? 0 : 14, isAgent ? 160 : 31, isAgent ? 102 : 92);
      doc.text(isAgent ? "SARAH — LYCA SUPPORT AGENT" : "LIA — LYCA AI ASSISTANT", margin, y);
      y += 4;

      const lines = doc.splitTextToSize(msg.content, contentW - 20);
      const boxH = lines.length * 4.5 + 6;
      doc.setFillColor(isAgent ? 240 : 248, isAgent ? 252 : 249, isAgent ? 246 : 255);
      doc.setDrawColor(isAgent ? 187 : 220, isAgent ? 247 : 230, isAgent ? 208 : 255);
      doc.roundedRect(margin, y, contentW - 20, boxH, 2, 2, "FD");
      doc.setTextColor(50, 50, 80);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(lines, margin + 3, y + 5);
      y += boxH + 5;
    }

    if (y > 265) {
      doc.addPage();
      y = 20;
    }
  }

  // Footer
  doc.setDrawColor(220, 230, 255);
  doc.setLineWidth(0.3);
  doc.line(margin, 278, pageW - margin, 278);
  doc.setTextColor(140, 160, 200);
  doc.setFontSize(7);
  doc.text("Lyca Mobile USA · support@lycamobile.us · 1-866-277-3221 · lycamobile.us", pageW / 2, 283, { align: "center" });
  doc.text("This transcript is confidential and intended for the recipient only.", pageW / 2, 287, { align: "center" });

  doc.save(`LycaMobile-Transcript-${now.toISOString().slice(0, 10)}.pdf`);
}

const RESOLVED_PATTERNS = [
  /\b(thank\s*you|thanks|thank\s*u|thx|ty)\b/i,
  /\b(that'?s?\s*(it|all|perfect|great|helpful|good|amazing|brilliant|wonderful))\b/i,
  /\b(i'?m\s*(good|all\s*set|sorted|done|set|fine\s*now))\b/i,
  /\b(my\s*(issue|problem|query)\s*(is\s*)?(resolved|fixed|solved|sorted|working))\b/i,
  /\b(it\s*works?\s*now|working\s*now|problem\s*solved|issue\s*resolved)\b/i,
  /\b(got\s*it|no\s*more\s*(questions?|issues?|problems?)|nothing\s*else|that'?s\s*all)\b/i,
  /\b(perfect|brilliant|awesome|excellent|great\s*help|very\s*helpful)\b/i,
];

function isResolvedIntent(text: string): boolean {
  return RESOLVED_PATTERNS.some(p => p.test(text));
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTypingBot, setIsTypingBot] = useState(false);
  const [agentMode, setAgentMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "bot", content: WELCOME, type: "normal" }
  ]);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [hasNotification, setHasNotification] = useState(false);

  // Conversation tracking
  const conversationStartRef = useRef<number>(Date.now());
  const exchangesRef = useRef<ConversationExchange[]>([]);
  const agentModeRef = useRef(false);

  // Survey state
  const [surveyVisible, setSurveyVisible] = useState(false);
  const [surveyDismissed, setSurveyDismissed] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [surveyRating, setSurveyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [surveyComment, setSurveyComment] = useState("");
  const [showEmailField, setShowEmailField] = useState(false);
  const [surveyEmail, setSurveyEmail] = useState("");
  const [transcriptDownloaded, setTranscriptDownloaded] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const surveyTriggeredRef = useRef(false);

  const userMessageCount = messages.filter(m => m.role === "user").length;

  // Keep agentModeRef in sync
  useEffect(() => { agentModeRef.current = agentMode; }, [agentMode]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTypingBot, surveyVisible]);

  useEffect(() => {
    const handler = () => openPanel();
    window.addEventListener("openAIAssistant", handler);
    return () => window.removeEventListener("openAIAssistant", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        minimizePanel();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, messages]);

  const openPanel = useCallback(() => {
    setIsOpen(true);
    setHasNotification(false);
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const minimizePanel = useCallback(() => {
    setIsOpen(false);
    const lastUser = [...messages].reverse().find(m => m.role === "user");
    if (!lastUser) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      const followUpContent = `I believe you may be busy at the moment! However, based on your query about "${lastUser.content.slice(0, 60)}${lastUser.content.length > 60 ? "..." : ""}", here's a quick self-service tip:\n\n${getAIResponse(lastUser.content)}`;
      setMessages(prev => [...prev, { id: "followup-" + Date.now(), role: "bot", type: "normal", content: followUpContent }]);
      setHasNotification(true);
    }, 60000);
  }, [messages]);

  const addBotMessage = useCallback((msg: Omit<Message, "id">) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), ...msg }]);
  }, []);

  const startAgentConnecting = useCallback(() => {
    setIsTypingBot(true);
    addBotMessage({ role: "bot", content: "🔍 Searching for available agents...", type: "agentConnecting" });
    setTimeout(() => {
      setMessages(prev => [...prev.slice(0, -1), { id: Date.now().toString(), role: "bot", content: "⏳ Connecting you to Sarah from Customer Support...", type: "agentConnecting" }]);
    }, 1500);
    setTimeout(() => {
      setMessages(prev => [...prev.slice(0, -1), {
        id: Date.now().toString(), role: "bot", type: "agentConnected",
        content: "✅ Connected!\n\nHi, I'm Sarah from Lyca Mobile Customer Support. 😊 I can see your conversation history and I'm fully up to speed on your situation. I'm here to personally make sure everything gets resolved for you today. How can I help?",
      }]);
      setAgentMode(true);
      setIsTypingBot(false);
    }, 3200);
  }, [addBotMessage]);

  const triggerSurveyFlow = useCallback((isAgent: boolean) => {
    if (surveyTriggeredRef.current) return;
    surveyTriggeredRef.current = true;
    const closingMsg = isAgent
      ? "Thank you for contacting Lyca Mobile Support. We hope we were able to resolve your query today."
      : "You're welcome! I'm glad I could help. If you need any further assistance, we're always here to help.";
    const surveyPrompt = isAgent
      ? "We'd appreciate your feedback. Please take a moment to complete our short survey."
      : "Before you leave, we'd appreciate your feedback. Please take a moment to complete our short survey.";

    setIsTypingBot(true);
    setTimeout(() => {
      addBotMessage({ role: "bot", content: closingMsg, type: "normal" });
      setIsTypingBot(false);
      setTimeout(() => {
        setIsTypingBot(true);
        setTimeout(() => {
          addBotMessage({ role: "bot", content: surveyPrompt, type: "normal" });
          setIsTypingBot(false);
          setSurveyVisible(true);
        }, 600);
      }, 1000);
    }, 600);
  }, [addBotMessage]);

  const handleAgentEndConversation = useCallback(() => {
    triggerSurveyFlow(true);
  }, [triggerSurveyFlow]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim() || isTypingBot) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, type: "normal" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTypingBot(true);
    setHasNotification(false);

    const isEscalation = isAgentRequest(text);
    if (isEscalation && !agentModeRef.current) {
      exchangesRef.current.push({
        question: text,
        response: "[Customer requested live agent]",
        timestamp: Date.now(),
        isAgentResponse: false,
      });
      setTimeout(() => {
        setIsTypingBot(false);
        addBotMessage({ role: "bot", type: "agentOptions", content: "I understand you'd like to speak with someone from our team. Please choose how you'd like to connect:", articleIds: [] });
      }, 800);
      return;
    }

    // Detect resolved intent — trigger closing flow instead of normal response
    if (isResolvedIntent(text) && !surveyTriggeredRef.current) {
      exchangesRef.current.push({
        question: text,
        response: "[Customer indicated issue resolved]",
        timestamp: Date.now(),
        isAgentResponse: agentModeRef.current,
      });
      setIsTypingBot(false);
      triggerSurveyFlow(agentModeRef.current);
      return;
    }

    const related = agentModeRef.current ? [] : searchArticles(text).slice(0, 2);
    const qTimestamp = Date.now();
    setTimeout(() => {
      const raw = agentModeRef.current
        ? getAgentResponse(text)
        : `Sure, let me help you with that!\n\n${getAIResponse(text)}`;

      exchangesRef.current.push({
        question: text,
        response: raw.slice(0, 800),
        timestamp: qTimestamp,
        isAgentResponse: agentModeRef.current,
      });

      addBotMessage({ role: "bot", content: raw, articleIds: related.map(a => a.id), type: "normal" });
      setIsTypingBot(false);
    }, 800 + Math.random() * 600);
  }, [isTypingBot, addBotMessage, triggerSurveyFlow]);

  const handleEscalate = useCallback(() => {
    setMessages(prev => prev.map(m => m.type === "agentOptions" ? { ...m, type: "normal" as MessageType } : m));
    startAgentConnecting();
  }, [startAgentConnecting]);

  const handleSurveySubmit = () => {
    if (!surveyRating) return;
    // Track the full conversation session
    if (exchangesRef.current.length > 0) {
      trackConversation(
        exchangesRef.current,
        agentModeRef.current,
        conversationStartRef.current,
        agentModeRef.current ? "Sarah" : undefined
      );
    }
    trackChatSurvey(surveyRating, surveyComment || undefined, pdfGenerated, userMessageCount, agentModeRef.current);
    setSurveySubmitted(true);
    setTimeout(() => {
      setSurveyVisible(false);
      setSurveyDismissed(true);
    }, 2200);
  };

  const handleSurveySkip = () => {
    // Still track conversation on skip
    if (exchangesRef.current.length > 0) {
      trackConversation(exchangesRef.current, agentModeRef.current, conversationStartRef.current, agentModeRef.current ? "Sarah" : undefined);
      exchangesRef.current = [];
    }
    setSurveyVisible(false);
    setSurveyDismissed(true);
  };

  const handleDownloadTranscript = () => {
    generateTranscriptPDF(messages, agentMode);
    setPdfGenerated(true);
    setTranscriptDownloaded(true);
  };

  const openArticle = (id: string) => {
    const art = findArticleById(id);
    if (art) setActiveArticle(art);
  };

  const lastBotMsgId = [...messages].reverse().find(m => m.role === "bot")?.id;
  const wordCount = countWords(surveyComment);
  const starLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1.5">
            <AnimatePresence>
              {hasNotification && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-slate-800 border border-border rounded-xl px-3 py-2 shadow-xl max-w-[220px] text-xs text-muted-foreground cursor-pointer"
                  onClick={openPanel}>
                  💬 LIA has a suggestion for you! Tap to view.
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-md">
                Ask Lyca AI
              </span>
              <div className="relative">
                <div className="absolute inset-0 bg-[#0066FF] rounded-full animate-ping opacity-20" />
                <button ref={triggerRef} onClick={openPanel}
                  className="relative w-16 h-16 rounded-full bg-[#0066FF] shadow-2xl hover:scale-105 hover:bg-[#0052cc] transition-all focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 flex items-center justify-center"
                  aria-label="Open LIA AI Assistant">
                  <Bot className="w-8 h-8 text-white" />
                </button>
                {hasNotification && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={panelRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[390px] h-[75vh] md:h-[560px] max-h-screen bg-background border border-border md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={`text-white p-4 flex items-center justify-between shrink-0 ${agentMode ? "bg-[#00a066]" : "bg-[#0E1F5C]"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${agentMode ? "bg-white/20" : "bg-[#0066FF]"}`}>
                  {agentMode ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{agentMode ? "Sarah — Lyca Support" : "LIA — Lyca AI Assistant"}</h3>
                  <div className="flex items-center text-[10px] text-emerald-300">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse" />
                    {agentMode ? "Live Agent Connected" : "Online · AI powered"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {agentMode && !surveyTriggeredRef.current && (
                  <button
                    onClick={handleAgentEndConversation}
                    className="text-white/80 hover:text-white text-[10px] font-medium border border-white/30 rounded px-2 py-1 hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    End Conversation
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50 dark:bg-transparent" ref={scrollRef}>
              {messages.length === 1 && !isTypingBot && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Suggested Questions</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {suggestions.map((q, i) => (
                        <button key={i} onClick={() => handleSend(q)}
                          className="text-left text-xs bg-white dark:bg-slate-800 border border-border p-2.5 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground font-medium">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">Popular Topics</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topics.map((t, i) => (
                        <button key={i} onClick={() => handleSend(t)}
                          className="text-[11px] bg-white dark:bg-slate-800 border border-border px-2.5 py-1 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-colors font-medium">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${agentMode && msg.type !== "agentConnecting" ? "bg-[#00a066]" : "bg-[#0066FF]"}`}>
                      {agentMode && msg.type !== "agentConnecting"
                        ? <User className="w-4 h-4 text-white" />
                        : <Bot className="w-4 h-4 text-white" />}
                    </div>
                  )}

                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                    {msg.type === "agentOptions" ? (
                      <div className="bg-white dark:bg-slate-800 border border-border rounded-2xl rounded-tl-sm shadow-sm p-4 space-y-3">
                        <p className="text-sm text-foreground">{msg.content}</p>
                        <Button size="sm" className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white gap-2 justify-center" onClick={handleEscalate}>
                          <MessageSquare className="w-4 h-4" /> 💬 Live Chat with Agent
                        </Button>
                        <a href="tel:18662773221" className="block w-full">
                          <Button size="sm" variant="outline" className="w-full gap-2 justify-center">
                            <Phone className="w-4 h-4" /> 📞 Call 1-866-277-3221
                          </Button>
                        </a>
                        <p className="text-[10px] text-muted-foreground text-center">Mon–Sat 8AM–10PM EST · Sun 9AM–8PM EST</p>
                      </div>
                    ) : msg.type === "agentConnecting" ? (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-3 rounded-2xl rounded-tl-sm">
                        <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shrink-0" />{msg.content}
                        </p>
                      </div>
                    ) : msg.type === "agentConnected" ? (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-3 rounded-2xl rounded-tl-sm">
                        <p className="text-sm text-emerald-800 dark:text-emerald-300" style={{ whiteSpace: "pre-line" }}>{msg.content}</p>
                      </div>
                    ) : (
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[#0066FF] text-white rounded-tr-sm" : "bg-white dark:bg-slate-800 border border-border rounded-tl-sm shadow-sm text-foreground"}`}
                        style={{ whiteSpace: "pre-line" }}>
                        {msg.id === lastBotMsgId && msg.role === "bot" && !isTypingBot
                          ? <TypingMessage content={msg.content} />
                          : msg.content}
                      </div>
                    )}

                    {msg.role === "bot" && msg.articleIds && msg.articleIds.length > 0 && (
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-[10px] text-muted-foreground pl-1">Related articles:</p>
                        {msg.articleIds.map(id => {
                          const art = findArticleById(id);
                          if (!art) return null;
                          return (
                            <button key={id} onClick={() => openArticle(id)}
                              className="text-left text-xs bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-3 py-2 rounded-lg hover:border-primary/50 transition-colors flex items-center gap-2 text-[#0066FF] font-medium">
                              <ExternalLink className="w-3 h-3 shrink-0" />{art.title}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTypingBot && (
                <div className="flex gap-3 justify-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${agentMode ? "bg-[#00a066]" : "bg-[#0066FF]"}`}>
                    {agentMode ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-border p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-10">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span key={i} className="w-2 h-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Survey card */}
            <AnimatePresence>
              {surveyVisible && !surveySubmitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="overflow-hidden shrink-0 border-t border-border">
                  <div className="bg-gradient-to-r from-[#0E1F5C]/5 to-[#0066FF]/5 dark:from-slate-800 dark:to-slate-800 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold">How was your {agentMode ? "experience with Sarah" : "experience"}?</p>
                        <p className="text-[11px] text-muted-foreground">{agentMode ? "Rate your agent support" : "Optional — helps us improve LIA"}</p>
                      </div>
                      <button onClick={handleSurveySkip} className="text-muted-foreground hover:text-foreground text-[10px] font-medium mt-0.5 whitespace-nowrap">
                        Not this time
                      </button>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setSurveyRating(star)}
                          className="p-0.5 transition-transform hover:scale-110">
                          <Star className={`w-7 h-7 transition-colors ${star <= (hoverRating || surveyRating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                        </button>
                      ))}
                      {(hoverRating || surveyRating) > 0 && (
                        <span className="text-xs font-medium text-amber-600 ml-1">{starLabels[hoverRating || surveyRating]}</span>
                      )}
                    </div>

                    {/* Comment */}
                    <div className="relative mb-2">
                      <textarea
                        placeholder="Share more details (optional, max 100 words)..."
                        value={surveyComment}
                        onChange={e => {
                          const words = e.target.value.trim().split(/\s+/).filter(Boolean);
                          if (words.length <= 100 || e.target.value.length < surveyComment.length) {
                            setSurveyComment(e.target.value);
                          }
                        }}
                        rows={2}
                        className="w-full text-xs bg-white dark:bg-slate-700 border border-border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-[#0066FF]/30 focus:border-[#0066FF] transition-all"
                      />
                      {surveyComment && (
                        <span className={`absolute bottom-2 right-2 text-[9px] ${wordCount >= 90 ? "text-amber-500" : "text-muted-foreground"}`}>
                          {wordCount}/100 words
                        </span>
                      )}
                    </div>

                    {/* Transcript download */}
                    <div className="mb-3">
                      {!transcriptDownloaded ? (
                        <button onClick={handleDownloadTranscript}
                          className="flex items-center gap-1.5 text-xs text-[#0066FF] hover:underline font-medium">
                          <Download className="w-3.5 h-3.5" /> Download PDF transcript of this chat
                        </button>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Transcript PDF saved!
                          </div>
                          {!showEmailField ? (
                            <button onClick={() => setShowEmailField(true)}
                              className="flex items-center gap-1.5 text-xs text-[#0066FF] hover:underline font-medium">
                              <Mail className="w-3.5 h-3.5" /> Also send a copy to my email
                            </button>
                          ) : (
                            <div className="flex gap-2 items-center">
                              <input
                                type="email"
                                placeholder="your@email.com"
                                value={surveyEmail}
                                onChange={e => setSurveyEmail(e.target.value)}
                                className="flex-1 text-xs bg-white dark:bg-slate-700 border border-border rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
                              />
                              <button
                                onClick={() => {
                                  if (surveyEmail.includes("@")) {
                                    setPdfGenerated(true);
                                    setShowEmailField(false);
                                  }
                                }}
                                className="text-xs font-semibold text-white bg-[#0066FF] hover:bg-[#0052cc] px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                                Confirm
                              </button>
                            </div>
                          )}
                          {pdfGenerated && surveyEmail && !showEmailField && (
                            <p className="text-[10px] text-muted-foreground">
                              📧 A copy from <span className="font-semibold text-[#0066FF]">support@lycamobile.us</span> will be sent to {surveyEmail}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button onClick={handleSurveySubmit}
                      disabled={!surveyRating}
                      className="w-full py-2 text-sm font-semibold bg-[#0066FF] hover:bg-[#0052cc] disabled:opacity-40 text-white rounded-lg transition-colors">
                      Submit Feedback
                    </button>
                  </div>
                </motion.div>
              )}
              {surveySubmitted && surveyVisible && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="shrink-0 border-t border-border p-4 bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Thank you! Your feedback helps us serve you better. 🎉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-3 bg-background border-t border-border shrink-0">
              <form onSubmit={e => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 mb-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={agentMode ? "Message Sarah..." : "Ask me anything..."}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF] transition-all"
                  disabled={isTypingBot}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
                />
                <button type="submit" disabled={!input.trim() || isTypingBot}
                  className="w-9 h-9 rounded-full bg-[#0066FF] hover:bg-[#0052cc] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-[11px] text-muted-foreground hover:text-foreground py-1 transition-colors"
              >
                Close Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onRelatedClick={(id) => {
          const art = findArticleById(id);
          if (art) setActiveArticle(art);
        }}
      />
    </>
  );
}
