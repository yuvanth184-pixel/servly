export interface DashboardStats {
  totalCustomers: number;
  activeBookings: number;
  totalRevenue: number;
  activeTechnicians: number;
  completedThisMonth: number;
  pendingPayments: number;
  newCustomersThisMonth: number;
  avgRating: number;
}

export interface Activity {
  id: string;
  type: "booking" | "payment" | "signup" | "review";
  message: string;
  timestamp: string;
  userName: string;
}

export const dashboardStats: DashboardStats = {
  totalCustomers: 248,
  activeBookings: 34,
  totalRevenue: 487650,
  activeTechnicians: 12,
  completedThisMonth: 156,
  pendingPayments: 23,
  newCustomersThisMonth: 42,
  avgRating: 4.8,
};

export const recentActivity: Activity[] = [
  { id: "a1", type: "booking", message: "New booking created for Sofa Cleaning", timestamp: "2 hours ago", userName: "Amit Sharma" },
  { id: "a2", type: "payment", message: "Payment of ₹1,099 received", timestamp: "3 hours ago", userName: "Priya Verma" },
  { id: "a3", type: "signup", message: "New customer registered", timestamp: "5 hours ago", userName: "Rahul Gupta" },
  { id: "a4", type: "booking", message: "Booking BK-1027 assigned to Suresh Reddy", timestamp: "6 hours ago", userName: "Suresh Reddy" },
  { id: "a5", type: "review", message: "Left a 5-star review for Kitchen Cleaning", timestamp: "8 hours ago", userName: "Neha Kapoor" },
  { id: "a6", type: "payment", message: "Refund of ₹399 processed for BK-1030", timestamp: "10 hours ago", userName: "Mohammed Ali" },
  { id: "a7", type: "booking", message: "Booking BK-1033 completed", timestamp: "12 hours ago", userName: "Ankit Singh" },
  { id: "a8", type: "signup", message: "New customer registered", timestamp: "1 day ago", userName: "Sanjay Mehta" },
  { id: "a9", type: "booking", message: "Booking rescheduled for AC Service", timestamp: "1 day ago", userName: "Vikram Patel" },
  { id: "a10", type: "payment", message: "Payment of ₹2,499 received", timestamp: "1 day ago", userName: "Rajesh Kumar" },
];

export const monthlyRevenue = [
  { month: "Jan", value: 32000 },
  { month: "Feb", value: 28000 },
  { month: "Mar", value: 45000 },
  { month: "Apr", value: 38000 },
  { month: "May", value: 52000 },
  { month: "Jun", value: 48000 },
  { month: "Jul", value: 61000 },
];

export const topServices = [
  { name: "Sofa & Carpet Cleaning", bookings: 1234, revenue: 98700 },
  { name: "Full Home Cleaning", bookings: 876, revenue: 156800 },
  { name: "Kitchen Cleaning", bookings: 654, revenue: 45600 },
  { name: "AC Service & Repair", bookings: 543, revenue: 78900 },
  { name: "Plumbing Repair", bookings: 432, revenue: 34500 },
];

export const topTechnicians = [
  { name: "Rajesh Kumar", jobs: 189, rating: 4.9, earnings: 67500 },
  { name: "Suresh Reddy", jobs: 167, rating: 4.8, earnings: 58900 },
  { name: "Vikram Patel", jobs: 145, rating: 4.8, earnings: 52300 },
  { name: "Ankit Singh", jobs: 134, rating: 4.7, earnings: 47800 },
  { name: "Amit Sharma", jobs: 123, rating: 4.7, earnings: 43200 },
];
