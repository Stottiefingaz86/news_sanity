import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import {
  BETTING_RESOURCE_ICONS,
  BETTING_RESOURCES_COLUMNS,
  bettingResourceLinkHref,
  bettingResourcesPath,
  type BettingResourceCategory,
  type BettingResourceLink,
} from "@/lib/betting-resources/data";
import { cn } from "@/lib/utils";

type BettingResourcesSectionProps = {
  showViewAll?: boolean;
  className?: string;
};

function ResourceCategoryBlock({ category }: { category: BettingResourceCategory }) {
  const iconSrc = category.icon ? BETTING_RESOURCE_ICONS[category.icon] : null;

  return (
    <div id={category.id} className="min-w-0 scroll-mt-28">
      <Link
        href={`${bettingResourcesPath()}#${category.id}`}
        className="group flex items-center gap-2 border-b border-[var(--ds-content-card-border,#e5e5e5)] pb-3"
      >
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0 object-contain"
          />
        ) : null}
        <span className="min-w-0 flex-1 text-sm font-bold uppercase tracking-wide text-[var(--ds-content-foreground,#0a0a0a)]">
          {category.title}
        </span>
        <ChevronRightIcon className="size-4 shrink-0 text-[var(--ds-content-muted,#737373)] transition-transform group-hover:translate-x-0.5" />
      </Link>

      <ul className="mt-0">
        {category.links.map((link, index) => (
          <li
            key={link.id}
            className={cn(
              index < category.links.length - 1 &&
                "border-b border-[var(--ds-content-card-border,#e5e5e5)]",
            )}
          >
            <ResourceLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResourceLink({ link }: { link: BettingResourceLink }) {
  return (
    <Link
      id={link.id}
      href={bettingResourceLinkHref(link)}
      className="block py-3 text-sm leading-snug text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:text-[var(--ds-primary,#ee3536)] [text-wrap:pretty]"
    >
      {link.title}
    </Link>
  );
}

export function BettingResourcesSection({
  showViewAll = true,
  className,
}: BettingResourcesSectionProps) {
  return (
    <section
      className={cn(
        "border-t border-[var(--ds-content-card-border,#e5e5e5)] pt-10",
        className,
      )}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-[var(--ds-content-foreground,#0a0a0a)] md:text-4xl">
          Betting Resources
        </h2>
        {showViewAll ? (
          <Link
            href={bettingResourcesPath()}
            className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ds-primary,#ee3536)] transition-colors hover:text-[var(--ds-primary-hover,#dc2a2f)]"
          >
            View all
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
        {BETTING_RESOURCES_COLUMNS.map((column, columnIndex) => (
          <div key={`col-${columnIndex}`} className="flex min-w-0 flex-col gap-10">
            {column.map((category) => (
              <ResourceCategoryBlock key={category.id} category={category} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
