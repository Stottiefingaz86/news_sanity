"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBuilding, IconChevronRight, IconLifebuoy } from "@tabler/icons-react";
import { BetOnlineLogoFull, BetOnlineLogoLockup } from "@/components/brand/betonline-logo";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  isInTheNewsSection,
  isNavItemActive,
  isNewsFeaturedItemActive,
  isNewsLeaguePath,
  newsFeaturedItems,
  newsNavIconInvertClass,
  newsNavItems,
  type NewsFeaturedItem,
  type NewsLeague,
} from "@/lib/news-nav";
import { cn } from "@/lib/utils";

const sidebarBottomItems = [
  { icon: IconBuilding, label: "Banking" },
  { icon: IconLifebuoy, label: "Need Help" },
] as const;

function LeagueIcon({ league }: { league: NewsLeague }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={league.icon}
      alt=""
      width={16}
      height={16}
      className="size-4 shrink-0 object-contain"
      decoding="sync"
    />
  );
}

function FeatureNavIcon({
  icon,
  slug,
  active,
}: {
  icon: NewsFeaturedItem["icon"];
  slug: string;
  active: boolean;
}) {
  const IconComp = typeof icon === "string" ? null : icon;

  return (
    <div
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md",
        active ? "bg-white/20" : "bg-white/10",
      )}
    >
      {typeof icon === "string" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          className="size-4 object-contain brightness-0 invert"
        />
      ) : IconComp ? (
        <IconComp strokeWidth={1.5} className="size-4" />
      ) : null}
    </div>
  );
}

