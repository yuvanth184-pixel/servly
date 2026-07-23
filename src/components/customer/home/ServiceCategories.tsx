"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Shirt,
  Car,
  Home,
  Wind,
  Bug,
  Zap,
  Wrench,
  Grid3X3,
  type LucideIcon,
} from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
  href: string;
}

const categories: Category[] = [
  { name: "Laundry", icon: Shirt, color: "#8b5cf6", count: 4, href: "/customer/services/laundry" },
  { name: "Car Wash", icon: Car, color: "#3b82f6", count: 5, href: "/customer/services/car-wash" },
  { name: "Home Cleaning", icon: Home, color: "#22c55e", count: 8, href: "/customer/services/home-cleaning" },
  { name: "AC Service", icon: Wind, color: "#06b6d4", count: 6, href: "/customer/services/ac-service" },
  { name: "Pest Control", icon: Bug, color: "#ef4444", count: 3, href: "/customer/services/pest-control" },
  { name: "Electrician", icon: Zap, color: "#f59e0b", count: 7, href: "/customer/services/electrical-work" },
  { name: "Plumbing", icon: Wrench, color: "#3b82f6", count: 12, href: "/customer/services/plumbing-repair" },
  { name: "Other Services", icon: Grid3X3, color: "#6366f1", count: 15, href: "/customer/services" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function ServiceCategories() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Browse by Category
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-4 gap-1"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.name} variants={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={cat.href}
                className="flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-muted"
              >
                <div
                  className="flex size-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <Icon className="size-5" style={{ color: cat.color }} />
                </div>
                <span className="text-xs font-medium text-foreground">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
