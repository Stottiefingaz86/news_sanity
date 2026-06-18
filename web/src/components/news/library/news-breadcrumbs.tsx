import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type NewsBreadcrumbItem = {
  label: string;
  href?: string;
};

type NewsBreadcrumbsProps = {
  items: NewsBreadcrumbItem[];
  variant?: "default" | "compact" | "hero";
  className?: string;
};

export function NewsBreadcrumbs({
  items,
  variant = "default",
  className,
}: NewsBreadcrumbsProps) {
  if (!items.length) return null;

  const visible =
    variant === "compact" && items.length > 3
      ? [items[0], null, items[items.length - 1]]
      : items;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList
        className={cn(
          variant === "hero" && "text-white/70",
          variant === "compact" && "text-xs",
        )}
      >
        {visible.map((item, index) => {
          if (item === null) {
            return (
              <span key="ellipsis" className="contents">
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </span>
            );
          }

          const isLast = index === visible.length - 1;

          return (
            <span key={`${item.label}-${index}`} className="contents">
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage
                    className={cn(
                      variant === "hero" && "text-white",
                      "line-clamp-1 max-w-[14rem] sm:max-w-none",
                    )}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={item.href} />}
                    className={variant === "hero" ? "text-white/70 hover:text-white" : undefined}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
