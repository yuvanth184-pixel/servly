"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/layout/Sidebar";
import { Navbar } from "@/components/shared/layout/Navbar";
import { CartProvider } from "@/context/cart-context";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar
          portal="customer"
          mode="overlay"
          isOpen={overlayOpen}
          onClose={() => setOverlayOpen(false)}
        />

        {overlayOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
            onClick={() => setOverlayOpen(false)}
          />
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar portal="customer" onMenuToggle={() => setOverlayOpen(!overlayOpen)} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </CartProvider>
  );
}
