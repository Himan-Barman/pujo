export interface NavItem {
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  href: string;
  iconName?: string;
  badgeBn?: string;
  badgeEn?: string;
}

// 5 Core Primary Nav Items (Always Visible in Capsule)
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    titleBn: 'হোম',
    titleEn: 'Home',
    href: '/',
  },
  {
    titleBn: 'পঞ্জিকা',
    titleEn: 'Calendar',
    href: '/calendar',
  },
  {
    titleBn: 'রেডিও',
    titleEn: 'Radio',
    href: '/songs',
  },
  {
    titleBn: 'অঞ্জলি',
    titleEn: 'Anjali',
    href: '/anjali',
  },
  {
    titleBn: 'ঐতিহ্য',
    titleEn: 'Culture',
    href: '/culture',
  },
];

// Additional Items in the "আরও" (More) Dropdown Menu
export const MORE_NAV_ITEMS: NavItem[] = [
  {
    titleBn: 'মহাপ্রসাদ',
    titleEn: 'Bhog',
    subtitleBn: 'সাত্ত্বিক অন্নভোগ ও প্রসাদ রেসিপি',
    subtitleEn: 'Sacred recipes & Mahaprasad',
    href: '/bhog',
    iconName: 'Utensils',
  },
  {
    titleBn: 'চিত্রশালা',
    titleEn: 'Gallery',
    subtitleBn: 'প্রতিমা, মণ্ডপ ও আরতির চিত্রসম্ভার',
    subtitleEn: 'Photography & Pratima art',
    href: '/gallery',
    iconName: 'Image',
  },
  {
    titleBn: 'বিজয়া',
    titleEn: 'Bijoya',
    subtitleBn: 'শুভ বিজয়ার ডিজিটাল কার্ড ও বার্তা',
    subtitleEn: 'Personalized greeting cards',
    href: '/bijoya',
    iconName: 'Heart',
  },
];

export const MAIN_NAV_ITEMS: NavItem[] = [
  ...PRIMARY_NAV_ITEMS,
  ...MORE_NAV_ITEMS,
];
