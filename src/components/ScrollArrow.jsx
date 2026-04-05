import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./ScrollArrow.css"; 

export default function ScrollArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // hide arrow near bottom
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;

      setVisible(!bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <div
      onClick={scrollDown}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce z-50"
    >
      <ChevronDown size={36} className="text-white opacity-80" />
    </div>
  );
}