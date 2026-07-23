"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useService } from "@/context/service-context";

const featuredServices = [
  {
    id: "cleaning",
    slug: "home-cleaning",
    title: "House Cleaning",
    subtitle: "Professional home cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
    href: "/customer/services/home-cleaning",
  },
  {
    id: "plumbing",
    slug: "plumbing-repair",
    title: "Plumbing Repair",
    subtitle: "Expert plumbing solutions",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
    href: "/customer/services/plumbing-repair",
  },
  {
    id: "electrical",
    slug: "electrical-work",
    title: "Electrical Work",
    subtitle: "Licensed electricians",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
    href: "/customer/services/electrical-work",
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

export function FeaturedServices() {
  const { isServiceActive } = useService();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Featured Services
        </h2>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {featuredServices.map((service) => {
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
                className={`group relative block overflow-hidden rounded-xl border border-border ${!active ? "pointer-events-none" : ""}`}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`size-full object-cover transition-transform duration-300 ${active ? "group-hover:scale-105" : "grayscale brightness-50"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/80">{service.subtitle}</p>
                  </div>
                  {!active && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                      <p className="text-sm font-semibold text-white">Service Not Available</p>
                      <p className="mt-1 text-xs text-white/70">Check back later</p>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
