import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t p-4 h-4">
      <div className="container flex flex-col items-center gap-4 p-4 md:px-4">
        <p className="text-sm text-muted-foreground text-center">
          © 2025 Zenmind All rights reserved.
        </p>
      </div>
    </footer>
  );
}