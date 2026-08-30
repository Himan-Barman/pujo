const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumeral(num: number | string): string {
  return String(num).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] || digit);
}

export function formatTimeBn(timeStr: string): string {
  return timeStr
    .replace(/AM/gi, 'সকাল')
    .replace(/PM/gi, 'সন্ধ্যা')
    .replace(/\d+/g, (d) => toBengaliNumeral(d));
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
