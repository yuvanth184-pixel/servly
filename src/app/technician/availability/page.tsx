"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface DaySchedule {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

const initialSchedule: DaySchedule[] = [
  { day: "Monday", enabled: true, start: "08:00", end: "18:00" },
  { day: "Tuesday", enabled: true, start: "08:00", end: "18:00" },
  { day: "Wednesday", enabled: true, start: "08:00", end: "18:00" },
  { day: "Thursday", enabled: true, start: "08:00", end: "18:00" },
  { day: "Friday", enabled: true, start: "08:00", end: "18:00" },
  { day: "Saturday", enabled: true, start: "09:00", end: "14:00" },
  { day: "Sunday", enabled: false, start: "00:00", end: "00:00" },
];

export default function TechnicianAvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const updateDay = (index: number, field: keyof DaySchedule, value: boolean | string) => {
    setSchedule((prev) => prev.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Availability</h1>
          <p className="text-muted-foreground">Set your work schedule and availability</p>
        </div>
        <Button onClick={() => toast.success("Schedule saved")}>
          <Save className="mr-1 size-4" /> Save Schedule
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {schedule.map((daySchedule, i) => (
          <motion.div
            key={daySchedule.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors ${!daySchedule.enabled ? "opacity-60" : ""}`}
          >
            <div className="flex items-center gap-4">
              <Switch checked={daySchedule.enabled} onCheckedChange={(checked) => updateDay(i, "enabled", checked)} />
              <div>
                <p className="font-medium text-foreground">{daySchedule.day}</p>
                <p className="text-sm text-muted-foreground">
                  {daySchedule.enabled ? `${daySchedule.start} - ${daySchedule.end}` : "Day off"}
                </p>
              </div>
            </div>

            {daySchedule.enabled && (
              <div className="flex items-center gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">Start</label>
                  <Input
                    type="time"
                    value={daySchedule.start}
                    onChange={(e) => updateDay(i, "start", e.target.value)}
                    className="h-9 w-32"
                  />
                </div>
                <span className="mt-4 text-muted-foreground">to</span>
                <div>
                  <label className="text-xs text-muted-foreground">End</label>
                  <Input
                    type="time"
                    value={daySchedule.end}
                    onChange={(e) => updateDay(i, "end", e.target.value)}
                    className="h-9 w-32"
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
