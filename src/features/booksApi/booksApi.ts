import axios from "axios";

import { Book, Item, ItemResponse, SaleInfo, VolumeInfo } from "../../types";

const API_KEY = import.meta.env.VITE_API_KEY;

export function createBookObject(
  {
    title,
    authors,
    imageLinks,
    ratingsCount,
    averageRating,
    description,
  }: VolumeInfo,
  id: string,
  saleInfo?: SaleInfo,
): Book {
  return {
    ...{
      id: id,
      title,
      authors,
      image: imageLinks?.thumbnail || "No image available",
      ratingsCount,
      averageRating,
      description,
    },
    ...(saleInfo
      ? {
          retailPrice: {
            currencyCode: saleInfo?.retailPrice?.currencyCode,
            amount: saleInfo?.retailPrice?.amount,
          },
        }
      : {}),
  };
}

export async function searchBooks(
  query: string,
  startIndex = 0,
): Promise<Book[] | undefined> {
  const params = new URLSearchParams({
    q: `subject:${query}`,
    key: API_KEY,
    printType: "books",
    startIndex: startIndex.toString(),
    maxResults: "6",
    langRestrict: "en",
  });

  const url = `${import.meta.env.VITE_API_URL}?${params.toString()}`;

  try {
    const response = await axios.get<ItemResponse>(url);
    const itemsList = response.data.items;
    console.log(response);
    return itemsList.map<Book>(({ volumeInfo, saleInfo, id }: Item) => {
      return createBookObject(volumeInfo, id, saleInfo);
    });
  } catch (error) {
    console.error("An error occurred while searching for books", error);
  }
}
