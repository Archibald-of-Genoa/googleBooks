import axios from "axios";

export interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
}

interface VolumeInfo {
  image?: string;
  imageLinks?: ImageLinks;
  authors?: string[];
  title: string;
  averageRating?: number;
  description?: string;
  retailPrice?: RetailPrice;
  ratingsCount?: number;
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface SaleInfo {
  retailPrice?: RetailPrice;
}

interface Item {
  saleInfo?: SaleInfo;
  volumeInfo: VolumeInfo;
}

interface ItemResponse {
  items: Item[];
}

const API_KEY = import.meta.env.VITE_API_KEY;

export async function searchBooks(
  query: string,
): Promise<VolumeInfo[] | undefined> {
  const params = new URLSearchParams({
    q: `subject:${query}`,
    key: API_KEY,
    printType: "books",
    startIndex: "0",
    maxResults: "6",
    langRestrict: "en",
  });

  const url = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;

  try {
    const response = await axios.get<ItemResponse>(url);
    const itemsList = response.data.items;
    console.log(response);
    return itemsList.map(({ volumeInfo, saleInfo }: Item) => ({
      image: volumeInfo.imageLinks?.thumbnail || "No image available",
      authors: volumeInfo.authors,
      title: volumeInfo.title,
      ratingsCount: volumeInfo.ratingsCount,
      averageRating: volumeInfo.averageRating,
      description: volumeInfo.description,
      currencyCode: saleInfo?.retailPrice?.amount,
      amount: saleInfo?.retailPrice?.amount,
    }));
  } catch (error) {
    console.error("An error occured while searching for books", error);
  }
}
