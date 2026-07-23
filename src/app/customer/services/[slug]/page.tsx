"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, Clock, Plus, Minus, AlertCircle, ArrowLeft } from "lucide-react";
import { getServiceBySlug } from "@/data/serviceDetails";
import { useCart } from "@/context/cart-context";
import { useService } from "@/context/service-context";
import { Button } from "@/components/ui/button";
import { BottomCartBar } from "@/components/customer/home/BottomCartBar";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <ServiceDetailContent service={service} />
  );
}

function ServiceDetailContent({ service }: { service: NonNullable<ReturnType<typeof getServiceBySlug>> }) {
  const { items, addItem, removeItem } = useCart();
  const { isServiceActive } = useService();
  const isActive = isServiceActive(service.slug);

  const getItemQuantity = (typeId: string) => {
    const item = items.find((i) => i.serviceType.id === typeId);
    return item?.quantity || 0;
  };

  if (!isActive) {
    return (
      <div className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img
              src={service.bannerImage}
              alt={service.name}
              className="size-full object-cover object-center brightness-50 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h1 className="px-4 text-2xl font-bold text-white sm:text-3xl">
                {service.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <AlertCircle className="size-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Service Not Available</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              This service is currently unavailable. Please check back later or browse other services.
            </p>
            <Link href="/customer/services">
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 size-4" />
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72">
          <img
            src={service.bannerImage}
            alt={service.name}
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="px-4 text-2xl font-bold text-white sm:text-3xl">
              {service.name}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {service.rating}
              </span>
              <span>{service.totalBookings}+ bookings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Select Service
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {service.types.map((type, index) => {
            const qty = getItemQuantity(type.id);
            const discount = Math.round(
              ((type.originalPrice - type.price) / type.originalPrice) * 100
            );

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="size-full object-cover object-center"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    {discount}% OFF
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {type.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {type.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {type.duration}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-primary">
                        ₹{type.price}
                      </p>
                      <p className="text-xs text-muted-foreground line-through">
                        ₹{type.originalPrice}
                      </p>
                    </div>

                    {qty === 0 ? (
                      <Button
                        size="sm"
                        onClick={() => addItem(type, service.name)}
                        className="shrink-0"
                      >
                        <Plus className="mr-1 size-4" />
                        Add
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg border border-border">
                        <button
                          onClick={() => removeItem(type.id)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-[20px] text-center text-sm font-medium">
                          {qty}
                        </span>
                        <button
                          onClick={() => addItem(type, service.name)}
                          className="flex size-8 items-center justify-center text-primary hover:text-primary/80"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomCartBar />
    </div>
  );
}
