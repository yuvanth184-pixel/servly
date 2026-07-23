export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "inactive" | "suspended";
  totalBookings: number;
  totalSpent: number;
}

export interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  specialties: string[];
  rating: number;
  totalJobs: number;
  status: "available" | "busy" | "offline";
  availability: AvailabilitySlot[];
  certifications: string[];
  joinDate: Date;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId?: string;
  serviceId: string;
  status:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled";
  scheduledDate: Date;
  scheduledTime: string;
  address: Address;
  notes?: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  duration: number;
  image?: string;
  slug?: string;
  isActive: boolean;
  rating: number;
  totalBookings: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: Date;
  paidAt?: Date;
  items: InvoiceItem[];
}

export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "payment" | "system" | "reminder";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Review {
  id: string;
  customerId: string;
  technicianId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  customerId: string;
  plan: "basic" | "premium" | "enterprise";
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  endDate?: Date;
  monthlyPrice: number;
  features: string[];
}

export interface DashboardStats {
  totalCustomers: number;
  totalTechnicians: number;
  totalBookings: number;
  totalRevenue: number;
  activeBookings: number;
  completedBookings: number;
  pendingPayments: number;
  averageRating: number;
}

export interface ChartData {
  name: string;
  value: number;
  change?: number;
}

export interface Activity {
  id: string;
  type: "booking" | "payment" | "review" | "signup";
  message: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  avatar?: string;
  rating: number;
  comment: string;
  service: string;
}
