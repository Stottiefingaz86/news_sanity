import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CtaBlock } from "@/lib/article-blocks/types";

export function CtaBlockView({ value }: { value: CtaBlock }) {
  if (!value.title && !value.body) return null;

  const variant = value.variant ?? "primary";

  return (
    <aside
      className={cn(
        "my-10 rounded-2xl p-6 md:p-8",
        variant === "primary" &&
          "bg-[var(--ds-content-emphasis-bg,#0a0a0a)] text-[var(--ds-content-emphasis-fg,#ffffff)]",
        variant === "outline" &&
          "border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)]",
        variant === "accent" &&
          "bg-[var(--ds-primary,#ee3536)] text-white",
      )}
    >
      {value.kicker ? (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.14em]",
            variant === "outline"
              ? "text-[var(--ds-primary,#ee3536)]"
              : "text-white/80",
          )}
        >
          {value.kicker}
        </p>
      ) : null}
      {value.title ? (
        <h3 className="mt-2 font-serif text-2xl leading-tight [text-wrap:balance]">
          {value.title}
        </h3>
      ) : null}
      {value.body ? (
        <p
          className={cn(
            "mt-3 text-sm leading-6 [text-wrap:pretty]",
            variant === "outline"
              ? "text-[var(--ds-content-muted,#737373)]"
              : "text-white/85",
          )}
        >
          {value.body}
        </p>
      ) : null}
      {value.buttonLabel && value.buttonHref ? (
        <div className="mt-6">
          <Button
            variant={variant === "outline" ? "default" : "secondary"}
            className={cn(
              variant === "accent" &&
                "bg-white text-[var(--ds-content-foreground,#0a0a0a)] hover:bg-white/90",
            )}
            render={<Link href={value.buttonHref} />}
          >
            {value.buttonLabel}
          </Button>
        </div>
      ) : null}
    </aside>
  );
}
