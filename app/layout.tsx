import "styles/taiwindcss.css";
import "styles/globals.css";
import { ReactNode } from "react";

import { ToastLayout } from "layout/reactToastify";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head />
      <body>
        <ToastLayout>{children}</ToastLayout>
      </body>
    </html>
  );
}
