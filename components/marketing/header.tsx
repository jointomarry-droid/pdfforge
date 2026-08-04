"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/config/site";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { CommandPalette, CommandPaletteTrigger } from "@/components/tools/command-palette";
import * as React from "react";

export function Header() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link href="/tools" className="text-muted-foreground transition-colors hover:text-foreground">
                Tools
              </Link>
              <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
                Pricing
              </Link>
              <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
                Docs
              </Link>
              <Link href={siteConfig.nav.dashboard.href} className="text-muted-foreground transition-colors hover:text-foreground">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <CommandPaletteTrigger onClick={() => setSearchOpen(true)} />
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get started free</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
