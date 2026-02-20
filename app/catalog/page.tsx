"use client";

import { BottomNav } from "@/components/bottom-nav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-background pb-20">
      <header className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Каталог</h1>
      </header>
      <div className="flex flex-1 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Каталог товаров будет здесь
        </p>
      </div>
      <BottomNav />
    </main>
  );
}
