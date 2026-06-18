import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RelatedLink = {
  title?: string;
  href?: string;
  category?: string;
};

type NewsRelatedLinksProps = {
  title?: string;
  articles: RelatedLink[];
  className?: string;
};

export function NewsRelatedLinks({
  title = "Related reading",
  articles,
  className,
}: NewsRelatedLinksProps) {
  if (!articles.length) return null;

  return (
    <Card
      className={cn(
        "my-10 border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] py-0 shadow-none ring-0",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-5">
        {articles.map((article, index) => (
          <Link
            key={`${article.title}-${index}`}
            href={article.href ?? "#"}
            className="group rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-3 transition-shadow hover:shadow-sm"
          >
            {article.category ? (
              <Badge
                variant="outline"
                className="border-[var(--ds-primary,#ee3536)]/20 bg-transparent text-[10px] font-bold uppercase text-[var(--ds-primary,#ee3536)]"
              >
                {article.category}
              </Badge>
            ) : null}
            <p className="mt-2 font-serif text-base leading-snug text-[var(--ds-content-foreground,#0a0a0a)] group-hover:text-[var(--ds-primary,#ee3536)] [text-wrap:balance]">
              {article.title}
            </p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
