import { AlertCircleIcon, InfoIcon, TrendingUpIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type NewsCalloutProps = {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "tip" | "odds";
  className?: string;
};

const icons = {
  info: InfoIcon,
  tip: TrendingUpIcon,
  odds: AlertCircleIcon,
} as const;

export function NewsCallout({
  title,
  children,
  variant = "info",
  className,
}: NewsCalloutProps) {
  const Icon = icons[variant];

  return (
    <Alert
      className={cn(
        "my-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] text-[var(--ds-content-foreground,#0a0a0a)]",
        className,
      )}
    >
      <Icon />
      {title ? (
        <AlertTitle className="text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </AlertTitle>
      ) : null}
      <AlertDescription className="text-[var(--ds-content-muted,#737373)]">
        {children}
      </AlertDescription>
    </Alert>
  );
}
