import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, BarChart2, Search, MessageSquare, ThumbsUp, ThumbsDown, Download, RefreshCw, Globe, TrendingUp, AlertCircle, Star, ChevronDown, ChevronUp, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAnalyticsData, exportCSV, type AnalyticsData, type ConversationSession } from "@/lib/analytics";

const ADMIN_KEY = "1111";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string | number; sub?: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="text-xs font-semibold text-muted-foreground mt-1">{label}</p>
        {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function QuickViewCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0E1F5C]/5 dark:bg-white/5 border border-[#0066FF]/20 rounded-xl p-4 ${className}`}>
      <h4 className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-3">{title}</h4>
      {children}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
      ))}
    </div>
  );
}

function ConversationCard({ session }: { session: ConversationSession }) {
  const [expanded, setExpanded] = useState(false);
  const duration = Math.round((session.endTime - session.startTime) / 1000 / 60);
  const userExchanges = session.exchanges.filter(e => !e.isAgentResponse);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-border overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
            {session.wasEscalated && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 shrink-0">
                Agent Escalation
              </span>
            )}
            <span className="text-xs text-muted-foreground shrink-0">{session.country}</span>
            <span className="text-xs text-muted-foreground shrink-0">·</span>
            <span className="text-xs text-muted-foreground shrink-0">{userExchanges.length} {userExchanges.length === 1 ? "question" : "questions"}</span>
            {duration > 0 && <span className="text-xs text-muted-foreground shrink-0">· {duration} min</span>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground">{new Date(session.startTime).toLocaleString()}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
          </div>
        </div>
        {session.exchanges[0] && (
          <p className="text-sm font-medium mt-2 truncate text-foreground">{session.exchanges[0].question}</p>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="border-t border-border divide-y divide-border/50">
              {session.exchanges.map((ex, i) => (
                <div key={i} className="p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    {ex.isAgentResponse ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <User className="w-2.5 h-2.5" /> Agent Q&A
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                        <Bot className="w-2.5 h-2.5" /> AI Q&A
                      </span>
                    )}
                    <span className="text-[9px] text-muted-foreground">{new Date(ex.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="bg-[#0066FF]/5 rounded-lg px-3 py-2">
                    <p className="text-[10px] font-bold text-muted-foreground mb-0.5">CUSTOMER</p>
                    <p className="text-xs font-medium">{ex.question}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg px-3 py-2">
                    <p className="text-[10px] font-bold text-muted-foreground mb-0.5">
                      {ex.isAgentResponse ? `${session.agentName ?? "AGENT"} — LYCA SUPPORT` : "LIA — AI ASSISTANT"}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-3">{ex.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Tab = "overview" | "searches" | "ai" | "feedback";

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detailExpanded, setDetailExpanded] = useState<Record<Tab, boolean>>({
    overview: false, searches: false, ai: false, feedback: false,
  });

  useEffect(() => {
    if (authed && open) setData(getAnalyticsData());
  }, [authed, open, tab]);

  // Real-time polling every 5 seconds while panel is open
  useEffect(() => {
    if (!authed || !open) return;
    const interval = setInterval(() => setData(getAnalyticsData()), 5000);
    return () => clearInterval(interval);
  }, [authed, open]);

  const handleLogin = () => {
    if (keyInput === ADMIN_KEY) { setAuthed(true); setKeyError(false); setData(getAnalyticsData()); }
    else { setKeyError(true); setKeyInput(""); }
  };

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => { setData(getAnalyticsData()); setIsRefreshing(false); }, 800);
  };

  const toggleDetail = (t: Tab) => setDetailExpanded(prev => ({ ...prev, [t]: !prev[t] }));

  const exportSearches = () => {
    if (!data) return;
    exportCSV(data.topSearches.map(s => ({
      Term: s.term, "Total Searches": s.count, "Unique Users": s.uniqueUsers,
      "Top Country": Object.entries(s.countries).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-",
      "Last Searched": new Date(s.lastSearched).toLocaleString(),
    })), "lyca-kx-top-searches.csv");
  };

  const exportConversations = () => {
    if (!data) return;
    exportCSV(data.conversationSessions.map(s => ({
      "Session ID": s.id,
      "Query Type": s.queryType,
      "Exchange Count": s.exchanges.length,
      "Was Escalated": s.wasEscalated ? "Yes" : "No",
      "Agent": s.agentName ?? "N/A",
      Country: s.country,
      "Start Time": new Date(s.startTime).toLocaleString(),
      "Duration (min)": Math.round((s.endTime - s.startTime) / 60000),
      "First Question": s.exchanges[0]?.question ?? "",
    })), "lyca-kx-conversations.csv");
  };

  const exportFeedback = () => {
    if (!data) return;
    exportCSV(data.articleFeedback.map(f => ({
      Article: f.articleTitle, Helpful: f.helpful ? "Yes" : "No",
      Reason: f.reason ?? "", Country: f.country, Date: new Date(f.timestamp).toLocaleString(),
    })), "lyca-kx-article-feedback.csv");
  };

  const exportSurveys = () => {
    if (!data) return;
    exportCSV(data.chatSurveys.map(s => ({
      Rating: s.rating, Comment: s.comment ?? "",
      "Session Type": s.wasAgentSession ? "Agent" : "AI",
      "Email Sent": s.emailSent ? "Yes" : "No",
      Messages: s.messageCount, Country: s.country, Date: new Date(s.timestamp).toLocaleString(),
    })), "lyca-kx-chat-surveys.csv");
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "searches", label: "Top Searches", icon: Search },
    { id: "ai", label: "Conversations", icon: MessageSquare },
    { id: "feedback", label: "Ratings & Surveys", icon: ThumbsUp },
  ];

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

            {/* Header */}
            <div className="bg-[#0E1F5C] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base">Lyca KX Admin Panel</h2>
                  <p className="text-[11px] text-white/60">Analytics & Insights Dashboard</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!authed ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-xs text-center">
                  <div className="w-16 h-16 bg-[#0E1F5C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-[#0E1F5C]" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Admin Access</h3>
                  <p className="text-sm text-muted-foreground mb-6">Enter the admin key to continue</p>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Admin key" value={keyInput}
                      onChange={e => { setKeyInput(e.target.value); setKeyError(false); }}
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                      className={`text-center text-lg tracking-widest ${keyError ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                      autoFocus />
                    {keyError && <p className="text-xs text-red-500 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" />Incorrect admin key</p>}
                    <Button onClick={handleLogin} className="w-full bg-[#0E1F5C] hover:bg-[#1a3385] text-white">
                      Access Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-border bg-slate-50/50 dark:bg-transparent shrink-0 px-4 gap-1 pt-2">
                  {tabs.map(t => {
                    const Icon = t.icon;
                    return (
                      <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                          tab === t.id
                            ? "border-[#0066FF] text-[#0066FF] bg-white dark:bg-background"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}>
                        <Icon className="w-4 h-4" />
                        {t.label}
                      </button>
                    );
                  })}
                  <div className="ml-auto flex items-center gap-2 pb-2">
                    <Button variant="ghost" size="sm" onClick={refresh}
                      className={`gap-1.5 text-xs transition-all ${isRefreshing ? "opacity-70" : ""}`}
                      disabled={isRefreshing}>
                      <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }}
                        transition={{ duration: 0.8, ease: "linear", repeat: isRefreshing ? Infinity : 0 }}>
                        <RefreshCw className="w-3.5 h-3.5" />
                      </motion.div>
                      {isRefreshing ? "Refreshing..." : "Refresh"}
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                  {data && (
                    <>
                      {/* OVERVIEW */}
                      {tab === "overview" && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Total Searches" value={data.totalSearches} icon={Search} color="bg-[#0066FF]" />
                            <StatCard label="Conversations" value={data.totalConversations} icon={MessageSquare} color="bg-[#0E1F5C]" />
                            <StatCard label="Agent Escalations" value={data.agentEscalations} icon={TrendingUp} color="bg-amber-500" />
                            <StatCard label="Positive Ratings" value={`${data.positiveRating}%`} sub={`${data.totalFeedback} ratings`} icon={ThumbsUp} color="bg-[#00D084]" />
                          </div>

                          {/* Survey quick view */}
                          {data.totalSurveys > 0 && (
                            <QuickViewCard title="Chat Survey Quick View">
                              <div className="flex items-center gap-6 flex-wrap">
                                <div className="text-center">
                                  <p className="text-3xl font-bold text-amber-500">{data.avgChatRating.toFixed(1)}</p>
                                  <StarRating rating={data.avgChatRating} />
                                  <p className="text-[10px] text-muted-foreground mt-1">Avg. AI Rating</p>
                                </div>
                                {data.avgAgentRating > 0 && (
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-emerald-500">{data.avgAgentRating.toFixed(1)}</p>
                                    <StarRating rating={data.avgAgentRating} />
                                    <p className="text-[10px] text-muted-foreground mt-1">Avg. Agent Rating</p>
                                  </div>
                                )}
                                <div className="text-center">
                                  <p className="text-3xl font-bold text-[#0066FF]">{data.totalSurveys}</p>
                                  <p className="text-[10px] text-muted-foreground mt-1">Total Surveys</p>
                                </div>
                                <div className="flex-1 min-w-[140px]">
                                  {[5, 4, 3, 2, 1].map(star => {
                                    const count = data.chatSurveys.filter(s => s.rating === star).length;
                                    const pct = data.totalSurveys > 0 ? (count / data.totalSurveys) * 100 : 0;
                                    return (
                                      <div key={star} className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] w-3 text-right text-muted-foreground">{star}</span>
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-[10px] text-muted-foreground w-4">{count}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </QuickViewCard>
                          )}

                          {/* Top Searches */}
                          <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-4">
                            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-[#0066FF]" /> Top 10 Search Terms
                            </h3>
                            {data.topSearches.length === 0 ? (
                              <p className="text-sm text-muted-foreground text-center py-6">No searches recorded yet.</p>
                            ) : (
                              <div className="space-y-2">
                                {data.topSearches.slice(0, 10).map((s, i) => (
                                  <div key={s.term} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-muted-foreground w-5 text-right">{i + 1}</span>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-sm font-medium capitalize">{s.term}</span>
                                        <span className="text-xs text-muted-foreground">{s.count}× · {s.uniqueUsers} users</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0066FF] rounded-full" style={{ width: `${Math.min(100, (s.count / (data.topSearches[0]?.count || 1)) * 100)}%` }} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Country & Category */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-4">
                              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#0066FF]" /> Country-wise Split
                              </h3>
                              {Object.keys(data.countrySplit).length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
                              ) : (
                                <div className="space-y-2">
                                  {Object.entries(data.countrySplit).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([country, count]) => {
                                    const total = Object.values(data.countrySplit).reduce((a, b) => a + b, 0);
                                    return (
                                      <div key={country} className="flex items-center gap-2 text-sm">
                                        <span className="flex-1 truncate">{country}</span>
                                        <span className="text-xs text-muted-foreground shrink-0">{Math.round(count / total * 100)}%</span>
                                        <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                                          <div className="h-full bg-[#00D084] rounded-full" style={{ width: `${Math.round(count / total * 100)}%` }} />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-4">
                              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                                <BarChart2 className="w-4 h-4 text-[#0066FF]" /> Top Issue Categories
                              </h3>
                              {Object.keys(data.categoryCounts).length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
                              ) : (
                                <div className="space-y-2">
                                  {Object.entries(data.categoryCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => {
                                    const total = Object.values(data.categoryCounts).reduce((a, b) => a + b, 0);
                                    return (
                                      <div key={cat} className="flex items-center gap-2 text-sm">
                                        <span className="flex-1 truncate text-xs">{cat}</span>
                                        <span className="text-xs text-muted-foreground shrink-0">{count}</span>
                                        <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
                                          <div className="h-full bg-[#0066FF] rounded-full" style={{ width: `${Math.round(count / total * 100)}%` }} />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TOP SEARCHES */}
                      {tab === "searches" && (
                        <div className="space-y-4">
                          <QuickViewCard title="Quick View — Top 5 Search Terms">
                            {data.topSearches.length === 0 ? (
                              <p className="text-sm text-muted-foreground">No search data yet.</p>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {data.topSearches.slice(0, 5).map((s, i) => (
                                  <div key={s.term} className="bg-white dark:bg-slate-700/50 border border-border rounded-lg px-3 py-2 flex items-center gap-2">
                                    <span className="text-lg font-bold text-[#0066FF] w-6 shrink-0">#{i + 1}</span>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold capitalize truncate">{s.term}</p>
                                      <p className="text-[10px] text-muted-foreground">{s.count} searches · {s.uniqueUsers} users</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </QuickViewCard>

                          <button onClick={() => toggleDetail("searches")}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                            <span className="text-muted-foreground">View Detailed Information</span>
                            <span className="flex items-center gap-1.5 text-[#0066FF]">
                              {detailExpanded.searches ? <><ChevronUp className="w-4 h-4" /> Hide</> : <><ChevronDown className="w-4 h-4" /> Expand</>}
                            </span>
                          </button>

                          <AnimatePresence>
                            {detailExpanded.searches && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">{data.topSearches.length} unique search terms captured</p>
                                    <Button variant="outline" size="sm" onClick={exportSearches} className="gap-1.5 text-xs">
                                      <Download className="w-3.5 h-3.5" /> Export CSV
                                    </Button>
                                  </div>
                                  {data.topSearches.length > 0 && (
                                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-border overflow-hidden">
                                      <table className="w-full text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-700/50">
                                          <tr>
                                            <th className="text-left p-3 text-xs font-bold text-muted-foreground">#</th>
                                            <th className="text-left p-3 text-xs font-bold text-muted-foreground">Search Term</th>
                                            <th className="text-left p-3 text-xs font-bold text-muted-foreground hidden lg:table-cell">Article Returned</th>
                                            <th className="text-right p-3 text-xs font-bold text-muted-foreground">Searches</th>
                                            <th className="text-right p-3 text-xs font-bold text-muted-foreground hidden sm:table-cell">Users</th>
                                            <th className="text-left p-3 text-xs font-bold text-muted-foreground hidden md:table-cell">Top Country</th>
                                            <th className="text-left p-3 text-xs font-bold text-muted-foreground hidden md:table-cell">Last Seen</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                          {data.topSearches.map((s, i) => {
                                            const topCountry = Object.entries(s.countries).sort((a, b) => b[1] - a[1])[0];
                                            return (
                                              <tr key={s.term} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                                <td className="p-3 text-muted-foreground text-xs">{i + 1}</td>
                                                <td className="p-3 font-medium capitalize">{s.term}</td>
                                                <td className="p-3 text-xs text-muted-foreground hidden lg:table-cell">{s.lastArticle ?? <span className="italic opacity-50">—</span>}</td>
                                                <td className="p-3 text-right font-bold text-[#0066FF]">{s.count}</td>
                                                <td className="p-3 text-right text-muted-foreground hidden sm:table-cell">{s.uniqueUsers}</td>
                                                <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{topCountry?.[0] ?? "—"}</td>
                                                <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{new Date(s.lastSearched).toLocaleDateString()}</td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* CONVERSATIONS */}
                      {tab === "ai" && (
                        <div className="space-y-4">
                          {/* Search Analytics quick view */}
                          <QuickViewCard title="Search Analytics — Recent Interactions">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              {[
                                { label: "Total Sessions", value: data.totalConversations, color: "text-[#0066FF]" },
                                { label: "Total Exchanges", value: data.conversationSessions.reduce((a, s) => a + s.exchanges.length, 0), color: "text-blue-600" },
                                { label: "AI Resolved", value: data.conversationSessions.filter(s => !s.wasEscalated).length, color: "text-emerald-600" },
                                { label: "Agent Escalated", value: data.agentEscalations, color: "text-amber-600" },
                              ].map(item => (
                                <div key={item.label} className="bg-white dark:bg-slate-700/50 border border-border rounded-lg px-3 py-2 text-center">
                                  <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.label}</p>
                                </div>
                              ))}
                            </div>
                            {data.conversationSessions.length === 0 ? (
                              <p className="text-sm text-muted-foreground">No conversations recorded yet. Data appears when customers use the AI chat.</p>
                            ) : (
                              <div className="bg-white dark:bg-slate-800 rounded-lg border border-border overflow-hidden">
                                <table className="w-full text-xs">
                                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                      <th className="text-left px-3 py-2 font-bold text-muted-foreground">Search Term</th>
                                      <th className="text-left px-3 py-2 font-bold text-muted-foreground hidden sm:table-cell">Article Returned</th>
                                      <th className="text-left px-3 py-2 font-bold text-muted-foreground hidden md:table-cell">Timestamp</th>
                                      <th className="text-left px-3 py-2 font-bold text-muted-foreground hidden md:table-cell">Session ID</th>
                                      <th className="text-left px-3 py-2 font-bold text-muted-foreground">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border/60">
                                    {[...data.conversationSessions].reverse().slice(0, 5).flatMap(session =>
                                      session.exchanges.filter(ex => !ex.isAgentResponse).slice(0, 2).map((ex, i) => ({
                                        term: ex.question,
                                        article: ex.response.slice(0, 50) + (ex.response.length > 50 ? "…" : ""),
                                        timestamp: ex.timestamp,
                                        sessionId: session.id.slice(-8),
                                        status: session.wasEscalated ? "Escalated" : "Resolved",
                                      }))
                                    ).slice(0, 6).map((row, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                                        <td className="px-3 py-2 font-medium truncate max-w-[120px]">{row.term}</td>
                                        <td className="px-3 py-2 text-muted-foreground truncate max-w-[160px] hidden sm:table-cell">{row.article}</td>
                                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap hidden md:table-cell">{new Date(row.timestamp).toLocaleTimeString()}</td>
                                        <td className="px-3 py-2 text-muted-foreground font-mono hidden md:table-cell">{row.sessionId}</td>
                                        <td className="px-3 py-2">
                                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${row.status === "Escalated" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"}`}>
                                            {row.status}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </QuickViewCard>

                          <button onClick={() => toggleDetail("ai")}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                            <span className="text-muted-foreground">View Detailed Information</span>
                            <span className="flex items-center gap-1.5 text-[#0066FF]">
                              {detailExpanded.ai ? <><ChevronUp className="w-4 h-4" /> Hide</> : <><ChevronDown className="w-4 h-4" /> Expand</>}
                            </span>
                          </button>

                          <AnimatePresence>
                            {detailExpanded.ai && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">{data.conversationSessions.length} conversation sessions logged</p>
                                    <Button variant="outline" size="sm" onClick={exportConversations} className="gap-1.5 text-xs">
                                      <Download className="w-3.5 h-3.5" /> Export CSV
                                    </Button>
                                  </div>
                                  {data.conversationSessions.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                      <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                      <p className="font-medium">No conversations yet</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-3">
                                      {[...data.conversationSessions].reverse().slice(0, 50).map(session => (
                                        <ConversationCard key={session.id} session={session} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* RATINGS & SURVEYS */}
                      {tab === "feedback" && (
                        <div className="space-y-5">
                          {/* Article feedback quick view */}
                          <QuickViewCard title="Quick View — Article Feedback">
                            <div className="flex items-center gap-6 flex-wrap mb-3">
                              <div className="text-center">
                                <p className="text-3xl font-bold text-[#00D084]">{data.positiveRating}%</p>
                                <p className="text-[10px] text-muted-foreground">Positive Ratings</p>
                              </div>
                              <div className="text-center">
                                <p className="text-3xl font-bold text-[#0066FF]">{data.totalFeedback}</p>
                                <p className="text-[10px] text-muted-foreground">Total Ratings</p>
                              </div>
                              <div className="flex-1 min-w-[120px]">
                                {data.totalFeedback > 0 ? (
                                  <div className="space-y-1">
                                    {(["helpful", "not helpful"] as const).map(type => {
                                      const isHelp = type === "helpful";
                                      const count = data.articleFeedback.filter(f => f.helpful === isHelp).length;
                                      const pct = (count / data.totalFeedback) * 100;
                                      return (
                                        <div key={type} className="flex items-center gap-2 text-xs">
                                          <span className={`w-2 h-2 rounded-full shrink-0 ${isHelp ? "bg-[#00D084]" : "bg-red-400"}`} />
                                          <span className="flex-1 text-muted-foreground capitalize">{type}</span>
                                          <span className="font-medium">{count}</span>
                                          <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${isHelp ? "bg-[#00D084]" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : <p className="text-xs text-muted-foreground">No ratings yet</p>}
                              </div>
                            </div>
                            {data.articleFeedback.length > 0 && (
                              <div className="space-y-1.5">
                                {[...data.articleFeedback].reverse().slice(0, 3).map(item => (
                                  <div key={item.id} className="bg-white dark:bg-slate-700/50 border border-border rounded-lg px-3 py-2 flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.helpful ? "bg-emerald-100" : "bg-red-100"}`}>
                                      {item.helpful ? <ThumbsUp className="w-2.5 h-2.5 text-emerald-600" /> : <ThumbsDown className="w-2.5 h-2.5 text-red-500" />}
                                    </div>
                                    <p className="text-xs font-medium flex-1 truncate">{item.articleTitle}</p>
                                    <span className="text-[10px] text-muted-foreground shrink-0">{new Date(item.timestamp).toLocaleDateString()}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </QuickViewCard>

                          {/* AI surveys */}
                          <QuickViewCard title="Quick View — AI Assistant Surveys">
                            {data.chatSurveys.filter(s => !s.wasAgentSession).length === 0 ? (
                              <p className="text-sm text-muted-foreground">No AI survey responses yet.</p>
                            ) : (() => {
                              const aiSurveys = data.chatSurveys.filter(s => !s.wasAgentSession);
                              const avgRating = aiSurveys.length > 0 ? aiSurveys.reduce((sum, s) => sum + s.rating, 0) / aiSurveys.length : 0;
                              return (
                                <div className="flex items-center gap-6 flex-wrap mb-3">
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-amber-500">{avgRating.toFixed(1)}</p>
                                    <StarRating rating={avgRating} />
                                    <p className="text-[10px] text-muted-foreground mt-1">Avg. AI Rating</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-[#0066FF]">{aiSurveys.length}</p>
                                    <p className="text-[10px] text-muted-foreground">AI Surveys</p>
                                  </div>
                                  <div className="flex-1 min-w-[140px]">
                                    {[5, 4, 3, 2, 1].map(star => {
                                      const count = aiSurveys.filter(s => s.rating === star).length;
                                      const pct = aiSurveys.length > 0 ? (count / aiSurveys.length) * 100 : 0;
                                      return (
                                        <div key={star} className="flex items-center gap-2 mb-1">
                                          <span className="text-[10px] w-3 text-right text-muted-foreground">{star}</span>
                                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                                          </div>
                                          <span className="text-[10px] text-muted-foreground w-4">{count}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}
                          </QuickViewCard>

                          {/* Agent surveys */}
                          <QuickViewCard title="Quick View — Agent (Sarah) Surveys">
                            {data.chatSurveys.filter(s => s.wasAgentSession).length === 0 ? (
                              <p className="text-sm text-muted-foreground">No agent survey responses yet. Surveys are captured when a chat is escalated to a live agent.</p>
                            ) : (() => {
                              const agentSurveys = data.chatSurveys.filter(s => s.wasAgentSession);
                              const avgRating = agentSurveys.reduce((sum, s) => sum + s.rating, 0) / agentSurveys.length;
                              return (
                                <div className="flex items-center gap-6 flex-wrap mb-3">
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-emerald-500">{avgRating.toFixed(1)}</p>
                                    <StarRating rating={avgRating} />
                                    <p className="text-[10px] text-muted-foreground mt-1">Avg. Agent Rating</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-3xl font-bold text-emerald-600">{agentSurveys.length}</p>
                                    <p className="text-[10px] text-muted-foreground">Agent Surveys</p>
                                  </div>
                                  <div className="flex-1 min-w-[140px]">
                                    {[5, 4, 3, 2, 1].map(star => {
                                      const count = agentSurveys.filter(s => s.rating === star).length;
                                      const pct = agentSurveys.length > 0 ? (count / agentSurveys.length) * 100 : 0;
                                      return (
                                        <div key={star} className="flex items-center gap-2 mb-1">
                                          <span className="text-[10px] w-3 text-right text-muted-foreground">{star}</span>
                                          <Star className="w-3 h-3 fill-emerald-400 text-emerald-400 shrink-0" />
                                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                                          </div>
                                          <span className="text-[10px] text-muted-foreground w-4">{count}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}
                            {data.chatSurveys.filter(s => s.wasAgentSession && s.comment).slice(-2).map(s => (
                              <div key={s.id} className="bg-white dark:bg-slate-700/50 border border-border rounded-lg px-3 py-2 mt-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <StarRating rating={s.rating} />
                                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full ml-1">Agent</span>
                                  <span className="text-[10px] text-muted-foreground ml-auto">{new Date(s.timestamp).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-muted-foreground italic">"{s.comment}"</p>
                              </div>
                            ))}
                          </QuickViewCard>

                          {/* Detailed view toggle */}
                          <button onClick={() => toggleDetail("feedback")}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-border rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                            <span className="text-muted-foreground">View Detailed Information</span>
                            <span className="flex items-center gap-1.5 text-[#0066FF]">
                              {detailExpanded.feedback ? <><ChevronUp className="w-4 h-4" /> Hide</> : <><ChevronDown className="w-4 h-4" /> Expand</>}
                            </span>
                          </button>

                          <AnimatePresence>
                            {detailExpanded.feedback && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="space-y-5">
                                  {/* Article feedback */}
                                  <div>
                                    <div className="flex justify-between items-center mb-3">
                                      <h4 className="text-sm font-bold">Article Feedback — Full List</h4>
                                      <Button variant="outline" size="sm" onClick={exportFeedback} className="gap-1.5 text-xs">
                                        <Download className="w-3.5 h-3.5" /> Export CSV
                                      </Button>
                                    </div>
                                    {data.totalFeedback === 0 ? (
                                      <div className="text-center py-8 text-muted-foreground">
                                        <ThumbsUp className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p className="text-sm">No feedback yet</p>
                                      </div>
                                    ) : (
                                      <div className="space-y-2">
                                        {[...data.articleFeedback].reverse().slice(0, 30).map(item => (
                                          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-border p-3 flex items-start gap-3">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.helpful ? "bg-emerald-100" : "bg-red-100"}`}>
                                              {item.helpful ? <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> : <ThumbsDown className="w-3.5 h-3.5 text-red-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-medium truncate">{item.articleTitle}</p>
                                              {item.reason && <p className="text-xs text-muted-foreground italic mt-0.5">"{item.reason}"</p>}
                                              <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                                                <span>{item.country}</span>
                                                <span>{new Date(item.timestamp).toLocaleString()}</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* All surveys */}
                                  {data.totalSurveys > 0 && (
                                    <div>
                                      <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-sm font-bold">All Chat Surveys — Full List</h4>
                                        <Button variant="outline" size="sm" onClick={exportSurveys} className="gap-1.5 text-xs">
                                          <Download className="w-3.5 h-3.5" /> Export CSV
                                        </Button>
                                      </div>
                                      <div className="space-y-2">
                                        {[...data.chatSurveys].reverse().map(s => (
                                          <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl border border-border p-3">
                                            <div className="flex items-center justify-between mb-1">
                                              <div className="flex items-center gap-2">
                                                <StarRating rating={s.rating} />
                                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${s.wasAgentSession ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                                                  {s.wasAgentSession ? "Agent" : "AI"}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                {s.emailSent && <span className="text-[#0066FF] font-medium">📧 PDF</span>}
                                                <span>{s.messageCount} msgs</span>
                                                <span>{s.country}</span>
                                                <span>{new Date(s.timestamp).toLocaleString()}</span>
                                              </div>
                                            </div>
                                            {s.comment && <p className="text-xs text-muted-foreground italic mt-1">"{s.comment}"</p>}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
