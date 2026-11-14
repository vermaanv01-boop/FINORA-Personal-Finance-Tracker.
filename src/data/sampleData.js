// Initial sample financial transactions for FINORA in INR (₹)
// Formatted according to realistic Indian urban lifestyle & wealth management

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    title: 'Client Retainer - FinTech Advisory',
    category: 'Consulting Income',
    type: 'income',
    amount: 175000,
    date: '2026-11-14',
    status: 'Cleared',
    account: 'HDFC Imperia •• 4910',
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
    account: 'HDFC Imperia •• 4910',
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
    account: 'Zerodha Demat •• 8821',
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
    account: 'Infinia Metal •• 8842',
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
    account: 'ICICI Wealth •• 3011',
    icon: 'TrendingUp',
    notes: 'Interim dividend yield credited'
  },
  {
    id: 'tx-106',
    title: 'Air India Club Vistara Business Flights',
    category: 'Transport & Travel',
    type: 'expense',
    amount: 22400,
    date: '2026-11-04',
    status: 'Completed',
    account: 'Infinia Metal •• 8842',
    icon: 'Plane',
    notes: 'Delhi to Mumbai return executive flight'
  },
  {
    id: 'tx-107',
    title: 'Nature Basket Gourmet Groceries',
    category: 'Food & Dining',
    type: 'expense',
    amount: 9800,
    date: '2026-11-02',
    status: 'Completed',
    account: 'Infinia Metal •• 8842',
    icon: 'Utensils',
    notes: 'Weekly pantry & fresh supplies'
  },
  {
    id: 'tx-108',
    title: 'Cult.fit & Wellness Club Membership',
    category: 'Healthcare & Wellness',
    type: 'expense',
    amount: 14500,
    date: '2026-10-28',
    status: 'Completed',
    account: 'Infinia Metal •• 8842',
    icon: 'Activity',
    notes: 'Annual fitness and nutrition pass'
  },
  {
    id: 'tx-109',
    title: 'Tata Power & High-Speed Fiber Broadband',
    category: 'Utilities & Bills',
    type: 'expense',
    amount: 6200,
    date: '2026-10-24',
    status: 'Completed',
    account: 'HDFC Imperia •• 4910',
    icon: 'Zap',
    notes: 'Utility bill clearance'
  },
  {
    id: 'tx-110',
    title: 'Quarterly Executive Bonus',
    category: 'Salary & Bonus',
    type: 'income',
    amount: 120000,
    date: '2026-10-15',
    status: 'Cleared',
    account: 'HDFC Imperia •• 4910',
    icon: 'ArrowDownLeft',
    notes: 'Performance incentive payout'
  },
  {
    id: 'tx-111',
    title: 'Apple BKC Store - iPad Pro M4',
    category: 'Entertainment & Leisure',
    type: 'expense',
    amount: 89900,
    date: '2026-10-08',
    status: 'Completed',
    account: 'Infinia Metal •• 8842',
    icon: 'Laptop',
    notes: 'Productivity workstation upgrade'
  },
  {
    id: 'tx-112',
    title: 'Sovereign Gold Bonds Coupon Payout',
    category: 'Dividend & Yield',
    type: 'income',
    amount: 15800,
    date: '2026-09-22',
    status: 'Cleared',
    account: 'ICICI Wealth •• 3011',
    icon: 'TrendingUp',
    notes: 'Half-yearly RBI bond interest'
  }
];

export const CATEGORY_COLORS = {
  'Housing & Rent': '#E89BA8',
  'Investments': '#DFB27A',
  'Food & Dining': '#F7D6DC',
  'Transport & Travel': '#B35467',
  'Utilities & Bills': '#E4A564',
  'Entertainment & Leisure': '#8A2D43',
  'Healthcare & Wellness': '#5C1D2E',
  'Salary & Bonus': '#34D399',
  'Consulting Income': '#10B981',
  'Dividend & Yield': '#6EE7B7',
  'Other': '#A89299'
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
