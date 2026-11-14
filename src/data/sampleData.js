// Initial sample financial data for FINORA

export const KPI_DATA = {
  totalBalance: 48650.00,
  balanceChange: "+12.4%",
  totalIncome: 14250.00,
  incomeChange: "+8.2%",
  totalExpenses: 5820.50,
  expensesChange: "-4.1%",
  netSavings: 8429.50,
  savingsRate: "59.1%",
  totalTransactions: 142,
  transactionsChange: "+18 this month"
};

export const MONTHLY_EXPENSES_TREND = [
  { month: 'Jan', expenses: 3800, budget: 4500, average: 4000 },
  { month: 'Feb', expenses: 4200, budget: 4500, average: 4100 },
  { month: 'Mar', expenses: 3950, budget: 4500, average: 4050 },
  { month: 'Apr', expenses: 5100, budget: 4800, average: 4200 },
  { month: 'May', expenses: 4600, budget: 4800, average: 4250 },
  { month: 'Jun', expenses: 4300, budget: 4800, average: 4300 },
  { month: 'Jul', expenses: 5400, budget: 5000, average: 4400 },
  { month: 'Aug', expenses: 4850, budget: 5000, average: 4450 },
  { month: 'Sep', expenses: 4120, budget: 5000, average: 4400 },
  { month: 'Oct', expenses: 5200, budget: 5200, average: 4500 },
  { month: 'Nov', expenses: 5820, budget: 5500, average: 4600 },
  { month: 'Dec', expenses: 4900, budget: 5500, average: 4650 }
];

export const INCOME_VS_EXPENSES = [
  { month: 'Jun', income: 11500, expenses: 4300 },
  { month: 'Jul', income: 12200, expenses: 5400 },
  { month: 'Aug', income: 12800, expenses: 4850 },
  { month: 'Sep', income: 13100, expenses: 4120 },
  { month: 'Oct', income: 13900, expenses: 5200 },
  { month: 'Nov', income: 14250, expenses: 5820 }
];

export const CATEGORY_EXPENSES = [
  { name: 'Housing & Rent', value: 1850, color: '#E89BA8', percentage: 31.8 },
  { name: 'Food & Dining', value: 980, color: '#F7D6DC', percentage: 16.8 },
  { name: 'Investments', value: 1200, color: '#D17888', percentage: 20.6 },
  { name: 'Transport & Travel', value: 540, color: '#B35467', percentage: 9.3 },
  { name: 'Utilities & Bills', value: 460, color: '#DFB27A', percentage: 7.9 },
  { name: 'Entertainment & Leisure', value: 430, color: '#8A2D43', percentage: 7.4 },
  { name: 'Healthcare & Wellness', value: 360, color: '#5C1D2E', percentage: 6.2 }
];

export const TOP_SPENDING_CATEGORIES = [
  {
    id: 1,
    name: 'Housing & Luxury Apt',
    amount: 1850.00,
    allocatedBudget: 2000.00,
    percentage: 92,
    icon: 'Home',
    color: '#E89BA8'
  },
  {
    id: 2,
    name: 'Wealth Investment Fund',
    amount: 1200.00,
    allocatedBudget: 1500.00,
    percentage: 80,
    icon: 'TrendingUp',
    color: '#DFB27A'
  },
  {
    id: 3,
    name: 'Gourmet Dining & Groceries',
    amount: 980.00,
    allocatedBudget: 1100.00,
    percentage: 89,
    icon: 'Utensils',
    color: '#F7D6DC'
  },
  {
    id: 4,
    name: 'Travel & Private Transit',
    amount: 540.00,
    allocatedBudget: 700.00,
    percentage: 77,
    icon: 'Compass',
    color: '#B35467'
  },
  {
    id: 5,
    name: 'Digital Services & Utilities',
    amount: 460.00,
    allocatedBudget: 500.00,
    percentage: 92,
    icon: 'Zap',
    color: '#D17888'
  }
];

export const RECENT_TRANSACTIONS = [
  {
    id: 'tx-01',
    title: 'Apple Store Regent St',
    category: 'Technology',
    type: 'expense',
    amount: 1299.00,
    date: 'Today, 2:45 PM',
    status: 'Completed',
    account: 'Signature Card •• 8842',
    icon: 'Laptop'
  },
  {
    id: 'tx-02',
    title: 'Acme Advisory Client Retainer',
    category: 'Consulting Income',
    type: 'income',
    amount: 4750.00,
    date: 'Yesterday, 9:15 AM',
    status: 'Cleared',
    account: 'Treasury Premier •• 3011',
    icon: 'ArrowDownLeft'
  },
  {
    id: 'tx-03',
    title: 'The Wolseley Fine Dining',
    category: 'Food & Dining',
    type: 'expense',
    amount: 245.80,
    date: 'Nov 12, 8:30 PM',
    status: 'Completed',
    account: 'Signature Card •• 8842',
    icon: 'Utensils'
  },
  {
    id: 'tx-04',
    title: 'Equinox Fitness Club',
    category: 'Wellness',
    type: 'expense',
    amount: 280.00,
    date: 'Nov 10, 11:00 AM',
    status: 'Completed',
    account: 'Signature Card •• 8842',
    icon: 'Activity'
  },
  {
    id: 'tx-05',
    title: 'Vanguard Index Dividend',
    category: 'Investment Return',
    type: 'income',
    amount: 860.50,
    date: 'Nov 08, 4:20 PM',
    status: 'Cleared',
    account: 'Investment Portfolio •• 1920',
    icon: 'TrendingUp'
  },
  {
    id: 'tx-06',
    title: 'British Airways Club World',
    category: 'Travel & Flights',
    type: 'expense',
    amount: 1420.00,
    date: 'Nov 05, 1:10 PM',
    status: 'Completed',
    account: 'Signature Card •• 8842',
    icon: 'Plane'
  }
];

export const SPENDING_BREAKDOWN_STATS = {
  essentialSpending: 2310,
  discretionarySpending: 1950,
  savingsAndInvestments: 1560.50,
  monthlyBudgetLimit: 7500,
  totalSpentThisMonth: 5820.50
};

