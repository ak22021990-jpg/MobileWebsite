export interface SearchEvent {
  id: string;
  term: string;
  articleReturned?: string;
  timestamp: number;
  sessionId: string;
  country: string;
  timezone: string;
  resultsFound: number;
}

export interface ConversationExchange {
  question: string;
  response: string;
  timestamp: number;
  isAgentResponse: boolean;
}

export interface ConversationSession {
  id: string;
  sessionId: string;
  country: string;
  startTime: number;
  endTime: number;
  exchanges: ConversationExchange[];
  wasEscalated: boolean;
  queryType: "single" | "multi";
  agentName?: string;
}

export interface ArticleFeedback {
  id: string;
  articleId: string;
  articleTitle: string;
  helpful: boolean;
  reason?: string;
  timestamp: number;
  sessionId: string;
  country: string;
}

export interface ChatSurvey {
  id: string;
  rating: number;
  comment?: string;
  emailSent: boolean;
  timestamp: number;
  sessionId: string;
  country: string;
  messageCount: number;
  wasAgentSession: boolean;
}

const KEYS = {
  searches: "lyca_kx_searches",
  conversations: "lyca_kx_conversations",
  feedback: "lyca_kx_article_feedback",
  surveys: "lyca_kx_chat_surveys",
  session: "lyca_kx_session_id",
};

function uid(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getSessionId(): string {
  let id = sessionStorage.getItem(KEYS.session);
  if (!id) { id = uid(); sessionStorage.setItem(KEYS.session, id); }
  return id;
}

export function getCountryFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const map: Record<string, string> = {
      "America/New_York": "USA (East)", "America/Chicago": "USA (Central)",
      "America/Denver": "USA (Mountain)", "America/Los_Angeles": "USA (West)",
      "America/Phoenix": "USA (Arizona)", "America/Anchorage": "USA (Alaska)",
      "Pacific/Honolulu": "USA (Hawaii)", "America/Mexico_City": "Mexico",
      "America/Toronto": "Canada (East)", "America/Vancouver": "Canada (West)",
      "Europe/London": "United Kingdom", "Europe/Paris": "France",
      "Europe/Berlin": "Germany", "Europe/Madrid": "Spain", "Europe/Rome": "Italy",
      "Asia/Karachi": "Pakistan", "Asia/Kolkata": "India", "Asia/Dhaka": "Bangladesh",
      "Asia/Manila": "Philippines", "Asia/Riyadh": "Saudi Arabia", "Asia/Dubai": "UAE",
      "Asia/Shanghai": "China", "Asia/Tokyo": "Japan",
      "Africa/Lagos": "Nigeria", "Africa/Accra": "Ghana",
      "America/Sao_Paulo": "Brazil", "America/Bogota": "Colombia",
      "America/Santo_Domingo": "Dominican Republic", "America/Jamaica": "Jamaica",
    };
    if (map[tz]) return map[tz];
    if (tz.startsWith("America/")) return "Americas";
    if (tz.startsWith("Europe/")) return "Europe";
    if (tz.startsWith("Asia/")) return "Asia";
    if (tz.startsWith("Africa/")) return "Africa";
    return tz || "Unknown";
  } catch { return "Unknown"; }
}

function readStore<T>(key: string): T[] {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : []; }
  catch { return []; }
}

function saveStore<T>(key: string, data: T[]): void {
  try { localStorage.setItem(key, JSON.stringify(data.slice(-2000))); } catch { }
}

