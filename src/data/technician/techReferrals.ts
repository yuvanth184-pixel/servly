export interface Referral {
  id: string;
  referredName: string;
  status: "pending" | "completed";
  date: string;
  reward: number;
}

export const referralCode = "MARCUS2026";

export const referrals: Referral[] = [
  { id: "ref1", referredName: "Amit Sharma", status: "completed", date: "2026-06-15", reward: 100 },
  { id: "ref2", referredName: "Neha Kapoor", status: "completed", date: "2026-06-20", reward: 100 },
  { id: "ref3", referredName: "Ravi Patel", status: "completed", date: "2026-07-01", reward: 100 },
  { id: "ref4", referredName: "Karan Malhotra", status: "pending", date: "2026-07-18", reward: 0 },
  { id: "ref5", referredName: "Deepa Reddy", status: "pending", date: "2026-07-20", reward: 0 },
];

export const referralStats = {
  totalReferrals: 5,
  completedReferrals: 3,
  totalEarned: 300,
  pendingRewards: 200,
};
