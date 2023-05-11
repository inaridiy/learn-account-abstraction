"use client";

import { Provider } from "jotai";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider>{children}</Provider>;
};
