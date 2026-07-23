export type TechJobStatus = "pending" | "accepted" | "in_progress" | "completed" | "cancelled";

export interface TechJob {
  id: string;
  serviceName: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  status: TechJobStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  amount: number;
  notes?: string;
}

export const techJobs: TechJob[] = [
  {
    id: "BK-1026",
    serviceName: "AC Service & Repair",
    serviceType: "AC Deep Clean",
    customerName: "Amit Sharma",
    customerPhone: "+91 98765 43210",
    status: "in_progress",
    scheduledDate: "2026-07-22",
    scheduledTime: "11:00 AM",
    address: "78 Nehru Nagar, Delhi",
    amount: 999,
    notes: "2nd floor, ring doorbell",
  },
  {
    id: "BK-1027",
    serviceName: "Full Home Cleaning",
    serviceType: "2 BHK",
    customerName: "Neha Kapoor",
    customerPhone: "+91 87654 32109",
    status: "accepted",
    scheduledDate: "2026-07-24",
    scheduledTime: "9:00 AM",
    address: "23 Gandhi Road, Hyderabad",
    amount: 2499,
  },
  {
    id: "BK-1028",
    serviceName: "Washroom Cleaning",
    serviceType: "3 Washroom",
    customerName: "Ravi Patel",
    customerPhone: "+91 76543 21098",
    status: "pending",
    scheduledDate: "2026-07-25",
    scheduledTime: "3:00 PM",
    address: "56 Lake View, Chennai",
    amount: 849,
  },
  {
    id: "BK-1024",
    serviceName: "Sofa & Carpet Cleaning",
    serviceType: "2 Sofa",
    customerName: "Sanjay Mehta",
    customerPhone: "+91 65432 10987",
    status: "completed",
    scheduledDate: "2026-07-15",
    scheduledTime: "10:00 AM",
    address: "12 MG Road, Bangalore",
    amount: 899,
  },
  {
    id: "BK-1025",
    serviceName: "Plumbing Repair",
    serviceType: "Leak Repair",
    customerName: "Pooja Gupta",
    customerPhone: "+91 54321 09876",
    status: "completed",
    scheduledDate: "2026-07-12",
    scheduledTime: "2:00 PM",
    address: "45 Park Street, Kolkata",
    amount: 299,
  },
  {
    id: "BK-1029",
    serviceName: "Laundry Service",
    serviceType: "10 Kg Wash & Iron",
    customerName: "Vikram Singh",
    customerPhone: "+91 43210 98765",
    status: "completed",
    scheduledDate: "2026-07-10",
    scheduledTime: "8:00 AM",
    address: "90 Station Road, Pune",
    amount: 349,
  },
  {
    id: "BK-1031",
    serviceName: "Kitchen Cleaning",
    serviceType: "Deep Kitchen",
    customerName: "Arun Nair",
    customerPhone: "+91 32109 87654",
    status: "completed",
    scheduledDate: "2026-07-05",
    scheduledTime: "10:00 AM",
    address: "12 MG Road, Bangalore",
    amount: 1099,
  },
  {
    id: "BK-1032",
    serviceName: "Pest Control",
    serviceType: "General Pest",
    customerName: "Meena Devi",
    customerPhone: "+91 21098 76543",
    status: "completed",
    scheduledDate: "2026-06-28",
    scheduledTime: "1:00 PM",
    address: "78 Nehru Nagar, Delhi",
    amount: 499,
  },
  {
    id: "BK-1033",
    serviceName: "Car Wash & Detailing",
    serviceType: "Sedan Premium",
    customerName: "Karan Malhotra",
    customerPhone: "+91 10987 65432",
    status: "pending",
    scheduledDate: "2026-07-26",
    scheduledTime: "11:00 AM",
    address: "23 Gandhi Road, Hyderabad",
    amount: 999,
  },
  {
    id: "BK-1034",
    serviceName: "Electrical Work",
    serviceType: "Fan Installation",
    customerName: "Deepa Reddy",
    customerPhone: "+91 09876 54321",
    status: "completed",
    scheduledDate: "2026-07-02",
    scheduledTime: "4:00 PM",
    address: "34 Civil Lines, Jaipur",
    amount: 399,
  },
];
