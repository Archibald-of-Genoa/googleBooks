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
  description: string;
  retailPrice?: string;
}

interface SaleInfo {
  retailPrice?: string;
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
    return itemsList.map(({ volumeInfo, saleInfo }: Item) => ({
      image: volumeInfo.imageLinks?.thumbnail || "No image available",
      authors: volumeInfo.authors,
      title: volumeInfo.title,
      averageRating: volumeInfo.averageRating,
      description: volumeInfo.description,
      retailPrice: saleInfo?.retailPrice,
    }));
  } catch (error) {
    console.error("An error occured while searching for books", error);
  }
}
