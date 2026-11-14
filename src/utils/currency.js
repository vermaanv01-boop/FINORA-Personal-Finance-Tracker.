// Currency formatters and helpers for FINORA
// Default currency: Indian Rupee (INR ₹) with Lakhs & Crores formatting

export const CURRENCIES = {
  INR: { symbol: '₹', code: 'INR', label: 'INR (₹) - Indian Rupee', locale: 'en-IN' },
  USD: { symbol: '$', code: 'USD', label: 'USD ($) - US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', code: 'EUR', label: 'EUR (€) - Euro', locale: 'de-DE' },
  GBP: { symbol: '£', code: 'GBP', label: 'GBP (£) - British Pound', locale: 'en-GB' },
  AED: { symbol: 'د.إ', code: 'AED', label: 'AED (د.إ) - UAE Dirham', locale: 'en-AE' },
};

/**
 * Formats a monetary number with appropriate currency symbol & grouping.
 * For INR: 1,25,000.00
 */
export function formatCurrency(amount, currencyCode = 'INR', showDecimals = true) {
  const num = Number(amount) || 0;
  const curr = CURRENCIES[currencyCode] || CURRENCIES.INR;

  try {
    const formatted = new Intl.NumberFormat(curr.locale, {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(num);

    return `${curr.symbol}${formatted}`;
  } catch (e) {
    return `${curr.symbol}${num.toFixed(showDecimals ? 2 : 0)}`;
  }
}

/**
 * Compact formatter for chart axes: e.g. ₹25k, ₹1.5L, ₹1Cr
 */
export function formatCompactCurrency(amount, currencyCode = 'INR') {
  const num = Number(amount) || 0;
  const curr = CURRENCIES[currencyCode] || CURRENCIES.INR;

  if (currencyCode === 'INR') {
    if (Math.abs(num) >= 10000000) {
      return `${curr.symbol}${(num / 10000000).toFixed(1)}Cr`;
    }
    if (Math.abs(num) >= 100000) {
      return `${curr.symbol}${(num / 100000).toFixed(1)}L`;
    }
    if (Math.abs(num) >= 1000) {
      return `${curr.symbol}${(num / 1000).toFixed(0)}k`;
    }
    return `${curr.symbol}${num}`;
  }

  // Standard K/M format for USD/EUR/etc.
  if (Math.abs(num) >= 1000000) {
    return `${curr.symbol}${(num / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(num) >= 1000) {
    return `${curr.symbol}${(num / 1000).toFixed(0)}k`;
  }
  return `${curr.symbol}${num}`;
}
