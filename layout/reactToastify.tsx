"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function ToastLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="top-center" pauseOnFocusLoss={false} />
    </>
  );
}
