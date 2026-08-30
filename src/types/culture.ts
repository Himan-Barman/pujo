export interface CultureArticle {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  category: 'tradition' | 'art' | 'ritual' | 'culinary' | 'history';
  readingTime: string;
  coverImage: string;
  introBn: string;
  introEn: string;
  contentBn: string[];
  contentEn: string[];
  highlightQuoteBn: string;
  highlightQuoteEn: string;
  keyTakeawaysBn: string[];
  keyTakeawaysEn: string[];
}

export interface BhogItem {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'khichuri' | 'curry' | 'fry' | 'chutney' | 'sweet' | 'pulao' | 'luchi' | 'special';
  pujaDayAssocBn: string;
  pujaDayAssocEn: string;
  taglineBn: string;
  taglineEn: string;
  significanceBn: string;
  significanceEn: string;
  ingredientsBn: string[];
  ingredientsEn: string[];
  traditionalPreparationBn: string[];
  traditionalPreparationEn: string[];
  servedWithBn: string;
  servedWithEn: string;
  image: string;
  cookingTime?: string;
  portionSizeBn?: string;
  portionSizeEn?: string;
}

export interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'pandal' | 'pratima' | 'rituals' | 'lights' | 'kumortuli';
  locationBn: string;
  locationEn: string;
  photographer?: string;
  imageUrl: string;
  descriptionBn: string;
  descriptionEn: string;
}
