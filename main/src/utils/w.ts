import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function w(...inputs: clsx.ClassValue[]) {
  return twMerge(clsx(inputs));
}