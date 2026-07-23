export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  bookingId: string;
  serviceName: string;
  technicianName: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const mockInvoices: Invoice[] = [
  {
    id: "INV-2001",
    bookingId: "BK-1024",
    serviceName: "Sofa & Carpet Cleaning",
    technicianName: "Rajesh Kumar",
    date: "2026-07-15",
    dueDate: "2026-07-15",
    status: "paid",
    items: [
      { description: "2 Sofa Deep Cleaning", quantity: 1, unitPrice: 899, total: 899 },
    ],
    subtotal: 899,
    tax: 162,
    total: 1061,
  },
  {
    id: "INV-2002",
    bookingId: "BK-1025",
    serviceName: "Plumbing Repair",
    technicianName: "Amit Sharma",
    date: "2026-07-12",
    dueDate: "2026-07-12",
    status: "paid",
    items: [
      { description: "Leak Repair - Tap/pipe", quantity: 1, unitPrice: 299, total: 299 },
    ],
    subtotal: 299,
    tax: 54,
    total: 353,
  },
  {
    id: "INV-2003",
    bookingId: "BK-1026",
    serviceName: "AC Service & Repair",
    technicianName: "Vikram Patel",
    date: "2026-07-22",
    dueDate: "2026-07-22",
    status: "pending",
    items: [
      { description: "AC Deep Clean - Chemical wash", quantity: 1, unitPrice: 999, total: 999 },
    ],
    subtotal: 999,
    tax: 180,
    total: 1179,
  },
  {
    id: "INV-2004",
    bookingId: "BK-1027",
    serviceName: "Full Home Cleaning",
    technicianName: "Suresh Reddy",
    date: "2026-07-24",
    dueDate: "2026-07-24",
    status: "pending",
    items: [
      { description: "2 BHK Full Cleaning", quantity: 1, unitPrice: 2499, total: 2499 },
    ],
    subtotal: 2499,
    tax: 450,
    total: 2949,
  },
  {
    id: "INV-2005",
    bookingId: "BK-1029",
    serviceName: "Laundry Service",
    technicianName: "Priya Verma",
    date: "2026-07-10",
    dueDate: "2026-07-10",
    status: "paid",
    items: [
      { description: "10 Kg Wash & Iron", quantity: 1, unitPrice: 349, total: 349 },
    ],
    subtotal: 349,
    tax: 63,
    total: 412,
  },
  {
    id: "INV-2006",
    bookingId: "BK-1031",
    serviceName: "Kitchen Cleaning",
    technicianName: "Ankit Singh",
    date: "2026-07-05",
    dueDate: "2026-07-05",
    status: "paid",
    items: [
      { description: "Deep Kitchen Cleaning", quantity: 1, unitPrice: 1099, total: 1099 },
    ],
    subtotal: 1099,
    tax: 198,
    total: 1297,
  },
  {
    id: "INV-2007",
    bookingId: "BK-1032",
    serviceName: "Pest Control",
    technicianName: "Vikram Patel",
    date: "2026-06-28",
    dueDate: "2026-06-28",
    status: "paid",
    items: [
      { description: "General Pest Treatment", quantity: 1, unitPrice: 499, total: 499 },
    ],
    subtotal: 499,
    tax: 90,
    total: 589,
  },
  {
    id: "INV-2008",
    bookingId: "BK-1030",
    serviceName: "Electrical Work",
    technicianName: "Mohammed Ali",
    date: "2026-07-08",
    dueDate: "2026-07-08",
    status: "paid",
    items: [
      { description: "Fan Installation", quantity: 1, unitPrice: 399, total: 399 },
    ],
    subtotal: 399,
    tax: 72,
    total: 471,
  },
];
