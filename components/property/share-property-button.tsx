"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface SharePropertyButtonProps {
  title: string;
  price: string;
}

export function SharePropertyButton({
  title,
  price,
}: SharePropertyButtonProps) {
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out this property: ${title} - ${price}`;

    // Web Share API  (available on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - ${price}`,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        // only show error if not cancelled
        if (error instanceof Error && error.name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      // fallback
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } catch (_error) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Share property"
      onClick={handleShare}
    >
      <Share2 className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