export function trackSearch(term: string, resultsFound: number, articleReturned?: string): void {
  if (!term.trim()) return;
  const events = readStore<SearchEvent>(KEYS.searches);
  events.push({
    id: uid(),
    term: term.trim().toLowerCase(),
    articleReturned: articleReturned?.trim(),
    timestamp: Date.now(),
    sessionId: getSessionId(),
    country: getCountryFromTimezone(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    resultsFound,
  });
  saveStore(KEYS.searches, events);
}

export function trackConversation(
  exchanges: ConversationExchange[],
  wasEscalated: boolean,
  startTime: number,
  agentName?: string
): void {
  if (exchanges.length === 0) return;
  const sessions = readStore<ConversationSession>(KEYS.conversations);
  sessions.push({
    id: uid(),
    sessionId: getSessionId(),
    country: getCountryFromTimezone(),
    startTime,
    endTime: Date.now(),
    exchanges,
    wasEscalated,
    queryType: exchanges.filter(e => !e.isAgentResponse).length > 1 ? "multi" : "single",
    agentName,
  });
  saveStore(KEYS.conversations, sessions);
}

export function trackArticleFeedback(articleId: string, articleTitle: string, helpful: boolean, reason?: string): void {
  const events = readStore<ArticleFeedback>(KEYS.feedback);
  events.push({
    id: uid(), articleId, articleTitle, helpful, reason,
    timestamp: Date.now(), sessionId: getSessionId(), country: getCountryFromTimezone(),
  });
  saveStore(KEYS.feedback, events);
}

export function trackChatSurvey(
  rating: number,
  comment: string | undefined,
  emailSent: boolean,
  messageCount: number,
  wasAgentSession: boolean
): void {
  const events = readStore<ChatSurvey>(KEYS.surveys);
  events.push({
    id: uid(), rating, comment: comment?.trim() || undefined, emailSent,
    timestamp: Date.now(), sessionId: getSessionId(),
    country: getCountryFromTimezone(), messageCount, wasAgentSession,
  });
  saveStore(KEYS.surveys, events);
}

export interface AnalyticsData {
  topSearches: {
    term: string;
    count: number;
    uniqueUsers: number;
    countries: Record<string, number>;
    lastSearched: number;
    lastArticle?: string;
  }[];
  recentSearchEvents: SearchEvent[];
  countrySplit: Record<string, number>;
  categoryCounts: Record<string, number>;
  conversationSessions: ConversationSession[];
  articleFeedback: ArticleFeedback[];
  chatSurveys: ChatSurvey[];
  totalSearches: number;
  totalConversations: number;
  totalFeedback: number;
  positiveRating: number;
  agentEscalations: number;
  totalSurveys: number;
  avgChatRating: number;
  avgAgentRating: number;
}

export function getAnalyticsData(): AnalyticsData {
  const searches = readStore<SearchEvent>(KEYS.searches);
  const conversationSessions = readStore<ConversationSession>(KEYS.conversations);
  const articleFeedback = readStore<ArticleFeedback>(KEYS.feedback);
  const chatSurveys = readStore<ChatSurvey>(KEYS.surveys);

  const sc: Record<string, { count: number; sessions: Set<string>; countries: Record<string, number>; last: number; lastArticle?: string }> = {};
  for (const s of searches) {
    if (!sc[s.term]) sc[s.term] = { count: 0, sessions: new Set(), countries: {}, last: 0 };
    sc[s.term].count++;
    sc[s.term].sessions.add(s.sessionId);
    sc[s.term].countries[s.country] = (sc[s.term].countries[s.country] || 0) + 1;
    sc[s.term].last = Math.max(sc[s.term].last, s.timestamp);
    if (s.articleReturned) sc[s.term].lastArticle = s.articleReturned;
  }
  const topSearches = Object.entries(sc)
    .map(([term, d]) => ({ term, count: d.count, uniqueUsers: d.sessions.size, countries: d.countries, lastSearched: d.last, lastArticle: d.lastArticle }))
    .sort((a, b) => b.count - a.count).slice(0, 100);

  const countrySplit: Record<string, number> = {};
  for (const s of searches) countrySplit[s.country] = (countrySplit[s.country] || 0) + 1;

  const catKw: Record<string, string[]> = {
    "Getting Started": ["activate", "sim", "esim", "setup", "new", "port", "number", "switch"],
    "Account & Billing": ["balance", "recharge", "bill", "payment", "charge", "credit", "refund", "invoice"],
    "Device & Connectivity": ["apn", "data", "internet", "signal", "coverage", "network", "wifi", "4g", "5g", "lte"],
    "International Services": ["international", "call", "rate", "roaming", "country", "abroad", "overseas"],
    "Service Management": ["plan", "renew", "change", "upgrade", "cancel", "pause", "add-on"],
    "Policies & Compliance": ["policy", "terms", "privacy", "legal", "refund", "california"],
  };
  const categoryCounts: Record<string, number> = {};
  for (const s of searches) {
    const t = s.term;
    let matched = false;
    for (const [cat, kws] of Object.entries(catKw)) {
      if (kws.some(kw => t.includes(kw))) { categoryCounts[cat] = (categoryCounts[cat] || 0) + 1; matched = true; break; }
    }
    if (!matched) categoryCounts["General"] = (categoryCounts["General"] || 0) + 1;
  }

  const botSurveys = chatSurveys.filter(s => !s.wasAgentSession);
  const agentSurveys = chatSurveys.filter(s => s.wasAgentSession);
  const avgChatRating = botSurveys.length > 0
    ? Math.round((botSurveys.reduce((sum, s) => sum + s.rating, 0) / botSurveys.length) * 10) / 10 : 0;
  const avgAgentRating = agentSurveys.length > 0
    ? Math.round((agentSurveys.reduce((sum, s) => sum + s.rating, 0) / agentSurveys.length) * 10) / 10 : 0;

  return {
    topSearches,
    recentSearchEvents: [...searches].reverse().slice(0, 50),
    countrySplit,
    categoryCounts,
    conversationSessions,
    articleFeedback,
    chatSurveys,
    totalSearches: searches.length,
    totalConversations: conversationSessions.length,
    totalFeedback: articleFeedback.length,
    positiveRating: articleFeedback.length > 0
      ? Math.round((articleFeedback.filter(f => f.helpful).length / articleFeedback.length) * 100) : 0,
    agentEscalations: conversationSessions.filter(c => c.wasEscalated).length,
    totalSurveys: chatSurveys.length,
    avgChatRating,
    avgAgentRating,
  };
}

export function exportCSV(rows: Record<string, string | number | boolean | undefined>[], filename: string): void {
  if (!rows.length) { alert("No data to export yet."); return; }
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r =>
    headers.map(h => {
      const v = r[h] ?? "";
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  )].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
