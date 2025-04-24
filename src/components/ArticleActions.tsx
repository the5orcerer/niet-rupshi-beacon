
import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ArticleActionsProps {
  articleId: string;
  initialLikes?: number;
  initialDislikes?: number;
}

export const ArticleActions = ({ articleId, initialLikes = 0, initialDislikes = 0 }: ArticleActionsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      if (hasDisliked) {
        setDislikes(prev => prev - 1);
        setHasDisliked(false);
      }
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setDislikes(prev => prev - 1);
      setHasDisliked(false);
    } else {
      if (hasLiked) {
        setLikes(prev => prev - 1);
        setHasLiked(false);
      }
      setDislikes(prev => prev + 1);
      setHasDisliked(true);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Check out this article",
        url: `/blog/${articleId}`,
      });
    } catch (error) {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin + `/blog/${articleId}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleLike}
        className="flex items-center gap-1 text-muted-foreground hover:text-niet-blue transition-colors"
      >
        <ThumbsUp 
          className={cn(
            "h-5 w-5",
            hasLiked && "text-niet-blue fill-current"
          )} 
        />
        <span className="text-sm">{likes}</span>
      </button>

      <button 
        onClick={handleDislike}
        className="flex items-center gap-1 text-muted-foreground hover:text-niet-blue transition-colors"
      >
        <ThumbsDown 
          className={cn(
            "h-5 w-5",
            hasDisliked && "text-niet-blue fill-current"
          )} 
        />
        <span className="text-sm">{dislikes}</span>
      </button>

      <button 
        onClick={handleShare}
        className="text-muted-foreground hover:text-niet-blue transition-colors"
      >
        <Share className="h-5 w-5" />
      </button>
    </div>
  );
};
