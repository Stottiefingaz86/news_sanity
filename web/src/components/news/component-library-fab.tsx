"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGridIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComponentLibraryFab({ className }: { className?: string }) {
  const pathname = usePathname();

  if (pathname === "/library" || pathname.startsWith("/library/")) {
    return null;
  }

  return (
    <Link
      href="/library"
      aria-label="Open component library"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full",
        "bg-[var(--ds-primary,#ee3536)] text-white shadow-lg shadow-black/20",
        "transition-transform hover:scale-105 hover:bg-[var(--ds-primary-hover,#dc2a2f)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-primary,#ee3536)] focus-visible:ring-offset-2",
        className,
      )}
    >
      <LayoutGridIcon className="size-5" strokeWidth={2} />
    </Link>
  );
}
