import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NewsKeyPointsProps = {
  title?: string;
  items: string[];
  className?: string;
};

export function NewsKeyPoints({ title = "Key takeaways", items, className }: NewsKeyPointsProps) {
  if (!items.length) return null;

  return (
    <Card
      className={cn(
        "my-8 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] py-0 shadow-none ring-0",
        className,
      )}
    >
      <CardHeader className="border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-4">
        <CardTitle className="font-serif text-xl text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-5">
        <ul className="flex flex-col gap-2.5 pl-5 text-sm leading-6 text-[var(--ds-content-foreground,#0a0a0a)] [list-style:disc]">
          {items.map((item) => (
            <li key={item} className="[text-wrap:pretty]">
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
