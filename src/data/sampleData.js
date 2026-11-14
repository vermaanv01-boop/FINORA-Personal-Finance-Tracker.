// Initial sample financial transactions for FINORA in INR (₹)
// Pure White & Burgundy Design System

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    title: 'Client Retainer - Executive Advisory',
    category: 'Consulting Income',
    type: 'income',
    amount: 175000,
    date: '2026-11-14',
    status: 'Cleared',
    account: 'Private Banking •• 4910',
    icon: 'ArrowDownLeft',
    notes: 'Q4 advisory retainer payment'
  },
  {
    id: 'tx-102',
    title: 'Prestige Meridian Luxury Apartment Rent',
    category: 'Housing & Rent',
    type: 'expense',
    amount: 45000,
    date: '2026-11-12',
    status: 'Completed',
    account: 'Private Banking •• 4910',
    icon: 'Home',
    notes: 'Monthly residence lease payment'
  },
  {
    id: 'tx-103',
    title: 'Nifty 50 Index Fund SIP',
    category: 'Investments',
    type: 'expense',
    amount: 35000,
    date: '2026-11-10',
    status: 'Completed',
    account: 'Wealth Demat •• 8821',
    icon: 'TrendingUp',
    notes: 'Automated disciplined equity SIP'
  },
  {
    id: 'tx-104',
    title: 'Taj Lands End Fine Dining',
    category: 'Food & Dining',
    type: 'expense',
    amount: 8650,
    date: '2026-11-08',
    status: 'Completed',
    account: 'Burgundy Signature •• 8842',
    icon: 'Utensils',
    notes: 'Family dinner celebration'
  },
  {
    id: 'tx-105',
    title: 'TCS & Infosys Portfolio Dividend',
    category: 'Dividend & Yield',
    type: 'income',
    amount: 24500,
    date: '2026-11-06',
    status: 'Cleared',
    account: 'Wealth Reserve •• 3011',
    icon: 'TrendingUp',
    notes: 'Interim dividend yield credited'
  },
  {
    id: 'tx-106',
    title: 'Club Vistara Executive Business Flights',
    category: 'Transport & Travel',
    type: 'expense',
    amount: 22400,
    date: '2026-11-04',
    status: 'Completed',
    account: 'Burgundy Signature •• 8842',
    icon: 'Plane',
    notes: 'Executive roundtrip flights'
  },
  {
    id: 'tx-107',
    title: 'Gourmet Organic Pantry Provisions',
    category: 'Food & Dining',
    type: 'expense',
    amount: 9800,
    date: '2026-11-02',
    status: 'Completed',
    account: 'Burgundy Signature •• 8842',
    icon: 'Utensils',
    notes: 'Pantry provisions & groceries'
  },
  {
    id: 'tx-108',
    title: 'Wellness & Fitness Club Membership',
    category: 'Healthcare & Wellness',
    type: 'expense',
    amount: 14500,
    date: '2026-10-28',
    status: 'Completed',
    account: 'Burgundy Signature •• 8842',
    icon: 'Activity',
    notes: 'Annual fitness and wellness access'
  },
  {
    id: 'tx-109',
    title: 'Utility Infrastructure & High-Speed Fiber',
    category: 'Utilities & Bills',
    type: 'expense',
    amount: 6200,
    date: '2026-10-24',
    status: 'Completed',
    account: 'Private Banking •• 4910',
    icon: 'Zap',
    notes: 'Utility bill clearance'
  },
  {
    id: 'tx-110',
    title: 'Executive Performance Milestone Bonus',
    category: 'Salary & Bonus',
    type: 'income',
    amount: 120000,
    date: '2026-10-15',
    status: 'Cleared',
    account: 'Private Banking •• 4910',
    icon: 'ArrowDownLeft',
    notes: 'Quarterly bonus incentive payout'
  },
  {
    id: 'tx-111',
    title: 'Executive Workstation Upgrade',
    category: 'Entertainment & Leisure',
    type: 'expense',
    amount: 89900,
    date: '2026-10-08',
    status: 'Completed',
    account: 'Burgundy Signature •• 8842',
    icon: 'Laptop',
    notes: 'Productivity hardware upgrade'
  },
  {
    id: 'tx-112',
    title: 'Sovereign Bond Coupon Payout',
    category: 'Dividend & Yield',
    type: 'income',
    amount: 15800,
    date: '2026-09-22',
    status: 'Cleared',
    account: 'Wealth Reserve •• 3011',
    icon: 'TrendingUp',
    notes: 'Half-yearly bond interest'
  }
];

// White & Burgundy spectrum tones (Primary #4A1025, Deep #260814, White #FFFFFF)
export const CATEGORY_COLORS = {
  'Housing & Rent': '#4A1025',
  'Investments': '#FFFFFF',
  'Food & Dining': '#6B1735',
  'Transport & Travel': '#8C2046',
  'Utilities & Bills': '#AD2A58',
  'Entertainment & Leisure': '#360B1C',
  'Healthcare & Wellness': '#C73A6B',
  'Salary & Bonus': '#FFFFFF',
  'Consulting Income': '#F8F7F7',
  'Dividend & Yield': '#E8E2E4',
  'Other': '#7A1C3C'
};

export const CATEGORY_ICONS = {
  'Housing & Rent': 'Home',
  'Investments': 'TrendingUp',
  'Food & Dining': 'Utensils',
  'Transport & Travel': 'Plane',
  'Utilities & Bills': 'Zap',
  'Entertainment & Leisure': 'Laptop',
  'Healthcare & Wellness': 'Activity',
  'Salary & Bonus': 'ArrowDownLeft',
  'Consulting Income': 'ArrowDownLeft',
  'Dividend & Yield': 'TrendingUp',
  'Other': 'CreditCard'
};
