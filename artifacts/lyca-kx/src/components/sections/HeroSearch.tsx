import { useState, useRef, useEffect } from "react";
import { Search, Mic, MicOff, Clock, ChevronRight, FileText, TrendingUp, ChevronLeft, Zap, Users, Shield, Signal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleModal } from "@/components/shared/ArticleModal";
import { articles, searchArticles, findArticleById, type Article } from "@/data/articles";
import { trackSearch } from "@/lib/analytics";

const trendingTopics = [
  { label: "eSIM Setup", articleId: "gs5" },
  { label: "Port My Number", articleId: "gs2" },
  { label: "International Calls", articleId: "is1" },
  { label: "Recharge", articleId: "rc1" },
  { label: "APN Settings", articleId: "dc1" },
  { label: "Coverage Check", articleId: "dc4" },
];

const popularArticleIds = ["ab2", "gs3", "dc2", "dc3"];

const rotatingFeatures = [
  { emoji: "📱", title: "eSIM Activation", desc: "Download your SIM instantly — no card needed", href: "/esim", badge: "New" },
  { emoji: "🌍", title: "Free International Calls", desc: "Call 75+ countries included in every plan", href: "/plans", badge: "Most Popular" },
  { emoji: "⚡", title: "Quick Recharge", desc: "Top up your balance in under 60 seconds", href: "/quick-recharge", badge: null },
  { emoji: "🔄", title: "Port Your Number", desc: "Keep your existing number — free & easy", href: "/activate", badge: null },
  { emoji: "👨‍👩‍👧", title: "Family Plans Available", desc: "Save more with up to 5 lines on one account", href: "/plans", badge: "Save 20%" },
  { emoji: "🛡️", title: "No Contracts, Ever", desc: "Month-to-month plans — cancel anytime", href: "/plans", badge: null },
  { emoji: "📶", title: "5G Network Expanding", desc: "Blazing-fast 5G speeds now across more cities", href: "/plans", badge: "5G" },
  { emoji: "🎁", title: "Refer & Earn Rewards", desc: "Earn cash every time a friend joins Lyca", href: "/refer", badge: "Earn Cash" },
];

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [featureIdx, setFeatureIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeatureIdx(i => (i + 1) % rotatingFeatures.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (query.trim()) setSearchResults(searchArticles(query).slice(0, 6));
    else setSearchResults([]);
  }, [query]);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsFocused(false);
    setQuery("");
    setRecentSearches([]);
  };

  const openArticleById = (id: string) => {
    const article = findArticleById(id);
    if (article) openArticle(article);
  };

  const handleTopicSelect = (label: string, articleId?: string) => {
    if (articleId) {
      const article = findArticleById(articleId);
      trackSearch(label, 1, article?.title);
      if (article) openArticle(article);
    } else {
      trackSearch(label, 0);
      setQuery(label);
      setIsFocused(true);
    }
  };

  const handleSearchSubmit = () => {
    if (searchResults.length > 0) {
      trackSearch(query, searchResults.length, searchResults[0].title);
      openArticle(searchResults[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    } else if (e.key === "Tab" && isFocused && searchResults.length > 0) {
      e.preventDefault();
      trackSearch(query, searchResults.length, searchResults[0].title);
      openArticle(searchResults[0]);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setQuery("");
    } else if (e.key === "ArrowDown" && isFocused && searchResults.length > 0) {
      e.preventDefault();
      trackSearch(query, searchResults.length, searchResults[0].title);
      openArticle(searchResults[0]);
    }
  };

  const startVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setVoiceStatus("");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus("Voice search not supported in this browser. Try Chrome.");
      setTimeout(() => setVoiceStatus(""), 4000);
      return;
    }

    if (!window.isSecureContext) {
      setVoiceStatus("Voice search requires HTTPS. Available on the published site.");
      setTimeout(() => setVoiceStatus(""), 5000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus("Listening… Speak now");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        setVoiceStatus(`Heard: "${transcript}"`);

        const selectMatch = transcript.match(/^select\s+(\w+)\s+(article|result|option)/i);
        if (selectMatch) {
          const ordinalMap: Record<string, number> = {
            first: 0, "1st": 0, second: 1, "2nd": 1, third: 2, "3rd": 2,
            fourth: 3, "4th": 3, fifth: 4, "5th": 4,
          };
          const idx = ordinalMap[selectMatch[1].toLowerCase()];
          if (idx !== undefined) {
            const currentResults = searchArticles(query || transcript).slice(0, 6);
            if (currentResults[idx]) {
              trackSearch(transcript, currentResults.length, currentResults[idx].title);
              openArticle(currentResults[idx]);
              setVoiceStatus("");
              return;
            }
          }
        }

        setQuery(transcript);
        setIsFocused(true);
        const results = searchArticles(transcript);
        setSearchResults(results.slice(0, 6));
        if (results.length > 0) trackSearch(transcript, results.length, results[0].title);
        setTimeout(() => setVoiceStatus(""), 3000);
      };

      recognition.onerror = (event) => {
        const errorMessages: Record<string, string> = {
          "not-allowed": "Microphone access denied — allow mic in browser settings",
          "audio-capture": "No microphone found on this device",
          "network": "Network error — ensure you are on HTTPS",
          "no-speech": "No speech detected — please try again",
          "service-not-allowed": "Voice service unavailable in this browser",
          "aborted": "",
        };
        const msg = errorMessages[event.error] ?? `Could not hear you (${event.error}) — try again`;
        if (msg) {
          setVoiceStatus(msg);
          setTimeout(() => setVoiceStatus(""), 4000);
        }
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (err) {
      setVoiceStatus("Voice search could not start. Try refreshing the page.");
      setTimeout(() => setVoiceStatus(""), 4000);
      setIsListening(false);
    }
  };

  const popularArticles = popularArticleIds.map(id => findArticleById(id)).filter(Boolean) as Article[];
  const feature = rotatingFeatures[featureIdx];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E1F5C] via-[#0E1F5C] to-[#0066FF] py-16 px-4 md:px-6" id="search">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
              How can we help you today?
            </h1>
            <p className="text-lg text-blue-100 font-medium max-w-2xl mx-auto">
              Find answers, manage services, and resolve issues faster.
            </p>
          </motion.div>

          <AnimatePresence>
            {voiceStatus && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-center mb-3">
                <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                  {isListening && <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />}
                  {voiceStatus}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-3xl mx-auto mb-6" ref={searchContainerRef}>
            <div className={`relative flex items-center bg-white rounded-full p-2 shadow-2xl transition-all duration-300 ${isFocused ? "ring-4 ring-white/30" : ""}`}>
              <Search className="h-6 w-6 text-gray-400 ml-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3.5 text-lg text-gray-900 placeholder:text-gray-400"
                placeholder="Search for articles, guides, or tasks..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={startVoiceSearch}
                className={`p-3 rounded-full mr-1 shrink-0 transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
                title={isListening ? "Listening..." : "Voice search"}
                type="button"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence>
              {isFocused && (query.length > 0 || recentSearches.length > 0) && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 text-left">
                  {query.length > 0 ? (
                    <div className="py-2">
                      {searchResults.length > 0 ? (
                        <>
                          <div className="px-5 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                            <span>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found</span>
                            <span className="text-[9px] text-gray-300 normal-case">↩ Enter to open first · Tab to select</span>
                          </div>
                          {searchResults.map((article, idx) => (
                            <button key={article.id}
                              className="w-full text-left px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-start gap-3 transition-colors group"
                              onClick={() => {
                                trackSearch(query, searchResults.length, article.title);
                                openArticle(article);
                              }}>
                              <div className="w-8 h-8 rounded-lg bg-[#0E1F5C]/10 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-[#0066FF]">{idx + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#0066FF] transition-colors">{article.title}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{article.desc}</div>
                                <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                  <span className="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{article.category}</span>
                                  <span>{article.readTime}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#0066FF] shrink-0 mt-1 transition-colors" />
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="px-6 py-6 text-center">
                          <p className="text-gray-500 text-sm mb-1">No exact matches found.</p>
                          <p className="text-gray-400 text-xs">Try "activate", "APN", "recharge", or "port number"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-2">
                      {recentSearches.length > 0 && (
                        <>
                          <div className="px-5 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Recent</div>
                          {recentSearches.map((s, idx) => (
                            <button key={idx}
                              className="w-full text-left px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                              onClick={() => setQuery(s)}>
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{s}</span>
                            </button>
                          ))}
                        </>
                      )}
                      <div className="px-5 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Popular</div>
                      {articles.slice(0, 4).map(a => (
                        <button key={a.id}
                          className="w-full text-left px-5 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors"
                          onClick={() => {
                            trackSearch(a.title, 1, a.title);
                            openArticle(a);
                          }}>
                          <TrendingUp className="h-4 w-4 text-[#0066FF]" />
                          <span className="text-sm">{a.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trending pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-white/70 text-sm font-medium">Trending:</span>
            {trendingTopics.map((topic, i) => (
              <button key={i}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white text-sm backdrop-blur-sm transition-all border border-white/10 hover:scale-105 hover:border-white/30"
                onClick={() => handleTopicSelect(topic.label, topic.articleId)}>
                {topic.label}
              </button>
            ))}
          </motion.div>

          {/* Voice hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-center mb-4">
            <p className="text-white/40 text-xs">
              🎤 Voice enabled — try "APN settings" or "select 2nd article" after searching
            </p>
          </motion.div>

          {/* Rotating feature banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-6">
            <div className="relative h-14 overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.a key={featureIdx} href={feature.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-between px-5 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{feature.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold text-sm leading-none">{feature.title}</p>
                        {feature.badge && (
                          <span className="text-[9px] font-bold bg-[#00D084] text-white px-1.5 py-0.5 rounded-full leading-none">{feature.badge}</span>
                        )}
                      </div>
                      <p className="text-white/70 text-xs mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {rotatingFeatures.map((_, i) => (
                        <button key={i} onClick={e => { e.preventDefault(); setFeatureIdx(i); }}
                          className={`rounded-full transition-all ${i === featureIdx ? "bg-white w-3 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`} />
                      ))}
                    </div>
                    <button onClick={e => { e.preventDefault(); setFeatureIdx(i => (i - 1 + rotatingFeatures.length) % rotatingFeatures.length); }}
                      className="text-white/60 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={e => { e.preventDefault(); setFeatureIdx(i => (i + 1) % rotatingFeatures.length); }}
                      className="text-white/60 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </motion.a>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Popular articles */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            <div className="col-span-full flex items-center justify-between mb-1">
              <h3 className="text-white/70 text-xs font-medium">Popular Articles:</h3>
              <button
                onClick={() => { const el = document.getElementById("knowledge"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="text-white/50 text-xs hover:text-white/80 transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {popularArticles.map(article => (
              <button key={article.id}
                className="bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-xl p-3 cursor-pointer transition-all hover:scale-105 group backdrop-blur-sm text-left"
                onClick={() => {
                  trackSearch(article.title, 1, article.title);
                  openArticle(article);
                }}>
                <FileText className="h-4 w-4 text-blue-300 mb-2" />
                <h4 className="text-white font-semibold text-xs mb-1 group-hover:text-blue-200 transition-colors line-clamp-2">{article.title}</h4>
                <p className="text-white/50 text-[10px] line-clamp-2">{article.desc}</p>
              </button>
            ))}
          </div>

          {/* Quick stats bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="hidden md:flex items-center justify-center gap-6 mt-6 pt-5 border-t border-white/10">
            {[
              { icon: Signal, label: "99.9% Uptime" },
              { icon: Users, label: "2M+ Customers" },
              { icon: Zap, label: "5G Ready" },
              { icon: Shield, label: "No Contracts" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/50 text-xs">
                <Icon className="w-3.5 h-3.5 text-white/40" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} onRelatedClick={openArticleById} />
    </>
  );
}
