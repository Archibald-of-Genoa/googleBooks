import axios from "axios";

import {
  AccessInfo,
  Book,
  Item,
  ItemResponse,
  SaleInfo,
  VolumeInfo,
} from "../../types";

const API_KEY = import.meta.env.VITE_API_KEY;

export function createBookObject(
  volumeInfo: VolumeInfo,
  accessInfo: AccessInfo,
  saleInfo?: SaleInfo,
): Book {

  return {
    id: accessInfo.id,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    image: volumeInfo.imageLinks?.thumbnail || "No image available",
    ratingsCount: volumeInfo.ratingsCount,
    averageRating: volumeInfo.averageRating,
    description: volumeInfo.description,
    retailPrice: {
      currencyCode: saleInfo?.retailPrice?.currencyCode,
      amount: saleInfo?.retailPrice?.amount,
    },
  };
}

export async function searchBooks(query: string): Promise<Book[] | undefined> {
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
    return itemsList.map(({ volumeInfo, saleInfo, accessInfo }: Item): Book => {
      return createBookObject(volumeInfo, accessInfo, saleInfo);
    });
  } catch (error) {
    console.error("An error occured while searching for books", error);
  }
}
