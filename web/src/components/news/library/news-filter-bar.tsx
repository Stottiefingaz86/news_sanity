"use client";

import { useState } from "react";
import { ChevronDownIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type FilterCategory = { label: string; value: string };

type NewsFilterBarProps = {
  categories: FilterCategory[];
  sortOptions?: { label: string; value: string }[];
  onCategoryChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  layout?: "pills" | "dropdowns" | "toolbar";
  className?: string;
};

const DEFAULT_SORT = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most popular", value: "popular" },
  { label: "A–Z", value: "alpha" },
];

export function NewsFilterBar({
  categories,
  sortOptions = DEFAULT_SORT,
  onCategoryChange,
  onSortChange,
  onSearch,
  layout = "pills",
  className,
}: NewsFilterBarProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.value ?? "all");
  const [sort, setSort] = useState(sortOptions[0]?.value ?? "newest");
  const [query, setQuery] = useState("");

  const handleCategory = (value: string | null) => {
    if (!value) return;
    setActiveCategory(value);
    onCategoryChange?.(value);
  };

  const handleSort = (value: string | null) => {
    if (!value) return;
    setSort(value);
    onSortChange?.(value);
  };

  if (layout === "dropdowns") {
    return (
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        <Select value={activeCategory} onValueChange={handleCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={handleSort}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (layout === "toolbar") {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-xl border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-card-bg,#ffffff)] p-3 sm:flex-row sm:items-center",
          className,
        )}
      >
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--ds-content-muted,#737373)]" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              onSearch?.(event.target.value);
            }}
            placeholder="Search articles…"
            className="h-10 w-full rounded-lg border border-[var(--ds-content-card-border,#e5e5e5)] bg-[var(--ds-content-surface,#f5f5f5)] pr-3 pl-9 text-sm outline-none focus:border-[var(--ds-primary,#ee3536)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <SlidersHorizontalIcon data-icon="inline-start" />
              Filters
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.value} onClick={() => handleCategory(cat.value)}>
                  {cat.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => handleSort(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={sort} onValueChange={handleSort}>
            <SelectTrigger className="w-[140px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => handleCategory(cat.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
            activeCategory === cat.value
              ? "bg-[var(--ds-primary,#ee3536)] text-white"
              : "bg-[var(--ds-content-surface,#f5f5f5)] text-[var(--ds-content-foreground,#0a0a0a)] hover:bg-[var(--ds-content-card-border,#e5e5e5)]",
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
