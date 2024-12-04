import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./scroll-to-top.module.css";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(document.body.scrollTop > 200);
    };

    handleScroll();

    document.body.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollToTop) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.scrollToTop} ${
        showScrollToTop ? styles.visible : styles.hidden
      }`}
    >
      <ChevronUp size={24} />
    </button>
  );
}
