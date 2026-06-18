import { POLITELY_RAW_LOGO } from "@/lib/politely-raw";
import { cn } from "@/lib/utils";

type PolitelyRawBadgeProps = {
  className?: string;
  size?: "sm" | "md";
};

export function PolitelyRawBadge({ className, size = "md" }: PolitelyRawBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={POLITELY_RAW_LOGO}
      alt="Politely RAW"
      className={cn(
        "shrink-0 object-contain",
        size === "sm" ? "h-5 w-auto" : "h-7 w-auto",
        className,
      )}
    />
  );
}
