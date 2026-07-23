export interface TechReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export const techReviews: TechReview[] = [
  { id: "r1", customerName: "Sanjay Mehta", rating: 5, comment: "Excellent work! The sofa looks brand new. Very professional and punctual.", service: "Sofa & Carpet Cleaning", date: "2026-07-15" },
  { id: "r2", customerName: "Pooja Gupta", rating: 5, comment: "Fixed the leak quickly and efficiently. Very knowledgeable technician.", service: "Plumbing Repair", date: "2026-07-12" },
  { id: "r3", customerName: "Vikram Singh", rating: 4, comment: "Good laundry service. Clothes were clean and well-folded. Slight delay in pickup.", service: "Laundry Service", date: "2026-07-10" },
  { id: "r4", customerName: "Arun Nair", rating: 5, comment: "Kitchen looks spotless! Very thorough cleaning. Highly recommended.", service: "Kitchen Cleaning", date: "2026-07-05" },
  { id: "r5", customerName: "Deepa Reddy", rating: 4, comment: "Fan installed properly. Good work overall. Could have cleaned up a bit more after.", service: "Electrical Work", date: "2026-07-02" },
  { id: "r6", customerName: "Meena Devi", rating: 5, comment: "Pest control was very effective. No issues since the treatment. Thank you!", service: "Pest Control", date: "2026-06-28" },
  { id: "r7", customerName: "Karan Malhotra", rating: 4, comment: "Car wash was decent. Exterior looks good. Interior could be better.", service: "Car Wash & Detailing", date: "2026-06-25" },
];
