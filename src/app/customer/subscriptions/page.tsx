"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Crown, Zap, Star } from "lucide-react";
import { RazorpayCheckout } from "@/components/customer/RazorpayCheckout";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  amount: number;
  startDate: string;
  endDate: string | null;
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Basic access for occasional use",
    icon: Star,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    features: [
      "3 bookings per month",
      "Basic services only",
      "Standard support",
      "Standard response time",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 499,
    description: "For regular home service needs",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    features: [
      "Unlimited bookings",
      "All services included",
      "Priority booking slots",
      "Monthly maintenance visit",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 999,
    description: "Complete home care solution",
    icon: Crown,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    features: [
      "Unlimited bookings",
      "All services included",
      "Instant booking priority",
      "Free monthly visit",
      "24/7 priority support",
      "Extended warranty on services",
      "Dedicated technician",
    ],
  },
];

export default function CustomerSubscriptionsPage() {
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) setCurrentPlan(data.plan);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePlanChanged = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Choose Your Plan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select the plan that best fits your home service needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          const isCurrent = currentPlan === plan.id;
          const isPaid = plan.id !== "free";

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border-2 bg-card p-6 ${
                isCurrent ? "border-primary shadow-md" : plan.border
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Current Plan
                </div>
              )}

              <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${plan.bg}`}>
                <Icon className={`size-6 ${plan.color}`} />
              </div>

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price === 0 ? "Free" : `₹${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm text-muted-foreground">/mo</span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {isCurrent ? (
                  <div className="w-full rounded-lg border border-border bg-muted py-2.5 text-center text-sm font-medium text-muted-foreground">
                    Current Plan
                  </div>
                ) : isPaid ? (
                  <RazorpayCheckout
                    plan={plan.id}
                    amount={plan.price * 100}
                    onSuccess={handlePlanChanged}
                  />
                ) : (
                  <div className="w-full rounded-lg border border-border bg-muted py-2.5 text-center text-sm font-medium text-muted-foreground">
                    Downgrade
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
