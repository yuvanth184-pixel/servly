export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface Booking {
  id: string;
  serviceName: string;
  serviceType: string;
  technicianName: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
}

export const mockBookings: Booking[] = [
  {
    id: "BK-1024",
    serviceName: "Sofa & Carpet Cleaning",
    serviceType: "2 Sofa",
    technicianName: "Rajesh Kumar",
    status: "completed",
    scheduledDate: "2026-07-15",
    scheduledTime: "10:00 AM",
    address: "12 MG Road, Bangalore",
    totalAmount: 899,
    paymentStatus: "paid",
  },
  {
    id: "BK-1025",
    serviceName: "Plumbing Repair",
    serviceType: "Leak Repair",
    technicianName: "Amit Sharma",
    status: "completed",
    scheduledDate: "2026-07-12",
    scheduledTime: "2:00 PM",
    address: "45 Park Street, Kolkata",
    totalAmount: 299,
    paymentStatus: "paid",
  },
  {
    id: "BK-1026",
    serviceName: "AC Service & Repair",
    serviceType: "AC Deep Clean",
    technicianName: "Vikram Patel",
    status: "in_progress",
    scheduledDate: "2026-07-22",
    scheduledTime: "11:00 AM",
    address: "78 Nehru Nagar, Delhi",
    totalAmount: 999,
    paymentStatus: "pending",
  },
  {
    id: "BK-1027",
    serviceName: "Full Home Cleaning",
    serviceType: "2 BHK",
    technicianName: "Suresh Reddy",
    status: "confirmed",
    scheduledDate: "2026-07-24",
    scheduledTime: "9:00 AM",
    address: "23 Gandhi Road, Hyderabad",
    totalAmount: 2499,
    paymentStatus: "pending",
  },
  {
    id: "BK-1028",
    serviceName: "Washroom Cleaning",
    serviceType: "3 Washroom",
    technicianName: "Rajesh Kumar",
    status: "pending",
    scheduledDate: "2026-07-25",
    scheduledTime: "3:00 PM",
    address: "56 Lake View, Chennai",
    totalAmount: 849,
    paymentStatus: "pending",
  },
  {
    id: "BK-1029",
    serviceName: "Laundry Service",
    serviceType: "10 Kg Wash & Iron",
    technicianName: "Priya Verma",
    status: "completed",
    scheduledDate: "2026-07-10",
    scheduledTime: "8:00 AM",
    address: "90 Station Road, Pune",
    totalAmount: 349,
    paymentStatus: "paid",
  },
  {
    id: "BK-1030",
    serviceName: "Electrical Work",
    serviceType: "Fan Installation",
    technicianName: "Mohammed Ali",
    status: "cancelled",
    scheduledDate: "2026-07-08",
    scheduledTime: "4:00 PM",
    address: "34 Civil Lines, Jaipur",
    totalAmount: 399,
    paymentStatus: "refunded",
  },
  {
    id: "BK-1031",
    serviceName: "Kitchen Cleaning",
    serviceType: "Deep Kitchen",
    technicianName: "Ankit Singh",
    status: "completed",
    scheduledDate: "2026-07-05",
    scheduledTime: "10:00 AM",
    address: "12 MG Road, Bangalore",
    totalAmount: 1099,
    paymentStatus: "paid",
  },
  {
    id: "BK-1032",
    serviceName: "Pest Control",
    serviceType: "General Pest",
    technicianName: "Vikram Patel",
    status: "completed",
    scheduledDate: "2026-06-28",
    scheduledTime: "1:00 PM",
    address: "78 Nehru Nagar, Delhi",
    totalAmount: 499,
    paymentStatus: "paid",
  },
  {
    id: "BK-1033",
    serviceName: "Car Wash & Detailing",
    serviceType: "Sedan Premium",
    technicianName: "Suresh Reddy",
    status: "pending",
    scheduledDate: "2026-07-26",
    scheduledTime: "11:00 AM",
    address: "23 Gandhi Road, Hyderabad",
    totalAmount: 999,
    paymentStatus: "pending",
  },
];
