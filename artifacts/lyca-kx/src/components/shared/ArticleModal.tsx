import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Lightbulb, AlertCircle, Clock, ThumbsUp, ThumbsDown, ChevronRight, ExternalLink, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/data/articles";
import { findArticleById } from "@/data/articles";
import { trackArticleFeedback } from "@/lib/analytics";

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onRelatedClick?: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  "Getting Started": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Account & Billing": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Service Management": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Device & Connectivity": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "International Services": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "Policies & Compliance": "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300",
};

export function ArticleModal({ article, onClose, onRelatedClick }: ArticleModalProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const [thumbsDownReason, setThumbsDownReason] = useState("");
  const [thumbsDownSubmitted, setThumbsDownSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article?.id) {
      setFeedback(null);
      setThumbsDownReason("");
      setThumbsDownSubmitted(false);
    }
  }, [article?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && article) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const badgeClass = categoryColors[article.category] ?? "bg-slate-100 text-slate-700";
  const relatedArticles = (article.relatedIds ?? [])
    .map(id => findArticleById(id))
    .filter(Boolean) as Article[];

  const handleThumbsUp = () => {
    setFeedback("yes");
    trackArticleFeedback(article.id, article.title, true);
  };

  const handleThumbsDown = () => {
    setFeedback("no");
  };

  const submitThumbsDownReason = () => {
    trackArticleFeedback(article.id, article.title, false, thumbsDownReason || undefined);
    setThumbsDownSubmitted(true);
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          key="article-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/20 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={e => e.stopPropagation()}
            className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] p-6 md:p-8 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 0)", backgroundSize: "30px 30px" }} />
              <button onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${badgeClass}`}>
                {article.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 pr-8">{article.title}</h2>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto" ref={scrollRef}>
              <div className="p-6 md:p-8 space-y-6">
                {/* Steps */}
                <div>
                  <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00D084]" />
                    Step-by-Step Guide
                  </h3>
                  <ol className="space-y-3">
                    {article.steps.map((step, i) => {
                      const isSubItem = step.startsWith("  •");
                      if (isSubItem) {
                        return (
                          <li key={i} className="ml-10 flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                            <span>{step.replace("  •", "").trim()}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-0.5 w-6 h-6 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed text-foreground">{step}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Tips */}
                {article.tips && article.tips.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4" /> Helpful Tips
                    </h4>
                    <ul className="space-y-1.5">
                      {article.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                          <span className="mt-1 shrink-0">•</span><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Note */}
                {article.note && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">{article.note}</p>
                  </div>
                )}

                {/* Related */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Related Articles</h4>
                    <div className="space-y-2">
                      {relatedArticles.map(rel => (
                        <button key={rel.id} onClick={() => onRelatedClick?.(rel.id)}
                          className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group text-left">
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{rel.title}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                <div className="border-t border-border pt-6">
                  <p className="text-sm font-semibold mb-3 text-center text-muted-foreground">Was this article helpful?</p>
                  {feedback === null ? (
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" onClick={handleThumbsUp} className="gap-2 hover:border-emerald-400 hover:text-emerald-600">
                        <ThumbsUp className="w-4 h-4" /> Yes, it helped
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleThumbsDown} className="gap-2 hover:border-red-400 hover:text-red-500">
                        <ThumbsDown className="w-4 h-4" /> Not really
                      </Button>
                    </div>
                  ) : feedback === "yes" ? (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                        <ThumbsUp className="w-4 h-4" /> Thank you! Glad we could help.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      {!thumbsDownSubmitted ? (
                        <>
                          <p className="text-sm text-center text-muted-foreground">Sorry to hear that. Would you like to let us know what went wrong?</p>
                          <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-2">
                              {["Information was incorrect", "Steps didn't work for me", "Missing information", "Too hard to follow"].map(reason => (
                                <button key={reason}
                                  onClick={() => setThumbsDownReason(reason)}
                                  className={`text-xs p-2.5 rounded-lg border text-left transition-colors ${thumbsDownReason === reason ? "border-[#0066FF] bg-blue-50 dark:bg-blue-900/20 text-[#0066FF]" : "border-border hover:border-slate-300"}`}>
                                  {reason}
                                </button>
                              ))}
                            </div>
                            <textarea
                              className="w-full text-sm border border-border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 bg-background"
                              rows={2}
                              placeholder="Or describe the issue in your own words (optional)..."
                              value={thumbsDownReason}
                              onChange={e => setThumbsDownReason(e.target.value)}
                            />
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => { setFeedback(null); setThumbsDownReason(""); }}>Cancel</Button>
                              <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052cc] text-white" onClick={submitThumbsDownReason}>
                                Submit Feedback
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Thank you for your feedback! We'll use it to improve this article.</p>
                          <button onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}
                            className="mt-2 text-sm text-[#0066FF] underline font-medium">
                            Need more help? Ask LIA →
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Still need help */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-border">
                  <h4 className="font-semibold text-sm mb-3 text-center">Still need help?</h4>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-transparent"
                      onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("openAIAssistant")); }}>
                      <MessageSquare className="w-4 h-4" /> Chat with LIA
                    </Button>
                    <a href="tel:18662773221">
                      <Button size="sm" className="gap-2 bg-[#0E1F5C] hover:bg-[#1a3385] text-white w-full sm:w-auto">
                        <Phone className="w-4 h-4" /> Call 1-866-277-3221
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
