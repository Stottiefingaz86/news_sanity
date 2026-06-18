"use client";

import { useState } from "react";
import { useContentTheme } from "@/components/providers/content-theme-provider";
import { BolFooter } from "@/components/layout/bol-footer";
import { BolHeader } from "@/components/layout/bol-header";
import { BolSidebar } from "@/components/layout/bol-sidebar";
import { BolSubNav, BolSubNavSpacer } from "@/components/layout/bol-sub-nav";
import { NewsSectionSubNav } from "@/components/news/widgets/news-section-sub-nav";
import { ComponentLibraryFab } from "@/components/news/component-library-fab";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type BolShellProps = {
  children: React.ReactNode;
  showSubNav?: boolean;
  subNavItems?: string[];
  defaultSubNav?: string;
  activeSectionSlug?: string;
};

function BolShellInner({
  children,
  showSubNav = false,
  subNavItems,
  defaultSubNav = "Latest",
  activeSectionSlug,
}: BolShellProps) {
  const tabs = subNavItems?.length ? subNavItems : ["Latest"];
  const [activeSubNav, setActiveSubNav] = useState(
    tabs.includes(defaultSubNav) ? defaultSubNav : tabs[0],
  );
  const { open, state, isMobile } = useSidebar();
  const sidebarOpen = state === "expanded" && !isMobile;
  const { theme: contentTheme } = useContentTheme();

  return (
    <div
      data-page-bg
      className="w-full overflow-x-clip font-sans"
      style={{ backgroundColor: "var(--ds-page-bg, #1c1c1c)" }}
    >
      <div className="dark" data-bol-chrome>
        <BolHeader />
      </div>

      <div className="relative flex w-full min-w-0" style={{ marginTop: "64px" }}>
        {!isMobile ? (
          <div
            aria-hidden
            className="fixed top-0 left-0 z-[101] h-dvh border-r border-white/10 transition-[width] duration-200 ease-linear"
            style={{
              width: sidebarOpen ? "16rem" : "3rem",
              backgroundColor: "var(--ds-sidebar-bg, #2d2d2d)",
            }}
          />
        ) : null}
        <div className="dark contents" data-bol-chrome>
          <BolSidebar />
        </div>

        <SidebarInset
          data-content-area
          data-content-theme={contentTheme}
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            contentTheme === "dark" && "dark",
          )}
          style={{
            width: "auto",
            flex: "1 1 0%",
            minWidth: 0,
            maxWidth: "none",
            backgroundColor: "var(--ds-content-bg, #ffffff)",
            color: "var(--ds-content-foreground, #0a0a0a)",
          }}
        >
          {showSubNav ? (
            <div className="dark" data-bol-chrome>
              <BolSubNav
                activeTab={activeSubNav}
                onTabChange={setActiveSubNav}
                items={tabs}
              />
            </div>
          ) : null}
          {showSubNav ? <BolSubNavSpacer /> : null}
          <NewsSectionSubNav
            stickyOffset={showSubNav ? 52 : 0}
            activeSectionSlug={activeSectionSlug}
          />
          <div className="min-w-0 pb-20 text-[var(--ds-content-foreground,#0a0a0a)] md:pb-0">
            {children}
          </div>
          <div className="dark" data-bol-chrome>
            <BolFooter />
          </div>
        </SidebarInset>
      </div>
      <ComponentLibraryFab />
    </div>
  );
}

export function BolShell(props: BolShellProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <BolShellInner {...props} />
    </SidebarProvider>
  );
}
