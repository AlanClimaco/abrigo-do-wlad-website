import * as React from "react";
import * as Lucide from "lucide-react";
import styles from "./PageFeedback.module.css";
import { logPageFeedback } from "../../utils/analytics";
import type { PageVote } from "../../utils/analytics";
import { useLocation } from "react-router";
import { Button } from "../ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

interface PageFeedbackProps {
  pageId?: string;
  className?: string;
}

export function PageFeedback({ pageId, className }: PageFeedbackProps) {
  const location = useLocation();
  const pathToLog = pageId || location.pathname;
  const storageKey = `feedback_voted_${pathToLog}`;

  const [hasVoted, setHasVoted] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem(storageKey);
  });

  const [voteType, setVoteType] = React.useState<PageVote | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = sessionStorage.getItem(storageKey) as PageVote | null;
    return saved ? saved : null;
  });
  const handleVote = (vote: PageVote) => {
    if (hasVoted) return;

    setHasVoted(true);
    setVoteType(vote);
    sessionStorage.setItem(storageKey, vote);

    logPageFeedback(pathToLog, vote);
  };

  return (
    <TooltipProvider>
      <div className={`${styles.container} ${className || ""}`}>
        {!hasVoted ? (
          <>
            <div className={styles.questionWrapper}>
              <span className={styles.question}>Isso foi útil?</span>

              <div className={styles.actions}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleVote("positive")}
                      variant="ghost"
                      size="icon-sm"
                      className={styles.feedbackBtn}
                      aria-label="Sim, foi útil"
                    >
                      <Lucide.Smile size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Sim, foi útil</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleVote("meh")}
                      variant="ghost"
                      size="icon-sm"
                      className={styles.feedbackBtn}
                      aria-label="Não sei"
                    >
                      <Lucide.Meh size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Não sei</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleVote("negative")}
                      variant="ghost"
                      size="icon-sm"
                      className={styles.feedbackBtn}
                      aria-label="Não foi útil"
                    >
                      <Lucide.Frown size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Não foi útil</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.feedbackMessage}>
            <Lucide.CheckCircle2 size={18} />
            <span>Agradecemos pelo seu feedback!</span>
            <div className={styles.actions} style={{ marginLeft: "auto" }}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={`${styles.feedbackBtn} ${voteType === "positive" ? styles.active : ""}`}
                      disabled
                    >
                      <Lucide.Smile size={20} />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>Sim, foi útil</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={`${styles.feedbackBtn} ${voteType === "meh" ? styles.active : ""}`}
                      disabled
                    >
                      <Lucide.Meh size={20} />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>Não sei</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={`${styles.feedbackBtn} ${voteType === "negative" ? styles.active : ""}`}
                      disabled
                    >
                      <Lucide.Frown size={20} />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>Não foi útil</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
