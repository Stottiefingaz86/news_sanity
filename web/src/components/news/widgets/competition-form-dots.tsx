import type { FormResult } from "@/lib/sports-widgets/competitions";
import { cn } from "@/lib/utils";

const FORM_STYLES: Record<FormResult, string> = {
  W: "bg-emerald-600 text-white",
  D: "bg-[var(--ds-content-muted,#737373)] text-white",
  L: "bg-[var(--ds-primary,#ee3536)] text-white",
};

export function CompetitionFormDots({
  form,
  className,
}: {
  form: FormResult[];
  className?: string;
}) {
  if (!form.length) {
    return <span className="text-[var(--ds-content-muted,#737373)]">—</span>;
  }

  return (
    <div className={cn("flex items-center justify-end gap-0.5", className)}>
      {form.map((result, index) => (
        <span
          key={`${result}-${index}`}
          className={cn(
            "flex size-4 items-center justify-center rounded-full text-[9px] font-bold leading-none",
            FORM_STYLES[result],
          )}
          title={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
        >
          {result === "W" ? "✓" : result === "D" ? "−" : "✕"}
        </span>
      ))}
    </div>
  );
}
