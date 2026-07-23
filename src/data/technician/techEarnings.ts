export interface TechEarning {
  id: string;
  jobId: string;
  serviceName: string;
  customerName: string;
  date: string;
  amount: number;
  status: "paid" | "pending";
}

export const techEarnings: TechEarning[] = [
  { id: "e1", jobId: "BK-1024", serviceName: "Sofa & Carpet Cleaning", customerName: "Sanjay Mehta", date: "2026-07-15", amount: 180, status: "paid" },
  { id: "e2", jobId: "BK-1025", serviceName: "Plumbing Repair", customerName: "Pooja Gupta", date: "2026-07-12", amount: 60, status: "paid" },
  { id: "e3", jobId: "BK-1029", serviceName: "Laundry Service", customerName: "Vikram Singh", date: "2026-07-10", amount: 70, status: "paid" },
  { id: "e4", jobId: "BK-1031", serviceName: "Kitchen Cleaning", customerName: "Arun Nair", date: "2026-07-05", amount: 220, status: "paid" },
  { id: "e5", jobId: "BK-1032", serviceName: "Pest Control", customerName: "Meena Devi", date: "2026-06-28", amount: 100, status: "paid" },
  { id: "e6", jobId: "BK-1034", serviceName: "Electrical Work", customerName: "Deepa Reddy", date: "2026-07-02", amount: 80, status: "paid" },
  { id: "e7", jobId: "BK-1026", serviceName: "AC Service & Repair", customerName: "Amit Sharma", date: "2026-07-22", amount: 200, status: "pending" },
  { id: "e8", jobId: "BK-1027", serviceName: "Full Home Cleaning", customerName: "Neha Kapoor", date: "2026-07-24", amount: 500, status: "pending" },
];

export const monthlyEarnings = [
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 4500 },
  { month: "Apr", value: 3800 },
  { month: "May", value: 5200 },
  { month: "Jun", value: 4100 },
  { month: "Jul", value: 5800 },
];
