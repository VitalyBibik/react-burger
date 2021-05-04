import { useEffect, useState } from "react";

export const useDisclosure = (initialState = false, { onOpen, onClose }:any) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    if (isOpen !== initialState) {
      setIsOpen(initialState);
    }
  }, [initialState, isOpen]);

  const open = () => {
    setIsOpen(true);
    if (typeof onOpen === "function") {
      onOpen();
    }
  };

  const close = () => {
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
