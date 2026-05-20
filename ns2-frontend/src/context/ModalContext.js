"use client";

import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollModalTitle, setEnrollModalTitle] = useState("Enroll Now");

  const openEnrollModal = (title) => {
    if (typeof title === "string" && title.trim()) {
      setEnrollModalTitle(title);
    } else {
      setEnrollModalTitle("Enroll Now");
    }
    setIsEnrollModalOpen(true);
  };
  const closeEnrollModal = () => setIsEnrollModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isEnrollModalOpen,
        enrollModalTitle,
        openEnrollModal,
        closeEnrollModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
