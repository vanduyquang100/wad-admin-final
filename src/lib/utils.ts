import { SERVER_API } from "@/constants/apis";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "VND") {
  const priceString = price
    .toString()
    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
  return priceString + ` ${currency}`;
};

export function relativeServerLinkToURL(relativePath: string) {
  return `${SERVER_API}${relativePath}`;
}