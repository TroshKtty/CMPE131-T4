import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import "./scroll-to-top.css";

export default function ScrollToTopButton() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(document.body.scrollTop > 200);
      if (document.body.scrollTop > 200) {
        // console.log("show");
      }
    };

    handleScroll();

    document.body.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // TODO: this only works if "overflow-x: hidden" is NOT set on the body
  // useEffect(() => {
  // 	const handleScroll = () => {
  // 		console.log('hi');
  // 	};

  // 	window.addEventListener("scroll", handleScroll);
  // 	return () => window.removeEventListener("scroll", handleScroll);
  // })

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollToTop) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${showScrollToTop ? "visible" : "hidden"}`}
    >
      <ChevronUp size={24} />
    </button>
  );
}
