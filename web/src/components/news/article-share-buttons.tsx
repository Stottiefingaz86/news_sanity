"use client";

import { useEffect, useState } from "react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconLink,
  IconMail,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { articleAbsoluteUrl } from "@/lib/article-url";
import { cn } from "@/lib/utils";

type ArticleShareButtonsProps = {
  title: string;
  slug: string;
  className?: string;
  layout?: "inline" | "stacked";
};

type ShareAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export function ArticleShareButtons({
  title,
  slug,
  className,
  layout = "inline",
}: ArticleShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState(() => articleAbsoluteUrl(slug));

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(window.location.href.split("#")[0].split("?")[0]);
  }, [slug]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  }

  const actions: ShareAction[] = [
    {
      id: "x",
      label: "Share on X",
      icon: <IconBrandX className="size-4" stroke={1.5} />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: "facebook",
      label: "Share on Facebook",
      icon: <IconBrandFacebook className="size-4" stroke={1.5} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "linkedin",
      label: "Share on LinkedIn",
      icon: <IconBrandLinkedin className="size-4" stroke={1.5} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      id: "email",
      label: "Share by email",
      icon: <IconMail className="size-4" stroke={1.5} />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
    {
      id: "copy",
      label: "Copy link",
      icon: <IconLink className="size-4" stroke={1.5} />,
      onClick: copyLink,
    },
  ];

  return (
    <div
      className={cn(
        layout === "stacked" ? "flex flex-col gap-2" : "flex flex-wrap items-center gap-2",
        className,
      )}
    >
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--ds-content-muted,#737373)]">
        Share
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {actions.map((action) =>
          action.href ? (
            <a
              key={action.id}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={action.label}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:border-[var(--ds-primary,#ee3536)] hover:text-[var(--ds-primary,#ee3536)]"
            >
              {action.icon}
            </a>
          ) : (
            <button
              key={action.id}
              type="button"
              onClick={action.onClick}
              aria-label={action.label}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] text-[var(--ds-content-foreground,#0a0a0a)] transition-colors hover:border-[var(--ds-primary,#ee3536)] hover:text-[var(--ds-primary,#ee3536)]"
            >
              {action.icon}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
