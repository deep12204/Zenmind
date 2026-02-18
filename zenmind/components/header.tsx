'use client';

import Link from "next/link";
import { Rabbit } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SignInButton } from "./auth/sign-in-button";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/content", label: "Content" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About ZenMind" },
  ];

  return (
    <div className="w-full fixed top-0 z-50 bg-white dark:bg-black shadow-sm">
      <header className="relative max-w-full px-4">
        <div className="flex h-16 items-center justify-between ">
          
          {/* === Left side (hamburger + logo) === */}
          <div className="flex items-center gap-3">
            {/* Hamburger button (now visible on all screens) */}
            <button
              className="p-2 left-12 top-16 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu size={22} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Rabbit className="h-7 w-7 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                ZenMind
              </span>
            </Link>
          </div>

          {/* === Center Navigation (optional to hide later) === */}
          <nav className="hidden md:flex  items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* === Right side controls === */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignInButton />
          </div>
        </div>
      </header>
    </div>
  );
}