export function BolSidebar() {
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const [expandedSections, setExpandedSections] = useState<string[]>(() =>
    isInTheNewsSection(pathname) ? ["in-the-news"] : [],
  );

  useEffect(() => {
    if (isInTheNewsSection(pathname)) {
      setExpandedSections((prev) =>
        prev.includes("in-the-news") ? prev : [...prev, "in-the-news"],
      );
    }
  }, [pathname]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((section) => section !== id) : [...prev, id],
    );
  };

  const closeMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      mobileOverlay
      mobileNoDrag
      mobileBg="#2d2d2d"
      mobileOverlayClassName="!bg-black/40"
      className="!top-0 !z-[102] !h-screen border-r border-white/10 text-white !bg-[#2d2d2d] dark:!bg-[#2d2d2d] [&>div]:!bg-[#2d2d2d] dark:[&>div]:!bg-[#2d2d2d]"
    >
      <SidebarHeader
        className="sticky top-0 z-20 flex h-14 shrink-0 items-center overflow-hidden px-4"
        style={{
          backdropFilter: isMobile ? "none" : "blur(16px) saturate(180%)",
          WebkitBackdropFilter: isMobile ? "none" : "blur(16px) saturate(180%)",
          backgroundColor: isMobile
            ? "var(--ds-sidebar-bg, #2d2d2d)"
            : "rgba(45, 45, 45, 0.75)",
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {isMobile && (
            <button
              type="button"
              onClick={() => setOpenMobile(false)}
              className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          )}
          <Link href="/" onClick={closeMobile} className="cursor-pointer">
            <AnimatePresence mode="wait" initial={false}>
              {collapsed ? (
                <motion.div
                  key="lockup"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 16, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, transition: { duration: 0.08 } }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    mass: 0.6,
                    delay: 0.2,
                  }}
                >
                  <BetOnlineLogoLockup />
                </motion.div>
              ) : isMobile ? (
                <motion.div
                  key="lockup-mobile"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 20,
                    mass: 0.6,
                    delay: 0.05,
                  }}
                >
                  <BetOnlineLogoLockup className="size-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  transition={{ duration: 0.1 }}
                >
                  <BetOnlineLogoFull />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col overflow-x-hidden overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          <SidebarGroup>
            {isMobile && (
              <SidebarGroupLabel className="px-2 py-1 text-xs text-white/50">
                NEWS MENU
              </SidebarGroupLabel>
            )}
            <SidebarGroupLabel className="px-2 py-1 text-xs uppercase tracking-wide text-white/50 group-data-[collapsible=icon]:hidden">
              Features
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {newsFeaturedItems.map((feature) => {
                  const active = isNewsFeaturedItemActive(pathname, feature);

                  return (
                    <SidebarMenuItem key={feature.slug}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            style={
                              active
                                ? {
                                    backgroundColor: "var(--ds-primary, #ee3536)",
                                  }
                                : undefined
                            }
                            className={cn(
                              "h-auto w-full cursor-pointer justify-start rounded-small px-3 py-2.5 text-sm font-medium",
                              "focus-visible:outline-none focus-visible:ring-0",
                              "data-[active=true]:font-medium data-[active=true]:text-white",
                              "data-[active=false]:text-white/70 hover:bg-white/5 hover:text-white",
                            )}
                          >
                            <Link href={feature.href} onClick={closeMobile}>
                              <FeatureNavIcon
                                icon={feature.icon}
                                slug={feature.slug}
                                active={active}
                              />
                              <span className="group-data-[collapsible=icon]:hidden">
                                {feature.label}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent
                            side="right"
                            className="border-white/10 bg-[#2d2d2d] text-white"
                          >
                            <p>{feature.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}

                <div className="mx-1 my-2 border-b border-white/10 group-data-[collapsible=icon]:hidden" />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {newsNavItems.map((item) => {
                  if (item.type === "link") {
                    const IconComp =
                      typeof item.icon === "string" ? null : item.icon;
                    const active = isNavItemActive(pathname, item.href);

                    return (
                      <SidebarMenuItem key={item.href}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              style={
                                active
                                  ? {
                                      backgroundColor: "var(--ds-primary, #ee3536)",
                                    }
                                  : undefined
                              }
                              className={cn(
                                "h-auto w-full cursor-pointer justify-start rounded-small px-3 py-2.5 text-sm font-medium",
                                "focus-visible:outline-none focus-visible:ring-0",
                                "data-[active=true]:font-medium data-[active=true]:text-white",
                                "data-[active=false]:text-white/70 hover:bg-white/5 hover:text-white",
                              )}
                            >
                              <Link href={item.href} onClick={closeMobile}>
                                {typeof item.icon === "string" ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="h-7 w-auto max-w-7 shrink-0 object-contain"
                                  />
                                ) : IconComp ? (
                                  <IconComp strokeWidth={1.5} className="size-5 shrink-0" />
                                ) : null}
                                <span className="group-data-[collapsible=icon]:hidden">
                                  {item.label}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {collapsed && (
                            <TooltipContent
                              side="right"
                              className="border-white/10 bg-[#2d2d2d] text-white"
                            >
                              <p>{item.label}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  }

                  const Icon = item.icon;
                  const isExpanded = expandedSections.includes(item.id);
                  const sectionActive = isInTheNewsSection(pathname);

                  return (
                    <SidebarMenuItem key={item.id} className="group/collapsible">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            isActive={sectionActive}
                            onClick={(event) => {
                              event.preventDefault();
                              toggleSection(item.id);
                            }}
                            style={
                              sectionActive
                                ? {
                                    backgroundColor: "var(--ds-primary, #ee3536)",
                                  }
                                : undefined
                            }
                            className={cn(
                              "h-auto w-full cursor-pointer justify-start rounded-small px-3 py-2.5 text-sm font-medium",
                              "focus-visible:outline-none focus-visible:ring-0",
                              "data-[active=true]:font-medium data-[active=true]:text-white",
                              "data-[active=false]:text-white/70 hover:bg-white/5 hover:text-white",
                            )}
                          >
                            <Icon strokeWidth={1.5} className="size-5 shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.label}
                            </span>
                            <IconChevronRight
                              className={cn(
                                "ml-auto size-4 shrink-0 transition-transform duration-300 group-data-[collapsible=icon]:hidden",
                                isExpanded && "rotate-90",
                              )}
                            />
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent
                            side="right"
                            className="border-white/10 bg-[#2d2d2d] text-white"
                          >
                            <p>{item.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>

                      <AnimatePresence initial={false}>
                        {isExpanded && !collapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <SidebarMenuSub className="mx-2 border-white/10 px-1">
                              {item.children.map((league) => {
                                const leagueActive = isNewsLeaguePath(
                                  pathname,
                                  league.slug,
                                );

                                return (
                                  <SidebarMenuSubItem key={league.slug}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={leagueActive}
                                      className={cn(
                                        "h-auto min-h-8 cursor-pointer rounded-small py-2 pl-3 text-xs text-white/70 hover:bg-white/5 hover:text-white",
                                        leagueActive &&
                                          "bg-white/10 font-medium text-white",
                                      )}
                                    >
                                      <Link
                                        href={league.href}
                                        onClick={closeMobile}
                                      >
                                        <LeagueIcon league={league} />
                                        <span>{league.label}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="flex-1" />

          <Separator className="mx-2 bg-white/10" />

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarBottomItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            onClick={(event) => {
                              event.preventDefault();
                              closeMobile();
                            }}
                            className={cn(
                              "h-auto w-full cursor-pointer justify-start rounded-small px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white",
                              "focus-visible:outline-none focus-visible:ring-0",
                            )}
                          >
                            <Icon strokeWidth={1.5} className="size-5 shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.label}
                            </span>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent
                            side="right"
                            className="border-white/10 bg-[#2d2d2d] text-white"
                          >
                            <p>{item.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </TooltipProvider>

        {isMobile && <div className="h-24 shrink-0" aria-hidden />}
      </SidebarContent>
    </Sidebar>
  );
}
