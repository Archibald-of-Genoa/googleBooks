import axios from "axios";

const categoryList = document.getElementById("category-list");
const cardsList = document.getElementById('cardsList');

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

const API_KEY = "AIzaSyBGJuUcdJiTAVC-HJ8P29J8IrZU1wRABXU";

export async function searchBooks(query: string): Promise<void> {
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
    const response = await axios.get(url);
    const itemsList = response.data.items;
    itemsList.forEach((item: Item) => {
      const volumeInfo = item.volumeInfo;
      const bookCard: VolumeInfo = {
        image: volumeInfo.imageLinks?.thumbnail || 'No image available',
        authors: volumeInfo.authors,
        title: volumeInfo.title,
        averageRating: volumeInfo.averageRating,
        description: volumeInfo.description,
        retailPrice: item.saleInfo?.retailPrice,
      };

      const cardElement = document.createElement("div");
      cardElement.innerHTML = /*html*/ `
        <img src="${bookCard.image}" alt="${bookCard.title}">
        <h2>${bookCard.title}</h2>
        
      `;

      if (cardsList) {
        cardsList.append(cardElement);
      }
    });

    console.log(response);

    return response.data.items || [];
  } catch (error) {
    console.error("An error occured while searching for books", error);
  }
}
