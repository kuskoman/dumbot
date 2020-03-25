import fetch from "node-fetch";
import $ from "cheerio";

const baseLink = "https://www.youtube.com/results?search_query=";

export const scrapSongDataFromYT = async (
  query: string
): Promise<ScrapSongDataFromYTResponse> => {
  const queryString = encodeURI(query);
  const response = await fetch(baseLink + queryString);
  const html = await response.text();
  const videoLink = $("div > div > h3 > a", html).first();
  const name = videoLink.text();
  const href = videoLink.attr("href");
  if (!href) {
    throw new Error("Error while fetching song data.");
  }
  const id = href.split("=")[1];

  return {
    name,
    id
  };
};

export interface ScrapSongDataFromYTResponse {
  id: string;
  name: string;
}
