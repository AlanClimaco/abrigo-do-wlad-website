import { useState, useEffect } from "react";

const STORAGE_KEY = "wlad:hide-scroll-indicators";

export function useIndicatorStorage() {
  const [isVisible, setIsVisible] = useState(() => {
    const isHidden = localStorage.getItem(STORAGE_KEY) === "true";
    return !isHidden;
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
  }, []);

  const hideIndicator = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
      localStorage.setItem(STORAGE_KEY, "true");
    }, 400);
  };

  const showIndicator = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsVisible(true);
    setIsFadingOut(false);
  };

  return { isVisible, isFadingOut, hideIndicator, showIndicator };
}
