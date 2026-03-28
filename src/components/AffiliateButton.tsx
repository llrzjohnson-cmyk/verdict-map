import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AffiliateButtonProps {
  url: string;
  label?: string;
  price?: number;
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
}

export function AffiliateButton({
  url,
  label = "Buy Now",
  price,
  size = "default",
  fullWidth = false,
}: AffiliateButtonProps) {
  const handleClick = () => {
    // In production, this would route through /api/affiliate/click
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
      <Button
        onClick={handleClick}
        size={size}
        className={`bg-primary text-primary-foreground hover:bg-primary/90 font-semibold ${fullWidth ? "w-full" : ""}`}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        {label}
        {price && <span className="ml-2">${price.toFixed(2)}</span>}
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Affiliate disclosure">
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">
          <p>We may earn a commission when you buy through our links, at no extra cost to you. This helps support our independent editorial team.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
