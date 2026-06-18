"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Viewport offset: fixed header (64px) + section sub-nav (~52px) + breathing room. */
const PIN_TOP_PX = 124;

type LibrarySectionNavProps = {
  sections: readonly { id: string; label: string }[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  boundaryRef: React.RefObject<HTMLElement | null>;
};

export function LibrarySectionNav({
  sections,
  activeSection,
  onSectionClick,
  boundaryRef,
}: LibrarySectionNavProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<React.CSSProperties | undefined>();

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const update = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const boundaryRect = boundaryRef.current?.getBoundingClientRect();
      const navHeight = navRef.current?.offsetHeight ?? 0;

      let top = PIN_TOP_PX;

      if (anchorRect.top > PIN_TOP_PX) {
        top = anchorRect.top;
      } else if (
        boundaryRect &&
        navHeight > 0 &&
        boundaryRect.bottom < PIN_TOP_PX + navHeight
      ) {
        top = Math.max(PIN_TOP_PX, boundaryRect.bottom - navHeight);
      }

      setStyle({
        position: "fixed",
        top,
        left: anchorRect.left,
        width: anchorRect.width,
        maxHeight: `calc(100vh - ${top}px - 1rem)`,
        overflowY: "auto",
        zIndex: 20,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    observer.observe(anchor);
    if (boundaryRef.current) observer.observe(boundaryRef.current);
    if (navRef.current) observer.observe(navRef.current);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [boundaryRef]);

  return (
    <div className="hidden min-w-0 lg:block">
      <div ref={anchorRef} aria-hidden />
      <nav
        ref={navRef}
        aria-label="Component library sections"
        style={style}
        className={cn(
          "hidden min-w-0 flex-col gap-1 overscroll-contain lg:flex",
          !style && "lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto",
        )}
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              activeSection === section.id
                ? "bg-[var(--ds-content-surface,#f5f5f5)] font-semibold text-[var(--ds-content-foreground,#0a0a0a)]"
                : "text-[var(--ds-content-muted,#737373)] hover:bg-[var(--ds-content-surface,#f5f5f5)] hover:text-[var(--ds-content-foreground,#0a0a0a)]",
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
