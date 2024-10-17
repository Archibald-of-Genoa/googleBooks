export interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
}

export interface VolumeInfo {
  imageLinks?: ImageLinks;
  authors?: string[];
  title: string;
  averageRating?: number;
  description?: string;
  retailPrice?: RetailPrice;
  ratingsCount?: number;
}

export interface AccessInfo {
  id: string;
}

export interface RetailPrice {
  amount?: number;
  currencyCode?: string;
}

export interface SaleInfo {
  retailPrice?: RetailPrice;
}

export interface Item {
  saleInfo?: SaleInfo;
  volumeInfo: VolumeInfo;
  accessInfo: AccessInfo;
}

export interface ItemResponse {
  items: Item[];
}

export interface Book {
  id: string;
  title: string;
  authors?: string[];
  image?: ImageLinks["thumbnail"];
  ratingsCount?: number;
  averageRating?: number;
  description?: string;
  retailPrice?: RetailPrice;
}
