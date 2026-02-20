'use client';

import { SearchIcon } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="px-4">
      <div
        className="flex w-full items-center gap-2.5 rounded-xl bg-secondary px-3.5 py-2.5 text-left transition-colors active:bg-secondary/80"
        aria-label="Search products"
      >
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <input
          className="text-sm text-muted-foreground w-full"
          placeholder="Искать на Prosto Market"
        />
      </div>
    </div>
  );
}
