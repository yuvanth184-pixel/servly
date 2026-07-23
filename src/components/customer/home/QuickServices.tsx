"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useService } from "@/context/service-context";

const quickServices = [
  {
    id: "kitchen",
    slug: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    href: "/customer/services/kitchen-cleaning",
  },
  {
    id: "sofa",
    slug: "sofa-cleaning",
    title: "Sofa Cleaning",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    href: "/customer/services/sofa-cleaning",
  },
  {
    id: "tank",
    slug: "tank-cleaning",
    title: "Tank Cleaning",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
    href: "/customer/services/tank-cleaning",
  },
  {
    id: "washroom",
    slug: "washroom-cleaning",
    title: "Washroom Cleaning",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eebd21f?w=600&h=400&fit=crop",
    href: "/customer/services/washroom-cleaning",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function QuickServices() {
  const { isServiceActive } = useService();

  return (
    <div className="py-6" style={{ background: "linear-gradient(180deg, oklch(0.97 0.01 264) 0%, oklch(1 0 0) 100%)" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Quick Services
          </h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {quickServices.map((service) => {
            const active = isServiceActive(service.slug);
            return (
              <motion.div
                key={service.id}
                variants={item}
                whileHover={active ? { y: -2 } : undefined}
              >
                <Link
                  href={active ? service.href : "#"}
                  onClick={(e) => { if (!active) e.preventDefault(); }}
                  className={`group relative block overflow-hidden rounded-xl border border-border bg-card ${!active ? "pointer-events-none" : ""}`}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`size-full object-cover transition-transform duration-300 ${active ? "group-hover:scale-105" : "grayscale brightness-50"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <h3 className="text-sm font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                    {!active && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                        <p className="text-xs font-semibold text-white">Not Available</p>
                        <p className="mt-0.5 text-[10px] text-white/70">Check back later</p>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
