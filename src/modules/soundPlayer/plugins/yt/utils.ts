import { YT_REGEX } from "./index";

export const extractYouTubeLink = (
  possibleLink: string
): string | undefined => {
  const matches = possibleLink.match(YT_REGEX);
  if (matches && matches[1]) {
    const id = matches[1];
    return `https://www.youtube.com/watch?v=${id}`;
  }
  return undefined;
};
