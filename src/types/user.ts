export type FlowerType = 'rakta-jaba' | 'padma' | 'bel-pata' | 'shiuli' | 'aparajita';

export interface DigitalAnjaliOffering {
  id?: string;
  devoteeName: string;
  gotra?: string;
  location?: string;
  flowerType: FlowerType;
  flowerNameBn: string;
  flowerNameEn: string;
  prarthana?: string;
  pujaDay: string;
  timestamp: string;
  blessingCardId?: string;
}

export interface BijoyaGreetingCard {
  id: string;
  recipientName: string;
  senderName: string;
  messageType: 'elder_pranam' | 'peer_kolakoli' | 'younger_ashirvad' | 'general_subhechha';
  customMessage?: string;
  themeStyle: 'traditional-sindoor' | 'temple-gold' | 'kash-autumn' | 'shondha-red';
  createdAt: string;
}

export interface PujaModeSettings {
  isEnabled: boolean;
  incenseGlow: boolean;
  floatingPetals: boolean;
  ambientSound: boolean;
}
