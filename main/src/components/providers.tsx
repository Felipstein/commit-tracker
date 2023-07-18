"use client"

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export interface ProvidersProps {
  children: ReactNode,
}

export default function Providers({ children }: ProvidersProps) {

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}