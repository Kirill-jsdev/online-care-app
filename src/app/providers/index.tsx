"use client";

import { TanstackQueryProvider } from "./TanstackQueryProvider";

// Example of how to compose providers
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      {/* Add other providers here, example:
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
      */}
      {children}
    </TanstackQueryProvider>
  );
}