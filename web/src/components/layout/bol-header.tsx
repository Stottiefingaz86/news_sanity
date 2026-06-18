"use client";

import Link from "next/link";
import {
  IconChevronDown,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { BetOnlineLogoFull } from "@/components/brand/betonline-logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const productNav = [
  { label: "Sports", href: "https://www.betonline.ag/sportsbook" },
  { label: "Casino", href: "https://www.betonline.ag/casino" },
  { label: "Poker", href: "https://www.betonline.ag/poker" },
  { label: "Promotions", href: "https://www.betonline.ag/promotions" },
] as const;

const otherLinks = [
  { label: "Esports", href: "https://www.betonline.ag/esports" },
  { label: "Racebook", href: "https://www.betonline.ag/horse-betting" },
  { label: "News Room", href: "/" },
] as const;

export function BolHeader() {
  const { open, openMobile, setOpenMobile, toggleSidebar, isMobile, state } =
    useSidebar();
  const sidebarOpen = state === "expanded" && !isMobile;

  return (
    <header
      data-nav-header
      className={cn(
        "fixed top-0 right-0 z-[101] flex h-16 items-center justify-between border-b border-white/10 px-3 transition-[left] duration-200 ease-linear md:px-6",
        isMobile ? "left-0" : sidebarOpen ? "left-[16rem]" : "left-[3rem]",
      )}
      style={{
        backgroundColor: "var(--ds-nav-bg, #2D2E2C)",
        boxShadow: "0 -200px 0 0 var(--ds-nav-bg, #2D2E2C)",
      }}
    >
      <div className="flex min-w-0 items-center gap-4 md:gap-6">
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-white hover:bg-white/5"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? (
                <IconX className="size-4" strokeWidth={1.5} />
              ) : (
                <IconMenu2 className="size-4" strokeWidth={1.5} />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Link href="/" className="relative flex h-8 w-[120px] items-center">
              <BetOnlineLogoFull />
            </Link>
          </>
        ) : (
          <nav className="flex flex-1 items-center gap-2 overflow-visible">
            <div className="mr-1 flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="size-8 text-white/40 hover:bg-white/10 hover:text-white"
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
              </Button>
              <div className="h-5 w-px bg-white/20" />
            </div>
            <SidebarMenu className="flex flex-row items-center gap-2">
              {productNav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className="relative h-10 min-w-[80px] cursor-pointer justify-center overflow-visible rounded-[6px] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white data-[active=true]:bg-transparent"
                    onClick={() => window.open(item.href, "_self")}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="relative flex h-10 min-w-[80px] cursor-pointer items-center justify-center rounded-[6px] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      Other
                      <IconChevronDown className="size-3" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="z-[120] w-[200px] border-white/10 bg-[#2d2d2d]"
                  >
                    {otherLinks.map((link) => (
                      <DropdownMenuItem key={link.label} className="p-0">
                        <Link
                          href={link.href}
                          className="block w-full px-2 py-1.5 text-white/70 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <ModeToggle />
        <div className="hidden h-6 w-px bg-white/20 md:block" />
        <Button
          variant="ghost"
          className="h-9 rounded-[6px] border border-white/45 bg-transparent px-3 text-xs font-semibold text-white hover:bg-white/10"
        >
          Login
        </Button>
        <Button
          variant="ghost"
          className="h-9 rounded-[6px] border border-emerald-600 bg-emerald-600 px-3 text-xs font-semibold text-white hover:border-emerald-500 hover:bg-emerald-500"
        >
          Join
        </Button>
      </div>
    </header>
  );
}
