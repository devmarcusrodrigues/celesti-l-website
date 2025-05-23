"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps extends React.PropsWithChildren {}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} enableSystem attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  )
}

export { useTheme } from "next-themes"
