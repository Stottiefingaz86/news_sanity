"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useContentTheme } from "@/components/providers/content-theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useContentTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10"
      >
          {theme === "dark" ? (
            <IconMoon className="size-4" stroke={1.5} />
          ) : (
            <IconSun className="size-4" stroke={1.5} />
          )}
        <span className="sr-only">Toggle content theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[120] border-white/10 bg-[#2d2d2d]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={
            theme === "light" ? "text-white" : "text-white/70 hover:text-white"
          }
        >
          Light content
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={
            theme === "dark" ? "text-white" : "text-white/70 hover:text-white"
          }
        >
          Dark content
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
