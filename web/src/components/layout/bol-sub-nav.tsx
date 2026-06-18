"use client";

import { motion } from "framer-motion";
import { IconHeart, IconSearch } from "@tabler/icons-react";
import {
  Tabs as AnimateTabs,
  TabsList as AnimateTabsList,
  TabsTab,
} from "@/components/animate-ui/components/base/tabs";
import { defaultSubNavItems } from "@/lib/sanity/news-settings";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type BolSubNavProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  items?: string[];
};

export function BolSubNav({
  activeTab,
  onTabChange,
  items = [...defaultSubNavItems],
}: BolSubNavProps) {
  const { state, isMobile } = useSidebar();

  return (
    <motion.div
      data-sub-nav
      className={cn(
        "fixed z-[90] border-b border-white/10 py-3 shadow-sm backdrop-blur-xl",
        isMobile ? "left-0 right-0 overflow-hidden" : "px-6",
      )}
      initial={false}
      animate={{ top: 64 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      }}
      style={
        isMobile
          ? {
              left: 0,
              right: 0,
              width: "100vw",
              marginLeft: 0,
              marginRight: 0,
              paddingLeft: 0,
              paddingRight: 0,
              borderTop: "none",
            }
          : {
              top: 64,
              left: state === "collapsed" ? "3rem" : "16rem",
              right: 0,
              transition: "left 0.2s ease-out",
            }
      }
    >
      <div
        className={cn(
          "flex items-center gap-1.5",
          isMobile && "scrollbar-hide overflow-x-auto px-3",
        )}
      >
        {!isMobile && (
          <div className="flex shrink-0 items-center rounded-3xl bg-white/5 p-0.5">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-2xl text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Search news"
            >
              <IconSearch className="size-3.5" stroke={1.5} />
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-2xl text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Saved articles"
            >
              <IconHeart className="size-3.5" stroke={1.5} />
            </button>
          </div>
        )}

        <AnimateTabs
          value={activeTab}
          onValueChange={onTabChange}
          className="min-w-0 flex-1"
        >
          <AnimateTabsList className="h-auto gap-1 rounded-3xl border-0 bg-white/5 p-0.5">
            {items.map((tab) => (
              <TabsTab
                key={tab}
                value={tab}
                data-tab-item
                className="relative z-10 h-9 shrink-0 rounded-2xl px-4 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white data-[state=active]:bg-transparent data-[state=active]:text-white"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    layout="position"
                    className="absolute inset-0 -z-10 rounded-2xl"
                    style={{ backgroundColor: "var(--ds-primary, #ee3536)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 whitespace-nowrap",
                    activeTab === tab && "text-white",
                  )}
                >
                  {tab}
                </span>
              </TabsTab>
            ))}
          </AnimateTabsList>
        </AnimateTabs>
      </div>
    </motion.div>
  );
}

export function BolSubNavSpacer() {
  const { isMobile } = useSidebar();

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ height: isMobile ? 100 : 115 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
      }}
      style={{ overflow: "hidden" }}
    />
  );
}
