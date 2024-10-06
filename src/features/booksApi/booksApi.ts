import axios from "axios";

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
    console.log(response);
    return response.data.items || [];
  } catch (error) {
    console.error("An error occured while searching for books", error);
  }
}
