"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else router.back();
  }, [onClose, router]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) handleClose();
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className={css.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
