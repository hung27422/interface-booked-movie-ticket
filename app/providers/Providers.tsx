"use client";

import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "../contexts/AuthContextProvider/AuthContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SnackbarProvider>
  );
}
