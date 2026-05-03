/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * String utility functions
 */

export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Number utility functions
 */

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const round = (value: number, decimals: number = 2): number => {
  return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);
};

/**
 * Date utility functions
 */

export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  const d = new Date(date);
  return d.toLocaleDateString(locale);
};

export const getDaysDifference = (date1: Date, date2: Date): number => {
  const one_day = 1000 * 60 * 60 * 24;
  return Math.floor((date2.getTime() - date1.getTime()) / one_day);
};

/**
 * Array utility functions
 */

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const removeDuplicates = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};
