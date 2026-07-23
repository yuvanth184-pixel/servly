"use client";

import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
              ? "fill-amber-400/50 text-amber-400/50"
              : "text-muted"
          }`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const colors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

export function Testimonials() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          What Our Customers Say
        </h2>
        <span className="text-sm text-muted-foreground">
          {testimonials.length} reviews
        </span>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((t, i) => (
            <CarouselItem key={t.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
              <div className="relative h-full rounded-xl border border-border bg-card p-5">
                <Quote className="absolute right-4 top-4 size-8 text-muted/40" />

                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarFallback
                      className={`${colors[i % colors.length]} text-white text-sm font-medium`}
                    >
                      {getInitials(t.customerName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {t.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.service}</p>
                  </div>
                </div>

                <StarRating rating={t.rating} />

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
